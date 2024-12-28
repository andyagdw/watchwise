// React
import { Link } from "react-router-dom";
// Styles
import styles from "./PosterItem.module.css"

export default function PosterItem({ posterPath, date, id, contentType, title }) {

  const year = date?.split("-")?.[0];
  const link = `/watchwise/watch/${id}`;

  return (
    <div className={styles.moviePosterItem} data-contenttype={contentType}>
      <div className={styles.moviePosterImgContainer} data-title={title}>
        <Link to={link} state={{ contentType: contentType }}>
          <img
            src={posterPath}
            alt="Movie poster"
            className={styles.moviePoster}
          />
        </Link>
      </div>
      <div>
        <span className="d-block whiteText text-center mt-2">{year}</span>
      </div>
    </div>
  );
}