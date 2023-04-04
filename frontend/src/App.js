import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "../src/css/pages/styles.css";
// import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';
import Calendar, {loader as loadCalendar} from './pages/Calendar';
import Fridge, {loader as loadFridge} from './pages/Fridge';
import Settings from './pages/Settings';
import Shopping from './pages/Shopping';
import AddElement from './pages/AddElement';
import Hello from './pages/hello/Hello';
import ChooseElements from './pages/hello/ChooseElements';
import {action as AddNewElement} from './pages/AddElement';



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    id: 'root',
    // loader: tokenLoader,
    children: [
      {
        path: 'hello',
        element: <Hello/>,
        children: [
          {
            path: 'choseElements',
            element: <ChooseElements/>
          }
        ]

        
      },
      {
        path: 'calendar/:date',
        element: <Calendar/>,
        loader: loadCalendar,
      },
      {
        path: 'fridge',
        element: <Fridge/>,
        loader: loadFridge,
        children: [
          {
            path: 'product',
          },
          {
            path: 'dish',
          },
          {
            path: 'all',
          }
        ],
      },
      {
        path: 'settings',
        element: <Settings/>,
      },
      {
        path: 'shopping',
        element: <Shopping/>,
      },
      {
        path: 'calendar/addElement',
        element: <AddElement/>,
        action: AddNewElement,
        children: [
          {
            path: 'product',
          },
          {
            path: 'dish',
          }
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
