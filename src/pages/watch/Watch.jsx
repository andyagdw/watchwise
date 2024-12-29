// React
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
// Constants
import { options } from "../../constants/constants"
// Components
import Movie from "../../components/movie/Movie"
import Video from "../../components/video/Video"
import Genres from "../../components/genres/Genres"
import Loading from "../../components/loading/Loading"
import Show from "../../components/show/Show"
// Styles
import styles from "./Watch.module.css"

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
    const fetchMovieShowData = async url => {
      try {
        const response = await fetch(url, options)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
        const data = await response.json()

        if (!data) {
          throw new Error("Data was not sent")
        }
        setMovieShowData(data)
      } catch (e) {
        setErrorMessage("Error fetching data. Please try again later.")
      }
    }
    fetchMovieShowData(url)
  }, [url])

  return (
    <>
      <>
        <title>{title ? `${title} | Watchwise` : "Watchwise"}</title>
      </>
      {/* Error */}
      {errorMessage &&
        movieShowData === null && (
          <Loading>
            <h1 className="mb-3">
              The movie/show does not exist, an API key was not provided, or
              there was a server error. Please check your input or try again
              later.
            </h1>
          </Loading>
        )}
      {/* Fetching data */}
      {movieShowData === null &&
        !errorMessage && (
          <Loading>
            <h1>Loading...</h1>
          </Loading>
        )}
      {/* Show data */}
      {movieShowData !== null && (
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
