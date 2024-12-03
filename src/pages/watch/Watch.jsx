import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import { options } from "../../constants/constants";
import PosterItem from "../../components/posterItem/PosterItem";
import SeasonsDropdown from "../../components/seasonsDropdown/SeasonsDropdown";
import styles from "./Watch.module.css"
import Video from "../../components/video/Video";
import Genres from "../../components/genres/Genres";
import { Helmet } from "react-helmet-async";

export default function Watch() {
  const { id } = useParams();
  let { state } = useLocation();
  const contentType = state?.contentType;
  const { errorMessage, setErrorMessage } = useContext(AppContext);
  const [movieShowData, setMovieShowData] = useState(null);
  // Track if timeout has occured - if movie or show does not exist
  const [isTimeout, setIsTimeout] = useState(false);

  const data = movieShowData?.movie || movieShowData?.show; // Check if movie or show
  const backdropPath = data?.backdrop_path;
  const date =
    data?.first_aired?.split("-")?.[0] || // Check if movie or show
    data?.release_date?.split("-")?.[0];
  const genres = data?.genres;
  const filteredGenresList = Array.from(new Set(genres)) // Remove duplicates from genres
  const title = data?.title;
  const overview = data?.overview;
  const videoTrailer = data?.youtube_trailer;
  const posterPath = data?.poster_path;

  const vidId = videoTrailer?.split("v=")[1];
  const youtubeVideo = `https://www.youtube.com/embed/${vidId}?autoplay=0&mute=1`;

  const similarMovies = movieShowData?.similarMovies; // An array
  const seasons = movieShowData?.seasons; // An array

  useEffect(() => {
    const fetchMovieShowData = async (url) => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (errorMessage) {
          // Check if there was an error message from previous calls. If so, set it to false
          setErrorMessage(false);
        }
        setMovieShowData(data);
        setIsTimeout(false);  // Clear timeout if data loads successfully before timeout
      } catch (error) {
        setErrorMessage(true);
      }
    };

    let url;
    if (contentType === "movie") {
      url = `https://movies-api14.p.rapidapi.com/movie/${id}`; // Movie endpoint
    } else if (contentType === "show") {
      url = `https://movies-api14.p.rapidapi.com/show/${id}`; // Show endpoint
    }

    fetchMovieShowData(url);

    const timeoutId = setTimeout(() => {  // Wait for 10 seconds, and then set to true
      setIsTimeout(true);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [id, errorMessage]);

  // console.log(seasons)

  return (
    <>
      <Helmet>
        <title>{title ? `${title} | Watchwise` : "Watchwise"}</title>
      </Helmet>
      {isTimeout &&
        movieShowData === null && ( // No data
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div
                className={[
                  "d-flex justify-content-center align-items-center whiteText flex-column text-center",
                  styles.noDataDiv,
                ].join(" ")}
              >
                <h1 className="mb-3">
                  The movie/show does not exist, an API key was not provided, or
                  there was a server error. Please check your input or try again
                  later.
                </h1>
              </div>
            </div>
          </div>
        )}
      {movieShowData === null &&
        !isTimeout && ( // Fetching data
          <div className="row">
            <div className="col-md-12">
              <div
                className={[
                  "d-flex justify-content-center align-items-center whiteText",
                  styles.watchLoadingDiv,
                ].join(" ")}
              >
                <h1>Loading...</h1>
              </div>
            </div>
          </div>
        )}
      {movieShowData !== null && ( // Data exists
        <>
          <Video backdropPath={backdropPath} styles={styles} />
          <div className="container-md">
            <div className={["mb-4", styles.divider].join(" ")}></div>
            <div className="row mb-5">
              <div className="col-md-3 d-flex justify-content-start justify-content-md-end">
                <img
                  src={posterPath}
                  alt="Poster"
                  className={styles.movieShowPoster}
                />
              </div>
              <div className="col-md-9">
                <h1 className="whiteText my-3 my-md-2">
                  {title} {date && <span>&#40;{date}&#41;</span>}
                </h1>
                <div className="mb-3">
                  {filteredGenresList !== null &&
                    filteredGenresList.map((item, idx) => {
                      return <Genres key={idx} item={item} styles={styles} />;
                    })}
                </div>
                <div className="whiteText">
                  <p className="lead">{overview}</p>
                </div>
              </div>
            </div>
            <div className={["row", styles.watchTrailerContainer].join(" ")}>
              <div className="col-md-6 mx-auto text-center">
                <h2 className="whiteText mb-3">
                  Watch <span className="redText">Trailer</span>
                </h2>
                <iframe
                  width="500"
                  height="325"
                  src={youtubeVideo}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            {contentType === "movie" ? (
              <div className="row mb-5">
                <div className="col-md-10 mx-auto">
                  <h2 className="whiteText mb-5">
                    Similar <span className="redText">Movies</span>
                  </h2>
                  <div className="d-flex flex-wrap posterContainer">
                    {similarMovies !== null &&
                      similarMovies?.map((item) => {
                        return (
                          <PosterItem
                            posterPath={item?.poster_path}
                            key={item?._id}
                            // release_date for movies, first_aired for shows
                            date={item?.first_aired || item?.release_date}
                            id={item?._id}
                            contentType={item?.contentType}
                            title={item?.title}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="whiteText mb-4 h1">
                    All <span className="redText">Seasons</span>
                  </h2>
                  <div id="accordion">
                    {seasons !== null &&
                      seasons?.map((item, idx) => {
                        return <SeasonsDropdown key={idx} data={item} />;
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}