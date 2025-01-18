// React
import { useContext } from "react"
// Context
import { AppContext } from "../../context/Context"
// Components
import PosterItem from "../posterItem/PosterItem"

export default function TrendingMovies() {
  const { homePageData } = useContext(AppContext)

  const trendingMoviesDataTitle = homePageData?.[0]?.title
  const firstWord = trendingMoviesDataTitle?.split(" ")?.[0]
  const restOfWords = trendingMoviesDataTitle?.split(" ")?.splice(1)?.join(" ")
  const trendingMoviesDataMovies = homePageData?.[0]?.movies // Array of 25 movies as objects

  return (
    <section
      aria-labelledby="trending-movies-heading"
      className="container-md homePageHeadingContainers"
    >
      <div className="row">
        <div className="col-md-10 mx-auto">
          <h2 id="trending-movies-heading" className="whiteText fs-1 mb-5">
            {firstWord} <span className="redText">{restOfWords}</span>
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="d-flex flex-wrap posterContainer mx-auto">
            {trendingMoviesDataMovies?.map((item) => {
              return (
                <PosterItem
                  posterPath={item?.poster_path}
                  key={item?._id}
                  // release_date for movies
                  date={item?.release_date}
                  id={item?._id}
                  contentType={item?.contentType}
                  title={item?.title}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
