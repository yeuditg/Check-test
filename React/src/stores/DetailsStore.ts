import { makeAutoObservable} from "mobx";
import { Subject } from "../types/subject";
import { Class } from "../types/class";

class DetailsStore {

    currentSubject!:Subject
    currentClass!:Class
  constructor() {
    makeAutoObservable(this);
  }
setCurrentSubject(subject: Subject) {
    this.currentSubject = subject;
  }
setCurrentClass(classData: Class) {
 this.currentClass = classData;
    
}
}
export default  new DetailsStore();;
