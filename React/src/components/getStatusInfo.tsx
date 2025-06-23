import { CheckCircle, Cancel, Warning } from '@mui/icons-material';

export const getStatusInfo = (status: string) => {
  switch (status.toLowerCase()) {
    case 'correct':
    case 'נכון':
      return { color: 'success', icon: <CheckCircle /> };
    case 'incorrect':
    case 'שגוי':
      return { color: 'error', icon: <Cancel /> };
    case 'partial':
    case 'חלקי':
      return { color: 'warning', icon: <Warning /> };
    default:
      return { color: 'default', icon: <Warning /> };
  }
};
