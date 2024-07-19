import { Link } from "react-router-dom";
import styles from "./Error.module.css"

export default function Error() {
  return (
    <div className={["d-flex justify-content-center align-items-center whiteText", styles.errorDiv].join(" ")}>
      <h1>
        Page Not Found. Go back to <Link to="/">home</Link>?
      </h1>
    </div>
  );
}
