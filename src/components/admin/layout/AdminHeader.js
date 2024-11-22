import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../../Firebase";


export default function AdminHeader() {
  const nav = useNavigate();
  const logout = async () => {
    if (window.confirm("Do You really want to logout?")) {
      auth.signOut()
      sessionStorage.clear();
      nav("/");
      setTimeout(() => {
        toast.success("Logout successful");
      }, 200);
    }

  };

  return (
    <>
      <header
        id="header"
        className="fixed-top"
        style={{ background: "#37517e" }}
      >
        <div className="container d-flex align-items-center">
          <h1 className="logo me-auto">
            <a href="index.html">Machine Medics</a>
          </h1>

          {/* <a href="index.html" className="logo me-auto"><img src="assets/img/logo.png" alt="" className="img-fluid"/></a> */}

          <nav id="navbar" className="navbar">
            <ul >
              <li>
                <Link
                  className="nav-link  scrollto active"
                  to="/admin/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link scrollto"
                  to="/admin/manage-machine-manager"
                >
                  Manager
                </Link>
              </li>
              <li>
                <Link className="nav-link scrollto" to="/admin/manage-machine">
                  Machines
                </Link>
              </li>
              <li>
                <Link className="nav-link scrollto" to="/admin/view-services">
                  View Services
                </Link>
              </li>
              {/* <li>
                <a className="nav-link scrollto" href="#team">
                  Team
                </a>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>Drop Down</span> <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="#">Drop Down 1</a>
                  </li>
                  <li className="dropdown">
                    <a href="#">
                      <span>Deep Drop Down</span>{" "}
                      <i className="bi bi-chevron-right"></i>
                    </a>
                    <ul>
                      <li>
                        <a href="#">Deep Drop Down 1</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 2</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 3</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 4</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 5</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Drop Down 2</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 3</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 4</a>
                  </li>
                </ul>
              </li>
              <li>
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li> */}
              <li>
                <a
                  onClick={logout}
                  className="btn btn-primary ms-3 py-2 px-lg-2  rounded-0 d-none d-lg-block"
                >
                  Logout<i className="fa fa-arrow-right ms-3"></i>
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
    </>
  );
}
