import { useContext } from "react";
import { AppContext } from "../../App";
import PosterItem from "../posterItem/PosterItem";

export default function TrendingShows() {
  const { homePageData } = useContext(AppContext);  // Get data from home endpoint in App

  const trendingShowsDataTitle = homePageData?.[5]?.title;
  const firstWord = trendingShowsDataTitle?.split(" ")?.[0];
  const restOfWords = trendingShowsDataTitle?.split(" ")?.splice(1)?.join(" ");
  const trendingShowsDataMovies = homePageData?.[5]?.movies; // Array of 25 movies as objects

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
            {trendingShowsDataMovies !== null &&
              trendingShowsDataMovies.map(item => {
                return (
                  <PosterItem
                    posterPath={item?.poster_path}
                    key={item?._id}
                    // first_aired for shows
                    date={item?.first_aired}
                    id={item?._id}
                    contentType={item?.contentType}
                    title={item?.title}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}