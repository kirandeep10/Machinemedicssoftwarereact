import { collection, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../Firebase";
import { PacmanLoader } from "react-spinners";
import moment from "moment";
import { toast } from "react-toastify";
export default function ManageServices() {
    var [service, setservice] = useState([]);
    var [loading, setLoading] = useState(true);
    var managerId = sessionStorage.getItem('id');
    var spinnerObj = {
        margin: "100px auto",
        display: "block",
        borderColor: "red",
    };
    useEffect(() => {
        getAllservices();
    }, []);

    const getAllservices = () => {
        const machineRef = collection(db, "/services");
        //
        const que = query(machineRef, where("status", '==', true), where("ResponsiblemanagerId", "==", managerId), orderBy('createdAt', 'desc'));
        onSnapshot(que, (querySnapshot) => {
            setTimeout(() => {
                setLoading(false);
            }, 700);
            setservice(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        });
    };

    const getDate = (date) => {
        let finalDate = moment(date.toDate()).format("MMM Do YY");
        return finalDate;
    }

    const deleteService = (id) => {
        let confirm = window.confirm("Are you sure to delete it?")
        if (confirm) {
            setLoading(true)
            try {
                let serviceRef = doc(db, 'services', id)
                updateDoc(serviceRef, { status: false })
                setLoading(false)
                toast.success("Document Deleted")
            } catch (err) {
                setLoading(false)
                toast.error("Something Went wrong");
                console.log("Error occured in deleting service", err);

            }
        }

    }

    return (
        <>

            <section id="breadcrumbs" className="breadcrumbs">
                <div className="container">
                    <ol>
                        <Link to='/home'><li className="breadcrumb-item active" aria-current="page">Home</li></Link>/
                        <Link> <li className="breadcrumb-item active text-info active" aria-current="page">View Services</li></Link>
                    </ol>
                    <h2>View Services</h2>
                </div>
            </section>



            <div className="container" data-aos="fade-up">
                <div className="row">
                    <div className="col-lg-10">
                        <h1>List of Services</h1>
                    </div>
                    {/* <div className="col-lg-2 mt-2 text-end">
                            <Link to="/admin/add-machine-manager"><button className="btn btn-success">Add Manager</button></Link>
                        </div> */}
                </div>
                <table class="table table-blue">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Machine</th>
                            <th scope="col">Purchase & Warrenty</th>
                            <th scope="col">Service Date</th>
                            <th scope="col">Technician</th>
                            <th scope="col">Description</th>
                            <th scope="col">Added At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {service?.map((i, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{i?.machineName}<br />{i?.brandname}<br />Rs. {i?.machinecost}<br /></td>
                                <td width="200px">
                                    Purchasing :{i?.purchasedate}<br />
                                    Warrenty :{i?.warrentydate}
                                </td>
                                <td>
                                    Service Date: {i?.serviceDate} <br />
                                    Next Date: {i?.nextdate}
                                </td>
                                <td>
                                    {i?.technician}<br />
                                    {i?.technicianContact}
                                </td>

                                <td>{i?.description}</td>
                                <td>{getDate(i?.createdAt)}</td>
                                <td>
                                    <Link to={"/update-service/" + i?.id}>
                                        <button className="btn btn-primary mx-1 my-1">
                                            <i className="bi bi-pen-fill fs-5"></i>
                                        </button>
                                    </Link>

                                    <button className="btn btn-danger mx-1 my-1" onClick={() => { deleteService(i?.id) }}>
                                        <i className="bi bi-trash-fill fs-5"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </>
    )
}