import React, { useState } from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography,
  List, ListItem, Paper, Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StudentTestFeedback } from '../types/StudentTestFeedback';
import { getStatusInfo } from './getStatusInfo';

interface Props {
  results: StudentTestFeedback[];
}

const StudentExamResults: React.FC<Props> = ({ results }) => {
  const [searchName, setSearchName] = useState('');

  const filtered = results.filter(s =>
    s.studentName.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <Box sx={{ mt: 3 }}>
      <input
        placeholder="סינון לפי שם תלמיד"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        style={{
          marginBottom: 16, padding: 8, width: '100%',
          borderRadius: 4, border: '1px solid #ccc'
        }}
      />

      {filtered.map((student) => (
        <Accordion key={student.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography fontWeight="bold">{student.studentName}</Typography>
              <Chip
                label={`${student.finalGrade} נקודות`}
                color={student.finalGrade >= 80 ? 'success' : student.finalGrade >= 60 ? 'warning' : 'error'}
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {student.noteToTeacher && (
              <Alert severity="info" sx={{ mb: 2 }}>
                הערה למורה: {student.noteToTeacher}
              </Alert>
            )}

            <List>
              {student.feedback.map((q) => {
                const { color, icon } = getStatusInfo(q.status);
                return (
                  <ListItem key={q.id}>
                    <Paper sx={{ p: 2, width: '100%' }}>
                      <Box display="flex" gap={2} alignItems="center" mb={1}>
                        <Chip icon={icon} label={`שאלה ${q.questionNumber}`} color={color as any} size="small" />
                        <Typography variant="body2" color="text.secondary">
                          סטטוס: {q.status}
                        </Typography>
                      </Box>
                      <Typography variant="body2"><strong>משוב:</strong> {q.feedback}</Typography>
                      <Typography variant="body2" color="success.main">
                        <strong>תשובה נכונה:</strong> {q.correctAnswer}
                      </Typography>
                    </Paper>
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default StudentExamResults;
