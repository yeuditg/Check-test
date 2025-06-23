// // // import { useState, useEffect } from 'react';
// // // import {
// // //   Box,
// // //   Container,
// // //   Card,
// // //   CardContent,
// // //   Typography,
// // //   TextField,
// // //   Select,
// // //   MenuItem,
// // //   FormControl,
// // //   InputLabel,
// // //   IconButton,
// // //   ToggleButton,
// // //   ToggleButtonGroup,
// // //   InputAdornment,
// // //   CircularProgress, Button, Avatar, Divider
// // // } from '@mui/material';
// // // import {
// // //   Description as FileText,
// // //   Download,
// // //   CalendarToday as Calendar,
// // //   Person as User,
// // //   MenuBook as BookOpen,
// // //   Group as Users,
// // //   Search,
// // //   GridView as Grid,
// // //   ViewList as ListIcon,
// // //   Refresh as RefreshCw
// // // } from '@mui/icons-material';
// // // import { MyFile } from '../types/myFile';
// // // import axios from 'axios';
// // // import FileUploader from './FileUploader';
// // // import fileStore from '../stores/fileStore';
// // // import DetailsStore from '../stores/DetailsStore';


// // // const ClassExamsPage = () => {
// // //   const [files, setFiles] = useState<MyFile[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [viewMode, setViewMode] = useState('grid');
// // //   const [sortBy, setSortBy] = useState('createdDate');
// // //   const [selectedFile, setSelectedFile] = useState<MyFile | null>(null);

// // //   const exportToExcel = (students: any[], fileName: string) => {
// // //     const worksheet = XLSX.utils.json_to_sheet(students);
// // //     const workbook = XLSX.utils.book_new();
// // //     XLSX.utils.book_append_sheet(workbook, worksheet, "Marks");
// // //     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
// // //     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
// // //     saveAs(data, `${fileName}.xlsx`);
// // //   };

// // //   const handleOpenFile = async (file: MyFile) => {
// // //     try {

// // //       console.log(file, "fileName");

// // //       const token = sessionStorage.getItem('token');
// // //       if (!token) {
// // //           console.error("No access token found.");
// // //           return;
// // //       }
// // //       // קריאה ל-API ליצירת קישור הורדה

// // //       const response = await axios.get(
// // //         `https://localhost:7213/api/download/download-url/${file.fileName}`,
// // //         {
// // //           headers: {
// // //               Authorization: `Bearer ${token}`
// // //           }
// // //       }
// // //       );
// // //   console.log("response",response.data);

// // //       const newUrl = response.data;

// // //       if (newUrl) {
// // //         const updatedFile = { ...file, filePath: newUrl };
// // //         setSelectedFile(updatedFile);
// // //       } else {
// // //         alert('לא התקבל קישור תקין מהשרת');
// // //       }
// // //     } catch (error) {
// // //       console.error('שגיאה בקריאת הקובץ:', error);
// // //       alert('אירעה שגיאה בעת ניסיון לפתוח את הקובץ');
// // //     }
// // //   };

// // //   // Fetch files from API
// // //   useEffect(() => {
// // //     fetchFiles();
// // //   }, []);

// // //   const fetchFiles = async () => {
// // //     try {

// // //       const data = fileStore.teacherFiles.filter(f=>f.subjectId==DetailsStore.currentSubject.id && f.classId==DetailsStore.currentClass.id)

// // //       if (Array.isArray(data)) {
// // //         setFiles(data);
// // //       } else {
// // //         console.error("השרת לא החזיר מערך:", data);
// // //         setFiles([]); 
// // //       }
// // //     } catch (err: any) {
// // //       setError(err.message);
// // //       setFiles([]); 
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };  

// // //   // Format file size
// // //   const formatFileSize = (bytes: any) => {
// // //     if (bytes === 0) return '0 Bytes';
// // //     const k = 1024;
// // //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// // //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// // //     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// // //   };

// // //   // Format date
// // //   const formatDate = (dateString: any) => {
// // //     return new Date(dateString).toLocaleDateString('he-IL', {
// // //       year: 'numeric',
// // //       month: 'short',
// // //       day: 'numeric',
// // //       hour: '2-digit',
// // //       minute: '2-digit'
// // //     });
// // //   };

// // //   // Filter and sort files
// // //   const filteredFiles = files
// // //     .filter(file =>
// // //       file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       file.description?.toLowerCase().includes(searchTerm.toLowerCase())
// // //     )
// // //     .sort((a, b) => {
// // //       switch (sortBy) {
// // //         case 'name':
// // //           return a.fileName.localeCompare(b.fileName);
// // //         case 'size':
// // //           return b.fileSize - a.fileSize;
// // //         case 'createdDate':
// // //           return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
// // //         default:
// // //           return 0;
// // //       }
// // //     });

// // //   if (loading) {
// // //     return (
// // //       <Box
// // //         sx={{
// // //           minHeight: '100vh',
// // //           background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           justifyContent: 'center'
// // //         }}
// // //       >
// // //         <Box textAlign="center">
// // //           <CircularProgress size={60} sx={{ color: '#2196f3', mb: 2 }} />
// // //           <Typography variant="h6" color="text.secondary">
// // //             טוען קבצים...
// // //           </Typography>
// // //         </Box>
// // //       </Box>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <Box
// // //         sx={{
// // //           minHeight: '100vh',
// // //           background: 'linear-gradient(135deg, #ffebee 0%, #f8bbd9 100%)',
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           justifyContent: 'center'
// // //         }}
// // //       >
// // //         <Card sx={{ maxWidth: 400, p: 4, textAlign: 'center' }}>
// // //           <Avatar sx={{ bgcolor: '#ffcdd2', width: 64, height: 64, mx: 'auto', mb: 2 }}>
// // //             <FileText sx={{ fontSize: 32, color: '#f44336' }} />
// // //           </Avatar>
// // //           <Typography variant="h5" fontWeight="bold" gutterBottom>
// // //             שגיאה בטעינה
// // //           </Typography>
// // //           <Typography color="text.secondary" paragraph>
// // //             {error}
// // //           </Typography>
// // //           <Button
// // //             variant="contained"
// // //             color="error"
// // //             onClick={fetchFiles}
// // //             sx={{ borderRadius: 2 }}
// // //           >
// // //             נסה שוב
// // //           </Button>
// // //         </Card>
// // //       </Box>
// // //     );
// // //   }

// // //   return (
// // //     <>
// // //     <Box
// // //       sx={{
// // //         minHeight: '100vh',
// // //         background: 'linear-gradient(135deg, #f5f5f5 0%, #e3f2fd 50%, #bbdefb 100%)',
// // //         direction: 'rtl'
// // //       }}
// // //     >
// // //       <Container maxWidth="xl" sx={{ py: 4 }}>
// // //         {/* Header */}
// // //         <Card sx={{ mb: 4, borderRadius: 4, overflow: 'hidden' }}>
// // //           <Box
// // //             sx={{
// // //               background: 'linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)',
// // //               color: 'white',
// // //               p: 4
// // //             }}
// // //           >
// // //             <Box display="flex" alignItems="center" gap={2}>
// // //               <FileText sx={{ fontSize: 32 }} />
// // //               <Box>
// // //                 <Typography variant="h3" fontWeight="bold">
// // //                   רשימת הקבצים שלי
// // //                 </Typography>
// // //                 <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
// // //                   ניהול וצפייה בכל הקבצים שלך במקום אחד
// // //                 </Typography>
// // //               </Box>
// // //             </Box>
// // //           </Box>

// // //           {/* Controls */}
// // //           <Box sx={{ p: 3, bgcolor: '#f5f5f5', borderBottom: 1, borderColor: 'divider' }}>
// // //             <Box
// // //               display="flex"
// // //               flexDirection={{ xs: 'column', lg: 'row' }}
// // //               gap={2}
// // //               alignItems="center"
// // //               justifyContent="space-between"
// // //             >
// // //               {/* Search */}
// // //               <TextField
// // //                 placeholder="חיפוש קבצים..."
// // //                 value={searchTerm}
// // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // //                 sx={{ flexGrow: 1, maxWidth: 400 }}
// // //                 InputProps={{
// // //                   startAdornment: (
// // //                     <InputAdornment position="start">
// // //                       <Search />
// // //                     </InputAdornment>
// // //                   ),
// // //                   sx: { borderRadius: 3 }
// // //                 }}
// // //               />

// // //               {/* Controls */}
// // //               <Box display="flex" alignItems="center" gap={2}>
// // //                 {/* Sort */}
// // //                 <FormControl size="small" sx={{ minWidth: 150 }}>
// // //                   <InputLabel>מיון</InputLabel>
// // //                   <Select
// // //                     value={sortBy}
// // //                     onChange={(e) => setSortBy(e.target.value)}
// // //                     label="מיון"
// // //                   >
// // //                     <MenuItem value="createdDate">מיון לפי תאריך</MenuItem>
// // //                     <MenuItem value="name">מיון לפי שם</MenuItem>
// // //                     <MenuItem value="size">מיון לפי גודל</MenuItem>
// // //                   </Select>
// // //                 </FormControl>

// // //                 {/* View Mode */}
// // //                 <ToggleButtonGroup
// // //                   value={viewMode}
// // //                   exclusive
// // //                   onChange={(e, newMode) => newMode && setViewMode(newMode)}
// // //                   size="small"
// // //                 >
// // //                   <ToggleButton value="grid">
// // //                     <Grid />
// // //                   </ToggleButton>
// // //                   <ToggleButton value="list">
// // //                     <ListIcon />
// // //                   </ToggleButton>
// // //                 </ToggleButtonGroup>

// // //                 {/* Refresh */}
// // //                 <IconButton
// // //                   onClick={fetchFiles}
// // //                   color="primary"
// // //                   title="רענן"
// // //                 >
// // //                   <RefreshCw />
// // //                 </IconButton>
// // //               </Box>
// // //             </Box>
// // //           </Box>

// // //           {/* Stats */}
// // //           <CardContent sx={{ py: 2 }}>
// // //             <Box display="flex" justifyContent="space-between" alignItems="center">
// // //               <Typography variant="body2" color="text.secondary">
// // //                 סה״כ {filteredFiles.length} קבצים
// // //               </Typography>
// // //               <Typography variant="body2" color="text.secondary">
// // //                 גודל כולל: {formatFileSize(filteredFiles.reduce((sum, file) => sum + file.fileSize, 0))}
// // //               </Typography>
// // //             </Box>
// // //           </CardContent>
// // //         </Card>

// // //         {/* Files Display */}
// // //         {filteredFiles.length === 0 ? (
// // //           <Card sx={{ p: 8, textAlign: 'center', borderRadius: 4 }}>
// // //             <Avatar sx={{ bgcolor: '#f5f5f5', width: 96, height: 96, mx: 'auto', mb: 2 }}>
// // //               <FileText sx={{ fontSize: 48, color: '#bdbdbd' }} />
// // //             </Avatar>
// // //             <Typography variant="h5" fontWeight="bold" gutterBottom>
// // //               לא נמצאו קבצים
// // //             </Typography>
// // //             <Typography color="text.secondary">
// // //               נסה לשנות את תנאי החיפוש או העלה קבצים חדשים
// // //             </Typography>
// // //           </Card>
// // //         ) : viewMode === 'grid' ? (
// // //           <Grid spacing={3}>
// // //             {filteredFiles.map((file) => (
// // //               <Grid xs={12} sm={6} md={4} lg={3} key={file.id}>
// // //                 <Card
// // //                   onClick={() => handleOpenFile(file)}
// // //                   sx={{
// // //                     height: '100%',
// // //                     borderRadius: 4,
// // //                     cursor: 'pointer',
// // //                     transition: 'all 0.3s ease',
// // //                     '&:hover': {
// // //                       transform: 'translateY(-4px)',
// // //                       boxShadow: 6,
// // //                       bgcolor: '#f0f8ff'
// // //                     }
// // //                   }}
// // //                 >

// // //                   <CardContent sx={{ p: 3 }}>
// // //                     {/* Header */}
// // //                     <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// // //                       <Avatar
// // //                         sx={{
// // //                           bgcolor: 'primary.main',
// // //                           background: 'linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)',
// // //                           width: 48,
// // //                           height: 48
// // //                         }}
// // //                       >
// // //                         <FileText />
// // //                       </Avatar>
// // //                       <IconButton
// // //                         size="small"
// // //                         sx={{ '&:hover': { bgcolor: 'primary.50', color: 'primary.main' } }}
// // //                       >
// // //                         <Download />
// // //                       </IconButton>
// // //                     </Box>

// // //                     {/* Title */}
// // //                     <Typography
// // //                       variant="h6"
// // //                       fontWeight="bold"
// // //                       gutterBottom
// // //                       noWrap
// // //                       title={file.fileName}
// // //                     >
// // //                       {file.fileName}
// // //                     </Typography>

// // //                     {/* Description */}
// // //                     {file.description && (
// // //                       <Typography
// // //                         variant="body2"
// // //                         color="text.secondary"
// // //                         sx={{
// // //                           mb: 2,
// // //                           display: '-webkit-box',
// // //                           WebkitLineClamp: 2,
// // //                           WebkitBoxOrient: 'vertical',
// // //                           overflow: 'hidden'
// // //                         }}
// // //                       >
// // //                         {file.description}
// // //                       </Typography>
// // //                     )}

