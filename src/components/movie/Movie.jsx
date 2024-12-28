// Components
import PosterItem from "../posterItem/PosterItem"

export default function Movie({ similarMovies }) {
  return (
    <div className="row mb-5">
      <div className="col-md-10 mx-auto">
        <h2 className="whiteText mb-5">
          Similar <span className="redText">Movies</span>
        </h2>
        <div className="d-flex flex-wrap posterContainer">
          {similarMovies?.map(item => {
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
            )
          })}
        </div>
      </div>
    </div>
  )
}
