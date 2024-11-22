import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../Firebase";
import { PacmanLoader } from "react-spinners";
import moment from "moment";
import { toast } from "react-toastify";

export default function ViewMachines() {
    var [machine, setmachine] = useState([]);
    var [loading, setLoading] = useState(true);
    var managerId = sessionStorage.getItem('id')
    var spinnerObj = {
        margin: "100px auto",
        display: "block",
        borderColor: "red",
    };
    useEffect(() => {
        getAllachines();
    }, []);

    const getAllachines = () => {
        const machineRef = collection(db, "/machine");
        //
        const que = query(machineRef, where("status", '==', true), where("ResponsiblemanagerId", "==", managerId));
        onSnapshot(que, (querySnapshot) => {
            setTimeout(() => {
                setLoading(false);
            }, 700);
            setmachine(
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
                        <Link to="/admin/manage-machine">
                            {" "}
                            <li
                                className="breadcrumb-item active text-info active"
                                aria-current="page"
                            >
                                {" "}
                                View Machines
                            </li>
                        </Link>
                    </ol>
                    <h2>Manage Machine</h2>
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
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10">
                                <h1>Machines Assigned</h1>
                            </div>
                            <div className="col-lg-2 text-end">
                                {/* <Link to="/admin/add-machine">
                                    <button className="btn btn-primary rounded-0">
                                        Add Machine
                                    </button>
                                </Link> */}
                            </div>
                        </div>
                        <table className="table table-primary">
                            <thead>
                                <tr>
                                    <th scope="col">S.No.</th>
                                    <th scope="col">Machine Details</th>
                                    <th scope="col">Machine</th>
                                    <th scope="col">Purchasing</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Created At</th>

                                    <th>Add Service</th>
                                </tr>
                            </thead>
                            <tbody>
                                {machine?.map((i, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td width="230px">
                                            Name:
                                            {i?.name}
                                            <br></br>
                                            Model No:
                                            {i?.modelnumber}
                                            <br></br>
                                            Brand Name:
                                            {i?.brandname}
                                            <br></br>
                                            Cost:
                                            Rs. {i?.machinecost}
                                            {/* Status:
                      {i.status} */}
                                            <br></br>
                                        </td>
                                        <td width="170px">
                                            {i?.machinetype}
                                            <img
                                                src={i?.imageUrl}
                                                alt=""
                                                className="w-100"
                                            />
                                        </td>


                                        <td width="250px">
                                            Purchasedate:
                                            {i?.purchasedate}
                                            <br></br>
                                            InstallationDate:
                                            {i?.InstallationDate}
                                            <br></br>

                                            Warranty:
                                            {i?.warrentydate}
                                            <br></br>
                                        </td>

                                        <td width="100px">
                                            {i?.locat}
                                            <br></br>
                                        </td>
                                        
                                        <td width="150px">
                                            {getDate(i?.createdAt)}
                                        </td>
                                        <td>
                                            <Link to={"/add-service/" + i?.id }>
                                                <button className="btn btn-primary mx-1 my-1">
                                                <i class="bi bi-patch-plus-fill"></i>
                                                </button>
                                            </Link>
                                        </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
