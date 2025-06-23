// export default FileUploader;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Box, Button, Typography, LinearProgress } from '@mui/material';
// import DetailsStore from '../stores/DetailsStore';

// const FileUploader = () => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [progressMap, setProgressMap] = useState<{ [key: string]: number }>({});

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles(Array.from(e.target.files));
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
//         // שלב 1: קבלת Presigned URL
//         const response = await axios.get(`https://localhost:7213/api/upload/presigned-url`, {
//           params: { fileName: file.name, contentType: file.type }
//         });

//         const presignedUrl = response.data.url;

//         // שלב 2: העלאה ל-AWS
//         await axios.put(presignedUrl, file, {
//           headers: {
//             'Content-Type': file.type,
//           },
//           onUploadProgress: (progressEvent) => {
//             const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
//             setProgressMap(prev => ({ ...prev, [file.name]: percent }));
//           },
//         });

//         // שלב 3: שמירה במסד הנתונים
//         const newFile = {
//           userId: currentUserId,
//           subjectId: DetailsStore.currentSubject.id,
//           classId: DetailsStore.currentClass.id,
//           fileName: file.name,
//           filePath: presignedUrl.split('?')[0],
//           fileSize: file.size,
//           description: 'קובץ שהועלה מתוך תיקיה',
//           createdDate: new Date(),
//           content: ''
//         };

//         await axios.post('https://localhost:7213/api/File', newFile, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//       } catch (error) {
//         console.error(`שגיאה בהעלאת הקובץ ${file.name}:`, error);
//         alert(`אירעה שגיאה בהעלאת הקובץ: ${file.name}`);
//       }
//     }

//     alert('כל הקבצים הועלו בהצלחה!');
//     setFiles([]);
//     setProgressMap({});
//   };

//   return (
//     <Box sx={{ width: '100%', padding: 2, borderRadius: 2, boxShadow: 3, bgcolor: '#f5f5f5' }}>
//       <Typography variant="h6" gutterBottom>
//         בחר תיקייה להעלאה
//       </Typography>
//       <input
//         type="file"
//         onChange={handleFileChange}
//         multiple
//         //@ts-ignore - כדי לאפשר תיקייה
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
//           }}
//         >
//           בחר תיקייה
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


import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, LinearProgress } from '@mui/material';
import DetailsStore from '../stores/DetailsStore';

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progressMap, setProgressMap] = useState<{ [key: string]: number }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleUpload = async () => {
    const token = sessionStorage.getItem('token');
    const teacherEmailData = sessionStorage.getItem('teacher_email');
    const currentUserId = teacherEmailData ? JSON.parse(teacherEmailData).id : null;

    if (!token || !currentUserId) {
      alert('חסרים פרטי התחברות');
      return;
    }

    for (const file of files) {
      try {
        console.log(file)
        const response = await axios.get(`https://localhost:7213/api/upload/presigned-url`, {
          params: { fileName: file.name, contentType: file.type }
        });
        console.log(response)

        const presignedUrl = response.data.url;
        console.log(presignedUrl)
        console.log(file)
        await axios.put(presignedUrl, file, {
          headers: { 'Content-Type': file.type },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
            setProgressMap(prev => ({ ...prev, [file.name]: percent }));
          },
        });
        console.log(currentUserId, DetailsStore.currentSubject.id, DetailsStore.currentClass.id, file.name, presignedUrl.split('?')[0], file.size);
        const newFile = {
          userId: currentUserId,
          subjectId: DetailsStore.currentSubject.id,
          classId: DetailsStore.currentClass.id,
          fileName: file.name,
          filePath: presignedUrl.split('?')[0],
          fileSize: file.size,
          description: 'קובץ שהועלה מתוך תיקיה או קובץ בודד',
          createdDate: new Date(),
          content: ''
        };
        console.log(newFile)
        console.log(token)
        await axios.post('https://localhost:7213/api/File', newFile, {
          headers: { Authorization: `Bearer ${token}` }
        });

      } catch (err: any) {
        console.error(`שגיאה בהעלאת הקובץ ${file.name}:`, err);
        alert(`אירעה שגיאה בהעלאת הקובץ: ${err}`);
      }
    }

    alert('כל הקבצים הועלו בהצלחה!');
    setFiles([]);
    setProgressMap({});
  };

  return (
    <Box sx={{ width: '100%', padding: 2, borderRadius: 2, boxShadow: 3, bgcolor: '#f5f5f5' }}>
      <Typography variant="h6" gutterBottom>
        בחר תיקייה או קובץ להעלאה
      </Typography>

      {/* Folder input */}
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        //@ts-ignore
        webkitdirectory="true"
        style={{ display: 'none' }}
        id="folder-upload"
      />
      <label htmlFor="folder-upload">
        <Button
          variant="contained"
          component="span"
          sx={{
            bgcolor: 'rgb(27, 187, 150)',
            '&:hover': { bgcolor: 'rgba(27, 187, 150,0.7)' },
            color: 'white',
            borderRadius: '8px',
            padding: '10px 20px',
            marginRight: 1
          }}
        >
          בחר תיקייה
        </Button>
      </label>

      {/* Single file input */}
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="single-file-upload"
      />
      <label htmlFor="single-file-upload">
        <Button
          variant="contained"
          component="span"
          sx={{
            bgcolor: '#2196F3',
            '&:hover': { bgcolor: '#1976D2' },
            color: 'white',
            borderRadius: '8px',
            padding: '10px 20px',
          }}
        >
          בחר קובץ
        </Button>
      </label>

      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={files.length === 0}
        sx={{ marginLeft: '10px', bgcolor: '#4CAF50', '&:hover': { bgcolor: '#388E3C' } }}
      >
        העלה קבצים
      </Button>

      {files.map((file) => (
        <Box key={file.name} sx={{ mt: 2 }}>
          <Typography variant="body2">{file.name}</Typography>
          <LinearProgress variant="determinate" value={progressMap[file.name] || 0} />
        </Box>
      ))}
    </Box>
  );
};

export default FileUploader;