// Components
import Layout from './components/layout/Layout'
import { options } from "./constants/constants";
import Error from "./components/error/Error"

// Pages
import Home from './pages/home/Home'
import Search from './pages/search/Search';
import Watch from './pages/watch/Watch';

// Imports
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements
} from "react-router-dom";

import { createContext, useEffect, useMemo, useState } from 'react';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <Layout /> } errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="watchwise/:searchquery" element={ <Search /> } />
      <Route path="watchwise/watch/:id" element={ <Watch /> } />
    </Route>
  )
)

export const AppContext = createContext(null);  // Store App state variables here

export default function App() {

  const [errorMessage, setErrorMessage] = useState(false)
  const [homePageData, setHomePageData] = useState(null)

  const url = "https://movies-api14.p.rapidapi.com/home";  // Home endpoint

  const getHomePageData = async () => {
    try {

      const response = await fetch(url, options);

      if (!response.ok) {
        // Ensure that HTTP errors are caught and handled in the try block
        // Fetch function only throws an error if there is a network error. It ignores HTTP errors like 404 or 500
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (errorMessage) {
        // Check if there was an error message from previous calls. If so, set it to false
        setErrorMessage(false);
      }

      if (
        // Check if all data was sent from home endpoint
        data.length === 10 // Returns an Array of 10 items
      ) {
        setHomePageData(data);
      } else {
        throw new Error("All data was not sent");
      }
    } catch (error) {
      setErrorMessage(true);
    }
  };

  useEffect(() => {
    getHomePageData()
  }, [])

  const memoizedAppContextValues = useMemo(
    () => ({
      homePageData,
      errorMessage,
      setErrorMessage,
    }),
    [homePageData,
      errorMessage,
      ]
  );

  return (
    <AppContext.Provider value={memoizedAppContextValues}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}