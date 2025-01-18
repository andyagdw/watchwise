// React
import { useContext, useEffect, useState } from "react"
// Context
import { AppContext } from "../../context/Context"
// Components
import CarouselItem from "../carouselItem/CarouselItem"
// Styles
import styles from "./Carousel.module.css"

export default function Carousel() {
  const { homePageData } = useContext(AppContext)
  const [newMoviesAndShows, setNewMoviesAndShows] = useState(null)

  // Get movie array
  const newMovies = homePageData?.[1]?.movies
  // Get shows array
  const newShows = homePageData?.[6]?.movies

  useEffect(() => {
    const joinArr = () => {
      // Create a joined shuffled array so that the movies and
      // show data are joined rather than separate
      const joinedArr = newMovies?.concat(newShows)

      for (let i = joinedArr?.length - 1; i > 0; i--) {
        // Fisher-Yates shuffle
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements array[i] and array[j]
        [joinedArr[i], joinedArr[j]] = [joinedArr[j], joinedArr[i]];
      }
      return joinedArr;
    }

    const result = joinArr()
    setNewMoviesAndShows(result)
  }, [newMovies, newShows])

  return (
    <>
      <section
        aria-labelledby="movies-and-shows-heading"
        className="border mb-5 position-relative"
      >
        <div id="carouselExampleControls" className="carousel slide">
          <div className={["p-3", styles.top50Container].join(" ")}>
            <h1 id="movies-and-shows-heading" className="whiteText display-1">
              Top 50 latest <span className="redText">movies and shows</span>
            </h1>
          </div>
          <div className="carousel-inner">
            {newMoviesAndShows?.map((item, idx) => {
              return idx === 0 ? (
                <div className="carousel-item active" key={item?._id}>
                  <CarouselItem
                    title={item?.title}
                    contentType={item?.contentType}
                    // release_date for movies, first_aired for shows
                    date={item?.first_aired || item?.release_date}
                    release_date={item?.release_date}
                    id={item?._id}
                    backdrop_path={item?.backdrop_path}
                  />
                </div>
              ) : (
                <div className="carousel-item" key={item?._id}>
                  <CarouselItem
                    title={item?.title}
                    contentType={item?.contentType}
                    date={item?.first_aired || item?.release_date}
                    id={item?._id}
                    backdrop_path={item?.backdrop_path}
                  />
                </div>
              )
            })}
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </a>
        </div>
      </section>
    </>
  )
}