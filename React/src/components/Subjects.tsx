// import React, { useState, useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import { Plus, FolderOpen, Trash2 } from "lucide-react";
// import axios from "axios";
// import { Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
// import { Subject } from "../types/subject";
// import DetailsStore from "../stores/DetailsStore";
// import fileStore from "../stores/fileStore";

// export default function SubjectsComponent() {
//     const [subjects, setSubjects] = useState<Subject[]>([]);
//     const [showNewDialog, setShowNewDialog] = useState(false);
//     const [newSubject, setNewSubject] = useState<Omit<Subject, 'id' | 'createdBy'>>({
//         name: "",
//         description: ""
//     });
//     const navigate = useNavigate();

//     useEffect(() => {
//         loadSubjects();
//         fetchFiles();
//     }, []);
    
//     const fetchFiles = async () => {
//         fileStore.setTeacherFiles();
//     };
//     //   const teacherEmailData = sessionStorage.getItem('teacher_email');
 

  

//     const loadSubjects = async () => {
//         try {
//             const teacherEmailData = sessionStorage.getItem('teacher_email  ');
//             const currentUserId = teacherEmailData ? JSON.parse(teacherEmailData).id : null;

//             const token = sessionStorage.getItem('token');
//             if (!token) {
//                 console.error("No access token found.");
//                 return;
//             }

//             const response = await axios.get('https://check-test-api.onrender.com/api/Subject', {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             console.log("Subjects response:", response.data);
//             const subjectsData = Array.isArray(response.data) ? response.data : [];
//             console.log("Subjects loaded:", subjectsData
//             );
//             setSubjects(subjectsData);
//         } catch (err: any) {
//             console.error("Error loading subjects:", err.response ? err.response.data : err.message);
//             setSubjects([]);
//         }
//     };


//     const handleCreateSubject = async () => {
//         const teacherEmailData = sessionStorage.getItem('teacher_email');
//         const currentUserId = teacherEmailData ? JSON.parse(teacherEmailData).id : null;

//         const newSubjectData = {
//             name: newSubject.name.trim(),
//             description: newSubject.description.trim(),
//             createdBy: currentUserId
//         };

//         if (!newSubjectData.name || !newSubjectData.description) {
//             console.error("Name and description are required.");
//             return;
//         }

//         try {
//             const token = sessionStorage.getItem('token');
//             if (!token) {
//                 console.error("No access token found.");
//                 return;
//             }

//             const createdSubject = await axios.post('https://check-test-api.onrender.com/api/Subject', newSubjectData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setSubjects(prevSubjects => [...prevSubjects, createdSubject.data]);
//             navigate(`/classes?subjectId=${createdSubject.data.id}`);
//         } catch (err: any) {
//             console.error("Error creating subject:", err.response ? err.response.data : err.message);
//         }

//         setShowNewDialog(false);
//         setNewSubject({ name: "", description: "" });
//     };

//     const handleDeleteSubject = async (subjectId: number) => {
//         const subjectToDelete = subjects.find(subject => subject.id === subjectId);
//         const teacherEmailData = sessionStorage.getItem('teacher_email');
//         const currentUserId = teacherEmailData ? JSON.parse(teacherEmailData).id : null;

//         if (subjectToDelete) {
//             try {
//                 const token = sessionStorage.getItem('token');
//                 if (!token) {
//                     console.error("No access token found.");
//                     return;
//                 }

//                 await axios.delete(`https://check-test-api.onrender.com/api/Subject/${subjectId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//                 setSubjects(prevSubjects => prevSubjects.filter(subject => subject.id !== subjectId));
//             } catch (err: any) {
//                 console.error("Error deleting subject:", err.response ? err.response.data : err.message);
//             }
//         } else {
//             console.error("Subject not found for ID:", subjectId);
//         }
//     };

