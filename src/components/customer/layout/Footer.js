import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <footer id="footer">

                {/* <div className="footer-newsletter">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <h4>Join Our Newsletter</h4>
                                <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                                <form action="" method="post">
                                    <input type="email" name="email" /><input type="submit" value="Subscribe" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="footer-top bg-secondary-subtle">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-3 col-md-6 footer-contact">
                                <h3>Machine Medics</h3>
                                <p>
                                    123, Model Town <br />
                                    Jalandhar, PB 535022<br />
                                    India <br /><br />
                                    <strong>Phone:</strong> +91 9882337878<br />
                                    <strong>Email:</strong> machine.medics@gmail.com<br />
                                </p>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h3>Useful Links</h3>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <Link to="/home">Home</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link to="/upcoming-services">Upcoming Services</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link to="/manage-service">Services</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link to="/view-machine">New Service</Link></li>
                                </ul>
                            </div>

                            {/* <div className="col-lg-4 col-md-6 footer-links">
                                <h4>Our Services</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Web Design</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Web Development</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Product Management</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Marketing</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Graphic Design</a></li>
                                </ul>
                            </div> */}

                            <div className="col-lg-6 col-md-6 footer-links">
                                <h3>About Us</h3>
                                <p style={{textAlign:'justify'}}>A web portal for managing machine servicing streamlines operations by allowing multiple managers to oversee and coordinate maintenance tasks efficiently. It centralizes service records, schedules, and real-time updates, ensuring that all managers have access to the same information. This collaborative platform reduces downtime, enhances communication, and enables swift decision-making, ultimately improving machine performance and extending their lifespan through well-organized and timely servicing.</p>
                                
                            </div>

                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: "rgb(55, 81, 126)" }}>
                    <div className="container footer-bottom clearfix ">
                        <div className="copyright text-white text-center">
                            &copy; Copyright <strong><span>Machine Medics</span></strong>. All Rights Reserved
                        </div>
                        <div className="credits text-center">

                            <a className="text-white">Designed by Kirandeep.</a>
                        </div>



                    </div>
                </div>
            </footer>
        </>
    )
}