// React
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
// Components
import PosterItem from "../../components/posterItem/PosterItem.jsx"
// Constants
import { options } from "../../constants/constants"
// Styles
import Loading from "../../components/loading/Loading.jsx"

export default function Search() {
  const { searchquery } = useParams()
  const [searchData, setSearchData] = useState(null)

  const searchDataContents = searchData?.contents

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://movies-api14.p.rapidapi.com/search?query=${searchquery}`
        const response = await fetch(url, options)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        // Check if all data was sent from API
        if (data.contents) {
          setSearchData(data)
        } else {
          throw new Error("All data was not sent")
        }
      } catch (e) {
        console.log(e.message)
      }
    }
    fetchData()
  }, [searchquery])

  return (
    <>
      <Helmet>
        <title>Search | Watchwise</title>
      </Helmet>
      {searchData ? (
        <section aria-labelledby="search-heading" className="container-md my-5">
          <div className="row mb-5">
            <div className="col-md-10 mx-auto">
              <h1 id="search-heading" className="whiteText">
                Search results for{" "}
                <span className="redText">{searchquery}</span>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 mx-auto">
              <div className="d-flex flex-wrap posterContainer mx-auto">
                {searchDataContents.map((item) => {
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
      ) : (
        <Loading>
          <h1>Loading...</h1>
        </Loading>
      )}
    </>
  )
}