// // //                     {/* Details */}
// // //                     <Box sx={{ mb: 2, '& > *': { mb: 1 } }}>
// // //                       <Box display="flex" alignItems="center" gap={1}>
// // //                         <User sx={{ fontSize: 16, color: 'text.secondary' }} />
// // //                         <Typography variant="body2" color="text.secondary">
// // //                           משתמש {file.userId}
// // //                         </Typography>
// // //                       </Box>
// // //                       <Box display="flex" alignItems="center" gap={1}>
// // //                         <BookOpen sx={{ fontSize: 16, color: 'text.secondary' }} />
// // //                         <Typography variant="body2" color="text.secondary">
// // //                           נושא {file.subjectId}
// // //                         </Typography>
// // //                       </Box>
// // //                       <Box display="flex" alignItems="center" gap={1}>
// // //                         <Users sx={{ fontSize: 16, color: 'text.secondary' }} />
// // //                         <Typography variant="body2" color="text.secondary">
// // //                           כיתה {file.classId}
// // //                         </Typography>
// // //                       </Box>
// // //                       <Box display="flex" alignItems="center" gap={1}>
// // //                         <Calendar sx={{ fontSize: 16, color: 'text.secondary' }} />
// // //                         <Typography variant="body2" color="text.secondary">
// // //                           {formatDate(file.createdDate)}
// // //                         </Typography>
// // //                       </Box>
// // //                     </Box>

// // //                     <Divider sx={{ mb: 2 }} />

// // //                     {/* Footer */}
// // //                     <Box display="flex" justifyContent="space-between" alignItems="center">
// // //                       <Typography variant="body2" fontWeight="medium">
// // //                         {formatFileSize(file.fileSize)}
// // //                       </Typography>
// // //                       <Box
// // //                         sx={{
// // //                           width: 8,
// // //                           height: 8,
// // //                           bgcolor: 'success.main',
// // //                           borderRadius: '50%'
// // //                         }}
// // //                       />
// // //                     </Box>
// // //                   </CardContent>
// // //                 </Card>
// // //               </Grid>
// // //             ))}
// // //           </Grid>
// // //         ) : (
// // //           <Box sx={{ '& > *': { mb: 2 } }}>
// // //             {filteredFiles.map((file) => (
// // //               <Card
// // //                 key={file.id}
// // //                 onClick={() => handleOpenFile(file)}
// // //                 sx={{
// // //                   borderRadius: 4,
// // //                   cursor: 'pointer',
// // //                   transition: 'all 0.3s ease',
// // //                   '&:hover': {
// // //                     transform: 'translateY(-2px)',
// // //                     boxShadow: 4,
// // //                     bgcolor: '#f0f8ff'
// // //                   }
// // //                 }}
// // //               >

// // //                 <CardContent sx={{ p: 2 }}>
// // //                   <Box display="flex" alignItems="center" gap={2}>
// // //                     <Avatar
// // //                       sx={{
// // //                         bgcolor: 'primary.main',
// // //                         background: 'linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)',
// // //                         width: 48,
// // //                         height: 48
// // //                       }}
// // //                     >
// // //                       <FileText />
// // //                     </Avatar>

// // //                     <Box sx={{ flexGrow: 1, minWidth: 0 }}>
// // //                       <Typography variant="h6" fontWeight="bold" noWrap>
// // //                         {file.fileName}
// // //                       </Typography>
// // //                       <Box display="flex" gap={3} mt={0.5}>
// // //                         <Typography variant="body2" color="text.secondary">
// // //                           משתמש {file.userId}
// // //                         </Typography>
// // //                         <Typography variant="body2" color="text.secondary">
// // //                           נושא {file.subjectId}
// // //                         </Typography>
// // //                         <Typography variant="body2" color="text.secondary">
// // //                           כיתה {file.classId}
// // //                         </Typography>
// // //                         <Typography variant="body2" color="text.secondary">
// // //                           {formatDate(file.createdDate)}
// // //                         </Typography>
// // //                       </Box>
// // //                       {file.description && (
// // //                         <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.5 }}>
// // //                           {file.description}
// // //                         </Typography>
// // //                       )}
// // //                     </Box>

// // //                     <Box display="flex" alignItems="center" gap={2}>
// // //                       <Typography variant="body2" fontWeight="medium">
// // //                         {formatFileSize(file.fileSize)}
// // //                       </Typography>
// // //                       <IconButton
// // //                         size="small"
// // //                         sx={{ '&:hover': { bgcolor: 'primary.50', color: 'primary.main' } }}
// // //                       >
// // //                         <Download />
// // //                       </IconButton>
// // //                     </Box>
// // //                   </Box>
// // //                 </CardContent>
// // //               </Card>
// // //             ))}
// // //           </Box>
// // //         )}
// // //         {selectedFile && (
// // //           <Card sx={{ mt: 4, p: 2, borderRadius: 4 }}>
// // //             <Typography variant="h6" fontWeight="bold" gutterBottom>
// // //               תצוגה מקדימה של הקובץ: {selectedFile.fileName}
// // //             </Typography>
// // //             <Box
// // //               sx={{
// // //                 width: '100%',
// // //                 height: '80vh',
// // //                 border: '1px solid #ccc',
// // //                 borderRadius: 2,
// // //                 overflow: 'hidden'
// // //               }}
// // //             >
// // //               <iframe
// // //                 src={selectedFile.filePath}
// // //                 width="100%"
// // //                 height="100%"
// // //                 style={{ border: 'none' }}
// // //                 title="תצוגת קובץ"
// // //               />
// // //             </Box>
// // //             <Button
// // //               variant="outlined"
// // //               color="error"
// // //               onClick={() => setSelectedFile(null)}
// // //               sx={{ mt: 2 }}
// // //             >
// // //               סגור תצוגה
// // //             </Button>

// // //           </Card>
// // //         )}

// // //       </Container>
// // //     </Box>
// // //     <FileUploader />
// // //     </>
// // //   );
// // // };


// // // export default ClassExamsPage;


// // import { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Container,
// //   Card,
// //   CardContent,
// //   Typography,
// //   TextField,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   IconButton,
// //   ToggleButton,
// //   ToggleButtonGroup,
// //   InputAdornment,
// //   CircularProgress,
// //   Button,
// //   Avatar,
// //   Divider,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Chip,
// //   Paper,
// //   Accordion,
// //   AccordionSummary,
// //   AccordionDetails,
// //   Alert,
// //   Snackbar
// // } from '@mui/material';
// // import {
// //   Description as FileText,
// //   Download,
// //   CalendarToday as Calendar,
// //   Person as User,
// //   MenuBook as BookOpen,
// //   Group as Users,
// //   Search,
// //   GridView as Grid,
// //   ViewList as ListIcon,
// //   Refresh as RefreshCw,
// //   Analytics as AnalyticsIcon,
// //   ExpandMore as ExpandMoreIcon,
// //   CheckCircle,
// //   Cancel,
// //   Warning,
// //   School as SchoolIcon
// // } from '@mui/icons-material';
// // import { MyFile } from '../types/myFile';
// // import axios from 'axios';
// // import FileUploader from './FileUploader';
// // import fileStore from '../stores/fileStore';
// // import DetailsStore from '../stores/DetailsStore';
// // import examAnalysisStore from '../stores/ExamAnalysisStore';
// // import StudentExamResults from './StudentExamResults';
// // import { StudentTestFeedback } from '../types/StudentTestFeedback';
// // import { observer } from 'mobx-react-lite';
// // import * as XLSX from 'xlsx';
// // import { saveAs } from 'file-saver';




// // const ClassExamsPage: React.FC = observer(() => {
// //   const [files, setFiles] = useState<MyFile[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [viewMode, setViewMode] = useState('grid');
// //   const [sortBy, setSortBy] = useState('createdDate');
// //   const [selectedFile, setSelectedFile] = useState<MyFile | null>(null);

// //   // Exam analysis states
// //   const [analysisDialogOpen, setAnalysisDialogOpen] = useState(false);
// //   const [analysisLoading, setAnalysisLoading] = useState(false);
// //   const [analysisResults, setAnalysisResults] = useState<StudentTestFeedback[]>([]);
// //   const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
// //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// //   const [snackbarMessage, setSnackbarMessage] = useState('');
// //   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');

// //   const exportToExcel = (students: any[], fileName: string) => {
// //     const worksheet = XLSX.utils.json_to_sheet(students);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Marks");
// //     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
// //     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
// //     saveAs(data, `${fileName}.xlsx`);
// //   };

// //   const handleOpenFile = async (file: MyFile) => {
// //     try {
// //       console.log(file, "fileName");

// //       const token = sessionStorage.getItem('token');
// //       if (!token) {
// //         console.error("No access token found.");
// //         return;
// //       }

// //       const response = await axios.get(
// //         `https://localhost:7213/api/download/download-url/${file.fileName}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );
// //       console.log("response", response.data);

// //       const newUrl = response.data;

// //       if (newUrl) {
// //         const updatedFile = { ...file, filePath: newUrl };
// //         setSelectedFile(updatedFile);
// //       } else {
// //         showSnackbar('לא התקבל קישור תקין מהשרת', 'error');
// //       }
// //     } catch (error) {
// //       console.error('שגיאה בקריאת הקובץ:', error);
// //       showSnackbar('אירעה שגיאה בעת ניסיון לפתוח את הקובץ', 'error');
// //     }
// //   };

// //   // Check if answer file exists for exam analysis
// //   const hasAnswerFile = () => {
// //     return files.some(file =>
// //       file.fileName.toLowerCase().includes('answer') ||
// //       file.fileName.toLowerCase().includes('teacher')
// //     );
// //   };

// //   // Get available files for analysis
// //   const getAnalysisFiles = () => {
// //     return files.filter(file =>
// //       file.fileName.toLowerCase().includes('answer') ||
// //       file.fileName.toLowerCase().includes('teacher') ||
// //       (!file.fileName.toLowerCase().includes('answer') && !file.fileName.toLowerCase().includes('teacher'))
// //     );
// //   };

// //   // Handle exam analysis
// //   // const handleAnalyzeExams = async () => {
// //   //   if (selectedFiles.length < 2) {
// //   //     showSnackbar('יש לבחור לפחות מבחן פתור אחד ומבחן תלמיד אחד', 'warning');
// //   //     return;
// //   //   }

// //   //   setAnalysisLoading(true);
// //   //   try {
// //   //     const token = sessionStorage.getItem('token');
// //   //     if (!token) {
// //   //       showSnackbar('לא נמצא טוקן גישה', 'error');
// //   //       return;
// //   //     }

// //   //     const response = await axios.post(
// //   //       'https://localhost:7213/api/ExamAnalysis/analyze-class',
// //   //       selectedFiles,
// //   //       {
// //   //         headers: {
// //   //           Authorization: `Bearer ${token}`,
// //   //           'Content-Type': 'application/json'
// //   //         }
// //   //       }
// //   //     );
// //   //     console.log('Analysis results:', response);
// //   //     setAnalysisResults(response.data);
// //   //     console.log('Analysis results:', response.data);
// //   //     showSnackbar(`ניתוח הושלם בהצלחה עבור ${response.data.length} תלמידים`, 'success');
// //   //   } catch (error: any) {
// //   //     console.error('שגיאה בניתוח המבחנים:', error);
// //   //     const errorMessage = error.response?.data?.message || 'אירעה שגיאה בניתוח המבחנים';
// //   //     showSnackbar(errorMessage, 'error');
// //   //   } finally {
// //   //     setAnalysisLoading(false);
// //   //   }
// //   // };
// //   const handleAnalyzeExams = async () => {
// //     if (selectedFiles.length < 2) {
// //       showSnackbar('יש לבחור לפחות מבחן פתור אחד ומבחן תלמיד אחד', 'warning');
// //       return;
// //     }

// //     setAnalysisLoading(true);
// //     try {
// //       const token = sessionStorage.getItem('token');
// //       if (!token) {
// //         showSnackbar('לא נמצא טוקן גישה', 'error');
// //         return;
// //       }

// //       const response = await axios.post(
// //         'https://localhost:7213/api/ExamAnalysis/analyze-class',
// //         selectedFiles,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );

// //       examAnalysisStore.setResults(response.data);
// //       showSnackbar(`ניתוח הושלם בהצלחה עבור ${response.data.length} תלמידים`, 'success');
// //     } catch (error: any) {
// //       const errorMessage = error.response?.data?.message || 'אירעה שגיאה בניתוח המבחנים';
// //       showSnackbar(errorMessage, 'error');
// //     } finally {
// //       setAnalysisLoading(false);
// //     }
// //   };

// //   // Show snackbar message
// //   const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
// //     setSnackbarMessage(message);
// //     setSnackbarSeverity(severity);
// //     setSnackbarOpen(true);
// //   };

// //   // Get status color and icon
// //   const getStatusInfo = (status: string) => {
// //     switch (status.toLowerCase()) {
// //       case 'correct':
// //       case 'נכון':
// //         return { color: 'success', icon: <CheckCircle /> };
// //       case 'incorrect':
// //       case 'שגוי':
// //         return { color: 'error', icon: <Cancel /> };
// //       case 'partial':
// //       case 'חלקי':
// //         return { color: 'warning', icon: <Warning /> };
// //       default:
// //         return { color: 'default', icon: <Warning /> };
// //     }
// //   };

// //   // Fetch files from API
// //   useEffect(() => {
// //     fetchFiles();
// //   }, []);

// //   const fetchFiles = async () => {
// //     try {
// //       const data = fileStore.teacherFiles.filter(f => f.subjectId == DetailsStore.currentSubject.id && f.classId == DetailsStore.currentClass.id)

// //       if (Array.isArray(data)) {
// //         setFiles(data);
// //       } else {
// //         console.error("השרת לא החזיר מערך:", data);
// //         setFiles([]);
// //       }
// //     } catch (err: any) {
// //       setError(err.message);
// //       setFiles([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Format file size
// //   const formatFileSize = (bytes: any) => {
// //     if (bytes === 0) return '0 Bytes';
// //     const k = 1024;
// //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// //     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// //   };

// //   // Format date
// //   const formatDate = (dateString: any) => {
// //     return new Date(dateString).toLocaleDateString('he-IL', {
// //       year: 'numeric',
// //       month: 'short',
// //       day: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   };

