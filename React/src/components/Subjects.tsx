import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Plus, FolderOpen, Trash2 } from "lucide-react";
import axios from "axios";
import { Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { Subject } from "../types/subject";
import DetailsStore from "../stores/DetailsStore";
import fileStore from "../stores/fileStore";



export default function SubjectsComponent() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [showNewDialog, setShowNewDialog] = useState(false);
    const [newSubject, setNewSubject] = useState<Omit<Subject, 'id' | 'createdBy'>>({
        name: "",
        description: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        loadSubjects();
        fetchFiles();
    }, []);
    
    const fetchFiles = async () => {
        fileStore.setTeacherFiles();
    };
    //   const teacherEmailData = sessionStorage.getItem('teacher_email');
 

  

    const loadSubjects = async () => {
        try {
            const teacherEmailData = sessionStorage.getItem('teacher_email  ');
            const currentUserId = teacherEmailData ? JSON.parse(teacherEmailData).id : null;

            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error("No access token found.");
                return;
            }

            const response = await axios.get('https://localhost:7213/api/Subject', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Subjects response:", response.data);
            const subjectsData = Array.isArray(response.data) ? response.data : [];
            console.log("Subjects loaded:", subjectsData
            );
            setSubjects(subjectsData);
        } catch (err: any) {
            console.error("Error loading subjects:", err.response ? err.response.data : err.message);
            setSubjects([]);
        }
    };


    const handleCreateSubject = async () => {
        const teacherEmailData = sessionStorage.getItem('teacher_email');
        const currentUserId = teacherEmailData ? JSON.parse(teacherEmailData).id : null;

        const newSubjectData = {
            name: newSubject.name.trim(),
            description: newSubject.description.trim(),
            createdBy: currentUserId
        };

        if (!newSubjectData.name || !newSubjectData.description) {
            console.error("Name and description are required.");
            return;
        }

        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error("No access token found.");
                return;
            }

            const createdSubject = await axios.post('https://localhost:7213/api/Subject', newSubjectData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSubjects(prevSubjects => [...prevSubjects, createdSubject.data]);
            navigate(`/classes?subjectId=${createdSubject.data.id}`);
        } catch (err: any) {
            console.error("Error creating subject:", err.response ? err.response.data : err.message);
        }

        setShowNewDialog(false);
        setNewSubject({ name: "", description: "" });
    };

    const handleDeleteSubject = async (subjectId: number) => {
        const subjectToDelete = subjects.find(subject => subject.id === subjectId);
        const teacherEmailData = sessionStorage.getItem('teacher_email');
        const currentUserId = teacherEmailData ? JSON.parse(teacherEmailData).id : null;

        if (subjectToDelete) {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    console.error("No access token found.");
                    return;
                }

                await axios.delete(`https://localhost:7213/api/Subject/${subjectId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSubjects(prevSubjects => prevSubjects.filter(subject => subject.id !== subjectId));
            } catch (err: any) {
                console.error("Error deleting subject:", err.response ? err.response.data : err.message);
            }
        } else {
            console.error("Subject not found for ID:", subjectId);
        }
    };

    return (
        <>
            <Outlet />
            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold">המקצועות שלי</h1>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => setShowNewDialog(true)}
                        >
                            <Plus className="w-5 h-5 ml-2" />
                            הוספת מקצוע
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subjects.length === 0 ? (
                            <p>אין מקצועות זמינים.</p>
                        ) : (
                            subjects.map((subject: Subject) => (
                                <Card key={subject.id} className="cursor-pointer hover:shadow-md transition-shadow">
                                    <CardContent className="p-6 flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-full bg-indigo-100">
                                                <FolderOpen onClick={() => {
                                                    DetailsStore.setCurrentSubject(subject);
                                                    navigate(`/classes?subjectId=${subject.id}`)
                                                }} className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-lg">{subject.name}</h3>
                                                <p className="text-sm text-gray-500">{subject.description}</p>
                                            </div>
                                        </div>
                                        <Button onClick={() => handleDeleteSubject(subject.id)} color="secondary">
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
                <Dialog open={showNewDialog} onClose={() => setShowNewDialog(false)}>
                    <DialogTitle>הוסף מקצוע חדש</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="שם מקצוע"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={newSubject.name}
                            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                            error={!newSubject.name.trim()}
                            helperText={!newSubject.name.trim() ? "שדה זה חובה" : ""}
                        />
                        <TextField
                            margin="dense"
                            label="תיאור"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={newSubject.description}
                            onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                            error={!newSubject.description.trim()}
                            helperText={!newSubject.description.trim() ? "שדה זה חובה" : ""}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setShowNewDialog(false)} color="primary">
                            ביטול
                        </Button>
                        <Button onClick={handleCreateSubject} color="primary">
                            הוסף
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
