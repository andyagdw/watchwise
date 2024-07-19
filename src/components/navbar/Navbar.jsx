import { Link, useNavigate } from 'react-router-dom';
import WatchwiseImg from '../../assets/watchwise_logo.png'
import styles from "./Navbar.module.css"
import { useState } from 'react';


export default function Navbar() {

  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    if (searchQuery === "") {  // Check if there was no input
      e.preventDefault()
      return
    }
    const searchQueryTrim = searchQuery.trim()  // Remove any leading or starting white spaces

    navigate(`/watchwise/${searchQueryTrim}`);
  }

    return (
      <header className="pb-3 mb-5">
        <nav className="container-md">
          <div className="row">
            <div className="col-md-10 mx-auto d-flex justify-content-between">
              <div>
                <Link to="/">
                  <img src={WatchwiseImg} alt="Logo" className={styles.watchwiseImg} />
                </Link>
              </div>
              <div className="d-flex align-items-center">
                <form method='get' onSubmit={handleSubmit}>
                  <input
                    type="search"
                    placeholder="Search..."
                    name="search"
                    id="search"
                    className={styles.searchbar}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
}