// //   // Filter and sort files
// //   const filteredFiles = files
// //     .filter(file =>
// //       file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       file.description?.toLowerCase().includes(searchTerm.toLowerCase())
// //     )
// //     .sort((a, b) => {
// //       switch (sortBy) {
// //         case 'name':
// //           return a.fileName.localeCompare(b.fileName);
// //         case 'size':
// //           return b.fileSize - a.fileSize;
// //         case 'createdDate':
// //           return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
// //         default:
// //           return 0;
// //       }
// //     });

// //   if (loading) {
// //     return (
// //       <Box
// //         sx={{
// //           minHeight: '100vh',
// //           background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center'
// //         }}
// //       >
// //         <Box textAlign="center">
// //           <CircularProgress size={60} sx={{ color: '#2196f3', mb: 2 }} />
// //           <Typography variant="h6" color="text.secondary">
// //             טוען קבצים...
// //           </Typography>
// //         </Box>
// //       </Box>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Box
// //         sx={{
// //           minHeight: '100vh',
// //           background: 'linear-gradient(135deg, #ffebee 0%, #f8bbd9 100%)',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center'
// //         }}
// //       >
// //         <Card sx={{ maxWidth: 400, p: 4, textAlign: 'center' }}>
// //           <Avatar sx={{ bgcolor: '#ffcdd2', width: 64, height: 64, mx: 'auto', mb: 2 }}>
// //             <FileText sx={{ fontSize: 32, color: '#f44336' }} />
// //           </Avatar>
// //           <Typography variant="h5" fontWeight="bold" gutterBottom>
// //             שגיאה בטעינה
// //           </Typography>
// //           <Typography color="text.secondary" paragraph>
// //             {error}
// //           </Typography>
// //           <Button
// //             variant="contained"
// //             color="error"
// //             onClick={fetchFiles}
// //             sx={{ borderRadius: 2 }}
// //           >
// //             נסה שוב
// //           </Button>
// //         </Card>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <>
// //       <Box
// //         sx={{
// //           minHeight: '100vh',
// //           background: 'linear-gradient(135deg, #f5f5f5 0%, #e3f2fd 50%, #bbdefb 100%)',
// //           direction: 'rtl'
// //         }}
// //       >
// //         <Container maxWidth="xl" sx={{ py: 4 }}>
// //           {/* Header */}
// //           <Card sx={{ mb: 4, borderRadius: 4, overflow: 'hidden' }}>
// //             <Box
// //               sx={{
// //                 background: 'linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)',
// //                 color: 'white',
// //                 p: 4
// //               }}
// //             >
// //               <Box display="flex" alignItems="center" justifyContent="space-between">
// //                 <Box display="flex" alignItems="center" gap={2}>
// //                   <FileText sx={{ fontSize: 32 }} />
// //                   <Box>
// //                     <Typography variant="h3" fontWeight="bold">
// //                       רשימת הקבצים שלי
// //                     </Typography>
// //                     <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
// //                       ניהול וצפייה בכל הקבצים שלך במקום אחד
// //                     </Typography>
// //                   </Box>
// //                 </Box>
// //                 {examAnalysisStore.analysisResults.length > 0 && (
// //                   <Card sx={{ mt: 4, borderRadius: 4 }}>
// //                     <Box sx={{ p: 2, bgcolor: 'success.light', color: 'white' }}>
// //                       <Typography variant="h5" fontWeight="bold">תוצאות ניתוח מבחנים</Typography>
// //                       <Typography variant="body2">
// //                         {examAnalysisStore.analysisResults.length} תלמידים נותחו
// //                       </Typography>
// //                     </Box>
// //                     <CardContent>
// //                       <StudentExamResults results={examAnalysisStore.analysisResults} />
// //                     </CardContent>
// //                   </Card>
// //                 )}

// //                 {/* Analyze Exams Button */}
// //                 {hasAnswerFile() && (
// //                   <Button
// //                     variant="contained"
// //                     startIcon={<AnalyticsIcon />}
// //                     onClick={() => setAnalysisDialogOpen(true)}
// //                     sx={{
// //                       bgcolor: 'rgba(255, 255, 255, 0.2)',
// //                       '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
// //                       borderRadius: 3
// //                     }}
// //                   >
// //                     נתח מבחנים
// //                   </Button>
// //                 )}
// //               </Box>
// //             </Box>

// //             {/* Controls */}
// //             <Box sx={{ p: 3, bgcolor: '#f5f5f5', borderBottom: 1, borderColor: 'divider' }}>
// //               <Box
// //                 display="flex"
// //                 flexDirection={{ xs: 'column', lg: 'row' }}
// //                 gap={2}
// //                 alignItems="center"
// //                 justifyContent="space-between"
// //               >
// //                 {/* Search */}
// //                 <TextField
// //                   placeholder="חיפוש קבצים..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   sx={{ flexGrow: 1, maxWidth: 400 }}
// //                   InputProps={{
// //                     startAdornment: (
// //                       <InputAdornment position="start">
// //                         <Search />
// //                       </InputAdornment>
// //                     ),
// //                     sx: { borderRadius: 3 }
// //                   }}
// //                 />

// //                 {/* Controls */}
// //                 <Box display="flex" alignItems="center" gap={2}>
// //                   {/* Sort */}
// //                   <FormControl size="small" sx={{ minWidth: 150 }}>
// //                     <InputLabel>מיון</InputLabel>
// //                     <Select
// //                       value={sortBy}
// //                       onChange={(e) => setSortBy(e.target.value)}
// //                       label="מיון"
// //                     >
// //                       <MenuItem value="createdDate">מיון לפי תאריך</MenuItem>
// //                       <MenuItem value="name">מיון לפי שם</MenuItem>
// //                       <MenuItem value="size">מיון לפי גודל</MenuItem>
// //                     </Select>
// //                   </FormControl>

// //                   {/* View Mode */}
// //                   <ToggleButtonGroup
// //                     value={viewMode}
// //                     exclusive
// //                     onChange={(e, newMode) => newMode && setViewMode(newMode)}
// //                     size="small"
// //                   >
// //                     <ToggleButton value="grid">
// //                       <Grid />
// //                     </ToggleButton>
// //                     <ToggleButton value="list">
// //                       <ListIcon />
// //                     </ToggleButton>
// //                   </ToggleButtonGroup>

// //                   {/* Refresh */}
// //                   <IconButton
// //                     onClick={fetchFiles}
// //                     color="primary"
// //                     title="רענן"
// //                   >
// //                     <RefreshCw />
// //                   </IconButton>
// //                 </Box>
// //               </Box>
// //             </Box>

// //             {/* Stats */}
// //             <CardContent sx={{ py: 2 }}>
// //               <Box display="flex" justifyContent="space-between" alignItems="center">
// //                 <Typography variant="body2" color="text.secondary">
// //                   סה״כ {filteredFiles.length} קבצים
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   גודל כולל: {formatFileSize(filteredFiles.reduce((sum, file) => sum + file.fileSize, 0))}
// //                 </Typography>
// //               </Box>
// //             </CardContent>
// //           </Card>

// //           {/* Files Display */}
// //           {filteredFiles.length === 0 ? (
// //             <Card sx={{ p: 8, textAlign: 'center', borderRadius: 4 }}>
// //               <Avatar sx={{ bgcolor: '#f5f5f5', width: 96, height: 96, mx: 'auto', mb: 2 }}>
// //                 <FileText sx={{ fontSize: 48, color: '#bdbdbd' }} />
// //               </Avatar>
// //               <Typography variant="h5" fontWeight="bold" gutterBottom>
// //                 לא נמצאו קבצים
// //               </Typography>
// //               <Typography color="text.secondary">
// //                 נסה לשנות את תנאי החיפוש או העלה קבצים חדשים
// //               </Typography>
// //             </Card>
// //           ) : viewMode === 'grid' ? (
// //             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
// //               {filteredFiles.map((file) => (
// //                 <Card
// //                   key={file.id}
// //                   onClick={() => handleOpenFile(file)}
// //                   sx={{
// //                     height: '100%',
// //                     borderRadius: 4,
// //                     cursor: 'pointer',
// //                     transition: 'all 0.3s ease',
// //                     '&:hover': {
// //                       transform: 'translateY(-4px)',
// //                       boxShadow: 6,
// //                       bgcolor: '#f0f8ff'
// //                     }
// //                   }}
// //                 >
// //                   <CardContent sx={{ p: 3 }}>
// //                     {/* Header */}
// //                     <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// //                       <Avatar
// //                         sx={{
// //                           bgcolor: 'primary.main',
// //                           background: 'linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)',
// //                           width: 48,
// //                           height: 48
// //                         }}
// //                       >
// //                         <FileText />
// //                       </Avatar>
// //                       <Box display="flex" gap={1}>
// //                         {(file.fileName.toLowerCase().includes('answer') || file.fileName.toLowerCase().includes('teacher')) && (
// //                           <Chip
// //                             label="מבחן פתור"
// //                             size="small"
// //                             color="success"
// //                             sx={{ fontSize: '0.7rem' }}
// //                           />
// //                         )}
// //                         <IconButton
// //                           size="small"
// //                           sx={{ '&:hover': { bgcolor: 'primary.50', color: 'primary.main' } }}
// //                         >
// //                           <Download />
// //                         </IconButton>
// //                       </Box>
// //                     </Box>

// //                     {/* Title */}
// //                     <Typography
// //                       variant="h6"
// //                       fontWeight="bold"
// //                       gutterBottom
// //                       noWrap
// //                       title={file.fileName}
// //                     >
// //                       {file.fileName}
// //                     </Typography>

// //                     {/* Description */}
// //                     {file.description && (
// //                       <Typography
// //                         variant="body2"
// //                         color="text.secondary"
// //                         sx={{
// //                           mb: 2,
// //                           display: '-webkit-box',
// //                           WebkitLineClamp: 2,
// //                           WebkitBoxOrient: 'vertical',
// //                           overflow: 'hidden'
// //                         }}
// //                       >
// //                         {file.description}
// //                       </Typography>
// //                     )}

// //                     {/* Details */}
// //                     <Box sx={{ mb: 2, '& > *': { mb: 1 } }}>
// //                       <Box display="flex" alignItems="center" gap={1}>
// //                         <User sx={{ fontSize: 16, color: 'text.secondary' }} />
// //                         <Typography variant="body2" color="text.secondary">
// //                           משתמש {file.userId}
// //                         </Typography>
// //                       </Box>
// //                       <Box display="flex" alignItems="center" gap={1}>
// //                         <BookOpen sx={{ fontSize: 16, color: 'text.secondary' }} />
// //                         <Typography variant="body2" color="text.secondary">
// //                           נושא {file.subjectId}
// //                         </Typography>
// //                       </Box>
// //                       <Box display="flex" alignItems="center" gap={1}>
// //                         <Users sx={{ fontSize: 16, color: 'text.secondary' }} />
// //                         <Typography variant="body2" color="text.secondary">
// //                           כיתה {file.classId}
// //                         </Typography>
// //                       </Box>
// //                       <Box display="flex" alignItems="center" gap={1}>
// //                         <Calendar sx={{ fontSize: 16, color: 'text.secondary' }} />
// //                         <Typography variant="body2" color="text.secondary">
// //                           {formatDate(file.createdDate)}
// //                         </Typography>
// //                       </Box>
// //                     </Box>

// //                     <Divider sx={{ mb: 2 }} />

// //                     {/* Footer */}
// //                     <Box display="flex" justifyContent="space-between" alignItems="center">
// //                       <Typography variant="body2" fontWeight="medium">
// //                         {formatFileSize(file.fileSize)}
// //                       </Typography>
// //                       <Box
// //                         sx={{
// //                           width: 8,
// //                           height: 8,
// //                           bgcolor: 'success.main',
// //                           borderRadius: '50%'
// //                         }}
// //                       />
// //                     </Box>
// //                   </CardContent>
// //                 </Card>
// //               ))}
// //             </Box>
// //           ) : (
// //             <Box sx={{ '& > *': { mb: 2 } }}>
// //               {filteredFiles.map((file) => (
// //                 <Card
// //                   key={file.id}
// //                   onClick={() => handleOpenFile(file)}
// //                   sx={{
// //                     borderRadius: 4,
// //                     cursor: 'pointer',
// //                     transition: 'all 0.3s ease',
// //                     '&:hover': {
// //                       transform: 'translateY(-2px)',
// //                       boxShadow: 4,
// //                       bgcolor: '#f0f8ff'
// //                     }
// //                   }}
// //                 >
// //                   <CardContent sx={{ p: 2 }}>
// //                     <Box display="flex" alignItems="center" gap={2}>
// //                       <Avatar
// //                         sx={{
// //                           bgcolor: 'primary.main',
// //                           background: 'linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)',
// //                           width: 48,
// //                           height: 48
// //                         }}
// //                       >
// //                         <FileText />
// //                       </Avatar>

// //                       <Box sx={{ flexGrow: 1, minWidth: 0 }}>
// //                         <Box display="flex" alignItems="center" gap={2}>
// //                           <Typography variant="h6" fontWeight="bold" noWrap>
// //                             {file.fileName}
// //                           </Typography>
// //                           {(file.fileName.toLowerCase().includes('answer') || file.fileName.toLowerCase().includes('teacher')) && (
// //                             <Chip
// //                               label="מבחן פתור"
// //                               size="small"
// //                               color="success"
// //                               sx={{ fontSize: '0.7rem' }}
// //                             />
// //                           )}
// //                         </Box>
// //                         <Box display="flex" gap={3} mt={0.5}>
// //                           <Typography variant="body2" color="text.secondary">
// //                             משתמש {file.userId}
// //                           </Typography>
// //                           <Typography variant="body2" color="text.secondary">
// //                             נושא {file.subjectId}
// //                           </Typography>
// //                           <Typography variant="body2" color="text.secondary">
// //                             כיתה {file.classId}
// //                           </Typography>
// //                           <Typography variant="body2" color="text.secondary">
// //                             {formatDate(file.createdDate)}
// //                           </Typography>
// //                         </Box>
// //                         {file.description && (
// //                           <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.5 }}>
// //                             {file.description}
// //                           </Typography>
// //                         )}
// //                       </Box>

