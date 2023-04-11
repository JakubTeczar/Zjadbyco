import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "../src/css/pages/styles.css";
// import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';
import Calendar, {loader as loadCalendar} from './pages/Calendar';
import Fridge, {loader as loadFridge} from './pages/Fridge';
import Settings from './pages/Settings';
import Shopping from './pages/Shopping';

import Hello from './pages/hello/Hello';
import ChooseElements,{loader as loadPool}  from './pages/hello/ChooseElements';
// import  {action as sendChoosenPool}  from './pages/hello/ChooseElements';
import AddElementToCal ,{action as AddNewElement} from './pages/AddElementToCal';
import AddElementToFridge from './pages/AddElementToFridge';
import Genereate from './pages/GenerateEl';
import LastConfiguration from './pages/hello/LastConfiguration';
import ElementInput, {loader as loadYourPool} from './components/loadYourPool';
import AddProductsListToDish ,{loader as loadProducts}from './pages/AddProductsToDish';



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
      },
      {
        path: 'hello/chooseElements/:type',
        element: <ChooseElements/>,
        loader: loadPool,
        // action: sendChoosenPool,
      },
      {
        path: 'hello/lastConfiguration',
        element: <LastConfiguration/>,
        // loader: loadPool,
        // action: sendChoosenPool,
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
        ]
      },

      {
        path: 'fridge/addElement',
        element: <AddElementToFridge/>,
        children: [
          {
            path: ':type/:addData',
            loader: loadYourPool ,
            element: <ElementInput/>,
          }
        ],
      },
      {
        path: 'calendar/addProducts/:addData',
        element: <AddProductsListToDish/> ,
        loader: loadProducts,
      },
      {
        path: 'settings',
        element: <Settings/>,
      },
      {
        path: 'shopping/:data',
        element: <Shopping/>,
      },
      {
        path: "calendar/generateElements",
        element: <Genereate/>,
      },
      {
        path: 'calendar/addElement',
        element: <AddElementToCal/>,
        action: AddNewElement,
 
        children: [
          {
            path: ':type/:addData',
            loader: loadYourPool ,
            element: <ElementInput/>,
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
