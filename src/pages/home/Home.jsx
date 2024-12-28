// Components
import TrendingMovies from "../../components/trendingMovies/TrendingMovies"
import TrendingShows from "../../components/trendingShows/TrendingShows"
import Docuseries from "../../components/docuseries/Docuseries"
import SciFi from "../../components/scifi/SciFi"
import Carousel from "../../components/carousel/Carousel"
import Loading from "../../components/loading/Loading"
// React
import { useContext } from "react"
import { Helmet } from "react-helmet-async"
// Constants
import { apiKey } from "../../constants/constants"
// Context
import { AppContext } from "../../context/Context"

export default function Home() {
  const homePageData = useContext(AppContext)
  return (
    <>
      {!apiKey && ( // No Api key provided
        <>
          <Helmet>
            <title>Error | Watchwise</title>
          </Helmet>
          <Loading>
            <h1>There was an error.</h1>
            <p>Please provide an API key to use this service</p>
          </Loading>
        </>
      )}
      {homePageData === null &&
        apiKey && ( // Fetching data
          <>
            <Helmet>
              <title>Home | Watchwise</title>
            </Helmet>
            <Loading>
              <h1>Loading...</h1>
            </Loading>
          </>
        )}
      {homePageData !== null &&
        apiKey && ( // Data was fetched
          <>
            <Helmet>
              <title>Home | Watchwise</title>
            </Helmet>
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
