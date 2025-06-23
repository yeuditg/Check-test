import { makeAutoObservable} from "mobx";
import { MyFile } from "../types/myFile";
import axios from "axios";

class FileStore {
teacherFiles:MyFile[] = [];    
   
  constructor() {
    makeAutoObservable(this);
  }
    async setTeacherFiles() {
    try {
        //   setLoading(true);
          const teacherEmailData = sessionStorage.getItem('teacher_email');
          const currentUserId = teacherEmailData ? JSON.parse(teacherEmailData).id : null;
      
          const response = await axios.get(`https://check-test-api.onrender.com/api/File/userId/${currentUserId}`);
          console.log(response.data);
          
          if (!response) {
            throw new Error('שגיאה בטעינת הקבצים');
          }
      
          const data = await response.data;
      
          if (Array.isArray(data)) {
            this.teacherFiles=data;
          } else {
            console.error("השרת לא החזיר מערך:", data);
           
          }
        } catch (err: any) {
          console.log(err.message);
         
       
        } 
}
    

}
export default  new FileStore();;
