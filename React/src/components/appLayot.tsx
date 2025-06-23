// import { Outlet } from "react-router-dom"; 
// import NavBar from "./NavBar";
// import { createContext, useReducer } from "react";
// import { User, userReducer } from "../types/user";

// export type UserContextType = {
//     user: User;
//     userDispatch: React.Dispatch<any>;
// };

// export const UserContext = createContext<UserContextType | null>(null);

// const AppLayot = () => {
//     const initialUser: User = {
//         id: null,
//         name: '',
//         email: '',
//         password: '',
//         address: '',
//         phone: ''
//     };

//     const [user, userDispatch] = useReducer(userReducer, initialUser)
 
//     return (
//         <UserContext.Provider value={{ user, userDispatch }}>
//             {/* <NavBar /> */}
//             <Outlet /> 
//         </UserContext.Provider>
//     );
// }

// export default AppLayot;

import type React from "react"

import { Outlet } from "react-router-dom"
import { createContext, useReducer, useEffect, useState } from "react"
import { type User, userReducer } from "../types/user"
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Fade,
  useTheme,
  alpha,
} from "@mui/material"
import { School, AccountCircle, Logout, Settings, Notifications, Dashboard } from "@mui/icons-material"

export type UserContextType = {
  user: User
  userDispatch: React.Dispatch<any>
}

export const UserContext = createContext<UserContextType | null>(null)

const AppLayout = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const theme = useTheme()

  const initialUser: User = {
    id: null,
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  }

  const [user, userDispatch] = useReducer(userReducer, initialUser)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        }}
      >
        {/* Enhanced Navigation Bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            background: scrolled ? alpha(theme.palette.background.paper, 0.95) : "transparent",
            backdropFilter: "blur(20px)",
            borderBottom: scrolled ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : "none",
            transition: "all 0.3s ease",
            zIndex: 1100,
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              padding: "0 24px",
              minHeight: "70px",
            }}
          >
            {/* Logo Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <Box
                sx={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  borderRadius: "12px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                }}
              >
                <School sx={{ color: "white", fontSize: 28 }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "1.4rem",
                  }}
                >
                  TestChecker Pro
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: alpha(theme.palette.text.primary, 0.7),
                    fontSize: "0.75rem",
                  }}
                >
                  מערכת בדיקת מבחנים חכמה
                </Typography>
              </Box>
            </Box>

            {/* User Menu */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                sx={{
                  color: theme.palette.text.primary,
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <Notifications />
              </IconButton>

              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  padding: 0,
                  ml: 1,
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  transition: "transform 0.2s ease",
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                  }}
                >
                  <AccountCircle />
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                TransitionComponent={Fade}
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: "12px",
                    minWidth: 200,
                    background: alpha(theme.palette.background.paper, 0.95),
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <MenuItem onClick={handleMenuClose} sx={{ gap: 2 }}>
                  <Dashboard fontSize="small" />
                  לוח בקרה
                </MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ gap: 2 }}>
                  <Settings fontSize="small" />
                  הגדרות
                </MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ gap: 2, color: "error.main" }}>
                  <Logout fontSize="small" />
                  התנתק
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            minHeight: "calc(100vh - 70px)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </UserContext.Provider>
  )
}

export default AppLayout
