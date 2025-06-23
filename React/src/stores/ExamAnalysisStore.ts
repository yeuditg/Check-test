import { makeAutoObservable } from "mobx";
import { StudentTestFeedback } from "../types/StudentTestFeedback";

class ExamAnalysisStore {
  analysisResults: StudentTestFeedback[] = [];
  selectedStudentId: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setResults(results: StudentTestFeedback[]) {
    this.analysisResults = results;
  }

  clearResults() {
    this.analysisResults = [];
    this.selectedStudentId = null;
  }

  setSelectedStudent(id: number | null) {
    this.selectedStudentId = id;
  }

  get filteredResults() {
    if (this.selectedStudentId === null) return this.analysisResults;
    return this.analysisResults.filter(r => r.id === this.selectedStudentId);
  }
}

const examAnalysisStore = new ExamAnalysisStore();
export default examAnalysisStore;
