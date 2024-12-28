// React
import { Link } from "react-router-dom"
// Components
import Loading from "../loading/Loading"

export default function Error() {
  return (
    <Loading>
      <h1>
        Page Not Found. Go back to <Link to="/">home</Link>?
      </h1>
    </Loading>
  )
}
