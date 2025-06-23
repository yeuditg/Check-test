export interface QuestionFeedback {
  id: number;
  questionNumber: number;
  percentForQuestion:number
  status: string;
  feedback: string;
  correctAnswer: string;
}
