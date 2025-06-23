// // Folders Component
// import { Button, Container, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import AddFolder from "./AddFolder";
// import AddIcon from '@mui/icons-material/Add';
// import folderStore from "../stores/FolderStore";
// import { observer } from "mobx-react";
// import FileUploader from "./FileUploader";

// const Folders = observer(() => {
//   const [openAddFolder, setOpenAddFolder] = useState(false);
// useEffect(() => {
//     const fetchData = async () => {
//       await folderStore.fetchFoldersCurrentUser();
      
    
// console.log("Fetched folders:", folderStore.foldersCurrentUsers);
//     };
//     fetchData();
//   }, [folderStore]); 

//   const onOpenAddFolder = () => {
//     setOpenAddFolder(true);
//   };

//   const onCloseAddFolder = () => {
//     setOpenAddFolder(false);
//   }
  
//   return (
//     <>
//       <Button 
//         variant="contained" 
//         color="rgb(27, 187, 150)" 
//         onClick={onOpenAddFolder} 
//         startIcon={<AddIcon />} 
//         sx={{ marginBottom: 2 }}
//       >
//         הוספת תיקייה
//       </Button>
//       <button onClick={FileUploader}>העלאת תיקיה</button>
//       <AddFolder open={openAddFolder} onClose={onCloseAddFolder} />  
//       <Container 
//         maxWidth={false} 
//         sx={{ 
//           display: "flex", 
//           flexDirection: "column", 
//           alignItems: "center", 
//           mt: 10, 
//           flexGrow: 1, 
//           overflowY: "auto", 
//           paddingBottom: "100px" 
//         }}
//       >
//         {folderStore.isLoading ? (
//           <Typography variant="h6">טוען תיקיות...</Typography>
//         ) : (
//           folderStore.foldersCurrentUsers.length > 0 ? (
//             folderStore.foldersCurrentUsers.map((folder) => (
//               <div key={folder.id}>
//                 <h2>{folder.name}</h2>
//                 <p>{folder.description}</p>
//               </div>
//             ))
//           ) : (
//             <Typography variant="h6">לא נמצאו תיקיות</Typography>
//           )
//         )}
//       </Container>
//     </>
//   );
// });

// export default Folders;
import { Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddFolder from "./AddFolder";
import AddIcon from '@mui/icons-material/Add';
import folderStore from "../stores/FolderStore";
import { observer } from "mobx-react";
import FileUploader from "./FileUploader";
import { color } from "chart.js/helpers";

const Folders = observer(() => {
  const [openAddFolder, setOpenAddFolder] = useState(false);
  const [openFileUploader, setOpenFileUploader] = useState(false); 
  useEffect(() => {
    const fetchData = async () => {
      await folderStore.fetchFoldersCurrentUser();
      console.log("Fetched folders:", folderStore.foldersCurrentUsers);
    };
    fetchData();
  }, [folderStore]); 

  const onOpenAddFolder = () => {
    setOpenAddFolder(true);
  };

  const onCloseAddFolder = () => {
    setOpenAddFolder(false);
  }

  const onOpenFileUploader = () => {
    setOpenFileUploader(true);
  };

  const onCloseFileUploader = () => {
    setOpenFileUploader(false);
  };

  return (
    <>
      <Button 
        variant="contained" 
        color="rgb(27, 187, 150)" 
        onClick={onOpenAddFolder} 
        startIcon={<AddIcon />} 
        sx={{ marginBottom: 2 }}
      >
        הוספת תיקייה
      </Button>
      <Button 
      style={ {color:"rgb(27, 187, 150)"}} 
        variant="contained"
        onClick={onOpenFileUploader} 
        sx={{ marginBottom: 2 }}
      >
        העלאת תיקיה
      </Button>
      <AddFolder open={openAddFolder} onClose={onCloseAddFolder} />  
      <FileUploader open={openFileUploader} onClose={onCloseFileUploader} /> 
      <Container 
        maxWidth={false} 
        sx={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          mt: 10, 
          flexGrow: 1, 
          overflowY: "auto", 
          paddingBottom: "100px" 
        }}
      >
        {folderStore.isLoading ? (
          <Typography variant="h6">טוען תיקיות...</Typography>
        ) : (
          folderStore.foldersCurrentUsers.length > 0 ? (
            folderStore.foldersCurrentUsers.map((folder:any) => (
              <div key={folder.id}>
                <h2>{folder.name}</h2>
                <p>{folder.description}</p>
              </div>
            ))
          ) : (
            <Typography variant="h6">לא נמצאו תיקיות</Typography>
          )
        )}
      </Container>
    </>
  );
});

export default Folders;
