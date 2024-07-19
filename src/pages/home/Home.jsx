import TrendingMovies from "../../components/trendingMovies/TrendingMovies"
import TrendingShows from "../../components/trendingShows/TrendingShows"
import Docuseries from "../../components/docuseries/Docuseries"
import SciFi from "../../components/scifi/SciFi"
import Carousel from "../../components/carousel/Carousel"
import { useContext } from "react"
import { AppContext } from "../../App"
import styles from "./Home.module.css"

const Home = () => {

  const { homePageData } = useContext(AppContext)

  return (
    <>
      {homePageData !== null ? (
        <>
          <Carousel />
          <TrendingMovies />
          <TrendingShows />
          <Docuseries />
          <SciFi />
        </>
      ) : (
        <div className={["d-flex justify-content-center align-items-center whiteText", styles.homeDivLoading].join(" ")}>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}

export default Home