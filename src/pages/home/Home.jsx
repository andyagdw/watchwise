import TrendingMovies from "../../components/trendingMovies/TrendingMovies";
import TrendingShows from "../../components/trendingShows/TrendingShows";
import Docuseries from "../../components/docuseries/Docuseries";
import SciFi from "../../components/scifi/SciFi";
import Carousel from "../../components/carousel/Carousel";
import { useContext } from "react";
import { AppContext } from "../../App";
import styles from "./Home.module.css";
import { apiKey } from "../../constants/constants";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const { homePageData } = useContext(AppContext);

  return (
    <>
      {!apiKey && ( // No Api key provided
        <>
          <Helmet>
            <title>Error | Watchwise</title>
          </Helmet>
          <div
            className={[
              "d-flex justify-content-center align-items-center flex-column whiteText",
              styles.homeNoApiKeyDiv,
            ].join(" ")}
          >
            <h1>There was an error.</h1>
            <p>Please provide an API key to use this service</p>
          </div>
        </>
      )}
      {homePageData === null &&
        apiKey && ( // Fetching data
        <>
          <Helmet>
            <title>Home | Watchwise</title>
          </Helmet>
          <div
            className={[
              "d-flex justify-content-center align-items-center whiteText",
              styles.homeDivLoading,
            ].join(" ")}
          >
            <h1>Loading...</h1>
          </div>
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
  );
}