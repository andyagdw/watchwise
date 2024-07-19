import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useEffect } from "react";

export default function Layout() {

  const { pathname } = useLocation()

  useEffect(() => {  // Scroll to top
    window.scrollTo(0, 0);
  }, [pathname])

    return (
      <div className="mainContainer d-flex flex-column">
        <Navbar />
        <main className="container-fluid flex-grow-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
}