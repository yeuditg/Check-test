import { StudentTestFeedback } from "./StudentTestFeedback";

export type MyFile = {
  id: number;
  feedbackId?: number; 
  userId: number;
  subjectId: number;
  classId: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  description: string;
  createdDate: Date;
  content: string;
  isChecked: boolean;
  checkedOn?: Date;
  feedback?: StudentTestFeedback;
};
