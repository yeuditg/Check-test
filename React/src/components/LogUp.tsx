


import { useContext, useState } from "react";
import { 
  Button, 
  Box, 
  Modal, 
  TextField, 
  Typography, 
  IconButton, 
  InputAdornment,
  Alert,
  Fade,
  Backdrop,
  Grid
} from "@mui/material";
import { 
  PersonAdd as SignUpIcon, 
  Visibility, 
  VisibilityOff, 
  Email,
  Close,
  School,
  Person,
  Phone,
  Home,
  Send,
  Login as LoginIcon
} from "@mui/icons-material";
import { UserContext } from "./appLayot";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  onSwitchToLogin?: () => void;
}

const LogUp: React.FC<SignUpProps> = ({ onSwitchToLogin }) => {
  const [clicked, setClicked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });
  
  // Error states
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  const context = useContext(UserContext);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{9,10}$/;
    return phoneRegex.test(phone.replace(/[-\s]/g, ''));
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      address: '',
      password: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = "אנא הזן שם מלא";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "השם חייב להכיל לפחות 2 תווים";
    }

    if (!formData.email) {
      newErrors.email = "אנא הזן כתובת אימייל";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "אנא הזן כתובת אימייל תקינה";
    }

    if (!formData.phone) {
      newErrors.phone = "אנא הזן מספר טלפון";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "אנא הזן מספר טלפון תקין";
    }

    if (!formData.address.trim()) {
      newErrors.address = "אנא הזן כתובת";
    }

    if (!formData.password) {
      newErrors.password = "אנא הזן סיסמה";
    } else if (formData.password.length < 6) {
      newErrors.password = "הסיסמה חייבת להכיל לפחות 6 תווים";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('https://localhost:7213/api/Auth/register', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        password: formData.password,
      });
      
      console.log("נרשמת בהצלחה!");
      sessionStorage.setItem('token', res.data.token);

      if (context) {
        context.userDispatch({ 
          type: 'CREATE', 
          data: { 
            id: res.data.userId, 
            name: formData.name 
          } 
        });
      }


      setClicked(false);
      navigate('/subjects')

      
    } catch (e: any) {
      if (e.response?.status === 400) {
        setError("המשתמש כבר קיים במערכת או שהפרטים שגויים");
      } else {
        setError("שגיאה בהרשמה. אנא נסה שוב מאוחר יותר");
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setClicked(false);
    setError("");
    setErrors({
      name: '',
      email: '',
      phone: '',
      address: '',
      password: ''
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      password: ''
    });
    setShowPassword(false);
  };

  const handleSwitchToLogin = () => {
    handleClose();
    if (onSwitchToLogin) {
      onSwitchToLogin();
    }
  };

  return (
    <>
     
      <Modal
        open={clicked}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
        }}
      >
        <Fade in={clicked}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 500 },
            maxWidth: 550,
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            borderRadius: '24px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            {/* Header */}
            <Box sx={{
              background: 'linear-gradient(45deg, #48bb78 30%, #38a169 90%)',
              color: 'white',
              padding: '24px 32px 20px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              <SignUpIcon sx={{ fontSize: 32 }} />
              <Box>
                <Typography variant="h5" component="h2" sx={{ 
                  fontWeight: 700,
                  marginBottom: '4px'
                }}>
                  הרשמה למערכת
                </Typography>
                <Typography variant="body2" sx={{ 
                  opacity: 0.9,
                  fontSize: '0.9rem'
                }}>
                  צור חשבון חדש במערכת בדיקת מבחנים
                </Typography>
              </Box>
              
              <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <Close />
              </IconButton>
            </Box>

            {/* Form Content */}
            <Box sx={{ padding: '32px' }}>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    marginBottom: 3,
                    borderRadius: '12px',
                    '& .MuiAlert-message': {
                      fontSize: '0.9rem'
                    }
                  }}
                >
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    label="שם מלא"
                    variant="outlined"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: '#48bb78' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white',
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#48bb78',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#4a5568',
                        '&.Mui-focused': {
                          color: '#48bb78',
                        },
                      },
                    }}
                  />

                  <TextField
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    type="email"
                    label="כתובת אימייל"
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: '#48bb78' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white',
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#48bb78',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#4a5568',
                        '&.Mui-focused': {
                          color: '#48bb78',
                        },
                      },
                    }}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        value={formData.phone}
                        onChange={handleInputChange('phone')}
                        label="מספר טלפון"
                        variant="outlined"
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone sx={{ color: '#48bb78' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: 'white',
                            '& fieldset': {
                              borderColor: '#e2e8f0',
                              borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                              borderColor: '#cbd5e0',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#48bb78',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#4a5568',
                            '&.Mui-focused': {
                              color: '#48bb78',
                            },
                          },
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        value={formData.address}
                        onChange={handleInputChange('address')}
                        label="כתובת"
                        variant="outlined"
                        fullWidth
                        error={!!errors.address}
                        helperText={errors.address}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Home sx={{ color: '#48bb78' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: 'white',
                            '& fieldset': {
                              borderColor: '#e2e8f0',
                              borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                              borderColor: '#cbd5e0',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#48bb78',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#4a5568',
                            '&.Mui-focused': {
                              color: '#48bb78',
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    type={showPassword ? 'text' : 'password'}
                    label="סיסמה"
                    variant="outlined"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password || "הסיסמה חייבת להכיל לפחות 6 תווים"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: '#48bb78' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white',
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#48bb78',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#4a5568',
                        '&.Mui-focused': {
                          color: '#48bb78',
                        },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    startIcon={loading ? null : <Send />}
                    sx={{
                      background: loading ? '#cbd5e0' : 'linear-gradient(45deg, #48bb78 30%, #38a169 90%)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      padding: '16px',
                      borderRadius: '12px',
                      textTransform: 'none',
                      boxShadow: loading ? 'none' : '0 8px 25px rgba(72, 187, 120, 0.3)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      marginTop: 2,
                      '&:hover': {
                        background: loading ? '#cbd5e0' : 'linear-gradient(45deg, #38a169 30%, #2f855a 90%)',
                        transform: loading ? 'none' : 'translateY(-2px)',
                        boxShadow: loading ? 'none' : '0 12px 35px rgba(72, 187, 120, 0.4)',
                      },
                      '&:disabled': {
                        color: '#718096',
                      },
                      '&::before': loading ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        animation: 'shimmer 1.5s infinite',
                      } : {},
                    }}
                  >
                    {loading ? 'נרשם...' : 'הרשם למערכת'}
                  </Button>
                </Box>
              </form>

              {/* Switch to Login */}
              <Box sx={{ 
                marginTop: 4, 
                textAlign: 'center',
                paddingTop: 3,
                borderTop: '1px solid #e2e8f0'
              }}>
                <Typography variant="body2" sx={{ 
                  color: '#718096',
                  fontSize: '0.9rem',
                  marginBottom: 2
                }}>
                  כבר רשום במערכת?
                </Typography>
                <Button
                  onClick={handleSwitchToLogin}
                  variant="text"
                  startIcon={<LoginIcon />}
                  sx={{
                    color: '#667eea',
                    fontWeight: 600,
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(102, 126, 234, 0.05)',
                    }
                  }}
                >
                  עבור להתחברות
                </Button>
              </Box>
            </Box>

            <style>
              {`
                @keyframes shimmer {
                  0% { left: -100%; }
                  100% { left: 100%; }
                }
              `}
            </style>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
export default LogUp;