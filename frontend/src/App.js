import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    id: 'root',
    // loader: tokenLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
