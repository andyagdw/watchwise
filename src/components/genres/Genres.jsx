export default function Genres({ item, styles }) {
  return (
    <div
      className={["p-3 d-inline-block me-2 mb-3", styles.genreButtons].join(
        " "
      )}
      role="button"
    >
      <span className="fw-bold">{item}</span>
    </div>
  );
}
