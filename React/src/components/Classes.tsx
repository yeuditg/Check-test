
// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Card } from "./CardProps";
// import { Button } from "./Button";
// import axios from "axios";
// import { CardContent, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
// import { FolderOpen, Trash2 } from "lucide-react";
// import { Class } from "../types/class";
// import DetailsStore from "../stores/DetailsStore";


// export default function Classes() {
//     const [classes, setClasses] = useState<Class[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [showNewDialog, setShowNewDialog] = useState(false);
//     const [newClassName, setNewClassName] = useState("");
//     const [showUpdateDialog, setShowUpdateDialog] = useState(false);
//     const [updateClassName, setUpdateClassName] = useState("");
//     const [classToUpdate, setClassToUpdate] = useState<Class | null>(null);
//     const location = useLocation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const queryParams = new URLSearchParams(location.search);
//         const subjectId = queryParams.get("subjectId");
//         loadClasses(subjectId);
//     }, [location]);

//     const loadClasses = async (subjectId: string | null) => {
//         if (!subjectId) {
//             setError("מזהה מקצוע חסר");
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.get(`https://check-test-api.onrender.com/api/Subject/${subjectId}/classes`);
//             const classesData: Class[] = Array.isArray(response.data) ? response.data : [];
//             setClasses(classesData);
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response?.status === 404) {
//                 setError("אין כיתות כרגע");
//                 setClasses([]);
//             } else {
//                 console.error("Error loading classes:", error);
//                 setError("שגיאה בטעינת נתוני הכיתות");
//             }
//         }
//         setLoading(false);
//     };

//     const handleAddClass = async () => {
//         const subjectId = new URLSearchParams(location.search).get("subjectId");
//         if (!subjectId || !newClassName.trim()) {
//             console.error("מזהה מקצוע או שם כיתה חסרים");
//             return;
//         }

//         try {
//             const response = await axios.post(`https://check-test-api.onrender.com/api/Subject/${subjectId}/classes`, { name: newClassName });
//             setClasses(prevClasses => [...prevClasses, { id: response.data.id, name: newClassName }]);
//             setNewClassName("");
//             setShowNewDialog(false);
//         } catch (error) {
//             console.error("Error adding class:", error);
//             setError("שגיאה בהוספת הכיתה");
//         }
//     };

//     const handleDeleteClass = async (classId: string) => {
//         try {
//             await axios.delete(`https://check-test-api.onrender.com/api/Class/${classId}`);
//             setClasses(prevClasses => prevClasses.filter(c => c.id !== classId));
//         } catch (error) {
//             console.error("Error deleting class:", error);
//             setError("שגיאה במחיקת הכיתה");
//         }
//     };

//     const handleUpdateClass = async () => {
//         if (!classToUpdate || !updateClassName.trim()) {
//             console.error("מזהה כיתה או שם כיתה חסרים");
//             return;
//         }

//         try {
//             const updatedClass = { ...classToUpdate, name: updateClassName };
//             await axios.put(`https://check-test-api.onrender.com/api/Class/${classToUpdate.id}`, updatedClass);
//             setClasses(prevClasses => prevClasses.map(c => (c.id === classToUpdate.id ? updatedClass : c)));
//             setUpdateClassName("");
//             setShowUpdateDialog(false);
//         } catch (error) {
//             console.error("Error updating class:", error);
//             setError("שגיאה בעדכון הכיתה");
//         }
//     };

//     // const handleClassClick = (classId: string) => {
//     //     navigate(`/exams?classId=${classId}`);
//     // };

//     if (loading) {
//         return <div>טוען נתוני כיתות...</div>;
//     }

//     if (error) {
//         return (
//             <div>
//                 <h2>{error}</h2>
//                 {error === "אין כיתות כרגע" && (
//                     <Button onClick={() => setShowNewDialog(true)}>הוסף כיתה</Button>
//                 )}
//             </div>
//         );
//     }

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold">הכיתות של המקצוע</h1>
//             <Button onClick={() => setShowNewDialog(true)} color="primary">
//                         הוסף כיתה
//                     </Button>
//             {classes.length === 0 ? (
//                 <div>
//                     <h2>אין כיתות כרגע</h2>
                    
//                 </div>

//             ) : (

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {classes.map((classItem) => (
//                         <Card key={classItem.id} className="cursor-pointer hover:shadow-md transition-shadow">
//                             <CardContent className="p-6">
//                                 <h3 className="font-medium text-lg">{classItem.name}</h3>
//                             </CardContent>
//                             <Button onClick={() => {
//                                 setClassToUpdate(classItem);
//                                 setUpdateClassName(classItem.name);
//                                 setShowUpdateDialog(true);
//                             }} color="primary">
//                                 ערוך
//                             </Button>
//                             <Button onClick={() => handleDeleteClass(classItem.id)} color="secondary">
//                                 <Trash2 className="w-5 h-5" />
//                             </Button>
//                             <Button onClick={() => 
//                                 {DetailsStore.setCurrentClass(classItem);
//                                      navigate('/studentsExams')} }color="default">
//                                 <FolderOpen className="w-5 h-5" />
//                             </Button>
//                         </Card>
//                     ))}
//                 </div>
//             )}
//             {/* Dialogs for adding and updating classes */}
//             <Dialog open={showNewDialog} onClose={() => setShowNewDialog(false)}>
//                 <DialogTitle>הוסף כיתה חדשה</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="שם כיתה"
//                         type="text"
//                         fullWidth
//                         variant="outlined"
//                         value={newClassName}
//                         onChange={(e) => setNewClassName(e.target.value)}
//                         error={!newClassName.trim()}
//                         helperText={!newClassName.trim() ? "שדה זה חובה" : ""}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setShowNewDialog(false)} color="primary">
//                         ביטול
//                     </Button>
//                     <Button onClick={handleAddClass} color="primary">
//                         הוסף
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog open={showUpdateDialog} onClose={() => setShowUpdateDialog(false)}>
//                 <DialogTitle>עדכן כיתה</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="שם כיתה"
//                         type="text"
//                         fullWidth
//                         variant="outlined"
//                         value={updateClassName}
//                         onChange={(e) => setUpdateClassName(e.target.value)}
//                         error={!updateClassName.trim()}
//                         helperText={!updateClassName.trim() ? "שדה זה חובה" : ""}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setShowUpdateDialog(false)} color="primary">
//                         ביטול
//                     </Button>
//                     <Button onClick={handleUpdateClass} color="primary">
//                         עדכן
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }

import type React from "react"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
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
  Grid,
  IconButton,
  Chip,
  Avatar,
  Fade,
  Zoom,
  useTheme,
  alpha,
  Fab,
} from "@mui/material"
import { Add, Class, Delete, Edit, FolderOpen, Groups, Assignment, TrendingUp, School } from "@mui/icons-material"
import axios from "axios"
import type { Class as ClassType } from "../types/class"
import DetailsStore from "../stores/DetailsStore"

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

export default function Classes() {
  const [classes, setClasses] = useState<ClassType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [_, setError] = useState<string | null>(null)
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [newClassName, setNewClassName] = useState("")
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [updateClassName, setUpdateClassName] = useState("")
  const [classToUpdate, setClassToUpdate] = useState<ClassType | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const subjectId = queryParams.get("subjectId")
    loadClasses(subjectId)
  }, [location])

  const loadClasses = async (subjectId: string | null) => {
    if (!subjectId) {
      setError("מזהה מקצוע חסר")
      setLoading(false)
      return
    }

    try {
      const response = await axios.get(`https://check-test-api.onrender.com/api/Subject/${subjectId}/classes`)
      const classesData: ClassType[] = Array.isArray(response.data) ? response.data : []
      setClasses(classesData)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setError("אין כיתות כרגע")
        setClasses([])
      } else {
        console.error("Error loading classes:", error)
        setError("שגיאה בטעינת נתוני הכיתות")
      }
    }
    setLoading(false)
  }

  const handleAddClass = async () => {
    const subjectId = new URLSearchParams(location.search).get("subjectId")
    if (!subjectId || !newClassName.trim()) {
      console.error("מזהה מקצוע או שם כיתה חסרים")
      return
    }

    try {
      const response = await axios.post(`https://check-test-api.onrender.com/api/Subject/${subjectId}/classes`, {
        name: newClassName,
      })
      setClasses((prevClasses) => [...prevClasses, { id: response.data.id, name: newClassName }])
      setNewClassName("")
      setShowNewDialog(false)
    } catch (error) {
      console.error("Error adding class:", error)
      setError("שגיאה בהוספת הכיתה")
    }
  }

  const handleDeleteClass = async (classId: string) => {
    try {
      await axios.delete(`https://check-test-api.onrender.com/api/Class/${classId}`)
      setClasses((prevClasses) => prevClasses.filter((c) => String(c.id) !== classId))
    } catch (error) {
      console.error("Error deleting class:", error)
      setError("שגיאה במחיקת הכיתה")
    }
  }

  const handleUpdateClass = async () => {
    if (!classToUpdate || !updateClassName.trim()) {
      console.error("מזהה כיתה או שם כיתה חסרים")
      return
    }

    try {
      const updatedClass = { ...classToUpdate, name: updateClassName }
      await axios.put(`https://check-test-api.onrender.com/api/Class/${classToUpdate.id}`, updatedClass)
      setClasses((prevClasses) => prevClasses.map((c) => (c.id === classToUpdate.id ? updatedClass : c)))
      setUpdateClassName("")
      setShowUpdateDialog(false)
    } catch (error) {
      console.error("Error updating class:", error)
      setError("שגיאה בעדכון הכיתה")
    }
  }

  const classIcons = [Groups, Class, Assignment, School]
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  ]

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Typography variant="h6">טוען נתוני כיתות...</Typography>
      </Box>
    )
  }

  return (
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
              <Groups sx={{ fontSize: 40 }} />
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
              הכיתות של המקצוע
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: alpha(theme.palette.text.primary, 0.7),
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              {DetailsStore.currentSubject?.name && `מקצוע: ${DetailsStore.currentSubject.name}`}
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
                icon={<Groups />}
                label={`${classes.length} כיתות`}
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

        {/* Classes Grid */}
        <Grid container spacing={3}>
          {classes.length === 0 ? (
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
                    <Groups sx={{ fontSize: 50 }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    אין כיתות עדיין
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    התחל ליצור את הכיתה הראשונה שלך
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
                    צור כיתה ראשונה
                  </Button>
                </Card>
              </FloatingElement>
            </Grid>
          ) : (
            classes.map((classItem: ClassType, index) => {
              const IconComponent = classIcons[index % classIcons.length]
              const gradient = gradients[index % gradients.length]

              return (
                <Grid item xs={12} sm={6} md={4} key={classItem.id}>
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
                          "& .class-actions": {
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
                            className="class-actions"
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
                                setClassToUpdate(classItem)
                                setUpdateClassName(classItem.name)
                                setShowUpdateDialog(true)
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
                                handleDeleteClass(String(classItem.id))
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
                          {classItem.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: alpha(theme.palette.text.primary, 0.7),
                            mb: 3,
                            lineHeight: 1.6,
                          }}
                        >
                          כיתה פעילה במקצוע
                        </Typography>

                        {/* Open Button */}
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<FolderOpen />}
                          onClick={() => {
                            DetailsStore.setCurrentClass(classItem)
                            navigate("/app/exams")
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
                          פתח כיתה
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
        <Zoom in={true}>
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

        {/* Add Dialog */}
        <Dialog
          open={showNewDialog}
          onClose={() => setShowNewDialog(false)}
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
            הוספת כיתה חדשה
          </DialogTitle>

          <DialogContent sx={{ pt: 3 }}>
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
              onClick={() => setShowNewDialog(false)}
              sx={{
                borderRadius: "12px",
                px: 3,
                py: 1,
              }}
            >
              ביטול
            </Button>
            <Button
              onClick={handleAddClass}
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
              הוסף
            </Button>
          </DialogActions>
        </Dialog>

        {/* Update Dialog */}
        <Dialog
          open={showUpdateDialog}
          onClose={() => setShowUpdateDialog(false)}
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
            עדכון כיתה
          </DialogTitle>

          <DialogContent sx={{ pt: 3 }}>
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
              onClick={() => setShowUpdateDialog(false)}
              sx={{
                borderRadius: "12px",
                px: 3,
                py: 1,
              }}
            >
              ביטול
            </Button>
            <Button
              onClick={handleUpdateClass}
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
              עדכן
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}