//     return (
//         <>
//             <Outlet />
//             <div className="p-6">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="flex items-center justify-between mb-8">
//                         <h1 className="text-2xl font-bold">המקצועות שלי</h1>
//                         <button
//                             className="bg-blue-500 text-white px-4 py-2 rounded"
//                             onClick={() => setShowNewDialog(true)}
//                         >
//                             <Plus className="w-5 h-5 ml-2" />
//                             הוספת מקצוע
//                         </button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {subjects.length === 0 ? (
//                             <p>אין מקצועות זמינים.</p>
//                         ) : (
//                             subjects.map((subject: Subject) => (
//                                 <Card key={subject.id} className="cursor-pointer hover:shadow-md transition-shadow">
//                                     <CardContent className="p-6 flex justify-between items-center">
//                                         <div className="flex items-center gap-4">
//                                             <div className="p-3 rounded-full bg-indigo-100">
//                                                 <FolderOpen onClick={() => {
//                                                     DetailsStore.setCurrentSubject(subject);
//                                                     navigate(`/classes?subjectId=${subject.id}`)
//                                                 }} className="w-6 h-6 text-indigo-600" />
//                                             </div>
//                                             <div>
//                                                 <h3 className="font-medium text-lg">{subject.name}</h3>
//                                                 <p className="text-sm text-gray-500">{subject.description}</p>
//                                             </div>
//                                         </div>
//                                         <Button onClick={() => handleDeleteSubject(subject.id)} color="secondary">
//                                             <Trash2 className="w-5 h-5" />
//                                         </Button>
//                                     </CardContent>
//                                 </Card>
//                             ))
//                         )}
//                     </div>
//                 </div>
//                 <Dialog open={showNewDialog} onClose={() => setShowNewDialog(false)}>
//                     <DialogTitle>הוסף מקצוע חדש</DialogTitle>
//                     <DialogContent>
//                         <TextField
//                             autoFocus
//                             margin="dense"
//                             label="שם מקצוע"
//                             type="text"
//                             fullWidth
//                             variant="outlined"
//                             value={newSubject.name}
//                             onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
//                             error={!newSubject.name.trim()}
//                             helperText={!newSubject.name.trim() ? "שדה זה חובה" : ""}
//                         />
//                         <TextField
//                             margin="dense"
//                             label="תיאור"
//                             type="text"
//                             fullWidth
//                             variant="outlined"
//                             value={newSubject.description}
//                             onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
//                             error={!newSubject.description.trim()}
//                             helperText={!newSubject.description.trim() ? "שדה זה חובה" : ""}
//                         />
//                     </DialogContent>

//                     <DialogActions>
//                         <Button onClick={() => setShowNewDialog(false)} color="primary">
//                             ביטול
//                         </Button>
//                         <Button onClick={handleCreateSubject} color="primary">
//                             הוסף
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             </div>
//         </>
//     );
// }

import type React from "react"
import { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Fab,
  Grid,
  IconButton,
  Chip,
  Avatar,
  Fade,
  Zoom,
  useTheme,
  alpha,
} from "@mui/material"
import { Add, School, Delete, Edit, FolderOpen, TrendingUp, Group, Assignment } from "@mui/icons-material"
import axios from "axios"
import type { Subject } from "../types/subject"
import DetailsStore from "../stores/DetailsStore"
import fileStore from "../stores/fileStore"

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <Fade in={isVisible} timeout={800} style={{ transitionDelay: `${delay}ms` }}>
      <div>{children}</div>
    </Fade>
  )
}

