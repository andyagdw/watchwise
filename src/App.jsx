// Components
import Layout from "./components/layout/Layout"
import Error from "./components/error/Error"
// Constants
import { options } from "./constants/constants"
// Pages
import Home from "./pages/home/Home"
import Search from "./pages/search/Search"
import Watch from "./pages/watch/Watch"
// React
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { useEffect, useState } from "react"
// Context
import { AppContext } from "./context/Context"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="watchwise/:searchquery" element={<Search />} />
      <Route path="watchwise/watch/:id" element={<Watch />} />
    </Route>
  )
)

export default function App() {
  const [homePageData, setHomePageData] = useState(null)

  useEffect(() => {
    const getHomePageData = async () => {
      try {
        const url = "https://movies-api14.p.rapidapi.com/home"; // Home endpoint
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Check if all data was sent from home endpoint
        if (data.length === 10) {
          setHomePageData(data);
          // localStorage.setItem("watchwise", JSON.stringify(data));
        } else {
          throw new Error("All data was not sent");
        }
      } catch (e) {
        console.log(e.message)
      }
    }
    // const watchwiseData = localStorage.getItem("watchwise");
    // if (watchwiseData) {
    //   const data = JSON.parse(watchwiseData);
    //   setHomePageData(data)
    // } else {
    //   getHomePageData()
    // }
    getHomePageData()
  }, [])

  return (
    <HelmetProvider>
      {/* Wrap entire App component in order to create context & prevent memory leaks */}
      <AppContext.Provider value={homePageData}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </HelmetProvider>
  )
}