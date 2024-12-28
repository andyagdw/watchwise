// Components
import SeasonsDropdown from "../seasonsDropdown/SeasonsDropdown"

export default function Show({ seasons }) {
  return (
    <div className="row mb-5">
      <div className="col-md-12">
        <h2 className="whiteText mb-4 h1">
          All <span className="redText">Seasons</span>
        </h2>
        <div id="accordion">
          {seasons?.map((item, idx) => {
            return <SeasonsDropdown key={idx} data={item} />
          })}
        </div>
      </div>
    </div>
  )
}
