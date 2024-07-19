import { memo, useContext } from "react";
import { AppContext } from "../../App";
import PosterItem from "../posterItem/PosterItem";

const TrendingMovies = memo(function TrendingMovies() {
  const { homePageData } = useContext(AppContext);  // Get data from home endpoint in App
  
  const trendingMoviesDataTitle = homePageData?.[0]?.title;
  const firstWord = trendingMoviesDataTitle?.split(" ")?.[0];
  const restOfWords = trendingMoviesDataTitle?.split(" ")?.splice(1)?.join(" ")
  const trendingMoviesDataMovies = homePageData?.[0]?.movies; // Array of 25 movies as objects

  return (
    <div className="container-md homePageHeadingContainers">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <h2 className="whiteText fs-1 mb-5">
            {firstWord} <span className="redText">{restOfWords}</span>
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="d-flex flex-wrap posterContainer mx-auto">
            {trendingMoviesDataMovies !== null &&
              trendingMoviesDataMovies.map(item => {
                return (
                  <PosterItem
                    posterPath={item?.poster_path}
                    key={item?._id}
                    // release_date for movies
                    date={item?.release_date}
                    id={item?._id}
                    contentType={item?.contentType}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
})

export default TrendingMovies