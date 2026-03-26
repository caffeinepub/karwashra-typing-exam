import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Iter "mo:core/Iter";
import Map "mo:core/Map";

import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";


actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Exam = {
    name : Text;
    category : Text;
    requiredWPM : Nat;
    timeLimitMinutes : Nat;
    language : { #english; #hindi; #bilingual };
    minAccuracy : Nat;
    authority : Text;
    officialWebsite : Text;
    description : Text;
  };

  module Exam {
    public func compare(exam1 : Exam, exam2 : Exam) : Order.Order {
      Text.compare(exam1.name, exam2.name);
    };
  };

  public type Passage = {
    id : Text;
    category : Text;
    content : Text;
    wordCount : Nat;
    difficulty : Nat;
  };

  module Passage {
    public func compare(passage1 : Passage, passage2 : Passage) : Order.Order {
      Text.compare(passage1.id, passage2.id);
    };
  };

  public type TypingResult = {
    sessionId : Text;
    examId : Text;
    examName : Text;
    wpm : Nat;
    accuracy : Nat;
    errors : Nat;
    timeTaken : Nat;
    passed : Bool;
    language : Text;
    timestamp : Time.Time;
    username : Text;
  };

  public type UserProfile = {
    username : Text;
    passwordHash : Text;
    securityQuestion : Text;
    securityAnswer : Text;
    createdAt : Time.Time;
  };

  public type LiveSession = {
    roomId : Text;
    examId : Text;
    examName : Text;
    timeLimit : Nat;
    participants : Map.Map<Text, TypingResult>;
    startTime : Time.Time;
    isActive : Bool;
  };

  public type LiveSessionPublic = {
    roomId : Text;
    examId : Text;
    examName : Text;
    timeLimit : Nat;
    participants : [TypingResult];
    startTime : Time.Time;
    isActive : Bool;
  };

  let exams = Map.empty<Text, Exam>();
  let passages = Map.empty<Text, Passage>();
  let results = Map.empty<Text, TypingResult>();
  let sessions = Map.empty<Text, LiveSession>();
  let userProfiles = Map.empty<Text, UserProfile>();
  let sessionTokens = Map.empty<Text, Text>();

  // Helper function to verify session token and return username
  func verifySessionToken(token : Text) : ?Text {
    sessionTokens.get(token);
  };

  // Helper function to verify session token or trap
  func requireAuth(token : Text) : Text {
    switch (verifySessionToken(token)) {
      case (null) { Runtime.trap("Unauthorized: Invalid or expired session token") };
      case (?username) { username };
    };
  };

  func getPassageInternal(id : Text) : Passage {
    switch (passages.get(id)) {
      case (null) { Runtime.trap("Passage not found") };
      case (?passage) { passage };
    };
  };

  // Public - anyone can register
  public shared ({ caller }) func registerUser(username : Text, passwordHash : Text, securityQuestion : Text, securityAnswer : Text) : async Bool {
    if (userProfiles.containsKey(username)) {
      Runtime.trap("Username already exists");
    };
    let profile : UserProfile = {
      username;
      passwordHash;
      securityQuestion;
      securityAnswer;
      createdAt = Time.now();
    };
    userProfiles.add(username, profile);
    true;
  };

  // Public - anyone can attempt login
  public shared ({ caller }) func login(username : Text, passwordHash : Text) : async Text {
    switch (userProfiles.get(username)) {
      case (null) { Runtime.trap("Invalid username or password") };
      case (?profile) {
        if (profile.passwordHash != passwordHash) {
          Runtime.trap("Invalid username or password");
        };

        let token = username.concat(Time.now().toText());
        sessionTokens.add(token, username);
        token;
      };
    };
  };

  // Public - verify session token
  public query ({ caller }) func verifySession(token : Text) : async Bool {
    switch (verifySessionToken(token)) {
      case (null) { false };
      case (?_) { true };
    };
  };

  // Public - but verify security answer
  public shared ({ caller }) func resetPassword(username : Text, securityAnswer : Text, newPasswordHash : Text) : async Bool {
    switch (userProfiles.get(username)) {
      case (null) { Runtime.trap("User not found") };
      case (?profile) {
        if (profile.securityAnswer != securityAnswer) {
          Runtime.trap("Incorrect security answer");
        };
        let updatedProfile : UserProfile = {
          username = profile.username;
          passwordHash = newPasswordHash;
          securityQuestion = profile.securityQuestion;
          securityAnswer = profile.securityAnswer;
          createdAt = profile.createdAt;
        };
        userProfiles.add(username, updatedProfile);
        true;
      };
    };
  };

  // Authenticated - get current user profile
  public query ({ caller }) func getCurrentUserProfile(token : Text) : async UserProfile {
    let username = requireAuth(token);
    switch (userProfiles.get(username)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?profile) {
        // Return profile without sensitive data
        {
          username = profile.username;
          passwordHash = "";
          securityQuestion = profile.securityQuestion;
          securityAnswer = "";
          createdAt = profile.createdAt;
        };
      };
    };
  };

  // Public - anyone can view exams
  public query ({ caller }) func getExam(examId : Text) : async Exam {
    switch (exams.get(examId)) {
      case (null) { Runtime.trap("Exam not found") };
      case (?exam) { exam };
    };
  };

  // Public - anyone can view exams
  public query ({ caller }) func getAllExams() : async [Exam] {
    exams.values().toArray().sort();
  };

  // Public - anyone can view passages
  public query ({ caller }) func getPassage(passageId : Text) : async Passage {
    getPassageInternal(passageId);
  };

  // Public - anyone can view passages
  public query ({ caller }) func getPassagesByCategory(category : Text) : async [Passage] {
    let filtered = passages.values().toArray().filter(
      func(p) { p.category == category }
    );
    filtered.sort();
  };

  // Public - anyone can view passages
  public query ({ caller }) func getAllPassages() : async [Passage] {
    passages.values().toArray().sort();
  };

  // Authenticated - submit result for authenticated user
  public shared ({ caller }) func submitResult(token : Text, sessionId : Text, examId : Text, examName : Text, wpm : Nat, accuracy : Nat, errors : Nat, timeTaken : Nat, passed : Bool, language : Text) : async () {
    let username = requireAuth(token);

    let result : TypingResult = {
      sessionId;
      examId;
      examName;
      wpm;
      accuracy;
      errors;
      timeTaken;
      passed;
      language;
      timestamp = Time.now();
      username;
    };
    results.add(sessionId, result);
  };

  // Public - anyone can view individual results
  public query ({ caller }) func getSessionResult(sessionId : Text) : async TypingResult {
    switch (results.get(sessionId)) {
      case (null) { Runtime.trap("Result not found") };
      case (?result) { result };
    };
  };

  // Authenticated - get only my results
  public query ({ caller }) func getMyResults(token : Text) : async [TypingResult] {
    let username = requireAuth(token);
    let filtered = results.values().toArray().filter(
      func(r) { r.username == username }
    );
    filtered;
  };

  // Public - anyone can view exam results
  public query ({ caller }) func getExamResults(examId : Text) : async [TypingResult] {
    let filtered = results.values().toArray().filter(
      func(r) { r.examId == examId }
    );
    filtered;
  };

  // Public - leaderboard is public
  public query func getLeaderboard() : async [TypingResult] {
    results.values().toArray();
  };

  // Authenticated - only authenticated users can create live sessions
  public shared ({ caller }) func createLiveSession(token : Text, examId : Text, examName : Text, timeLimit : Nat) : async Text {
    let username = requireAuth(token);

    let roomId = Time.now().toText().concat(examId);

    let session : LiveSession = {
      roomId;
      examId;
      examName;
      timeLimit;
      participants = Map.empty<Text, TypingResult>();
      startTime = Time.now();
      isActive = true;
    };
    sessions.add(roomId, session);
    roomId;
  };

  // Authenticated - verify token matches username
  public shared ({ caller }) func joinLiveSession(token : Text, roomId : Text, username : Text) : async Bool {
    let authUsername = requireAuth(token);

    // Verify the username matches the authenticated user
    if (authUsername != username) {
      Runtime.trap("Unauthorized: Cannot join session as another user");
    };

    switch (sessions.get(roomId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) {
        let result : TypingResult = {
          sessionId = roomId;
          examId = session.examId;
          examName = session.examName;
          wpm = 0;
          accuracy = 0;
          errors = 0;
          timeTaken = 0;
          passed = false;
          language = "english";
          timestamp = Time.now();
          username;
        };
        session.participants.add(username, result);
        sessions.add(roomId, session);
        true;
      };
    };
  };

  // Authenticated - verify token matches username
  public shared ({ caller }) func updateProgress(token : Text, roomId : Text, username : Text, wpm : Nat, accuracy : Nat, wordsTyped : Nat) : async () {
    let authUsername = requireAuth(token);

    // Verify the username matches the authenticated user
    if (authUsername != username) {
      Runtime.trap("Unauthorized: Cannot update progress for another user");
    };

    switch (sessions.get(roomId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) {
        if (not session.isActive) {
          Runtime.trap("Session is no longer active");
        };

        let updatedResult : TypingResult = {
          sessionId = roomId;
          examId = session.examId;
          examName = session.examName;
          wpm;
          accuracy;
          errors = 0;
          timeTaken = wordsTyped;
          passed = false;
          language = "english";
          timestamp = Time.now();
          username;
        };
        session.participants.add(username, updatedResult);
        sessions.add(roomId, session);
      };
    };
  };

  // Authenticated - verify token matches username
  public shared ({ caller }) func finishLiveSession(token : Text, roomId : Text, username : Text, wpm : Nat, accuracy : Nat, errors : Nat, timeTaken : Nat) : async () {
    let authUsername = requireAuth(token);

    // Verify the username matches the authenticated user
    if (authUsername != username) {
      Runtime.trap("Unauthorized: Cannot finish session for another user");
    };

    switch (sessions.get(roomId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) {
        if (not session.isActive) {
          Runtime.trap("Session is no longer active");
        };

        let finishedResult : TypingResult = {
          sessionId = roomId;
          examId = session.examId;
          examName = session.examName;
          wpm;
          accuracy;
          errors;
          timeTaken;
          passed = true;
          language = "english";
          timestamp = Time.now();
          username;
        };
        session.participants.add(username, finishedResult);
        sessions.add(roomId, session);
      };
    };
  };

  // Public - anyone can view live session state (returns immutable version)
  public query ({ caller }) func getLiveSessionState(roomId : Text) : async LiveSessionPublic {
    switch (sessions.get(roomId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) {
        let participantsArray = session.participants.values().toArray();
        {
          roomId = session.roomId;
          examId = session.examId;
          examName = session.examName;
          timeLimit = session.timeLimit;
          participants = participantsArray;
          startTime = session.startTime;
          isActive = session.isActive;
        };
      };
    };
  };

  // Public - anyone can view active sessions (returns immutable versions)
  public query ({ caller }) func getActiveLiveSessions() : async [LiveSessionPublic] {
    let filtered = sessions.values().toArray().filter(
      func(s) { s.isActive }
    );

    filtered.map(
      func(session) {
        {
          roomId = session.roomId;
          examId = session.examId;
          examName = session.examName;
          timeLimit = session.timeLimit;
          participants = session.participants.values().toArray();
          startTime = session.startTime;
          isActive = session.isActive;
        };
      }
    );
  };

  func addExam(exam : Exam) {
    exams.add(exam.name, exam);
  };

  func addPassage(passage : Passage) {
    passages.add(passage.id, passage);
  };

  // Required by AccessControl integration - using Principal-based profiles
  public type CallerUserProfile = {
    name : Text;
  };

  let callerUserProfiles = Map.empty<Principal, CallerUserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?CallerUserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    callerUserProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?CallerUserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    callerUserProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : CallerUserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    callerUserProfiles.add(caller, profile);
  };
};
