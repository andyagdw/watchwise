// React
import { useContext } from "react"
// Context
import { AppContext } from "../../context/Context"
// Components
import PosterItem from "../posterItem/PosterItem"

export default function Docuseries() {
  const [ homePageData ] = useContext(AppContext)

  const docuseriesDataTitle = homePageData?.[9]?.title
  const firstWord = docuseriesDataTitle?.split(" ")?.[0]
  const restOfWords = docuseriesDataTitle?.split(" ")?.splice(1)?.join(" ")
  const docuseriesDataMovies = homePageData?.[9]?.movies // Array of 25 movies as objects

  return (
    <section
      aria-labelledby="docuseries-heading"
      className="container-md homePageHeadingContainers"
    >
      <div className="row">
        <div className="col-md-10 mx-auto">
          <h2 id="docuseries-heading" className="whiteText fs-1 mb-5">
            {firstWord} <span className="redText">{restOfWords}</span>
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="d-flex flex-wrap posterContainer mx-auto">
            {docuseriesDataMovies.map(item => {
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
