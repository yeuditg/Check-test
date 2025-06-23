
import Home from './components/Home';
import LogUp from './components/LogUp';
import Folders from './components/Folders';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import AppLayot from './components/appLayot';
import Subjects from './components/Subjects';
import FileUploader from './components/FileUploader';
// import ClassExamsPage from './components/ClassExamsPage';
import Classes from './components/Classes';
import ClassExamsPage from './components/ClassExamsPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayot />,
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'home/login', 
                element: <Login />
            },
            {
                path: 'home/signup', 
                element: <LogUp />
            },
            {
                path: 'folders',
                element: <Folders />
            },
            {
                path: 'subjects',
                element: <Subjects />,
            },
            {
                path: 'classes',
                element: <Classes />,             
            },
            {
                path: 'studentsExams',
                element:<ClassExamsPage/>,
                children:[
                    {
                        path: 'upload', 
                        element: <FileUploader />
                    }
                ]
            }
        ],
        
    },
  
    
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
