// React
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
// Assets
import WatchwiseImg from "../../assets/watchwise_logo.png"
// Styles
import styles from "./Navbar.module.css"

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    if (searchQuery === "") return // No input
    // Remove any leading or starting white spaces
    const searchQueryTrim = searchQuery.trim()

    navigate(`/watchwise/${searchQueryTrim}`)
  }

  return (
    <header className="pb-3 mb-5">
      <nav aria-label="Primary" className="container-md">
        <div className="row">
          <div className="col-md-10 mx-auto d-flex flex-column flex-sm-row justify-content-between">
            <div className="mb-4 mb-sm-0">
              <Link to="/">
                <img
                  src={WatchwiseImg}
                  alt="Watchwise Logo"
                  className={styles.watchwiseImg}
                />
              </Link>
            </div>
            <search className="d-flex align-items-center">
              <form
                aria-label="Search shows and movies"
                method="get"
                onSubmit={handleSubmit}
                className={styles.form}
              >
                <input
                  type="search"
                  placeholder="Search..."
                  name="search"
                  id="search"
                  className={styles.searchbar}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </form>
            </search>
          </div>
        </div>
      </nav>
    </header>
  )
}
