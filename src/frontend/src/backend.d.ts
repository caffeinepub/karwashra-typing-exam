import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TypingResult {
    wpm: bigint;
    user: Principal;
    errors: bigint;
    timestamp: Time;
    examId: string;
    sessionId: string;
    timeTaken: bigint;
    passed: boolean;
    accuracy: bigint;
}
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
export enum Variant_hindi_bilingual_english {
    hindi = "hindi",
    bilingual = "bilingual",
    english = "english"
}
export interface backendInterface {
    getAllExams(): Promise<Array<Exam>>;
    getAllPassages(): Promise<Array<Passage>>;
    getExam(examId: string): Promise<Exam>;
    getExamResults(examId: string): Promise<Array<TypingResult>>;
    getMyResults(): Promise<Array<TypingResult>>;
    getPassage(passageId: string): Promise<Passage>;
    getPassagesByCategory(category: string): Promise<Array<Passage>>;
    getSessionResult(sessionId: string): Promise<TypingResult>;
    submitResult(sessionId: string, examId: string, wpm: bigint, accuracy: bigint, errors: bigint, timeTaken: bigint, passed: boolean): Promise<void>;
}
