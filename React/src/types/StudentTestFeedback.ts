import { QuestionFeedback } from "./QuestionFeedback";

export interface StudentTestFeedback {
  id: number;
  studentName: string;
  finalGrade: number;
  feedback: QuestionFeedback[];
  noteToTeacher: string;
}
