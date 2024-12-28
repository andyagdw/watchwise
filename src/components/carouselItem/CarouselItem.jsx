// React
import { Link } from "react-router-dom";
// Styles
import styles from "./CarouselItem.module.css"

export default function CarouselItem({ title, contentType, date, id, backdrop_path }) {

  const link = `/watchwise/watch/${id}`;
  const capitaliseContentType = contentType[0].toUpperCase() + contentType?.slice(1)

    return (
      <>
        <div className={["p-1 lead whiteText", styles.carouselItemDivInfo].join(" ")}>
          <span className="redText ps-2">{title}</span>
          <span> | <em>{capitaliseContentType}</em> | &#40;
            {date}&#41;
          </span>
        </div>
        <Link
          to={link}
          state={{ contentType: contentType }}
        >
          <img
            className={["d-block w-100", styles.carouselItemImg].join(" ")}
            src={backdrop_path}
            alt={`${title} movie poster`}
          />
        </Link>
      </>
    );
}