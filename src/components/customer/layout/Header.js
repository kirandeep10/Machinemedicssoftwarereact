import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../../Firebase";


export default function Header() {
  const nav = useNavigate()


  const logout = () => {

    if (window.confirm("Do You really want to logout?")) {
      auth.signOut()
      sessionStorage.clear()
      nav('/')
      setTimeout(() => {
        toast.success('Logout Successful')
      }, 500)
    }

  }
  return (
    <>
      <header
        id="header"
        className="fixed-top"
        style={{ background: "#37517e" }}
      >
        <div className="container d-flex align-items-center">
          <h1 className="logo me-auto">
            <Link to="/home">Machine Medics</Link>
          </h1>

          {/* <a href="index.html" className="logo me-auto"><img src="assets/img/logo.png" alt="" className="img-fluid"/></a> */}

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link className="nav-link scrollto active" to="/home">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link scrollto" to="/upcoming-services">
                  Upcoming Services
                </Link>
              </li>
              <li>
                <Link className="nav-link scrollto" to="/view-machine">
                  Machines
                </Link>
              </li>
              {/* <li>
                <Link className="nav-link   scrollto" to="/add-machine-manager">
                  Add Service
                </Link>
              </li> */}
              <li>
                <Link className="nav-link scrollto" to="/manage-service">
                  Manage Services
                </Link>
              </li>

              {/* <li>
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li> */}
              <li>

                <a onClick={logout} className="btn btn-primary ms-3 py-2 px-lg-2  rounded-0 d-none d-lg-block">Logout<i className="fa fa-arrow-right ms-3"></i></a>



              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>


      </header>
    </>
  );
}
