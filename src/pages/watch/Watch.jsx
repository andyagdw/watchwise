// React
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
// Constants
import { options } from "../../constants/constants"
// Components
import Movie from "../../components/movie/Movie"
import Video from "../../components/video/Video"
import Genres from "../../components/genres/Genres"
import Loading from "../../components/loading/Loading"
// Styles
import styles from "./Watch.module.css"
import Show from "../../components/show/Show"

export default function Watch() {
  const { id } = useParams()
  let { state } = useLocation()
  const contentType = state?.contentType
  const [movieShowData, setMovieShowData] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  // Check if movie or show
  const data = movieShowData?.movie || movieShowData?.show
  const date =
    data?.first_aired?.split("-")?.[0] || data?.release_date?.split("-")?.[0]
  // End check if movie or show
  const backdropPath = data?.backdrop_path
  const genres = data?.genres
  // Remove duplicates from genres
  const filteredGenresList = Array.from(new Set(genres))
  const title = data?.title
  const overview = data?.overview
  const videoTrailer = data?.youtube_trailer
  const posterPath = data?.poster_path

  const vidId = videoTrailer?.split("v=")[1]
  const youtubeVideo = `https://www.youtube.com/embed/${vidId}?autoplay=0&mute=1`

  const similarMovies = movieShowData?.similarMovies // An array
  const seasons = movieShowData?.seasons // An array

  let url
  if (contentType === "movie") {
    url = `https://movies-api14.p.rapidapi.com/movie/${id}` // Movie endpoint
  } else if (contentType === "show") {
    url = `https://movies-api14.p.rapidapi.com/show/${id}` // Show endpoint
  }

  useEffect(() => {
    const fetchMovieShowData = async (url) => {
      const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out")), 10000)
      })
      try {
        const fetchPromise = fetch(url, options).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        const data = await Promise.race([timeout, fetchPromise])
        setMovieShowData(data)
        // Clear timeout if data loads successfully before timeout
      } catch (e) {
        console.log(e.message)
        setErrorMessage(`There was an error. ${e}`)
      }
    }
    fetchMovieShowData(url)
  }, [url])

  return (
    <>
      <Helmet>
        <title>{title ? `${title} | Watchwise` : "Watchwise"}</title>
      </Helmet>
      {errorMessage &&
        movieShowData === null && ( // No data
          <Loading>
            <h1 className="mb-3">
              The movie/show does not exist, an API key was not provided, or
              there was a server error. Please check your input or try again
              later.
            </h1>
          </Loading>
        )}
      {movieShowData === null &&
        !errorMessage && ( // Fetching data
          <Loading>
            <h1>Loading...</h1>
          </Loading>
        )}
      {movieShowData !== null && ( // Data exists
        <>
          <Video backdropPath={backdropPath} styles={styles} />
          <section aria-label={`Watch ${title}`} className="container-md">
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
                  {filteredGenresList.map((item, idx) => {
                    return <Genres key={idx} item={item} styles={styles} />
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
            {contentType === "movie" && <Movie similarMovies={similarMovies} />}
            {contentType === "show" && <Show seasons={seasons} />}
          </section>
        </>
      )}
    </>
  )
}
