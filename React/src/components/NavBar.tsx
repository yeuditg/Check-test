// // import { ListItemText, MenuItem, MenuList, Paper } from "@mui/material";
// // import { Link } from "react-router-dom"; 

// // const NavBar = () => {
// //   return (
// //     <div style={{ position: "absolute", top: "10px", right: "10px" }}>
// //       <Paper sx={{ width: 180, maxWidth: '100%', padding: 1, borderRadius: 2 }}>
// //         <MenuList>
// //           <Link to='/home' style={{ textDecoration: 'none', color: 'inherit' }}>
// //             <MenuItem>
// //               <ListItemText sx={{ fontWeight: 'bold', color: '#333' }}>דף הבית</ListItemText>
// //             </MenuItem>
// //           </Link>
// //           <Link to='/subjects' style={{ textDecoration: 'none', color: 'inherit' }}>
// //             <MenuItem>
// //               <ListItemText sx={{ fontWeight: 'bold', color: '#333' }}>מקצועות</ListItemText>
// //             </MenuItem>
// //           </Link>
// //           <Link to='/upload' style={{ textDecoration: 'none', color: 'inherit' }}>
// //             <MenuItem>
// //               <ListItemText sx={{ fontWeight: 'bold', color: '#333' }}>העלאת מבחן</ListItemText>
// //             </MenuItem>
// //           </Link>
// //         </MenuList>
// //       </Paper>
// //     </div>
// //   );
// // };
// // export default NavBar;
// import { ListItemText, MenuItem, MenuList, Paper } from "@mui/material";
// import { Link } from "react-router-dom";

// const NavBar = () => {
//   return (
//     <Paper 
//       sx={{ 
//         position: 'sticky', // or 'fixed' if you want it always visible
//         top: 0,
//         zIndex: 1000,
//         width: '100%',
//         marginBottom: 2 // Add some space below the navbar
//       }}
//     >
//       <MenuList sx={{ display: 'flex', flexDirection: 'row', padding: 1 }}>
//         <MenuItem component={Link} to="/">
//           <ListItemText primary="דף הבית" />
//         </MenuItem>
//         <MenuItem component={Link} to="/subjects">
//           <ListItemText primary="מקצועות" />
//         </MenuItem>
//         <MenuItem component={Link} to="/upload">
//           <ListItemText primary="העלאת מבחן" />
//         </MenuItem>
//       </MenuList>
//     </Paper>
//   );
// };

// export default NavBar;

import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        marginBottom: 2,
        width: '100%',
        background: 'linear-gradient(45deg, #87CEEB 30%, #40E0D0 90%)', // Light blue to turquoise
        boxShadow: '0 3px 5px 2px rgba(135, 206, 235, .3)',
      }}
    >
      <Toolbar sx={{ width: '100%' }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          width: '100%',
          justifyContent: 'flex-start' // or 'center' if you want centered navigation
        }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ 
              color: 'white',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            דף הבית
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/subjects"
            sx={{ 
              color: 'white',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            מקצועות
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/upload"
            sx={{ 
              color: 'white',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            העלאת מבחן
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;