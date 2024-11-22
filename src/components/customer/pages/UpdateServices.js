import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { toast } from "react-toastify";
import { db, storage } from "../../../Firebase";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';

export default function UpdateServices() {
    const nav = useNavigate();
    
    var [description, setdescription] = useState("");
    var [serviceDate, setserviceDate] = useState(null);
    var [technician, settechnician] = useState("");
    var [technicianContact, settechnicianContact] = useState("");
    var [nextdate, setnextdate] = useState("");
    var [nextdatenum, setnextdatenum] = useState("");
    var [loading, setloading] = useState(false);


    var spinnerObj = {
        margin: "100px auto",
        display: "block",
        borderColor: "red",
    };


    useEffect(() => {
        getService()
    }, [])

    const params = useParams()
    const id = params.id

    const getService = async () => {
        const serviceRef = doc(db, "/services", id);

        let serviceSnap = await getDoc(serviceRef);

        if (serviceSnap.exists()) {
            let serviceData = serviceSnap.data();

            setdescription(serviceData?.description)
            settechnician(serviceData?.technician)
            settechnicianContact(serviceData?.technicianContact)
            setnextdate(serviceData?.nextdate)
            setserviceDate(serviceData?.serviceDate)
        }

    }
   
    const handleForm = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            let machineRef = doc(db, "/services", id);
            await updateDoc(machineRef, {
                
                serviceDate: serviceDate,
                description: description,
                technician: technician,
                technicianContact: technicianContact,
                nextdate: nextdate,
                nextdatenum: nextdatenum
            });
            setloading(false);
            nav("/manage-service");

            setTimeout(() => {
                toast.success("Service Updated");
            }, 500);
        } catch (error) {
            setloading(false);
            toast.error("Something Went Wrong");
            console.log("Error in update service", error);
        }
    };

    const handleNextDate = (e) => {
        setnextdate(e.target.value);
        let nextd = Date.parse(nextdate);
        setnextdatenum(nextd);
    }

    return (
        <>
            <section id="breadcrumbs" className="breadcrumbs">
                <div className="container">
                    <ol>
                        <Link to="/home">
                            <li className="breadcrumb-item active" aria-current="page">
                                Home
                            </li>
                        </Link>
                        /
                        <Link >
                            {" "}
                            <li
                                className="breadcrumb-item active text-info active"
                                aria-current="page"
                            >
                                {" "}
                                Update Service
                            </li>
                        </Link>
                    </ol>
                    <h2>Update Service</h2>
                </div>
            </section>

            <PacmanLoader
                color="#0F4277"
                loading={loading}
                cssOverride={spinnerObj}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <div className={loading && "display-none"}>
                <section id="contact" className="contact">
                    <div className="container" data-aos="fade-up">
                        <div className="row">
                            <div className="col-lg-3"></div>

                            <div className="col-lg-6 mt-5 mt-lg-0 d-flex align-items-stretch">
                                <form
                                    onSubmit={handleForm}
                                    action="forms/contact.php"
                                    method="post"
                                    role="form"
                                    className="php-email-form"
                                >
                                    

                                
                                  
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="ServiceDate"> Service Date</label>
                                            <input
                                                type="date"
                                                value={serviceDate}
                                                onChange={(e) => {
                                                    setserviceDate(e.target.value);
                                                }}
                                                name="ServiceDate"
                                                className="form-control"
                                                id="ServiceDate"
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="Next Date">
                                                {" "}
                                                Next Date
                                            </label>
                                            <input
                                                type="date"
                                                name="Next Date"
                                                value={nextdate}
                                                onChange={handleNextDate}
                                                className="form-control"
                                                id="Next Date"
                                            />
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="technician">Technician</label>
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    value={technician}
                                                    onChange={(e) => {
                                                        settechnician(e.target.value);
                                                    }}
                                                    name="Technician"
                                                    className="form-control"
                                                    id="Technician"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="technicianContact">Technician Contact</label>
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    value={technicianContact}
                                                    onChange={(e) => {
                                                        settechnicianContact(e.target.value);
                                                    }}
                                                    name="Technician Contact"
                                                    className="form-control"
                                                    id="Technician Contact"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-lg-12">
                                            <label htmlFor="description">Description</label>
                                            <div className="form-floating">
                                                <textarea
                                                    className="form-control"
                                                    id="description"
                                                    style={{ height: "50px" }}
                                                    value={description}
                                                    onChange={(e) => {
                                                        setdescription(e.target.value);
                                                    }}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                        <div className="text-center">
                                            <button type="submit">Update Service</button>
                                        </div>
                                </form>
                            </div>
                            <div className="col-lg-3"></div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