// //                       <Box display="flex" alignItems="center" gap={2}>
// //                         <Typography variant="body2" fontWeight="medium">
// //                           {formatFileSize(file.fileSize)}
// //                         </Typography>
// //                         <IconButton
// //                           size="small"
// //                           sx={{ '&:hover': { bgcolor: 'primary.50', color: 'primary.main' } }}
// //                         >
// //                           <Download />
// //                         </IconButton>
// //                       </Box>
// //                     </Box>
// //                   </CardContent>
// //                 </Card>
// //               ))}
// //             </Box>
// //           )}

// //           {/* File Preview */}
// //           {selectedFile && (
// //             <Card sx={{ mt: 4, p: 2, borderRadius: 4 }}>
// //               <Typography variant="h6" fontWeight="bold" gutterBottom>
// //                 תצוגה מקדימה של הקובץ: {selectedFile.fileName}
// //               </Typography>
// //               <Box
// //                 sx={{
// //                   width: '100%',
// //                   height: '80vh',
// //                   border: '1px solid #ccc',
// //                   borderRadius: 2,
// //                   overflow: 'hidden'
// //                 }}
// //               >
// //                 <iframe
// //                   src={selectedFile.filePath}
// //                   width="100%"
// //                   height="100%"
// //                   style={{ border: 'none' }}
// //                   title="תצוגת קובץ"
// //                 />
// //               </Box>
// //               <Button
// //                 variant="outlined"
// //                 color="error"
// //                 onClick={() => setSelectedFile(null)}
// //                 sx={{ mt: 2 }}
// //               >
// //                 סגור תצוגה
// //               </Button>
// //             </Card>
// //           )}

// //           {/* Analysis Results */}
// //           {/* {analysisResults.length > 0 && (
// //             <Card sx={{ mt: 4, borderRadius: 4 }}>
// //               <Box
// //                 sx={{
// //                   background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
// //                   color: 'white',
// //                   p: 3
// //                 }}
// //               >
// //                 <Box display="flex" alignItems="center" gap={2}>
// //                   <SchoolIcon sx={{ fontSize: 32 }} />
// //                   <Box>
// //                     <Typography variant="h5" fontWeight="bold">
// //                       תוצאות ניתוח המבחנים
// //                     </Typography>
// //                     <Typography variant="body1" sx={{ opacity: 0.9 }}>
// //                       {analysisResults.length} תלמידים נותחו
// //                     </Typography>
// //                   </Box>
// //                 </Box>
// //               </Box>

// //               <CardContent sx={{ p: 0 }}>
// //                 {analysisResults.map((student, index) => (
// //                   <Accordion key={student.id || index}>
// //                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
// //                       <Box display="flex" alignItems="center" justifyContent="between" width="100%" pr={2}>
// //                         <Box display="flex" alignItems="center" gap={2}>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
// //                             <User />
// //                           </Avatar>
// //                           <Box>
// //                             <Typography variant="h6" fontWeight="bold">
// //                               {student.studentName}
// //                             </Typography>
// //                             <Typography variant="body2" color="text.secondary">
// //                               {student.feedback.length} שאלות
// //                             </Typography>
// //                           </Box>
// //                         </Box>
// //                         <Box display="flex" alignItems="center" gap={2}>
// //                           <Chip
// //                             label={`${student.finalGrade} נקודות`}
// //                             color={student.finalGrade >= 80 ? 'success' : student.finalGrade >= 60 ? 'warning' : 'error'}
// //                             sx={{ fontWeight: 'bold' }}
// //                           />
// //                         </Box>
// //                       </Box>
// //                     </AccordionSummary>
// //                     <AccordionDetails>
// //                       <Box sx={{ p: 2 }}>
// //                         {student.noteToTeacher && (
// //                           <Alert severity="info" sx={{ mb: 3 }}>
// //                             <Typography variant="body2">
// //                               <strong>הערה למורה:</strong> {student.noteToTeacher}
// //                             </Typography>
// //                           </Alert>
// //                         )}

// //                         <Typography variant="h6" fontWeight="bold" gutterBottom>
// //                           פירוט השאלות:
// //                         </Typography>

// //                         <List>
// //                           {student.feedback.map((question) => {
// //                             const statusInfo = getStatusInfo(question.status);
// //                             return (
// //                               <ListItem key={question.id} sx={{ mb: 2 }}>
// //                                 <Paper sx={{ p: 2, width: '100%' }}>
// //                                   <Box display="flex" alignItems="center" gap={2} mb={1}>
// //                                     <Chip
// //                                       icon={statusInfo.icon}
// //                                       label={`שאלה ${question.questionNumber}`}
// //                                       color={statusInfo.color as any}
// //                                       size="small"
// //                                     />
// //                                     <Typography variant="body2" color="text.secondary" sx={{ mr: 'auto' }}>
// //                                       סטטוס: {question.status}
// //                                     </Typography>
// //                                   </Box>

// //                                   {question.feedback && (
// //                                     <Typography variant="body2" sx={{ mb: 1 }}>
// //                                       <strong>משוב:</strong> {question.feedback}
// //                                     </Typography>
// //                                   )}

// //                                   {question.correctAnswer && (
// //                                     <Typography variant="body2" color="success.main">
// //                                       <strong>התשובה הנכונה:</strong> {question.correctAnswer}
// //                                     </Typography>
// //                                   )}
// //                                 </Paper>
// //                               </ListItem>
// //                             );
// //                           })}
// //                         </List>
// //                       </Box>
// //                     </AccordionDetails>
// //                   </Accordion>
// //                 ))}
// //               </CardContent>
// //             </Card>
// //           )} */}
// //           {examAnalysisStore.analysisResults.length > 0 && (
// //             <Card sx={{ mt: 4, borderRadius: 4 }}>
// //               <Box sx={{ p: 2, bgcolor: 'success.light', color: 'white' }}>
// //                 <Typography variant="h5" fontWeight="bold">תוצאות ניתוח מבחנים</Typography>
// //                 <Typography variant="body2">
// //                   {examAnalysisStore.analysisResults.length} תלמידים נותחו
// //                 </Typography>
// //               </Box>
// //               <CardContent>
// //                 <StudentExamResults results={examAnalysisStore.analysisResults} />
// //               </CardContent>
// //             </Card>
// //           )}
// //         </Container>

// //         {/* Analysis Dialog */}
// //         <Dialog
// //           open={analysisDialogOpen}
// //           onClose={() => setAnalysisDialogOpen(false)}
// //           maxWidth="md"
// //           fullWidth
// //         >
// //           <DialogTitle>
// //             <Box display="flex" alignItems="center" gap={2}>
// //               <AnalyticsIcon />
// //               <Typography variant="h5" fontWeight="bold">
// //                 ניתוח מבחנים
// //               </Typography>
// //             </Box>
// //           </DialogTitle>

// //           <DialogContent>
// //             <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
// //               בחר את הקבצים לניתוח. יש לבחור לפחות מבחן פתור אחד ומבחן תלמיד אחד.
// //             </Typography>

// //             <Box sx={{ '& .MuiFormControlLabel-root': { width: '100%' } }}>
// //               {getAnalysisFiles().map((file) => (
// //                 <Card
// //                   key={file.id}
// //                   sx={{
// //                     mb: 2,
// //                     cursor: 'pointer',
// //                     border: selectedFiles.includes(file.fileName) ? '2px solid #2196f3' : '1px solid #e0e0e0',
// //                     '&:hover': { bgcolor: '#f5f5f5' }
// //                   }}
// //                   onClick={() => {
// //                     if (selectedFiles.includes(file.fileName)) {
// //                       setSelectedFiles(selectedFiles.filter(f => f !== file.fileName));
// //                     } else {
// //                       setSelectedFiles([...selectedFiles, file.fileName]);
// //                     }
// //                   }}
// //                 >
// //                   <CardContent sx={{ p: 2 }}>
// //                     <Box display="flex" alignItems="center" gap={2}>
// //                       <Box
// //                         sx={{
// //                           width: 20,
// //                           height: 20,
// //                           borderRadius: '50%',
// //                           border: '2px solid #2196f3',
// //                           bgcolor: selectedFiles.includes(file.fileName) ? '#2196f3' : 'transparent',
// //                           display: 'flex',
// //                           alignItems: 'center',
// //                           justifyContent: 'center'
// //                         }}
// //                       >
// //                         {selectedFiles.includes(file.fileName) && (
// //                           <CheckCircle sx={{ fontSize: 12, color: 'white' }} />
// //                         )}
// //                       </Box>

// //                       <FileText />

// //                       <Box sx={{ flexGrow: 1 }}>
// //                         <Typography variant="body1" fontWeight="medium">
// //                           {file.fileName}
// //                         </Typography>
// //                         <Typography variant="body2" color="text.secondary">
// //                           {formatFileSize(file.fileSize)} • {formatDate(file.createdDate)}
// //                         </Typography>
// //                       </Box>

// //                       {(file.fileName.toLowerCase().includes('answer') || file.fileName.toLowerCase().includes('teacher')) && (
// //                         <Chip
// //                           label="מבחן פתור"
// //                           size="small"
// //                           color="success"
// //                         />
// //                       )}
// //                     </Box>
// //                   </CardContent>
// //                 </Card>
// //               ))}
// //             </Box>

// //             {selectedFiles.length > 0 && (
// //               <Alert severity="info" sx={{ mt: 2 }}>
// //                 נבחרו {selectedFiles.length} קבצים לניתוח
// //               </Alert>
// //             )}
// //           </DialogContent>

// //           <DialogActions sx={{ p: 3, gap: 2 }}>
// //             <Button
// //               onClick={() => setAnalysisDialogOpen(false)}
// //               variant="outlined"
// //               color="inherit"
// //             >
// //               ביטול
// //             </Button>
// //             <Button
// //               onClick={handleAnalyzeExams}
// //               variant="contained"
// //               disabled={selectedFiles.length < 2 || analysisLoading}
// //               startIcon={analysisLoading ? <CircularProgress size={20} /> : <AnalyticsIcon />}
// //               sx={{ minWidth: 120 }}
// //             >
// //               {analysisLoading ? 'מנתח...' : 'התחל ניתוח'}
// //             </Button>
// //           </DialogActions>
// //         </Dialog>

// //         {/* Snackbar for notifications */}
// //         <Snackbar
// //           open={snackbarOpen}
// //           autoHideDuration={6000}
// //           onClose={() => setSnackbarOpen(false)}
// //         >
// //           <Alert
// //             onClose={() => setSnackbarOpen(false)}
// //             severity={snackbarSeverity}
// //             sx={{ width: '100%' }}
// //           >
// //             {snackbarMessage}
// //           </Alert>
// //         </Snackbar>
// //       </Box>

// //       <FileUploader />
// //     </>
// //   );
// // });

// // export default ClassExamsPage;
// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import {
//   Box,
//   Container,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   IconButton,
//   ToggleButton,
//   ToggleButtonGroup,
//   InputAdornment,
//   CircularProgress,
//   Button,
//   Avatar,
//   Divider,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Chip,
//   Alert,
//   Snackbar,
//   Tooltip,
// } from "@mui/material"
// import {
//   Description as FileText,
//   Download,
//   CalendarToday as Calendar,
//   Person as User,
//   MenuBook as BookOpen,
//   Group as Users,
//   Search,
//   GridView as Grid,
//   ViewList as ListIcon,
//   Refresh as RefreshCw,
//   Analytics as AnalyticsIcon,
//   CheckCircle,
//   Cancel,
//   Warning,
//   Visibility as VisibilityIcon,
//   HourglassEmpty as HourglassEmptyIcon,
//   SelectAll as SelectAllIcon,
// } from "@mui/icons-material"
// import type { MyFile } from "../types/myFile"
// import axios from "axios"
// import FileUploader from "./FileUploader"
// import fileStore from "../stores/fileStore"
// import DetailsStore from "../stores/DetailsStore"
// import examAnalysisStore from "../stores/ExamAnalysisStore"
// import StudentExamResults from "./StudentExamResults"
// import type { StudentTestFeedback } from "../types/StudentTestFeedback"
// import { observer } from "mobx-react-lite"
// import * as XLSX from "xlsx"
// import { saveAs } from "file-saver"

// // Extended interface to track exam status
// interface ExamFile extends MyFile {
//   isChecked: boolean
//   hasFeedback?: boolean
//   analysisStatus?: "waiting" | "checked" | "analyzing"
// }

// const ClassExamsPage: React.FC = observer(() => {
//   const [files, setFiles] = useState<ExamFile[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [viewMode, setViewMode] = useState("grid")
//   const [sortBy, setSortBy] = useState("createdDate")
//   const [selectedFile, setSelectedFile] = useState<MyFile | null>(null)

//   // Add this new state after the existing states
//   const [statusFilter, setStatusFilter] = useState<"all" | "checked" | "unchecked" | "analyzing">("all")

//   // Exam analysis states
//   const [analysisDialogOpen, setAnalysisDialogOpen] = useState(false)
//   const [analysisLoading, setAnalysisLoading] = useState(false)
//   const [analysisResults, setAnalysisResults] = useState<StudentTestFeedback[]>([])
//   const [selectedFiles, setSelectedFiles] = useState<string[]>([])
//   const [snackbarOpen, setSnackbarOpen] = useState(false)
//   const [snackbarMessage, setSnackbarMessage] = useState("")
//   const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("info")

//   // New state for tracking exam statuses
//   const [examStatuses, setExamStatuses] = useState<{ [key: string]: "waiting" | "checked" | "analyzing" }>({})
//   const [examFeedbacks, setExamFeedbacks] = useState<{ [key: string]: StudentTestFeedback[] }>({})

