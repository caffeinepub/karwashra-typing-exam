import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Passage {
    id: string;
    content: string;
    wordCount: bigint;
    difficulty: bigint;
    category: string;
}
export interface Exam {
    minAccuracy: bigint;
    name: string;
    description: string;
    language: Variant_hindi_bilingual_english;
    requiredWPM: bigint;
    timeLimitMinutes: bigint;
    category: string;
    authority: string;
    officialWebsite: string;
}
export interface TypingResult {
    wpm: bigint;
    username: string;
    errors: bigint;
    language: string;
    timestamp: Time;
    examId: string;
    sessionId: string;
    timeTaken: bigint;
    examName: string;
    passed: boolean;
    accuracy: bigint;
}
export interface CallerUserProfile {
    name: string;
}
export interface UserProfile {
    username: string;
    createdAt: Time;
    securityQuestion: string;
    securityAnswer: string;
    passwordHash: string;
}
export interface LiveSessionPublic {
    startTime: Time;
    participants: Array<TypingResult>;
    timeLimit: bigint;
    isActive: boolean;
    examId: string;
    roomId: string;
    examName: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_hindi_bilingual_english {
    hindi = "hindi",
    bilingual = "bilingual",
    english = "english"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createLiveSession(token: string, examId: string, examName: string, timeLimit: bigint): Promise<string>;
    finishLiveSession(token: string, roomId: string, username: string, wpm: bigint, accuracy: bigint, errors: bigint, timeTaken: bigint): Promise<void>;
    getActiveLiveSessions(): Promise<Array<LiveSessionPublic>>;
    getAllExams(): Promise<Array<Exam>>;
    getAllPassages(): Promise<Array<Passage>>;
    getCallerUserProfile(): Promise<CallerUserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCurrentUserProfile(token: string): Promise<UserProfile>;
    getExam(examId: string): Promise<Exam>;
    getExamResults(examId: string): Promise<Array<TypingResult>>;
    getLeaderboard(): Promise<Array<TypingResult>>;
    getLiveSessionState(roomId: string): Promise<LiveSessionPublic>;
    getMyResults(token: string): Promise<Array<TypingResult>>;
    getPassage(passageId: string): Promise<Passage>;
    getPassagesByCategory(category: string): Promise<Array<Passage>>;
    getSessionResult(sessionId: string): Promise<TypingResult>;
    getUserProfile(user: Principal): Promise<CallerUserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    joinLiveSession(token: string, roomId: string, username: string): Promise<boolean>;
    login(username: string, passwordHash: string): Promise<string>;
    registerUser(username: string, passwordHash: string, securityQuestion: string, securityAnswer: string): Promise<boolean>;
    resetPassword(username: string, securityAnswer: string, newPasswordHash: string): Promise<boolean>;
    saveCallerUserProfile(profile: CallerUserProfile): Promise<void>;
    submitResult(token: string, sessionId: string, examId: string, examName: string, wpm: bigint, accuracy: bigint, errors: bigint, timeTaken: bigint, passed: boolean, language: string): Promise<void>;
    updateProgress(token: string, roomId: string, username: string, wpm: bigint, accuracy: bigint, wordsTyped: bigint): Promise<void>;
    verifySession(token: string): Promise<boolean>;
}
