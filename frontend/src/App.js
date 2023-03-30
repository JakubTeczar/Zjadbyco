import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "../src/css/pages/styles.css";
// import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';
import Calendar from './pages/Calendar';
import Fridge from './pages/Fridge';
import Settings from './pages/Settings';
import Shopping from './pages/Shopping';



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    id: 'root',
    // loader: tokenLoader,
    children: [
      {
        path: 'calendar',
        element: <Calendar/>,
      },
      {
        path: 'fridge',
        element: <Fridge/>,
      },
      {
        path: 'settings',
        element: <Settings/>,
      },
      {
        path: 'shopping',
        element: <Shopping/>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
