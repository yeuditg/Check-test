import { makeAutoObservable} from "mobx";
import axios from "axios";
import { toJS } from "mobx";

class FolderStore {
  folders = [];
  foldersCurrentUsers = [];
  isLoading = false;
  error:any = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchFoldersCurrentUser() {
    this.isLoading = true;
    this.error = null;
    const token = sessionStorage.getItem("token");
    if (!token) {
      this.error = "No token found, please log in.";
      this.isLoading = false;
      return;
    }
    try {
      const response = await axios.get("https://localhost:7213/api/Folder/by-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.foldersCurrentUsers = response.data;
      console.log("Fetched folders for user:", toJS(this.foldersCurrentUsers));
    } catch (err:any) {
      this.error = err.response ? err.response.data : err.message;
      console.error("Error fetching folders:", this.error);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchFolders() {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await axios.get("https://localhost:7213/api/Folder", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      this.folders = response.data;
      console.log("Fetched folders");
    } catch (err:any) {
      this.error = err.message;
    } finally {
      this.isLoading = false;
    }
  }

  async createFolder(name:any, description:any) {
    const folderData = {
      name: name,
      description: description,
    };
    this.isLoading = true;
    this.error = null;
    try {
      const response = await axios.post("https://localhost:7213/api/Folder", folderData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      console.log(response, "res");
      this.folders.push(response.data);
      return response.data;
    } catch (err:any) {
      console.log(err, "error");
      this.error = err.message;
      throw err;
    } finally {
      this.isLoading = false;
    }
  }
}

const folderStore = new FolderStore();
export default folderStore;
