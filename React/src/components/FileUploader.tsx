// // export default FileUploader;
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { Box, Button, Typography, LinearProgress } from '@mui/material';
// // import DetailsStore from '../stores/DetailsStore';

// // const FileUploader = () => {
// //   const [files, setFiles] = useState<File[]>([]);
// //   const [progressMap, setProgressMap] = useState<{ [key: string]: number }>({});

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files) {
// //       setFiles(Array.from(e.target.files));
// //     }
// //   };

// //   const handleUpload = async () => {
// //     const token = sessionStorage.getItem('token');
// //     const teacherEmailData = sessionStorage.getItem('teacher_email');
// //     const currentUserId = teacherEmailData ? JSON.parse(teacherEmailData).id : null;

// //     if (!token || !currentUserId) {
// //       alert('חסרים פרטי התחברות');
// //       return;
// //     }

// //     for (const file of files) {
// //       try {
// //         // שלב 1: קבלת Presigned URL
// //         const response = await axios.get(`https://check-test-api.onrender.com/api/upload/presigned-url`, {
// //           params: { fileName: file.name, contentType: file.type }
// //         });

// //         const presignedUrl = response.data.url;

// //         // שלב 2: העלאה ל-AWS
// //         await axios.put(presignedUrl, file, {
// //           headers: {
// //             'Content-Type': file.type,
// //           },
// //           onUploadProgress: (progressEvent) => {
// //             const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
// //             setProgressMap(prev => ({ ...prev, [file.name]: percent }));
// //           },
// //         });

// //         // שלב 3: שמירה במסד הנתונים
// //         const newFile = {
// //           userId: currentUserId,
// //           subjectId: DetailsStore.currentSubject.id,
// //           classId: DetailsStore.currentClass.id,
// //           fileName: file.name,
// //           filePath: presignedUrl.split('?')[0],
// //           fileSize: file.size,
// //           description: 'קובץ שהועלה מתוך תיקיה',
// //           createdDate: new Date(),
// //           content: ''
// //         };

// //         await axios.post('https://check-test-api.onrender.com/api/File', newFile, {
// //           headers: { Authorization: `Bearer ${token}` }
// //         });

// //       } catch (error) {
// //         console.error(`שגיאה בהעלאת הקובץ ${file.name}:`, error);
// //         alert(`אירעה שגיאה בהעלאת הקובץ: ${file.name}`);
// //       }
// //     }

// //     alert('כל הקבצים הועלו בהצלחה!');
// //     setFiles([]);
// //     setProgressMap({});
// //   };

// //   return (
// //     <Box sx={{ width: '100%', padding: 2, borderRadius: 2, boxShadow: 3, bgcolor: '#f5f5f5' }}>
// //       <Typography variant="h6" gutterBottom>
// //         בחר תיקייה להעלאה
// //       </Typography>
// //       <input
// //         type="file"
// //         onChange={handleFileChange}
// //         multiple
// //         //@ts-ignore - כדי לאפשר תיקייה
// //         webkitdirectory="true"
// //         style={{ display: 'none' }}
// //         id="folder-upload"
// //       />
// //       <label htmlFor="folder-upload">
// //         <Button
// //           variant="contained"
// //           component="span"
// //           sx={{
// //             bgcolor: 'rgb(27, 187, 150)',
// //             '&:hover': { bgcolor: 'rgba(27, 187, 150,0.7)' },
// //             color: 'white',
// //             borderRadius: '8px',
// //             padding: '10px 20px',
// //           }}
// //         >
// //           בחר תיקייה
// //         </Button>
// //       </label>

// //       <Button
// //         variant="contained"
// //         onClick={handleUpload}
// //         disabled={files.length === 0}
// //         sx={{ marginLeft: '10px', bgcolor: '#4CAF50', '&:hover': { bgcolor: '#388E3C' } }}
// //       >
// //         העלה קבצים
// //       </Button>

// //       {files.map((file) => (
// //         <Box key={file.name} sx={{ mt: 2 }}>
// //           <Typography variant="body2">{file.name}</Typography>
// //           <LinearProgress variant="determinate" value={progressMap[file.name] || 0} />
// //         </Box>
// //       ))}
// //     </Box>
// //   );
// // };

// // export default FileUploader;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Box, Button, Typography, LinearProgress } from '@mui/material';
// import DetailsStore from '../stores/DetailsStore';

// const FileUploader = () => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [progressMap, setProgressMap] = useState<{ [key: string]: number }>({});

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles(prev => [...prev, ...Array.from(e.target.files)]);
//     }
//   };

//   const handleUpload = async () => {
//     const token = sessionStorage.getItem('token');
//     const teacherEmailData = sessionStorage.getItem('teacher_email');
//     const currentUserId = teacherEmailData ? JSON.parse(teacherEmailData).id : null;

//     if (!token || !currentUserId) {
//       alert('חסרים פרטי התחברות');
//       return;
//     }

//     for (const file of files) {
//       try {
//         console.log(file)
//         const response = await axios.get(`https://check-test-api.onrender.com/api/upload/presigned-url`, {
//           params: { fileName: file.name, contentType: file.type }
//         });
//         console.log(response)

//         const presignedUrl = response.data.url;
//         console.log(presignedUrl)
//         console.log(file)
//         await axios.put(presignedUrl, file, {
//           headers: { 'Content-Type': file.type },
//           onUploadProgress: (progressEvent) => {
//             const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
//             setProgressMap(prev => ({ ...prev, [file.name]: percent }));
//           },
//         });
//         console.log(currentUserId, DetailsStore.currentSubject.id, DetailsStore.currentClass.id, file.name, presignedUrl.split('?')[0], file.size);
//         const newFile = {
//           userId: currentUserId,
//           subjectId: DetailsStore.currentSubject.id,
//           classId: DetailsStore.currentClass.id,
//           fileName: file.name,
//           filePath: presignedUrl.split('?')[0],
//           fileSize: file.size,
//           description: 'קובץ שהועלה מתוך תיקיה או קובץ בודד',
//           createdDate: new Date(),
//           content: ''
//         };
//         console.log(newFile)
//         console.log(token)
//         await axios.post('https://check-test-api.onrender.com/api/File', newFile, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//       } catch (err: any) {
//         console.error(`שגיאה בהעלאת הקובץ ${file.name}:`, err);
//         alert(`אירעה שגיאה בהעלאת הקובץ: ${err}`);
//       }
//     }

//     alert('כל הקבצים הועלו בהצלחה!');
//     setFiles([]);
//     setProgressMap({});
//   };

//   return (
//     <Box sx={{ width: '100%', padding: 2, borderRadius: 2, boxShadow: 3, bgcolor: '#f5f5f5' }}>
//       <Typography variant="h6" gutterBottom>
//         בחר תיקייה או קובץ להעלאה
//       </Typography>

//       {/* Folder input */}
//       <input
//         type="file"
//         onChange={handleFileChange}
//         multiple
//         //@ts-ignore
//         webkitdirectory="true"
//         style={{ display: 'none' }}
//         id="folder-upload"
//       />
//       <label htmlFor="folder-upload">
//         <Button
//           variant="contained"
//           component="span"
//           sx={{
//             bgcolor: 'rgb(27, 187, 150)',
//             '&:hover': { bgcolor: 'rgba(27, 187, 150,0.7)' },
//             color: 'white',
//             borderRadius: '8px',
//             padding: '10px 20px',
//             marginRight: 1
//           }}
//         >
//           בחר תיקייה
//         </Button>
//       </label>

//       {/* Single file input */}
//       <input
//         type="file"
//         onChange={handleFileChange}
//         style={{ display: 'none' }}
//         id="single-file-upload"
//       />
//       <label htmlFor="single-file-upload">
//         <Button
//           variant="contained"
//           component="span"
//           sx={{
//             bgcolor: '#2196F3',
//             '&:hover': { bgcolor: '#1976D2' },
//             color: 'white',
//             borderRadius: '8px',
//             padding: '10px 20px',
//           }}
//         >
//           בחר קובץ
//         </Button>
//       </label>

//       <Button
//         variant="contained"
//         onClick={handleUpload}
//         disabled={files.length === 0}
//         sx={{ marginLeft: '10px', bgcolor: '#4CAF50', '&:hover': { bgcolor: '#388E3C' } }}
//       >
//         העלה קבצים
//       </Button>

//       {files.map((file) => (
//         <Box key={file.name} sx={{ mt: 2 }}>
//           <Typography variant="body2">{file.name}</Typography>
//           <LinearProgress variant="determinate" value={progressMap[file.name] || 0} />
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default FileUploader;

import { useEffect } from "react"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Avatar,
  Chip,
  Fade,
  useTheme,
  alpha,
  IconButton,
} from "@mui/material"
import { CloudUpload, Folder, InsertDriveFile, CheckCircle, Delete, Upload } from "@mui/icons-material"
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

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([])
  const [progressMap, setProgressMap] = useState<{ [key: string]: number }>({})
  const [uploadComplete, setUploadComplete] = useState<{ [key: string]: boolean }>({})
  const theme = useTheme()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (fileList) {
      setFiles((prev) => [...prev, ...Array.from(fileList)])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    const token = sessionStorage.getItem("token")
    const teacherEmailData = sessionStorage.getItem("teacher_email")
    const currentUserId = teacherEmailData ? JSON.parse(teacherEmailData).id : null

    if (!token || !currentUserId) {
      alert("חסרים פרטי התחברות")
      return
    }

    for (const file of files) {
      try {
        const response = await axios.get(`https://check-test-api.onrender.com/api/upload/presigned-url`, {
          params: { fileName: file.name, contentType: file.type },
        })

        const presignedUrl = response.data.url

        await axios.put(presignedUrl, file, {
          headers: { "Content-Type": file.type },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
            setProgressMap((prev) => ({ ...prev, [file.name]: percent }))
          },
        })

        const newFile = {
          userId: currentUserId,
          subjectId: DetailsStore.currentSubject.id,
          classId: DetailsStore.currentClass.id,
          fileName: file.name,
          filePath: presignedUrl.split("?")[0],
          fileSize: file.size,
          description: "קובץ שהועלה מתוך תיקיה או קובץ בודד",
          createdDate: new Date(),
          content: "",
        }

        await axios.post("https://check-test-api.onrender.com/api/File", newFile, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setUploadComplete((prev) => ({ ...prev, [file.name]: true }))
      } catch (err: any) {
        console.error(`שגיאה בהעלאת הקובץ ${file.name}:`, err)
        alert(`אירעה שגיאה בהעלאת הקובץ: ${err}`)
      }
    }

    setTimeout(() => {
      setFiles([])
      setProgressMap({})
      setUploadComplete({})
    }, 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <FloatingElement>
      <Card
        sx={{
          background: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            color: "white",
            p: 3,
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              width: 60,
              height: 60,
              margin: "0 auto 16px",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CloudUpload sx={{ fontSize: 30 }} />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            העלאת קבצים
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            בחר תיקייה או קבצים בודדים להעלאה
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* Upload Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 4,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {/* Folder Upload */}
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              //@ts-ignore
              webkitdirectory="true"
              style={{ display: "none" }}
              id="folder-upload"
            />
            <label htmlFor="folder-upload" style={{ flex: 1 }}>
              <Button
                component="span"
                variant="contained"
                fullWidth
                startIcon={<Folder />}
                sx={{
                  background: "linear-gradient(45deg, #43e97b, #38f9d7)",
                  borderRadius: "12px",
                  py: 1.5,
                  fontWeight: 600,
                  boxShadow: "0 4px 20px rgba(67, 233, 123, 0.3)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 32px rgba(67, 233, 123, 0.4)",
                  },
                }}
              >
                בחר תיקייה
              </Button>
            </label>

            {/* Single File Upload */}
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              style={{ display: "none" }}
              id="single-file-upload"
            />
            <label htmlFor="single-file-upload" style={{ flex: 1 }}>
              <Button
                component="span"
                variant="contained"
                fullWidth
                startIcon={<InsertDriveFile />}
                sx={{
                  background: "linear-gradient(45deg, #4facfe, #00f2fe)",
                  borderRadius: "12px",
                  py: 1.5,
                  fontWeight: 600,
                  boxShadow: "0 4px 20px rgba(79, 172, 254, 0.3)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 32px rgba(79, 172, 254, 0.4)",
                  },
                }}
              >
                בחר קבצים
              </Button>
            </label>
          </Box>

          {/* Files List */}
          {files.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                קבצים נבחרים ({files.length})
              </Typography>

              <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
                {files.map((file, index) => (
                  <Card
                    key={index}
                    sx={{
                      mb: 2,
                      background: alpha(theme.palette.background.default, 0.5),
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      borderRadius: "12px",
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              background: "linear-gradient(45deg, #667eea, #764ba2)",
                            }}
                          >
                            <InsertDriveFile />
                          </Avatar>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {file.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatFileSize(file.size)}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          {uploadComplete[file.name] && (
                            <Chip icon={<CheckCircle />} label="הועלה" color="success" size="small" />
                          )}
                          <IconButton size="small" onClick={() => removeFile(index)} sx={{ color: "error.main" }}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Progress Bar */}
                      {progressMap[file.name] !== undefined && (
                        <Box sx={{ mt: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={progressMap[file.name] || 0}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              "& .MuiLinearProgress-bar": {
                                background: uploadComplete[file.name]
                                  ? "linear-gradient(45deg, #43e97b, #38f9d7)"
                                  : "linear-gradient(45deg, #667eea, #764ba2)",
                                borderRadius: 3,
                              },
                            }}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                            {uploadComplete[file.name] ? "הועלה בהצלחה!" : `${progressMap[file.name] || 0}%`}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          )}

          {/* Upload Button */}
          {files.length > 0 && (
            <Button
              variant="contained"
              fullWidth
              startIcon={<Upload />}
              onClick={handleUpload}
              disabled={Object.keys(progressMap).length > 0}
              sx={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                borderRadius: "12px",
                py: 1.5,
                fontWeight: 600,
                fontSize: "1.1rem",
                boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
                },
                "&:disabled": {
                  background: alpha(theme.palette.action.disabled, 0.3),
                },
              }}
            >
              {Object.keys(progressMap).length > 0 ? "מעלה קבצים..." : `העלה ${files.length} קבצים`}
            </Button>
          )}
        </CardContent>
      </Card>
    </FloatingElement>
  )
}

export default FileUploader
export function filter(_: { teacher_email: any }) {
  throw new Error("Function not implemented.")
}