//   const exportToExcel = (students: StudentTestFeedback[], fileName: string) => {
//     // Create data for Excel export
//     const excelData = students.map((student) => ({
//       "שם התלמיד": student.studentName,
//       "ציון סופי": student.finalGrade,
//       "מספר שאלות": student.feedback.length,
//       "הערות למורה": student.noteToTeacher || "",
//     }))

//     const worksheet = XLSX.utils.json_to_sheet(excelData)
//     const workbook = XLSX.utils.book_new()
//     XLSX.utils.book_append_sheet(workbook, worksheet, "ציונים")

//     // Auto-size columns
//     const colWidths = [
//       { wch: 20 }, // שם התלמיד
//       { wch: 10 }, // ציון סופי
//       { wch: 15 }, // מספר שאלות
//       { wch: 30 }, // הערות למורה
//     ]
//     worksheet["!cols"] = colWidths

//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
//     const data = new Blob([excelBuffer], { type: "application/octet-stream" })
//     saveAs(data, `${fileName}_ציונים.xlsx`)
//   }

//   const handleOpenFile = async (file: MyFile) => {
//     try {
//       console.log(file, "fileName")

//       const token = sessionStorage.getItem("token")
//       if (!token) {
//         console.error("No access token found.")
//         return
//       }

//       const response = await axios.get(`https://localhost:7213/api/download/download-url/${file.fileName}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       console.log("response", response.data)

//       const newUrl = response.data

//       if (newUrl) {
//         const updatedFile = { ...file, filePath: newUrl }
//         setSelectedFile(updatedFile)
//       } else {
//         showSnackbar("לא התקבל קישור תקין מהשרת", "error")
//       }
//     } catch (error) {
//       console.error("שגיאה בקריאת הקובץ:", error)
//       showSnackbar("אירעה שגיאה בעת ניסיון לפתוח את הקובץ", "error")
//     }
//   }

//   // Check if answer file exists for exam analysis
//   const hasAnswerFile = () => {
//     return files.some(
//       (file) => file.fileName.toLowerCase().includes("answer") || file.fileName.toLowerCase().includes("teacher"),
//     )
//   }

//   // Get available files for analysis
//   const getAnalysisFiles = () => {
//     return files.filter(
//       (file) =>
//         file.fileName.toLowerCase().includes("answer") ||
//         file.fileName.toLowerCase().includes("teacher") ||
//         (!file.fileName.toLowerCase().includes("answer") && !file.fileName.toLowerCase().includes("teacher")),
//     )
//   }

//   // NEW: Select all exams for analysis
//   const handleSelectAllExams = () => {
//     const allFileNames = getAnalysisFiles().map((file) => file.fileName)
//     setSelectedFiles(allFileNames)
//     showSnackbar(`נבחרו ${allFileNames.length} קבצים לניתוח`, "info")
//   }

//   // NEW: Get exam status
//   const getExamStatus = (fileName: string): "waiting" | "checked" | "analyzing" => {
//     return examStatuses[fileName] || "waiting"
//   }

//   // NEW: Check if exam has feedback
//   const hasExamFeedback = (fileName: string): boolean => {
//     return !!examFeedbacks[fileName] && examFeedbacks[fileName].length > 0
//   }

//   // NEW: View exam feedback
//   const handleViewFeedback = (fileName: string, event: React.MouseEvent) => {
//     event.stopPropagation() // Prevent card click
//     const feedback = examFeedbacks[fileName]
//     if (feedback) {
//       examAnalysisStore.setResults(feedback)
//       showSnackbar(`מציג משוב עבור ${fileName}`, "info")
//     }
//   }

//   // Handle exam analysis with enhanced functionality
//   const handleAnalyzeExams = async () => {
//     if (selectedFiles.length < 2) {
//       showSnackbar("יש לבחור לפחות מבחן פתור אחד ומבחן תלמיד אחד", "warning")
//       return
//     }

//     setAnalysisLoading(true)

//     // Update status to analyzing for selected files
//     const newStatuses = { ...examStatuses }
//     selectedFiles.forEach((fileName) => {
//       newStatuses[fileName] = "analyzing"
//     })
//     setExamStatuses(newStatuses)

//     try {
//       const token = sessionStorage.getItem("token")
//       if (!token) {
//         showSnackbar("לא נמצא טוקן גישה", "error")
//         return
//       }

//       const response = await axios.post("https://localhost:7213/api/ExamAnalysis/analyze-class", selectedFiles, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })

//       examAnalysisStore.setResults(response.data)

//       // Update status to checked and store feedback
//       const updatedStatuses = { ...examStatuses }
//       const updatedFeedbacks = { ...examFeedbacks }

//       selectedFiles.forEach((fileName) => {
//         updatedStatuses[fileName] = "checked"
//         updatedFeedbacks[fileName] = response.data
//       })

//       setExamStatuses(updatedStatuses)
//       setExamFeedbacks(updatedFeedbacks)

//       // Auto-download Excel file
//       const currentDate = new Date().toLocaleDateString("he-IL").replace(/\//g, "-")
//       const fileName = `מבחנים_${DetailsStore.currentClass.name || "כיתה"}_${currentDate}`
//       exportToExcel(response.data, fileName)

//       showSnackbar(`ניתוח הושלם בהצלחה עבור ${response.data.length} תלמידים. קובץ אקסל הורד למחשב`, "success")
//       setAnalysisDialogOpen(false)
//     } catch (error: any) {
//       // Reset status to waiting on error
//       const resetStatuses = { ...examStatuses }
//       selectedFiles.forEach((fileName) => {
//         resetStatuses[fileName] = "waiting"
//       })
//       setExamStatuses(resetStatuses)

//       const errorMessage = error.response?.data?.message || "אירעה שגיאה בניתוח המבחנים"
//       showSnackbar(errorMessage, "error")
//     } finally {
//       setAnalysisLoading(false)
//     }
//   }

//   // Show snackbar message
//   const showSnackbar = (message: string, severity: "success" | "error" | "warning" | "info") => {
//     setSnackbarMessage(message)
//     setSnackbarSeverity(severity)
//     setSnackbarOpen(true)
//   }

//   // Get status color and icon
//   const getStatusInfo = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "correct":
//       case "נכון":
//         return { color: "success", icon: <CheckCircle /> }
//       case "incorrect":
//       case "שגוי":
//         return { color: "error", icon: <Cancel /> }
//       case "partial":
//       case "חלקי":
//         return { color: "warning", icon: <Warning /> }
//       default:
//         return { color: "default", icon: <Warning /> }
//     }
//   }

//   // NEW: Get status chip for exam
//   const getStatusChip = (fileName: string) => {
//     const status = getExamStatus(fileName)
//     switch (status) {
//       case "checked":
//         return <Chip icon={<CheckCircle />} label="נבדק" color="success" size="small" sx={{ fontSize: "0.7rem" }} />
//       case "analyzing":
//         return (
//           <Chip
//             icon={<CircularProgress size={12} />}
//             label="מנתח"
//             color="info"
//             size="small"
//             sx={{ fontSize: "0.7rem" }}
//           />
//         )
//       default:
//         return (
//           <Chip icon={<HourglassEmptyIcon />} label="ממתין" color="warning" size="small" sx={{ fontSize: "0.7rem" }} />
//         )
//     }
//   }

//   // Fetch files from API
//   useEffect(() => {
//     fetchFiles()
//   }, [])

//   const fetchFiles = async () => {
//     try {
//       const data = fileStore.teacherFiles.filter(
//         (f) => f.subjectId == DetailsStore.currentSubject.id && f.classId == DetailsStore.currentClass.id,
//       )

//       if (Array.isArray(data)) {
//         setFiles(data)
//       } else {
//         console.error("השרת לא החזיר מערך:", data)
//         setFiles([])
//       }
//     } catch (err: any) {
//       setError(err.message)
//       setFiles([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Format file size
//   const formatFileSize = (bytes: any) => {
//     if (bytes === 0) return "0 Bytes"
//     const k = 1024
//     const sizes = ["Bytes", "KB", "MB", "GB"]
//     const i = Math.floor(Math.log(bytes) / Math.log(k))
//     return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
//   }

//   // Format date
//   const formatDate = (dateString: any) => {
//     return new Date(dateString).toLocaleDateString("he-IL", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   // Filter and sort files with status filter
//   const filteredFiles = files
//     .filter(
//       (file) =>
//         file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         file.description?.toLowerCase().includes(searchTerm.toLowerCase()),
//     )
//     .filter((file) => {
//       // Apply status filter
//       if (statusFilter === "all") return true
//       const status = getExamStatus(file.fileName)
//       switch (statusFilter) {
//         case "checked":
//           return status === "checked"
//         case "unchecked":
//           return status === "waiting"
//         case "analyzing":
//           return status === "analyzing"
//         default:
//           return true
//       }
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case "name":
//           return a.fileName.localeCompare(b.fileName)
//         case "size":
//           return b.fileSize - a.fileSize
//         case "createdDate":
//           return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
//         default:
//           return 0
//       }
//     })

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Box textAlign="center">
//           <CircularProgress size={60} sx={{ color: "#2196f3", mb: 2 }} />
//           <Typography variant="h6" color="text.secondary">
//             טוען קבצים...
//           </Typography>
//         </Box>
//       </Box>
//     )
//   }

//   if (error) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #ffebee 0%, #f8bbd9 100%)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Card sx={{ maxWidth: 400, p: 4, textAlign: "center" }}>
//           <Avatar sx={{ bgcolor: "#ffcdd2", width: 64, height: 64, mx: "auto", mb: 2 }}>
//             <FileText sx={{ fontSize: 32, color: "#f44336" }} />
//           </Avatar>
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             שגיאה בטעינה
//           </Typography>
//           <Typography color="text.secondary" paragraph>
//             {error}
//           </Typography>
//           <Button variant="contained" color="error" onClick={fetchFiles} sx={{ borderRadius: 2 }}>
//             נסה שוב
//           </Button>
//         </Card>
//       </Box>
//     )
//   }

//   return (
//     <>
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #f5f5f5 0%, #e3f2fd 50%, #bbdefb 100%)",
//           direction: "rtl",
//         }}
//       >
//         <Container maxWidth="xl" sx={{ py: 4 }}>
//           {/* Header */}
//           <Card sx={{ mb: 4, borderRadius: 4, overflow: "hidden" }}>
//             <Box
//               sx={{
//                 background: "linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)",
//                 color: "white",
//                 p: 4,
//               }}
//             >
//               <Box display="flex" alignItems="center" justifyContent="space-between">
//                 <Box display="flex" alignItems="center" gap={2}>
//                   <FileText sx={{ fontSize: 32 }} />
//                   <Box>
//                     <Typography variant="h3" fontWeight="bold">
//                       רשימת הקבצים שלי
//                     </Typography>
//                     <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
//                       ניהול וצפייה בכל הקבצים שלך במקום אחד
//                     </Typography>
//                   </Box>
//                 </Box>

//                 {/* Enhanced Analysis Buttons */}
//                 {hasAnswerFile() && (
//                   <Box display="flex" gap={2}>
//                     <Button
//                       variant="contained"
//                       startIcon={<SelectAllIcon />}
//                       onClick={handleSelectAllExams}
//                       sx={{
//                         bgcolor: "rgba(255, 255, 255, 0.15)",
//                         "&:hover": { bgcolor: "rgba(255, 255, 255, 0.25)" },
//                         borderRadius: 3,
//                       }}
//                     >
//                       בחר הכל
//                     </Button>
//                     <Button
//                       variant="contained"
//                       startIcon={<AnalyticsIcon />}
//                       onClick={() => setAnalysisDialogOpen(true)}
//                       sx={{
//                         bgcolor: "rgba(255, 255, 255, 0.2)",
//                         "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
//                         borderRadius: 3,
//                       }}
//                     >
//                       נתח מבחנים
//                     </Button>
//                   </Box>
//                 )}
//               </Box>
//             </Box>

//             {/* Controls */}
//             <Box sx={{ p: 3, bgcolor: "#f5f5f5", borderBottom: 1, borderColor: "divider" }}>
//               <Box
//                 display="flex"
//                 flexDirection={{ xs: "column", lg: "row" }}
//                 gap={2}
//                 alignItems="center"
//                 justifyContent="space-between"
//               >
//                 {/* Search */}
//                 <TextField
//                   placeholder="חיפוש קבצים..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   sx={{ flexGrow: 1, maxWidth: 400 }}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Search />
//                       </InputAdornment>
//                     ),
//                     sx: { borderRadius: 3 },
//                   }}
//                 />

//                 {/* Controls */}
//                 <Box display="flex" alignItems="center" gap={2}>
//                   {/* Status Filter Buttons */}
//                   <Box display="flex" gap={1}>
//                     <Button
//                       variant={statusFilter === "all" ? "contained" : "outlined"}
//                       size="small"
//                       onClick={() => setStatusFilter("all")}
//                       sx={{ minWidth: 80 }}
//                     >
//                       הכל ({filteredFiles.length})
//                     </Button>
//                     <Button
//                       variant={statusFilter === "checked" ? "contained" : "outlined"}
//                       size="small"
//                       color="success"
//                       onClick={() => setStatusFilter("checked")}
//                       sx={{ minWidth: 80 }}
//                     >
//                       נבדקו ({filteredFiles.filter((f) => getExamStatus(f.fileName) === "checked").length})
//                     </Button>
//                     <Button
//                       variant={statusFilter === "unchecked" ? "contained" : "outlined"}
//                       size="small"
//                       color="warning"
//                       onClick={() => setStatusFilter("unchecked")}
//                       sx={{ minWidth: 80 }}
//                     >
//                       ממתינים ({filteredFiles.filter((f) => getExamStatus(f.fileName) === "waiting").length})
//                     </Button>
//                     <Button
//                       variant={statusFilter === "analyzing" ? "contained" : "outlined"}
//                       size="small"
//                       color="info"
//                       onClick={() => setStatusFilter("analyzing")}
//                       sx={{ minWidth: 80 }}
//                     >
//                       מנתחים ({filteredFiles.filter((f) => getExamStatus(f.fileName) === "analyzing").length})
//                     </Button>
//                   </Box>

