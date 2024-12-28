// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function Video({ backdropPath, styles }) {
  return (
    <div
      className="border mb-5 d-flex justify-content-center align-items-center"
      style={{
        // Dynamically set background image based on the movie or show
        backgroundImage: `url("${backdropPath}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "650px",
      }}
    >
      <div>
        <button className={styles.playButton}>
          <FontAwesomeIcon icon={faPlay} size="3x" color="white" />
        </button>
      </div>
    </div>
  );
}
