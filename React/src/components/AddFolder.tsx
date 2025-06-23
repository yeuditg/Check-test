
import React, { useState } from 'react';
import {  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import folderStore from '../stores/FolderStore'; 

interface AddFolderProps {
  open: boolean; 
  onClose: () => void;
}

const AddFolder: React.FC<AddFolderProps> = observer(({ open, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddFolder = async () => {
    await folderStore.createFolder(name,description);
    if (!folderStore.error) {
      onClose(); 
    }
    folderStore.fetchFolders();
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ background: 'rgb(150, 150, 150)', color: 'black' }}>
        <Typography>הוסף תיקייה חדשה</Typography>
      </DialogTitle>
      <DialogContent sx={{ background: 'rgb(150, 150, 150)' }}>
        <TextField
          autoFocus
          margin="dense"
          label="שם"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ backgroundColor: 'white', marginBottom: '10px' }}
        />
        <TextField
          margin="dense"
          label="תיאור"
          type="text"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ backgroundColor: 'white', marginBottom: '10px' }}
        />
      </DialogContent>
      <DialogActions sx={{ background: 'rgb(150, 150, 150)' }}>
        <Button onClick={onClose} variant="contained" sx={{   background: 'linear-gradient(100deg, rgb(27, 187, 150),#AFEEEE,rgb(200, 200, 200),rgb(130, 130, 130))',
  color: 'white' }}>
          ביטול
        </Button>
        <Button onClick={handleAddFolder} variant="contained" sx={{ background:'linear-gradient(100deg, rgb(27, 187, 150),#AFEEEE,rgb(200, 200, 200),rgb(130, 130, 130))',
  color: 'white' }}>
          הוסף
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default AddFolder;
