export default function Loading({ children }) {
  return (
    <div className="container-md">
      <div className="row">
        <div className="col-md-12">
          <div
            className={[
              "d-flex justify-content-center align-items-center whiteText loadingWrapper",
            ].join(" ")}
          >
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
