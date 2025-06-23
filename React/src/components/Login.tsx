import { useRef, useState } from "react";
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
  Avatar
} from "@mui/material";
import { 
  Login as LoginIcon, 
  Visibility, 
  VisibilityOff, 
  Email,
  Close,
  Lock,
  Send,
  PersonAdd,
  AutoAwesome,
  CheckCircle
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onSwitchToSignup?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToSignup }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [clicked, setClicked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post('https://check-test-api.onrender.com/api/Auth/login', {
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      });

      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('teacher_email', JSON.stringify(res.data.user));
      console.log("נכנסת בהצלחה!");
      navigate('/app/subjects')
      setClicked(false);
      // navigate('/folders');
    } catch (e: any) {
      if (e.response?.status === 401) {
        setError("שם משתמש או סיסמה שגויים");
      } else {
        setError("שגיאה בהתחברות. אנא נסה שוב מאוחר יותר");
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setClicked(false);
    setError("");
    setShowPassword(false);
    if (emailRef.current) emailRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
  };

  const handleSwitchToSignup = () => {
    handleClose();
    if (onSwitchToSignup) {
      onSwitchToSignup();
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
            width: { xs: '90vw', sm: '450px' },
            maxWidth: '450px',
            height: 'auto',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #1e1b4b 100%)',
            borderRadius: '20px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Animated background orbs */}
            <Box sx={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
              borderRadius: '50%',
              animation: 'pulse 4s ease-in-out infinite'
            }} />
            <Box sx={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '80px',
              height: '80px',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
              borderRadius: '50%',
              animation: 'pulse 4s ease-in-out infinite 2s'
            }} />

            {/* Header - קומפקטי יותר */}
            <Box sx={{
              background: 'linear-gradient(45deg, #3b82f6 30%, #7c3aed 90%)',
              color: 'white',
              padding: '16px 24px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              zIndex: 10,
              minHeight: '70px'
            }}>
              <Avatar sx={{
                background: 'linear-gradient(45deg, #1e40af, #5b21b6)',
                width: 40,
                height: 40
              }}>
                <LoginIcon sx={{ fontSize: 22 }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" component="h2" sx={{ 
                  fontWeight: 700,
                  marginBottom: '2px',
                  fontSize: '1.1rem'
                }}>
                  ברוכים השבים
                </Typography>
                <Typography variant="body2" sx={{ 
                  opacity: 0.9,
                  fontSize: '0.8rem'
                }}>
                  התחברו למערכת בדיקת המבחנים
                </Typography>
              </Box>
              
              <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
                <AutoAwesome sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 16 }} />
              </Box>
              
              <IconButton
                onClick={handleClose}
                sx={{
                  color: 'white',
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>

            {/* Form Content - אופטימיזציה לחסכון במקום */}
            <Box sx={{ 
              padding: '20px 24px 24px', 
              position: 'relative', 
              zIndex: 10,
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    marginBottom: 2,
                    borderRadius: '10px',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    border: '1px solid rgba(220, 53, 69, 0.3)',
                    color: 'white',
                    fontSize: '0.85rem',
                    padding: '8px 12px',
                    '& .MuiAlert-icon': {
                      color: '#ef4444'
                    }
                  }}
                >
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit} style={{ flex: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    inputRef={emailRef}
                    type="email"
                    label="כתובת אימייל"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: '#3b82f6', fontSize: 18 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        height: '45px',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          borderWidth: '1.5px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(59, 130, 246, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#1e293b',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        '&.Mui-focused': {
                          color: '#3b82f6',
                        },
                      },
                    }}
                  />

                  <TextField
                    inputRef={passwordRef}
                    type={showPassword ? 'text' : 'password'}
                    label="סיסמה"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: '#3b82f6', fontSize: 18 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                            sx={{ color: '#3b82f6' }}
                          >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        height: '45px',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          borderWidth: '1.5px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(59, 130, 246, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#1e293b',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        '&.Mui-focused': {
                          color: '#3b82f6',
                        },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    startIcon={loading ? null : <Send fontSize="small" />}
                    sx={{
                      background: loading ? 'rgba(148, 163, 184, 0.5)' : 'linear-gradient(45deg, #3b82f6 30%, #7c3aed 90%)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                      padding: '12px',
                      borderRadius: '10px',
                      textTransform: 'none',
                      boxShadow: loading ? 'none' : '0 6px 20px rgba(59, 130, 246, 0.3)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      marginTop: 1,
                      height: '45px',
                      '&:hover': {
                        background: loading ? 'rgba(148, 163, 184, 0.5)' : 'linear-gradient(45deg, #1d4ed8 30%, #6b21a8 90%)',
                        transform: loading ? 'none' : 'translateY(-1px)',
                        boxShadow: loading ? 'none' : '0 8px 25px rgba(59, 130, 246, 0.4)',
                      },
                      '&:disabled': {
                        color: 'rgba(255, 255, 255, 0.7)',
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
                    {loading ? 'מתחבר...' : 'התחבר למערכת'}
                  </Button>
                </Box>
              </form>

              {/* Switch to Signup - קומפקטי יותר */}
              <Box sx={{ 
                marginTop: 2, 
                textAlign: 'center',
                paddingTop: 2,
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.85rem',
                  marginBottom: 1.5
                }}>
                  עדיין אין לך חשבון?
                </Typography>
                <Button
                  onClick={handleSwitchToSignup}
                  variant="text"
                  startIcon={<PersonAdd fontSize="small" />}
                  sx={{
                    color: '#60a5fa',
                    fontWeight: 600,
                    textTransform: 'none',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: 'rgba(96, 165, 250, 0.1)',
                    }
                  }}
                >
                  הרשם עכשיו
                </Button>
              </Box>

              {/* Success indicators - קומפקטי */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: 0.5, 
                marginTop: 2,
                opacity: 0.6 
              }}>
                <CheckCircle sx={{ color: '#10b981', fontSize: 14 }} />
                <Typography variant="caption" sx={{ 
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.75rem'
                }}>
                  חיבור מאובטח ומוצפן
                </Typography>
              </Box>
            </Box>

            <style>
              {`
                @keyframes shimmer {
                  0% { left: -100%; }
                  100% { left: 100%; }
                }
                @keyframes pulse {
                  0%, 100% { opacity: 1; transform: scale(1); }
                  50% { opacity: 0.7; transform: scale(1.05); }
                }
              `}
            </style>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Login;