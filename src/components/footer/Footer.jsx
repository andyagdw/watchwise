// Styles
import styles from "./Footer.module.css"

export default function Footer() {
  const date = new Date()
  const currentYear = date.getFullYear()

  return (
    <footer className="p-4">
      <div className="container-md">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <p className={styles.textColour}>Watchwise &copy; {currentYear} | All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