//                   {/* Sort */}
//                   <FormControl size="small" sx={{ minWidth: 150 }}>
//                     <InputLabel>מיון</InputLabel>
//                     <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="מיון">
//                       <MenuItem value="createdDate">מיון לפי תאריך</MenuItem>
//                       <MenuItem value="name">מיון לפי שם</MenuItem>
//                       <MenuItem value="size">מיון לפי גודל</MenuItem>
//                     </Select>
//                   </FormControl>

//                   {/* View Mode */}
//                   <ToggleButtonGroup
//                     value={viewMode}
//                     exclusive
//                     onChange={(e, newMode) => newMode && setViewMode(newMode)}
//                     size="small"
//                   >
//                     <ToggleButton value="grid">
//                       <Grid />
//                     </ToggleButton>
//                     <ToggleButton value="list">
//                       <ListIcon />
//                     </ToggleButton>
//                   </ToggleButtonGroup>

//                   {/* Refresh */}
//                   <IconButton onClick={fetchFiles} color="primary" title="רענן">
//                     <RefreshCw />
//                   </IconButton>
//                 </Box>
//               </Box>
//             </Box>

//             {/* Stats */}
//             <CardContent sx={{ py: 2 }}>
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Box display="flex" gap={4}>
//                   <Typography variant="body2" color="text.secondary">
//                     סה״כ {filteredFiles.length} קבצים
//                     {statusFilter !== "all" && (
//                       <Chip
//                         label={`מסונן: ${statusFilter === "checked" ? "נבדקו" : statusFilter === "unchecked" ? "ממתינים" : "מנתחים"}`}
//                         size="small"
//                         sx={{ ml: 1, fontSize: "0.7rem" }}
//                         onDelete={() => setStatusFilter("all")}
//                       />
//                     )}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     נבדקו: {files.filter((f) => getExamStatus(f.fileName) === "checked").length} | ממתינים:{" "}
//                     {files.filter((f) => getExamStatus(f.fileName) === "waiting").length} | מנתחים:{" "}
//                     {files.filter((f) => getExamStatus(f.fileName) === "analyzing").length}
//                   </Typography>
//                 </Box>
//                 <Typography variant="body2" color="text.secondary">
//                   גודל כולל: {formatFileSize(filteredFiles.reduce((sum, file) => sum + file.fileSize, 0))}
//                 </Typography>
//               </Box>
//             </CardContent>
//           </Card>

//           {/* Files Display */}
//           {filteredFiles.length === 0 ? (
//             <Card sx={{ p: 8, textAlign: "center", borderRadius: 4 }}>
//               <Avatar sx={{ bgcolor: "#f5f5f5", width: 96, height: 96, mx: "auto", mb: 2 }}>
//                 <FileText sx={{ fontSize: 48, color: "#bdbdbd" }} />
//               </Avatar>
//               <Typography variant="h5" fontWeight="bold" gutterBottom>
//                 לא נמצאו קבצים
//               </Typography>
//               <Typography color="text.secondary">נסה לשנות את תנאי החיפוש או העלה קבצים חדשים</Typography>
//             </Card>
//           ) : viewMode === "grid" ? (
//             <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 3 }}>
//               {filteredFiles.map((file) => (
//                 <Card
//                   key={file.id}
//                   onClick={() => handleOpenFile(file)}
//                   sx={{
//                     height: "100%",
//                     borderRadius: 4,
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "translateY(-4px)",
//                       boxShadow: 6,
//                       bgcolor: "#f0f8ff",
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 3 }}>
//                     {/* Header */}
//                     <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                       <Avatar
//                         sx={{
//                           bgcolor: "primary.main",
//                           background: "linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)",
//                           width: 48,
//                           height: 48,
//                         }}
//                       >
//                         <FileText />
//                       </Avatar>
//                       <Box display="flex" gap={1} alignItems="center">
//                         {/* Status Chip */}
//                         {getStatusChip(file.fileName)}

//                         {/* Eye Icon for Feedback */}
//                         {hasExamFeedback(file.fileName) && getExamStatus(file.fileName) === "checked" && (
//                           <Tooltip title="צפה במשוב">
//                             <IconButton
//                               size="small"
//                               onClick={(e) => handleViewFeedback(file.fileName, e)}
//                               sx={{
//                                 color: "success.main",
//                                 "&:hover": { bgcolor: "success.50" },
//                               }}
//                             >
//                               <VisibilityIcon />
//                             </IconButton>
//                           </Tooltip>
//                         )}

//                         {/* Answer File Chip */}
//                         {(file.fileName.toLowerCase().includes("answer") ||
//                           file.fileName.toLowerCase().includes("teacher")) && (
//                           <Chip label="מבחן פתור" size="small" color="success" sx={{ fontSize: "0.7rem" }} />
//                         )}

//                         <IconButton size="small" sx={{ "&:hover": { bgcolor: "primary.50", color: "primary.main" } }}>
//                           <Download />
//                         </IconButton>
//                       </Box>
//                     </Box>

//                     {/* Title */}
//                     <Typography variant="h6" fontWeight="bold" gutterBottom noWrap title={file.fileName}>
//                       {file.fileName}
//                     </Typography>

//                     {/* Description */}
//                     {file.description && (
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{
//                           mb: 2,
//                           display: "-webkit-box",
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden",
//                         }}
//                       >
//                         {file.description}
//                       </Typography>
//                     )}

//                     {/* Details */}
//                     <Box sx={{ mb: 2, "& > *": { mb: 1 } }}>
//                       <Box display="flex" alignItems="center" gap={1}>
//                         <User sx={{ fontSize: 16, color: "text.secondary" }} />
//                         <Typography variant="body2" color="text.secondary">
//                           משתמש {file.userId}
//                         </Typography>
//                       </Box>
//                       <Box display="flex" alignItems="center" gap={1}>
//                         <BookOpen sx={{ fontSize: 16, color: "text.secondary" }} />
//                         <Typography variant="body2" color="text.secondary">
//                           נושא {file.subjectId}
//                         </Typography>
//                       </Box>
//                       <Box display="flex" alignItems="center" gap={1}>
//                         <Users sx={{ fontSize: 16, color: "text.secondary" }} />
//                         <Typography variant="body2" color="text.secondary">
//                           כיתה {file.classId}
//                         </Typography>
//                       </Box>
//                       <Box display="flex" alignItems="center" gap={1}>
//                         <Calendar sx={{ fontSize: 16, color: "text.secondary" }} />
//                         <Typography variant="body2" color="text.secondary">
//                           {formatDate(file.createdDate)}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     <Divider sx={{ mb: 2 }} />

//                     {/* Footer */}
//                     <Box display="flex" justifyContent="space-between" alignItems="center">
//                       <Typography variant="body2" fontWeight="medium">
//                         {formatFileSize(file.fileSize)}
//                       </Typography>
//                       <Box
//                         sx={{
//                           width: 8,
//                           height: 8,
//                           bgcolor:
//                             getExamStatus(file.fileName) === "checked"
//                               ? "success.main"
//                               : getExamStatus(file.fileName) === "analyzing"
//                                 ? "info.main"
//                                 : "warning.main",
//                           borderRadius: "50%",
//                         }}
//                       />
//                     </Box>
//                   </CardContent>
//                 </Card>
//               ))}
//             </Box>
//           ) : (
//             <Box sx={{ "& > *": { mb: 2 } }}>
//               {filteredFiles.map((file) => (
//                 <Card
//                   key={file.id}
//                   onClick={() => handleOpenFile(file)}
//                   sx={{
//                     borderRadius: 4,
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "translateY(-2px)",
//                       boxShadow: 4,
//                       bgcolor: "#f0f8ff",
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 2 }}>
//                     <Box display="flex" alignItems="center" gap={2}>
//                       <Avatar
//                         sx={{
//                           bgcolor: "primary.main",
//                           background: "linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)",
//                           width: 48,
//                           height: 48,
//                         }}
//                       >
//                         <FileText />
//                       </Avatar>

//                       <Box sx={{ flexGrow: 1, minWidth: 0 }}>
//                         <Box display="flex" alignItems="center" gap={2}>
//                           <Typography variant="h6" fontWeight="bold" noWrap>
//                             {file.fileName}
//                           </Typography>
//                           {/* Status Chip */}
//                           {getStatusChip(file.fileName)}
//                           {(file.fileName.toLowerCase().includes("answer") ||
//                             file.fileName.toLowerCase().includes("teacher")) && (
//                             <Chip label="מבחן פתור" size="small" color="success" sx={{ fontSize: "0.7rem" }} />
//                           )}
//                         </Box>
//                         <Box display="flex" gap={3} mt={0.5}>
//                           <Typography variant="body2" color="text.secondary">
//                             משתמש {file.userId}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             נושא {file.subjectId}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             כיתה {file.classId}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             {formatDate(file.createdDate)}
//                           </Typography>
//                         </Box>
//                         {file.description && (
//                           <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.5 }}>
//                             {file.description}
//                           </Typography>
//                         )}
//                       </Box>

//                       <Box display="flex" alignItems="center" gap={2}>
//                         {/* Eye Icon for Feedback */}
//                         {hasExamFeedback(file.fileName) && getExamStatus(file.fileName) === "checked" && (
//                           <Tooltip title="צפה במשוב">
//                             <IconButton
//                               size="small"
//                               onClick={(e) => handleViewFeedback(file.fileName, e)}
//                               sx={{
//                                 color: "success.main",
//                                 "&:hover": { bgcolor: "success.50" },
//                               }}
//                             >
//                               <VisibilityIcon />
//                             </IconButton>
//                           </Tooltip>
//                         )}

//                         <Typography variant="body2" fontWeight="medium">
//                           {formatFileSize(file.fileSize)}
//                         </Typography>
//                         <IconButton size="small" sx={{ "&:hover": { bgcolor: "primary.50", color: "primary.main" } }}>
//                           <Download />
//                         </IconButton>
//                       </Box>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               ))}
//             </Box>
//           )}

//           {/* File Preview */}
//           {selectedFile && (
//             <Card sx={{ mt: 4, p: 2, borderRadius: 4 }}>
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 תצוגה מקדימה של הקובץ: {selectedFile.fileName}
//               </Typography>
//               <Box
//                 sx={{
//                   width: "100%",
//                   height: "80vh",
//                   border: "1px solid #ccc",
//                   borderRadius: 2,
//                   overflow: "hidden",
//                 }}
//               >
//                 <iframe
//                   src={selectedFile.filePath}
//                   width="100%"
//                   height="100%"
//                   style={{ border: "none" }}
//                   title="תצוגת קובץ"
//                 />
//               </Box>
//               <Button variant="outlined" color="error" onClick={() => setSelectedFile(null)} sx={{ mt: 2 }}>
//                 סגור תצוגה
//               </Button>
//             </Card>
//           )}

//           {/* Analysis Results */}
//           {examAnalysisStore.analysisResults.length > 0 && (
//             <Card sx={{ mt: 4, borderRadius: 4 }}>
//               <Box sx={{ p: 2, bgcolor: "success.light", color: "white" }}>
//                 <Typography variant="h5" fontWeight="bold">
//                   תוצאות ניתוח מבחנים
//                 </Typography>
//                 <Typography variant="body2">{examAnalysisStore.analysisResults.length} תלמידים נותחו</Typography>
//               </Box>
//               <CardContent>
//                 <StudentExamResults results={examAnalysisStore.analysisResults} />
//               </CardContent>
//             </Card>
//           )}
//         </Container>

//         {/* Analysis Dialog */}
//         <Dialog open={analysisDialogOpen} onClose={() => setAnalysisDialogOpen(false)} maxWidth="md" fullWidth>
//           <DialogTitle>
//             <Box display="flex" alignItems="center" gap={2}>
//               <AnalyticsIcon />
//               <Typography variant="h5" fontWeight="bold">
//                 ניתוח מבחנים
//               </Typography>
//             </Box>
//           </DialogTitle>

//           <DialogContent>
//             <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//               בחר את הקבצים לניתוח. יש לבחור לפחות מבחן פתור אחד ומבחן תלמיד אחד.
//             </Typography>

//             {/* Select All Button in Dialog */}
//             <Box sx={{ mb: 3 }}>
//               <Button variant="outlined" startIcon={<SelectAllIcon />} onClick={handleSelectAllExams} sx={{ mr: 2 }}>
//                 בחר הכל
//               </Button>
//               <Button variant="outlined" onClick={() => setSelectedFiles([])}>
//                 נקה בחירה
//               </Button>
//             </Box>

//             <Box sx={{ "& .MuiFormControlLabel-root": { width: "100%" } }}>
//               {getAnalysisFiles().map((file) => (
//                 <Card
//                   key={file.id}
//                   sx={{
//                     mb: 2,
//                     cursor: "pointer",
//                     border: selectedFiles.includes(file.fileName) ? "2px solid #2196f3" : "1px solid #e0e0e0",
//                     "&:hover": { bgcolor: "#f5f5f5" },
//                   }}
//                   onClick={() => {
//                     if (selectedFiles.includes(file.fileName)) {
//                       setSelectedFiles(selectedFiles.filter((f) => f !== file.fileName))
//                     } else {
//                       setSelectedFiles([...selectedFiles, file.fileName])
//                     }
//                   }}
//                 >
//                   <CardContent sx={{ p: 2 }}>
//                     <Box display="flex" alignItems="center" gap={2}>
//                       <Box
//                         sx={{
//                           width: 20,
//                           height: 20,
//                           borderRadius: "50%",
//                           border: "2px solid #2196f3",
//                           bgcolor: selectedFiles.includes(file.fileName) ? "#2196f3" : "transparent",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         {selectedFiles.includes(file.fileName) && <CheckCircle sx={{ fontSize: 12, color: "white" }} />}
//                       </Box>

//                       <FileText />

