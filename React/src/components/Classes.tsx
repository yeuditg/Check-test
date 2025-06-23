
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "./CardProps";
import { Button } from "./Button";
import axios from "axios";
import { CardContent, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { FolderOpen, Trash2 } from "lucide-react";
import { Class } from "../types/class";
import DetailsStore from "../stores/DetailsStore";


export default function Classes() {
    const [classes, setClasses] = useState<Class[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showNewDialog, setShowNewDialog] = useState(false);
    const [newClassName, setNewClassName] = useState("");
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [updateClassName, setUpdateClassName] = useState("");
    const [classToUpdate, setClassToUpdate] = useState<Class | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const subjectId = queryParams.get("subjectId");
        loadClasses(subjectId);
    }, [location]);

    const loadClasses = async (subjectId: string | null) => {
        if (!subjectId) {
            setError("מזהה מקצוע חסר");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`https://localhost:7213/api/Subject/${subjectId}/classes`);
            const classesData: Class[] = Array.isArray(response.data) ? response.data : [];
            setClasses(classesData);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setError("אין כיתות כרגע");
                setClasses([]);
            } else {
                console.error("Error loading classes:", error);
                setError("שגיאה בטעינת נתוני הכיתות");
            }
        }
        setLoading(false);
    };

    const handleAddClass = async () => {
        const subjectId = new URLSearchParams(location.search).get("subjectId");
        if (!subjectId || !newClassName.trim()) {
            console.error("מזהה מקצוע או שם כיתה חסרים");
            return;
        }

        try {
            const response = await axios.post(`https://localhost:7213/api/Subject/${subjectId}/classes`, { name: newClassName });
            setClasses(prevClasses => [...prevClasses, { id: response.data.id, name: newClassName }]);
            setNewClassName("");
            setShowNewDialog(false);
        } catch (error) {
            console.error("Error adding class:", error);
            setError("שגיאה בהוספת הכיתה");
        }
    };

    const handleDeleteClass = async (classId: string) => {
        try {
            await axios.delete(`https://localhost:7213/api/Class/${classId}`);
            setClasses(prevClasses => prevClasses.filter(c => c.id !== classId));
        } catch (error) {
            console.error("Error deleting class:", error);
            setError("שגיאה במחיקת הכיתה");
        }
    };

    const handleUpdateClass = async () => {
        if (!classToUpdate || !updateClassName.trim()) {
            console.error("מזהה כיתה או שם כיתה חסרים");
            return;
        }

        try {
            const updatedClass = { ...classToUpdate, name: updateClassName };
            await axios.put(`https://localhost:7213/api/Class/${classToUpdate.id}`, updatedClass);
            setClasses(prevClasses => prevClasses.map(c => (c.id === classToUpdate.id ? updatedClass : c)));
            setUpdateClassName("");
            setShowUpdateDialog(false);
        } catch (error) {
            console.error("Error updating class:", error);
            setError("שגיאה בעדכון הכיתה");
        }
    };

    // const handleClassClick = (classId: string) => {
    //     navigate(`/exams?classId=${classId}`);
    // };

    if (loading) {
        return <div>טוען נתוני כיתות...</div>;
    }

    if (error) {
        return (
            <div>
                <h2>{error}</h2>
                {error === "אין כיתות כרגע" && (
                    <Button onClick={() => setShowNewDialog(true)}>הוסף כיתה</Button>
                )}
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">הכיתות של המקצוע</h1>
            <Button onClick={() => setShowNewDialog(true)} color="primary">
                        הוסף כיתה
                    </Button>
            {classes.length === 0 ? (
                <div>
                    <h2>אין כיתות כרגע</h2>
                    
                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((classItem) => (
                        <Card key={classItem.id} className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <h3 className="font-medium text-lg">{classItem.name}</h3>
                            </CardContent>
                            <Button onClick={() => {
                                setClassToUpdate(classItem);
                                setUpdateClassName(classItem.name);
                                setShowUpdateDialog(true);
                            }} color="primary">
                                ערוך
                            </Button>
                            <Button onClick={() => handleDeleteClass(classItem.id)} color="secondary">
                                <Trash2 className="w-5 h-5" />
                            </Button>
                            <Button onClick={() => 
                                {DetailsStore.setCurrentClass(classItem);
                                     navigate('/studentsExams')} }color="default">
                                <FolderOpen className="w-5 h-5" />
                            </Button>
                        </Card>
                    ))}
                </div>
            )}
            {/* Dialogs for adding and updating classes */}
            <Dialog open={showNewDialog} onClose={() => setShowNewDialog(false)}>
                <DialogTitle>הוסף כיתה חדשה</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="שם כיתה"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value)}
                        error={!newClassName.trim()}
                        helperText={!newClassName.trim() ? "שדה זה חובה" : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowNewDialog(false)} color="primary">
                        ביטול
                    </Button>
                    <Button onClick={handleAddClass} color="primary">
                        הוסף
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={showUpdateDialog} onClose={() => setShowUpdateDialog(false)}>
                <DialogTitle>עדכן כיתה</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="שם כיתה"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={updateClassName}
                        onChange={(e) => setUpdateClassName(e.target.value)}
                        error={!updateClassName.trim()}
                        helperText={!updateClassName.trim() ? "שדה זה חובה" : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowUpdateDialog(false)} color="primary">
                        ביטול
                    </Button>
                    <Button onClick={handleUpdateClass} color="primary">
                        עדכן
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}