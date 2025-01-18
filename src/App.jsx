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
  const [error, setError] = useState("")

  useEffect(() => {
    const getHomePageData = async () => {
      try {
        const url = "https://movies-api14.p.rapidapi.com/home"; // Home endpoint
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!data) {
          throw new Error("Data was not sent");
        }
        setHomePageData(data);
        // localStorage.setItem("watchwise", JSON.stringify(data));
      } catch (e) {
        setError("Error fetching homepage data. Please try again later.");
      }
    }
    // IGNORE:
    // const watchwiseData = localStorage.getItem("watchwise") || null;
    // if (watchwiseData) {
    //   const data = JSON.parse(watchwiseData);
    //   setHomePageData(data)
    // } else {
    //   getHomePageData()
    // }
    getHomePageData()
  }, [])

  const appContext = { homePageData, error }

  return (
    <AppContext value={appContext}>
      <RouterProvider router={router} />
    </AppContext>
  )
}