//                       <Box sx={{ flexGrow: 1 }}>
//                         <Typography variant="body1" fontWeight="medium">
//                           {file.fileName}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {formatFileSize(file.fileSize)} • {formatDate(file.createdDate)}
//                         </Typography>
//                       </Box>

//                       {/* Status and Type Chips */}
//                       <Box display="flex" gap={1}>
//                         {getStatusChip(file.fileName)}
//                         {(file.fileName.toLowerCase().includes("answer") ||
//                           file.fileName.toLowerCase().includes("teacher")) && (
//                           <Chip label="מבחן פתור" size="small" color="success" />
//                         )}
//                       </Box>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               ))}
//             </Box>

//             {selectedFiles.length > 0 && (
//               <Alert severity="info" sx={{ mt: 2 }}>
//                 נבחרו {selectedFiles.length} קבצים לניתוח
//               </Alert>
//             )}
//           </DialogContent>

//           <DialogActions sx={{ p: 3, gap: 2 }}>
//             <Button onClick={() => setAnalysisDialogOpen(false)} variant="outlined" color="inherit">
//               ביטול
//             </Button>
//             <Button
//               onClick={handleAnalyzeExams}
//               variant="contained"
//               disabled={selectedFiles.length < 2 || analysisLoading}
//               startIcon={analysisLoading ? <CircularProgress size={20} /> : <AnalyticsIcon />}
//               sx={{ minWidth: 120 }}
//             >
//               {analysisLoading ? "מנתח..." : "התחל ניתוח"}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Snackbar for notifications */}
//         <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
//           <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </Box>

//       <FileUploader />
//     </>
//   )
// })

// export default ClassExamsPage
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  CircularProgress,
  Button,
  Avatar,
  Divider,
  Chip,
  Alert,
  Snackbar,
  Tooltip,
  LinearProgress,
  Checkbox,
} from "@mui/material"
import {
  Description as FileText,
  Download,
  CalendarToday as Calendar,
  Person as User,
  MenuBook as BookOpen,
  Group as Users,
  Search,
  GridView as Grid,
  ViewList as ListIcon,
  Refresh as RefreshCw,
  CheckCircle,
  Visibility as VisibilityIcon,
  HourglassEmpty as HourglassEmptyIcon,
  SelectAll as SelectAllIcon,
  PlayArrow as PlayArrowIcon,
} from "@mui/icons-material"
import type { MyFile } from "../types/myFile"
import axios from "axios"
import FileUploader from "./FileUploader"
import fileStore from "../stores/fileStore"
import DetailsStore from "../stores/DetailsStore"
import examAnalysisStore from "../stores/ExamAnalysisStore"
import StudentExamResults from "./StudentExamResults"
import type { StudentTestFeedback } from "../types/StudentTestFeedback"
import { observer } from "mobx-react-lite"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

// Extended interface to track exam status
interface ExamFile extends MyFile {
  isChecked: boolean
  hasFeedback?: boolean
  analysisStatus?: "waiting" | "checked" | "analyzing"
  analysisProgress?: number
  isSelected?: boolean
}

