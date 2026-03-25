import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
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
    difficulty : Nat; // 1-5 scale
  };

  module Passage {
    public func compare(passage1 : Passage, passage2 : Passage) : Order.Order {
      Text.compare(passage1.id, passage2.id);
    };
  };

  public type TypingResult = {
    sessionId : Text;
    examId : Text;
    wpm : Nat;
    accuracy : Nat;
    errors : Nat;
    timeTaken : Nat; // in seconds
    passed : Bool;
    timestamp : Time.Time;
    user : Principal;
  };

  let exams = Map.empty<Text, Exam>();
  let passages = Map.empty<Text, Passage>();
  let results = Map.empty<Text, TypingResult>();

  func getPassageInternal(id : Text) : Passage {
    switch (passages.get(id)) {
      case (null) { Runtime.trap("Passage not found") };
      case (?passage) { passage };
    };
  };

  public query func getExam(examId : Text) : async Exam {
    switch (exams.get(examId)) {
      case (null) { Runtime.trap("Exam not found") };
      case (?exam) { exam };
    };
  };

  public query func getAllExams() : async [Exam] {
    exams.values().toArray().sort();
  };

  public query func getPassage(passageId : Text) : async Passage {
    getPassageInternal(passageId);
  };

  public query func getPassagesByCategory(category : Text) : async [Passage] {
    let filtered = passages.values().toArray().filter(
      func(p) { p.category == category }
    );
    filtered.sort();
  };

  public query func getAllPassages() : async [Passage] {
    passages.values().toArray().sort();
  };

  public shared ({ caller }) func submitResult(sessionId : Text, examId : Text, wpm : Nat, accuracy : Nat, errors : Nat, timeTaken : Nat, passed : Bool) : async () {
    let result : TypingResult = {
      sessionId;
      examId;
      wpm;
      accuracy;
      errors;
      timeTaken;
      passed;
      timestamp = Time.now();
      user = caller;
    };
    results.add(sessionId, result);
  };

  public query ({ caller }) func getSessionResult(sessionId : Text) : async TypingResult {
    switch (results.get(sessionId)) {
      case (null) { Runtime.trap("Result not found") };
      case (?result) { result };
    };
  };

  public query ({ caller }) func getMyResults() : async [TypingResult] {
    let filtered = results.values().toArray().filter(
      func(r) { r.user == caller }
    );
    filtered;
  };

  public query ({ caller }) func getExamResults(examId : Text) : async [TypingResult] {
    let filtered = results.values().toArray().filter(
      func(r) { r.examId == examId }
    );
    filtered;
  };

  func addExam(exam : Exam) {
    exams.add(exam.name, exam);
  };

  func addPassage(passage : Passage) {
    passages.add(passage.id, passage);
  };

  system func preupgrade() { };
  system func postupgrade() {
    let examsList : [Exam] = [
      {
        name = "SSC CHSL";
        category = "SSC";
        requiredWPM = 35;
        timeLimitMinutes = 10;
        language = #english;
        minAccuracy = 90;
        authority = "Staff Selection Commission";
        officialWebsite = "https://ssc.nic.in";
        description = "SSC CHSL English typing test requiring 35 WPM in 10 minutes.";
      },
      {
        name = "SSC CGL";
        category = "SSC";
        requiredWPM = 35;
        timeLimitMinutes = 10;
        language = #english;
        minAccuracy = 90;
        authority = "Staff Selection Commission";
        officialWebsite = "https://ssc.nic.in";
        description = "SSC CGL English typing test requiring 35 WPM in 10 minutes.";
      },
      {
        name = "SSC Steno Grade C";
        category = "SSC";
        requiredWPM = 50;
        timeLimitMinutes = 10;
        language = #english;
        minAccuracy = 90;
        authority = "Staff Selection Commission";
        officialWebsite = "https://ssc.nic.in";
        description = "SSC Steno Grade C English typing test requiring 100 WPM shorthand and 50 WPM typing in 10 minutes.";
      },
      {
        name = "SSC Steno Grade D";
        category = "SSC";
        requiredWPM = 40;
        timeLimitMinutes = 10;
        language = #english;
        minAccuracy = 90;
        authority = "Staff Selection Commission";
        officialWebsite = "https://ssc.nic.in";
        description = "SSC Steno Grade D English typing test requiring 80 WPM shorthand and 40 WPM typing in 10 minutes.";
      },
      {
        name = "RRB NTPC";
        category = "Railways";
        requiredWPM = 30;
        timeLimitMinutes = 10;
        language = #bilingual;
        minAccuracy = 90;
        authority = "Railway Recruitment Board";
        officialWebsite = "https://indianrailways.gov.in";
        description = "RRB NTPC typing test with 30 WPM English or 25 WPM Hindi in 10 minutes.";
      },
      {
        name = "Bank PO";
        category = "Banking";
        requiredWPM = 40;
        timeLimitMinutes = 10;
        language = #english;
        minAccuracy = 90;
        authority = "Institute of Banking Personnel Selection";
        officialWebsite = "https://ibps.in";
        description = "Bank PO English typing test requiring 40 WPM in 10 minutes.";
      },
      {
        name = "Bank Clerk";
        category = "Banking";
        requiredWPM = 30;
        timeLimitMinutes = 10;
        language = #english;
        minAccuracy = 90;
        authority = "Institute of Banking Personnel Selection";
        officialWebsite = "https://ibps.in";
        description = "Bank Clerk English typing test requiring 30 WPM in 10 minutes.";
      },
      {
        name = "High Court";
        category = "Judiciary";
        requiredWPM = 30;
        timeLimitMinutes = 15;
        language = #english;
        minAccuracy = 90;
        authority = "Various High Courts";
        officialWebsite = "https://hc.ap.nic.in";
        description = "High Court English typing test requiring 30 WPM in 15 minutes.";
      },
      {
        name = "Haryana SSC";
        category = "SSC";
        requiredWPM = 30;
        timeLimitMinutes = 10;
        language = #bilingual;
        minAccuracy = 90;
        authority = "Haryana Staff Selection Commission";
        officialWebsite = "https://hssc.gov.in";
        description = "Haryana SSC typing test with 30 WPM English or Hindi in 10 minutes.";
      },
      {
        name = "LDC";
        category = "SSC";
        requiredWPM = 35;
        timeLimitMinutes = 10;
        language = #bilingual;
        minAccuracy = 90;
        authority = "Various Authorities";
        officialWebsite = "https://ssc.nic.in";
        description = "LDC typing test with 35 WPM English or Hindi in 10 minutes.";
      },
      {
        name = "DEO";
        category = "SSC";
        requiredWPM = 0;
        timeLimitMinutes = 15;
        language = #english;
        minAccuracy = 15000;
        authority = "Staff Selection Commission";
        officialWebsite = "https://ssc.nic.in";
        description = "DEO test with 15000 key depressions per hour in 15 minutes.";
      },
      {
        name = "Clerk";
        category = "State Govt";
        requiredWPM = 30;
        timeLimitMinutes = 10;
        language = #bilingual;
        minAccuracy = 90;
        authority = "Various Authorities";
        officialWebsite = "https://hc.ap.nic.in";
        description = "Clerk typing test with 30 WPM English or Hindi in 10 minutes.";
      },
    ];

    let passagesList : [Passage] = [
      {
        id = "passage1";
        category = "SSC";
        content = "The quick brown fox jumps over the lazy dog. Typing speed is measured in words per minute.";
        wordCount = 15;
        difficulty = 1;
      },
      {
        id = "passage2";
        category = "Banking";
        content = "Banking exams test your typing skills and accuracy. Practice regularly to improve.";
        wordCount = 14;
        difficulty = 2;
      },
      {
        id = "passage3";
        category = "Railways";
        content = "Indian Railways is one of the largest employers in the world. Typing tests are common in RRB exams.";
        wordCount = 16;
        difficulty = 3;
      },
      {
        id = "passage4";
        category = "Judiciary";
        content = "Law and order is essential for the progress of any nation. High Court exams include computer proficiency tests.";
        wordCount = 17;
        difficulty = 4;
      },
      {
        id = "passage5";
        category = "SSC";
        content = "Hindi typing is required for many government exams. Practice daily to achieve better accuracy.";
        wordCount = 15;
        difficulty = 2;
      },
      {
        id = "passage6";
        category = "Banking";
        content = "Interest rates and inflation are important concepts in banking. Fast and accurate typing is necessary for clerical jobs.";
        wordCount = 18;
        difficulty = 3;
      },
      {
        id = "passage7";
        category = "Railways";
        content = "रेलवे भर्ती परीक्षा में टाइपिंग टेस्ट आवश्यक है। अभ्यास से स्पीड और एक्युरेसी में सुधार होता है।";
        wordCount = 13;
        difficulty = 3;
      },
      {
        id = "passage8";
        category = "SSC";
        content = "सरकारी नौकरियों के लिए टाइपिंग टेस्ट अनिवार्य है। नियमित अभ्यास से बेहतर परिणाम मिल सकते हैं।";
        wordCount = 16;
        difficulty = 2;
      },
      {
        id = "passage9";
        category = "SSC";
        content = "साक्षात्कार के लिए तैयारी करें और टाइपिंग कौशल बढ़ाएं। सफलता की कुंजी मेहनत और लगन है।";
        wordCount = 14;
        difficulty = 2;
      },
      {
        id = "passage10";
        category = "Banking";
        content = "बैंकिंग परीक्षाओं में टाइपिंग स्पीड और एकुरेसी महत्वपूर्ण है। नियमित अभ्यास से सुधार संभव है।";
        wordCount = 14;
        difficulty = 2;
      },
    ];

    examsList.forEach(addExam);
    passagesList.forEach(addPassage);
  };
};