export default function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null)
  const [newSubject, setNewSubject] = useState<Omit<Subject, "id" | "createdBy">>({
    name: "",
    description: "",
  })
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    loadSubjects()
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    fileStore.setTeacherFiles()
  }

  const loadSubjects = async () => {
    try {
      // const teacherEmailData = sessionStorage.getItem("teacher_email")
      // const currentUserId = teacherEmailData ? JSON.parse(teacherEmailData).id : null

      const token = sessionStorage.getItem("token")
      if (!token) {
        console.error("No access token found.")
        return
      }

      const response = await axios.get("https://check-test-api.onrender.com/api/Subject", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const subjectsData = Array.isArray(response.data) ? response.data : []
      setSubjects(subjectsData)
    } catch (err: any) {
      console.error("Error loading subjects:", err.response ? err.response.data : err.message)
      setSubjects([])
    }
  }

  const handleCreateSubject = async () => {
    const teacherEmailData = sessionStorage.getItem("teacher_email")
    const currentUserId = teacherEmailData ? JSON.parse(teacherEmailData).id : null

    const newSubjectData = {
      name: newSubject.name.trim(),
      description: newSubject.description.trim(),
      createdBy: currentUserId,
    }

    if (!newSubjectData.name || !newSubjectData.description) {
      console.error("Name and description are required.")
      return
    }

    try {
      const token = sessionStorage.getItem("token")
      if (!token) {
        console.error("No access token found.")
        return
      }

      const createdSubject = await axios.post("https://check-test-api.onrender.com/api/Subject", newSubjectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setSubjects((prevSubjects) => [...prevSubjects, createdSubject.data])
      navigate(`/app/classes?subjectId=${createdSubject.data.id}`)
    } catch (err: any) {
      console.error("Error creating subject:", err.response ? err.response.data : err.message)
    }

    setShowNewDialog(false)
    setNewSubject({ name: "", description: "" })
  }

  const handleDeleteSubject = async (subjectId: number) => {
    try {
      const token = sessionStorage.getItem("token")
      if (!token) {
        console.error("No access token found.")
        return
      }

      await axios.delete(`https://check-test-api.onrender.com/api/Subject/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.id !== subjectId))
    } catch (err: any) {
      console.error("Error deleting subject:", err.response ? err.response.data : err.message)
    }
  }

  const subjectIcons = [School, Assignment, Group]
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  ]

  return (
    <>
      <Outlet />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="xl" sx={{ py: 4, position: "relative", zIndex: 1 }}>
          {/* Header Section */}
          <FloatingElement>
            <Box
              sx={{
                textAlign: "center",
                mb: 6,
                background: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: "blur(20px)",
                borderRadius: "24px",
                padding: "40px",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  margin: "0 auto 24px",
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                }}
              >
                <School sx={{ fontSize: 40 }} />
              </Avatar>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                המקצועות שלי
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: alpha(theme.palette.text.primary, 0.7),
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                נהל את כל המקצועות שלך במקום אחד ומרכזי
              </Typography>

              {/* Stats */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 4,
                  mt: 4,
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  icon={<School />}
                  label={`${subjects.length} מקצועות`}
                  sx={{
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    color: "white",
                    fontWeight: 600,
                    px: 2,
                    py: 1,
                  }}
                />
                <Chip
                  icon={<TrendingUp />}
                  label="פעיל השבוע"
                  sx={{
                    background: "linear-gradient(45deg, #43e97b, #38f9d7)",
                    color: "white",
                    fontWeight: 600,
                    px: 2,
                    py: 1,
                  }}
                />
              </Box>
            </Box>
          </FloatingElement>

          {/* Subjects Grid */}
          <Grid container spacing={3}>
            {subjects.length === 0 ? (
              <Grid item xs={12}>
                <FloatingElement delay={200}>
                  <Card
                    sx={{
                      textAlign: "center",
                      py: 8,
                      background: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: "blur(20px)",
                      borderRadius: "24px",
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        margin: "0 auto 24px",
                        background: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    >
                      <School sx={{ fontSize: 50 }} />
                    </Avatar>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      אין מקצועות עדיין
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                      התחל ליצור את המקצוע הראשון שלך
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => setShowNewDialog(true)}
                      sx={{
                        background: "linear-gradient(45deg, #667eea, #764ba2)",
                        borderRadius: "12px",
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
                        },
                      }}
                    >
                      צור מקצוע ראשון
                    </Button>
                  </Card>
                </FloatingElement>
              </Grid>
            ) : (
              subjects.map((subject: Subject, index) => {
                const IconComponent = subjectIcons[index % subjectIcons.length]
                const gradient = gradients[index % gradients.length]

                return (
                  <Grid item xs={12} sm={6} md={4} key={subject.id}>
                    <FloatingElement delay={index * 100}>
                      <Card
                        sx={{
                          height: "100%",
                          background: alpha(theme.palette.background.paper, 0.8),
                          backdropFilter: "blur(20px)",
                          borderRadius: "24px",
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          position: "relative",
                          overflow: "hidden",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                            "& .subject-actions": {
                              opacity: 1,
                              transform: "translateY(0)",
                            },
                          },
                        }}
                      >
                        {/* Background Gradient */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "120px",
                            background: gradient,
                            opacity: 0.1,
                          }}
                        />

                        <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
                          {/* Header */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mb: 3,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 60,
                                height: 60,
                                background: gradient,
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                              }}
                            >
                              <IconComponent sx={{ fontSize: 30, color: "white" }} />
                            </Avatar>

                            {/* Action Buttons */}
                            <Box
                              className="subject-actions"
                              sx={{
                                display: "flex",
                                gap: 1,
                                opacity: 0,
                                transform: "translateY(10px)",
                                transition: "all 0.3s ease",
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setEditingSubject(subject)
                                  setNewSubject({ name: subject.name, description: subject.description })
                                  setShowNewDialog(true)
                                }}
                                sx={{
                                  background: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main,
                                  "&:hover": {
                                    background: alpha(theme.palette.primary.main, 0.2),
                                  },
                                }}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteSubject(subject.id)
                                }}
                                sx={{
                                  background: alpha(theme.palette.error.main, 0.1),
                                  color: theme.palette.error.main,
                                  "&:hover": {
                                    background: alpha(theme.palette.error.main, 0.2),
                                  },
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>

                          {/* Content */}
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              mb: 1,
                              color: theme.palette.text.primary,
                            }}
                          >
                            {subject.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: alpha(theme.palette.text.primary, 0.7),
                              mb: 3,
                              lineHeight: 1.6,
                            }}
                          >
                            {subject.description}
                          </Typography>

                          {/* Open Button */}
                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={<FolderOpen />}
                            onClick={() => {
                              DetailsStore.setCurrentSubject(subject)
                              navigate(`/app/classes?subjectId=${subject.id}`)
                            }}
                            sx={{
                              background: gradient,
                              borderRadius: "12px",
                              py: 1.5,
                              fontWeight: 600,
                              boxShadow: "none",
                              "&:hover": {
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                            פתח מקצוע
                          </Button>
                        </CardContent>
                      </Card>
                    </FloatingElement>
                  </Grid>
                )
              })
            )}
          </Grid>

          {/* Floating Action Button */}
          <Zoom in={subjects.length > 0}>
            <Fab
              color="primary"
              onClick={() => setShowNewDialog(true)}
              sx={{
                position: "fixed",
                bottom: 32,
                right: 32,
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
                },
              }}
            >
              <Add />
            </Fab>
          </Zoom>

          {/* Create/Edit Dialog */}
          <Dialog
            open={showNewDialog}
            onClose={() => {
              setShowNewDialog(false)
              setEditingSubject(null)
              setNewSubject({ name: "", description: "" })
            }}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: "24px",
                background: alpha(theme.palette.background.paper, 0.95),
                backdropFilter: "blur(20px)",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <DialogTitle
              sx={{
                textAlign: "center",
                pb: 1,
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
                fontSize: "1.5rem",
              }}
            >
              {editingSubject ? "עריכת מקצוע" : "הוספת מקצוע חדש"}
            </DialogTitle>

            <DialogContent sx={{ pt: 3 }}>
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
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&.Mui-focused fieldset": {
                      borderColor: "#667eea",
                    },
                  },
                }}
              />
              <TextField
                margin="dense"
                label="תיאור"
                type="text"
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={newSubject.description}
                onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                error={!newSubject.description.trim()}
                helperText={!newSubject.description.trim() ? "שדה זה חובה" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&.Mui-focused fieldset": {
                      borderColor: "#667eea",
                    },
                  },
                }}
              />
            </DialogContent>

            <DialogActions sx={{ p: 3, gap: 2 }}>
              <Button
                onClick={() => {
                  setShowNewDialog(false)
                  setEditingSubject(null)
                  setNewSubject({ name: "", description: "" })
                }}
                sx={{
                  borderRadius: "12px",
                  px: 3,
                  py: 1,
                }}
              >
                ביטול
              </Button>
              <Button
                onClick={handleCreateSubject}
                variant="contained"
                sx={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  borderRadius: "12px",
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                  "&:hover": {
                    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
                  },
                }}
              >
                {editingSubject ? "עדכן" : "הוסף"}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  )
}
export function filter(_: { teacher_email: any }) {
  throw new Error("Function not implemented.")
}

