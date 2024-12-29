// React
import { useContext } from "react"
// Context
import { AppContext } from "../../context/Context"
// Components
import PosterItem from "../posterItem/PosterItem"

export default function SciFi() {
  const [homePageData] = useContext(AppContext)

  const sciFiDataTitle = homePageData?.[8]?.title
  const firstWord = sciFiDataTitle?.split(" ")?.[0]
  const restOfWords = sciFiDataTitle?.split(" ")?.splice(1)?.join(" ")
  const sciFiDataMovies = homePageData?.[8]?.movies // Array of 25 movies as objects

  return (
    <section
      aria-labelledby="scifi-heading"
      className="container-md homePageHeadingContainers"
    >
      <div className="row">
        <div className="col-md-10 mx-auto">
          <h2 id="scifi-heading" className="whiteText fs-1 mb-5">
            {firstWord} <span className="redText">{restOfWords}</span>
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="d-flex flex-wrap posterContainer mx-auto">
            {sciFiDataMovies.map(item => {
              return (
                <PosterItem
                  posterPath={item?.poster_path}
                  key={item?._id}
                  // release_date for movies, first_aired for shows
                  date={item?.release_date || item?.first_aired}
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
