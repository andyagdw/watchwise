// Components
import TrendingMovies from "../../components/trendingMovies/TrendingMovies"
import TrendingShows from "../../components/trendingShows/TrendingShows"
import Docuseries from "../../components/docuseries/Docuseries"
import SciFi from "../../components/scifi/SciFi"
import Carousel from "../../components/carousel/Carousel"
import Loading from "../../components/loading/Loading"
// React
import { useContext } from "react"
// Constants
import { apiKey } from "../../constants/constants"
// Context
import { AppContext } from "../../context/Context"

export default function Home() {
  const { homePageData, error } = useContext(AppContext)
  return (
    <>
      {/* No api key or error */}
      {(!apiKey || error) && ( 
        <>
          <>
            <title>Error | Watchwise</title>
          </>
          <Loading>
            <h1>There was an error. Please check if you have provided an
              API key or try again later.
            </h1>
          </Loading>
        </>
      )}
      {/* Fetching data */}
      {homePageData === null && !error &&
        apiKey && (
          <>
            <>
              <title>Home | Watchwise</title>
            </>
            <Loading>
              <h1>Loading...</h1>
            </Loading>
          </>
        )}
      {/* Show data */}
      {homePageData !== null && !error &&
        apiKey && (
          <>
            <>
              <title>Home | Watchwise</title>
            </>
            <Carousel />
            <TrendingMovies />
            <TrendingShows />
            <Docuseries />
            <SciFi />
          </>
        )}
    </>
  )
}
