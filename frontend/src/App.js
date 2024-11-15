import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "../src/css/pages/styles.css";
// import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';
import Calendar, {loader as loadCalendar} from './pages/Calendar';
import Fridge, {loader as loadFridge} from './pages/Fridge';
import Settings from './pages/settings/Settings';
import Shopping ,{loader as loadShopping} from './pages/Shopping';

import Hello from './pages/hello/Hello';
import ChooseElements,{loader as loadPool}  from './pages/hello/ChooseElements';
// import  {action as sendChoosenPool}  from './pages/hello/ChooseElements';
import AddElementToCal ,{action as AddNewElement} from './pages/AddElementToCal';
import AddElementToFridge, {action as actionAddToFridge} from './pages/AddElementToFridge';
import Genereate from './pages/GenerateEl';
import ErrorPage from './pages/ErrorPage';
import LastConfiguration from './pages/hello/LastConfiguration';
import ElementInput, {loader as loadYourPool} from './components/loadYourPool';
import AddProductsListToDish ,{loader as loadProducts}from './pages/settings/AddProductsToDish';
import AuthPage from './pages/authentication/AuthPage';
// import Registration from './pages/Registration';
import AddNewElements , {action as AddOwnElement} from './pages/settings/AddNewElements';


const router = createBrowserRouter([
  {
    path: 'authentication/:state',
    element: <AuthPage/>,
  },
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    id: 'root',
    errorElement : <ErrorPage/>,
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
        path: 'fridge/:type',
        element: <Fridge/>,
        loader: loadFridge,
      },
      {
        path: 'fridge/addElement',
        element: <AddElementToFridge/>,
        action: actionAddToFridge,
        children: [
          {
            path: ':type/:addData',
            loader: loadYourPool ,
            element: <ElementInput/>,
          }
        ],
      },
      {
        path: 'settings/add/addProducts',
        element: <AddProductsListToDish/> ,
        loader: loadProducts,
      },
      {
        path: 'settings/:type',
        element: <Settings/>,
        loader: loadYourPool,
      },
      {
        path: 'settings/add/:type',
        element: <AddNewElements/>,
        loader: loadYourPool,
        action: AddOwnElement
      },
      {
        path: 'shopping',
        element: <Shopping/>,
        loader: loadShopping,
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