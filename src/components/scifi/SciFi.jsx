import { useContext } from "react";
import { AppContext } from "../../App";
import PosterItem from "../posterItem/PosterItem";

export default function SciFi() {
  const { homePageData } = useContext(AppContext);  // Get data from home endpoint in App

  const sciFiDataTitle = homePageData?.[8]?.title;
  const firstWord = sciFiDataTitle?.split(" ")?.[0];
  const restOfWords = sciFiDataTitle?.split(" ")?.splice(1)?.join(" ");
  const sciFiDataMovies = homePageData?.[8]?.movies; // Array of 25 movies as objects

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
            {sciFiDataMovies !== null &&
              sciFiDataMovies.map(item => {
                return (
                  <PosterItem
                    posterPath={item?.poster_path}
                    key={item?._id}
                    // release_date for movies, first_aired for shows
                    date={item?.release_date || item?.first_aired}
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
}