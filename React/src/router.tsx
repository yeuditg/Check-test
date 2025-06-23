
// import Home from './components/Home';
// import LogUp from './components/LogUp';
// import Folders from './components/Folders';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import Login from './components/Login';
// import AppLayot from './components/appLayot';
// import Subjects from './components/Subjects';
// import FileUploader from './components/FileUploader';
// // import ClassExamsPage from './components/ClassExamsPage';
// import Classes from './components/Classes';
// import ClassExamsPage from './components/ClassExamsPage';

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <AppLayot />,
//         children: [
//             {
//                 path: 'home',
//                 element: <Home />
//             },
//             {
//                 path: 'home/login', 
//                 element: <Login />
//             },
//             {
//                 path: 'home/signup', 
//                 element: <LogUp />
//             },
//             {
//                 path: 'folders',
//                 element: <Folders />
//             },
//             {
//                 path: 'subjects',
//                 element: <Subjects />,
//             },
//             {
//                 path: 'classes',
//                 element: <Classes />,             
//             },
//             {
//                 path: 'studentsExams',
//                 element:<ClassExamsPage/>,
//                 children:[
//                     {
//                         path: 'upload', 
//                         element: <FileUploader />
//                     }
//                 ]
//             }
//         ],
        
//     },
  
    
// ]);

// const AppRouter = () => {
//     return <RouterProvider router={router} />;
// };

// export default AppRouter;


import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"
import FileUploader from "./components/FileUploader"
import AppLayout from "./components/appLayot"
import TestCheckerHome from "./components/Home"
import Classes from "./components/Classes"
import ClassExamsPage from "./components/ClassExamsPage"
import LogUp from "./components/LogUp"
import Subjects from "./components/Subjects"
import Login from "./components/Login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/home",
    element: <TestCheckerHome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <LogUp />,
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="subjects" replace />,
      },
      {
        path: "subjects",
        element: <Subjects />,
      },
      {
        path: "classes",
        element: <Classes />,
      },
      {
        path: "exams",
        element: <ClassExamsPage />,
        children: [
          {
            path: "upload",
            element: <FileUploader />,
          },
        ],
      },
    ],
  },
])

const EnhancedAppRouter = () => {
  return <RouterProvider router={router} />
}

export default EnhancedAppRouter
