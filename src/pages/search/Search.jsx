import { useParams } from "react-router-dom";
import PosterItem from "../../components/posterItem/PosterItem.jsx";
import { useContext, useEffect, useState } from "react";
import { options } from "../../constants/constants"
import { AppContext } from "../../App.jsx"
import styles from "./Search.module.css"
import { Helmet } from "react-helmet-async";

const Search = () => {

  const { searchquery } = useParams()
  const { errorMessage, setErrorMessage } = useContext(AppContext)
  const [searchData, setSearchData] = useState(null)
  
  const searchDataContents = searchData?.contents
  
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://movies-api14.p.rapidapi.com/search?query=${searchquery}`;

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          // Ensure that HTTP errors are caught and handled in the try block
          // Fetch function only throws an error if there is a network error. It ignores HTTP errors like 404 or 500
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (errorMessage) {
          // Check if there was an error message from previous calls. If so, set it to false
          setErrorMessage(false);
        }

        if (
          // Check if all data was sent from API
          data.contents
        ) {
          setSearchData(data);
        } else {
          throw new Error("All data was not sent");
        }
      } catch (error) {
        setErrorMessage(true);
      }
    };

    fetchData();
  }, [searchData]);
  
  return (
    <div className="container-md my-5">
      <Helmet>
        <title>Search | Watchwise</title>
      </Helmet>
      {searchData ? (
        <>
          <div className="row mb-5">
            <div className="col-md-10 mx-auto">
              <h1 className="whiteText">
                Search results for <span className="redText">{searchquery}</span>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 mx-auto">
              <div className="d-flex flex-wrap posterContainer mx-auto">
                {searchDataContents.map(item => {
                  return (
                    <PosterItem
                      posterPath={item?.poster_path}
                      key={item?._id}
                      date={item?.release_date || item?.first_aired}
                      id={item?._id}
                      contentType={item?.contentType}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="row">
            <div className="col-md-12">
              <div className={["d-flex justify-content-center align-items-center whiteText", styles.searchLoadingDiv].join(" ")}>
                <h1 className="whiteText">Loading...</h1>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search