const ClassExamsPage: React.FC = observer(() => {
  const [files, setFiles] = useState<ExamFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("createdDate")
  const [selectedFile, setSelectedFile] = useState<MyFile | null>(null)

  // Status filter state
  const [statusFilter, setStatusFilter] = useState<"all" | "checked" | "unchecked" | "analyzing">("all")

  // Analysis states - simplified without dialog
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("info")

  // Enhanced analysis tracking
  const [examStatuses, setExamStatuses] = useState<{ [key: string]: "waiting" | "checked" | "analyzing" }>({})
  const [examFeedbacks, setExamFeedbacks] = useState<{ [key: string]: StudentTestFeedback[] }>({})
  const [analysisProgress, setAnalysisProgress] = useState<{ [key: string]: number }>({})
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const exportToExcel = (students: StudentTestFeedback[], fileName: string) => {
    const excelData = students.map((student) => ({
      "שם התלמיד": student.studentName,
      "ציון סופי": student.finalGrade,
      "מספר שאלות": student.feedback.length,
      "הערות למורה": student.noteToTeacher || "",
    }))

    const worksheet = XLSX.utils.json_to_sheet(excelData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "ציונים")

    const colWidths = [
      { wch: 20 }, // שם התלמיד
      { wch: 10 }, // ציון סופי
      { wch: 15 }, // מספר שאלות
      { wch: 30 }, // הערות למורה
    ]
    worksheet["!cols"] = colWidths

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const data = new Blob([excelBuffer], { type: "application/octet-stream" })
    saveAs(data, `${fileName}_ציונים.xlsx`)
  }

  const handleOpenFile = async (file: MyFile) => {
    try {
      const token = sessionStorage.getItem("token")
      if (!token) {
        console.error("No access token found.")
        return
      }

      const response = await axios.get(`https://localhost:7213/api/download/download-url/${file.fileName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const newUrl = response.data
      if (newUrl) {
        const updatedFile = { ...file, filePath: newUrl }
        setSelectedFile(updatedFile)
      } else {
        showSnackbar("לא התקבל קישור תקין מהשרת", "error")
      }
    } catch (error) {
      console.error("שגיאה בקריאת הקובץ:", error)
      showSnackbar("אירעה שגיאה בעת ניסיון לפתוח את הקובץ", "error")
    }
  }

  // Check if answer file exists for exam analysis
  const hasAnswerFile = () => {
    return files.some(
      (file) => file.fileName.toLowerCase().includes("answer") || file.fileName.toLowerCase().includes("teacher"),
    )
  }

  // Get available files for analysis
  const getAnalysisFiles = () => {
    return files.filter(
      (file) =>
        file.fileName.toLowerCase().includes("answer") ||
        file.fileName.toLowerCase().includes("teacher") ||
        (!file.fileName.toLowerCase().includes("answer") && !file.fileName.toLowerCase().includes("teacher")),
    )
  }

  // NEW: Toggle individual file selection
  const toggleFileSelection = (fileName: string) => {
    if (selectedFiles.includes(fileName)) {
      setSelectedFiles(selectedFiles.filter((f) => f !== fileName))
    } else {
      setSelectedFiles([...selectedFiles, fileName])
    }
  }

  // NEW: Select all exams for analysis
  const handleSelectAllExams = () => {
    const allFileNames = getAnalysisFiles().map((file) => file.fileName)
    setSelectedFiles(allFileNames)
    showSnackbar(`נבחרו ${allFileNames.length} קבצים לניתוח`, "info")
  }

  // NEW: Clear all selections
  const handleClearSelection = () => {
    setSelectedFiles([])
    showSnackbar("הבחירה נוקתה", "info")
  }

  // Get exam status
  const getExamStatus = (fileName: string): "waiting" | "checked" | "analyzing" => {
    return examStatuses[fileName] || "waiting"
  }

  // Check if exam has feedback
  const hasExamFeedback = (fileName: string): boolean => {
    return !!examFeedbacks[fileName] && examFeedbacks[fileName].length > 0
  }

  // NEW: Get student name from file name
  const getStudentNameFromFileName = (fileName: string): string => {
    // Remove file extension and common prefixes/suffixes
    let studentName = fileName.replace(/\.(pdf|docx?|txt)$/i, "")
    studentName = studentName.replace(/^(exam|test|מבחן|בחינה)[-_\s]*/i, "")
    studentName = studentName.replace(/[-_\s]*(exam|test|מבחן|בחינה)$/i, "")
    return studentName.trim() || fileName
  }

  // NEW: View exam feedback with student name from file
  const handleViewFeedback = (fileName: string, event: React.MouseEvent) => {
    event.stopPropagation()
    const feedback = examFeedbacks[fileName]
    if (feedback) {
      // Update feedback with student name from file name
      const updatedFeedback = feedback.map((student) => ({
        ...student,
        studentName: getStudentNameFromFileName(fileName),
      }))
      examAnalysisStore.setResults(updatedFeedback)
      showSnackbar(`מציג משוב עבור ${getStudentNameFromFileName(fileName)}`, "info")
    }
  }

  // NEW: Simulate progress for individual file analysis
  const simulateAnalysisProgress = (fileName: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5 // Random progress between 5-20%
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        // Mark as completed
        setExamStatuses((prev) => ({ ...prev, [fileName]: "checked" }))
      }
      setAnalysisProgress((prev) => ({ ...prev, [fileName]: progress }))
    }, 500)

    return interval
  }

  // Enhanced exam analysis without dialog
  const handleAnalyzeSelectedExams = async () => {
    if (selectedFiles.length < 2) {
      showSnackbar("יש לבחור לפחות מבחן פתור אחד ומבחן תלמיד אחד", "warning")
      return
    }

    setIsAnalyzing(true)

    // Initialize progress and status for selected files
    const newStatuses = { ...examStatuses }
    const newProgress = { ...analysisProgress }

    selectedFiles.forEach((fileName) => {
      newStatuses[fileName] = "analyzing"
      newProgress[fileName] = 0
    })

    setExamStatuses(newStatuses)
    setAnalysisProgress(newProgress)

    // Start progress simulation for each file
    const intervals: ReturnType<typeof setInterval>[] = []
    selectedFiles.forEach((fileName) => {
      const interval = simulateAnalysisProgress(fileName)
      intervals.push(interval)
    })

    try {
      const token = sessionStorage.getItem("token")
      if (!token) {
        showSnackbar("לא נמצא טוקן גישה", "error")
        return
      }

      const response = await axios.post("https://localhost:7213/api/ExamAnalysis/analyze-class", selectedFiles, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
console.log("Analysis response:", response.data)
      // Clear intervals
      intervals.forEach(clearInterval)

      // Update status to checked and store feedback
      const updatedStatuses = { ...examStatuses }
      const updatedFeedbacks = { ...examFeedbacks }
      const updatedProgress = { ...analysisProgress }

      selectedFiles.forEach((fileName) => {
        updatedStatuses[fileName] = "checked"
        updatedProgress[fileName] = 100
        // Store feedback for each file individually
        const studentName = getStudentNameFromFileName(fileName)
        const studentFeedback = response.data.filter(
          (student: StudentTestFeedback) =>
            student.studentName.includes(studentName) || studentName.includes(student.studentName),
        )
        updatedFeedbacks[fileName] = studentFeedback.length > 0 ? studentFeedback : response.data
      })

      setExamStatuses(updatedStatuses)
      setExamFeedbacks(updatedFeedbacks)
      setAnalysisProgress(updatedProgress)

      examAnalysisStore.setResults(response.data)

      // Auto-download Excel file
      const currentDate = new Date().toLocaleDateString("he-IL").replace(/\//g, "-")
      const fileName = `מבחנים_${DetailsStore.currentClass.name || "כיתה"}_${currentDate}`
      exportToExcel(response.data, fileName)

      showSnackbar(`ניתוח הושלם בהצלחה עבור ${response.data.length} תלמידים. קובץ אקסל הורד למחשב`, "success")

      // Clear selection after successful analysis
      setSelectedFiles([])
    } catch (error: any) {
      // Clear intervals and reset status on error
      intervals.forEach(clearInterval)
      const resetStatuses = { ...examStatuses }
      const resetProgress = { ...analysisProgress }
      selectedFiles.forEach((fileName) => {
        resetStatuses[fileName] = "waiting"
        resetProgress[fileName] = 0
      })
      setExamStatuses(resetStatuses)
      setAnalysisProgress(resetProgress)

      const errorMessage = error.response?.data?.message || "אירעה שגיאה בניתוח המבחנים"
      showSnackbar(errorMessage, "error")
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Show snackbar message
  const showSnackbar = (message: string, severity: "success" | "error" | "warning" | "info") => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  // Get status chip for exam
  const getStatusChip = (fileName: string) => {
    const status = getExamStatus(fileName)
    const progress = analysisProgress[fileName] || 0

    switch (status) {
      case "checked":
        return <Chip icon={<CheckCircle />} label="נבדק" color="success" size="small" sx={{ fontSize: "0.7rem" }} />
      case "analyzing":
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress
              variant="determinate"
              value={progress}
              size={16}
              sx={{
                color: progress < 50 ? "#ff9800" : "#2196f3",
              }}
            />
            <Chip label={`מנתח ${Math.round(progress)}%`} color="info" size="small" sx={{ fontSize: "0.7rem" }} />
          </Box>
        )
      default:
        return (
          <Chip icon={<HourglassEmptyIcon />} label="ממתין" color="warning" size="small" sx={{ fontSize: "0.7rem" }} />
        )
    }
  }

  // Fetch files from API
  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const data = fileStore.teacherFiles.filter(
        (f) => f.subjectId == DetailsStore.currentSubject.id && f.classId == DetailsStore.currentClass.id,
      )

      if (Array.isArray(data)) {
        setFiles(data)
      } else {
        console.error("השרת לא החזיר מערך:", data)
        setFiles([])
      }
    } catch (err: any) {
      setError(err.message)
      setFiles([])
    } finally {
      setLoading(false)
    }
  }

  // Format file size
  const formatFileSize = (bytes: any) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Format date
  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("he-IL", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Filter and sort files with status filter
  const filteredFiles = files
    .filter(
      (file) =>
        file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((file) => {
      if (statusFilter === "all") return true
      const status = getExamStatus(file.fileName)
      switch (statusFilter) {
        case "checked":
          return status === "checked"
        case "unchecked":
          return status === "waiting"
        case "analyzing":
          return status === "analyzing"
        default:
          return true
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.fileName.localeCompare(b.fileName)
        case "size":
          return b.fileSize - a.fileSize
        case "createdDate":
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        default:
          return 0
      }
    })

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box textAlign="center">
          <CircularProgress size={60} sx={{ color: "#2196f3", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            טוען קבצים...
          </Typography>
        </Box>
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #ffebee 0%, #f8bbd9 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ maxWidth: 400, p: 4, textAlign: "center" }}>
          <Avatar sx={{ bgcolor: "#ffcdd2", width: 64, height: 64, mx: "auto", mb: 2 }}>
            <FileText sx={{ fontSize: 32, color: "#f44336" }} />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            שגיאה בטעינה
          </Typography>
          <Typography color="text.secondary" paragraph>
            {error}
          </Typography>
          <Button variant="contained" color="error" onClick={fetchFiles} sx={{ borderRadius: 2 }}>
            נסה שוב
          </Button>
        </Card>
      </Box>
    )
  }

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f5f5 0%, #e3f2fd 50%, #bbdefb 100%)",
          direction: "rtl",
        }}
      >
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Header */}
          <Card sx={{ mb: 4, borderRadius: 4, overflow: "hidden" }}>
            <Box
              sx={{
                background: "linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)",
                color: "white",
                p: 4,
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={2}>
                  <FileText sx={{ fontSize: 32 }} />
                  <Box>
                    <Typography variant="h3" fontWeight="bold">
                      רשימת הקבצים שלי
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
                      ניהול וצפייה בכל הקבצים שלך במקום אחד
                    </Typography>
                  </Box>
                </Box>

                {/* Enhanced Analysis Controls - No Dialog */}
                {hasAnswerFile() && (
                  <Box display="flex" gap={2} alignItems="center">
                    {selectedFiles.length > 0 && (
                      <Chip
                        label={`נבחרו ${selectedFiles.length} קבצים`}
                        color="secondary"
                        sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
                        onDelete={handleClearSelection}
                      />
                    )}
                    <Button
                      variant="contained"
                      startIcon={<SelectAllIcon />}
                      onClick={handleSelectAllExams}
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.15)",
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.25)" },
                        borderRadius: 3,
                      }}
                    >
                      בחר הכל
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={isAnalyzing ? <CircularProgress size={16} /> : <PlayArrowIcon />}
                      onClick={handleAnalyzeSelectedExams}
                      disabled={selectedFiles.length < 2 || isAnalyzing}
                      sx={{
                        bgcolor: "rgba(76, 175, 80, 0.8)",
                        "&:hover": { bgcolor: "rgba(76, 175, 80, 0.9)" },
                        borderRadius: 3,
                        minWidth: 160,
                      }}
                    >
                      {isAnalyzing ? "מנתח..." : "נתח כל המבחנים"}
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Controls */}
            <Box sx={{ p: 3, bgcolor: "#f5f5f5", borderBottom: 1, borderColor: "divider" }}>
              <Box
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={2}
                alignItems="center"
                justifyContent="space-between"
              >
                {/* Search */}
                <TextField
                  placeholder="חיפוש קבצים..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ flexGrow: 1, maxWidth: 400 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 3 },
                  }}
                />

                {/* Controls */}
                <Box display="flex" alignItems="center" gap={2}>
                  {/* Status Filter Buttons */}
                  <Box display="flex" gap={1}>
                    <Button
                      variant={statusFilter === "all" ? "contained" : "outlined"}
                      size="small"
                      onClick={() => setStatusFilter("all")}
                      sx={{ minWidth: 80 }}
                    >
                      הכל ({files.length})
                    </Button>
                    <Button
                      variant={statusFilter === "checked" ? "contained" : "outlined"}
                      size="small"
                      color="success"
                      onClick={() => setStatusFilter("checked")}
                      sx={{ minWidth: 80 }}
                    >
                      נבדקו ({files.filter((f) => getExamStatus(f.fileName) === "checked").length})
                    </Button>
                    <Button
                      variant={statusFilter === "unchecked" ? "contained" : "outlined"}
                      size="small"
                      color="warning"
                      onClick={() => setStatusFilter("unchecked")}
                      sx={{ minWidth: 80 }}
                    >
                      ממתינים ({files.filter((f) => getExamStatus(f.fileName) === "waiting").length})
                    </Button>
                    <Button
                      variant={statusFilter === "analyzing" ? "contained" : "outlined"}
                      size="small"
                      color="info"
                      onClick={() => setStatusFilter("analyzing")}
                      sx={{ minWidth: 80 }}
                    >
                      מנתחים ({files.filter((f) => getExamStatus(f.fileName) === "analyzing").length})
                    </Button>
                  </Box>

                  {/* Sort */}
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>מיון</InputLabel>
                    <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="מיון">
                      <MenuItem value="createdDate">מיון לפי תאריך</MenuItem>
                      <MenuItem value="name">מיון לפי שם</MenuItem>
                      <MenuItem value="size">מיון לפי גודל</MenuItem>
                    </Select>
                  </FormControl>

                  {/* View Mode */}
                  <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(_, newMode) => newMode && setViewMode(newMode)}
                    size="small"
                  >
                    <ToggleButton value="grid">
                      <Grid />
                    </ToggleButton>
                    <ToggleButton value="list">
                      <ListIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>

                  {/* Refresh */}
                  <IconButton onClick={fetchFiles} color="primary" title="רענן">
                    <RefreshCw />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            {/* Stats */}
            <CardContent sx={{ py: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" gap={4}>
                  <Typography variant="body2" color="text.secondary">
                    סה״כ {filteredFiles.length} קבצים
                    {statusFilter !== "all" && (
                      <Chip
                        label={`מסונן: ${statusFilter === "checked" ? "נבדקו" : statusFilter === "unchecked" ? "ממתינים" : "מנתחים"}`}
                        size="small"
                        sx={{ ml: 1, fontSize: "0.7rem" }}
                        onDelete={() => setStatusFilter("all")}
                      />
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    נבדקו: {files.filter((f) => getExamStatus(f.fileName) === "checked").length} | ממתינים:{" "}
                    {files.filter((f) => getExamStatus(f.fileName) === "waiting").length} | מנתחים:{" "}
                    {files.filter((f) => getExamStatus(f.fileName) === "analyzing").length}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  גודל כולל: {formatFileSize(filteredFiles.reduce((sum, file) => sum + file.fileSize, 0))}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Files Display */}
          {filteredFiles.length === 0 ? (
            <Card sx={{ p: 8, textAlign: "center", borderRadius: 4 }}>
              <Avatar sx={{ bgcolor: "#f5f5f5", width: 96, height: 96, mx: "auto", mb: 2 }}>
                <FileText sx={{ fontSize: 48, color: "#bdbdbd" }} />
              </Avatar>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                לא נמצאו קבצים
              </Typography>
              <Typography color="text.secondary">נסה לשנות את תנאי החיפוש או העלה קבצים חדשים</Typography>
            </Card>
          ) : viewMode === "grid" ? (
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 3 }}>
              {filteredFiles.map((file) => (
                <Card
                  key={file.id}
                  onClick={() => handleOpenFile(file)}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: selectedFiles.includes(file.fileName) ? "2px solid #2196f3" : "1px solid #e0e0e0",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                      bgcolor: "#f0f8ff",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Header with Selection */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          sx={{
                            bgcolor: "primary.main",
                            background: "linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)",
                            width: 48,
                            height: 48,
                          }}
                        >
                          <FileText />
                        </Avatar>
                        {/* Selection Checkbox */}
                        <Checkbox
                          checked={selectedFiles.includes(file.fileName)}
                          onChange={(e) => {
                            e.stopPropagation()
                            toggleFileSelection(file.fileName)
                          }}
                          sx={{ p: 0 }}
                        />
                      </Box>

                      <Box display="flex" gap={1} alignItems="center">
                        {/* Status Chip with Progress */}
                        {getStatusChip(file.fileName)}

                        {/* Eye Icon for Feedback */}
                        {hasExamFeedback(file.fileName) && getExamStatus(file.fileName) === "checked" && (
                          <Tooltip title={`צפה במשוב עבור ${getStudentNameFromFileName(file.fileName)}`}>
                            <IconButton
                              size="small"
                              onClick={(e) => handleViewFeedback(file.fileName, e)}
                              sx={{
                                color: "success.main",
                                "&:hover": { bgcolor: "success.50" },
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                        )}

                        {/* Answer File Chip */}
                        {(file.fileName.toLowerCase().includes("answer") ||
                          file.fileName.toLowerCase().includes("teacher")) && (
                          <Chip label="מבחן פתור" size="small" color="success" sx={{ fontSize: "0.7rem" }} />
                        )}

                        <IconButton size="small" sx={{ "&:hover": { bgcolor: "primary.50", color: "primary.main" } }}>
                          <Download />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Progress Bar for Analyzing Files */}
                    {getExamStatus(file.fileName) === "analyzing" && (
                      <Box sx={{ mb: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={analysisProgress[file.fileName] || 0}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "#f0f0f0",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: analysisProgress[file.fileName] > 50 ? "#4caf50" : "#ff9800",
                            },
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                          מנתח... {Math.round(analysisProgress[file.fileName] || 0)}%
                        </Typography>
                      </Box>
                    )}

                    {/* Title with Student Name */}
                    <Typography variant="h6" fontWeight="bold" gutterBottom noWrap title={file.fileName}>
                      {file.fileName}
                    </Typography>
                    <Typography variant="body2" color="primary.main" sx={{ mb: 1 }}>
                      תלמיד: {getStudentNameFromFileName(file.fileName)}
                    </Typography>

                    {/* Description */}
                    {file.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {file.description}
                      </Typography>
                    )}

                    {/* Details */}
                    <Box sx={{ mb: 2, "& > *": { mb: 1 } }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <User sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          משתמש {file.userId}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <BookOpen sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          נושא {file.subjectId}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Users sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          כיתה {file.classId}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Calendar sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(file.createdDate)}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Footer */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" fontWeight="medium">
                        {formatFileSize(file.fileSize)}
                      </Typography>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor:
                            getExamStatus(file.fileName) === "checked"
                              ? "success.main"
                              : getExamStatus(file.fileName) === "analyzing"
                                ? "info.main"
                                : "warning.main",
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Box sx={{ "& > *": { mb: 2 } }}>
              {filteredFiles.map((file) => (
                <Card
                  key={file.id}
                  onClick={() => handleOpenFile(file)}
                  sx={{
                    borderRadius: 4,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: selectedFiles.includes(file.fileName) ? "2px solid #2196f3" : "1px solid #e0e0e0",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 4,
                      bgcolor: "#f0f8ff",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Checkbox
                        checked={selectedFiles.includes(file.fileName)}
                        onChange={(e) => {
                          e.stopPropagation()
                          toggleFileSelection(file.fileName)
                        }}
                      />

                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          background: "linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)",
                          width: 48,
                          height: 48,
                        }}
                      >
                        <FileText />
                      </Avatar>

                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Typography variant="h6" fontWeight="bold" noWrap>
                            {file.fileName}
                          </Typography>
                          {/* Status Chip */}
                          {getStatusChip(file.fileName)}
                          {(file.fileName.toLowerCase().includes("answer") ||
                            file.fileName.toLowerCase().includes("teacher")) && (
                            <Chip label="מבחן פתור" size="small" color="success" sx={{ fontSize: "0.7rem" }} />
                          )}
                        </Box>

                        {/* Progress Bar for List View */}
                        {getExamStatus(file.fileName) === "analyzing" && (
                          <Box sx={{ mt: 1, mb: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={analysisProgress[file.fileName] || 0}
                              sx={{
                                height: 4,
                                borderRadius: 2,
                                bgcolor: "#f0f0f0",
                                "& .MuiLinearProgress-bar": {
                                  bgcolor: analysisProgress[file.fileName] > 50 ? "#4caf50" : "#ff9800",
                                },
                              }}
                            />
                          </Box>
                        )}

                        <Typography variant="body2" color="primary.main">
                          תלמיד: {getStudentNameFromFileName(file.fileName)}
                        </Typography>
                        <Box display="flex" gap={3} mt={0.5}>
                          <Typography variant="body2" color="text.secondary">
                            משתמש {file.userId}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            נושא {file.subjectId}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            כיתה {file.classId}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(file.createdDate)}
                          </Typography>
                        </Box>
                        {file.description && (
                          <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.5 }}>
                            {file.description}
                          </Typography>
                        )}
                      </Box>

                      <Box display="flex" alignItems="center" gap={2}>
                        {/* Eye Icon for Feedback */}
                        {hasExamFeedback(file.fileName) && getExamStatus(file.fileName) === "checked" && (
                          <Tooltip title={`צפה במשוב עבור ${getStudentNameFromFileName(file.fileName)}`}>
                            <IconButton
                              size="small"
                              onClick={(e) => handleViewFeedback(file.fileName, e)}
                              sx={{
                                color: "success.main",
                                "&:hover": { bgcolor: "success.50" },
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                        )}

                        <Typography variant="body2" fontWeight="medium">
                          {formatFileSize(file.fileSize)}
                        </Typography>
                        <IconButton size="small" sx={{ "&:hover": { bgcolor: "primary.50", color: "primary.main" } }}>
                          <Download />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* File Preview */}
          {selectedFile && (
            <Card sx={{ mt: 4, p: 2, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                תצוגה מקדימה של הקובץ: {selectedFile.fileName}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: "80vh",
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <iframe
                  src={selectedFile.filePath}
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                  title="תצוגת קובץ"
                />
              </Box>
              <Button variant="outlined" color="error" onClick={() => setSelectedFile(null)} sx={{ mt: 2 }}>
                סגור תצוגה
              </Button>
            </Card>
          )}

          {/* Analysis Results */}
          {examAnalysisStore.analysisResults.length > 0 && (
            <Card sx={{ mt: 4, borderRadius: 4 }}>
              <Box sx={{ p: 2, bgcolor: "success.light", color: "white" }}>
                <Typography variant="h5" fontWeight="bold">
                  תוצאות ניתוח מבחנים
                </Typography>
                <Typography variant="body2">{examAnalysisStore.analysisResults.length} תלמידים נותחו</Typography>
              </Box>
              <CardContent>
                <StudentExamResults results={examAnalysisStore.analysisResults} />
              </CardContent>
            </Card>
          )}
        </Container>

        {/* Snackbar for notifications */}
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>

      <FileUploader />
    </>
  )
})

export default ClassExamsPage
