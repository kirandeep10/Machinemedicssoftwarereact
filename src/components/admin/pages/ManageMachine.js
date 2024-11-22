import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../Firebase";
import { PacmanLoader } from "react-spinners";
import moment from "moment";
import { toast } from "react-toastify";

export default function ManageMachines() {
  var [machine, setmachine] = useState([]);
  var [loading, setLoading] = useState(true);

  var spinnerObj = {
    margin: "100px auto",
    display: "block",
    borderColor: "red",
  };
  useEffect(() => {
    getAllmachines();
  }, []);

  const getAllmachines = () => {
    const machineRef = collection(db, "/machine");
    //
    const que = query(machineRef, where("status", '==', true));
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

  const deleteMachine = (id) => {
    let confirm = window.confirm("Are you sure to delete it?")
    if (confirm) {
      setLoading(true)
      try {
        let machineRef = doc(db, 'machine', id)
        updateDoc(machineRef, { status: false })
        setLoading(false)
        toast.success("Document Deleted")
      } catch (err) {
        setLoading(false)
        toast.error("Something Went wrong");
        console.log("Error occured in deleting machine", err);

      }
    }

  }

  const getDate = (date) => {
    let finalDate = moment(date.toDate()).format("MMM Do YY");
    return finalDate;
  }

  return (
    <>
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <Link to="/admin/dashboard">
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
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
                Manage Machine
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
                <h1>List of Machines</h1>
              </div>
              <div className="col-lg-2 text-end">
                <Link to="/admin/add-machine">
                  <button className="btn btn-primary rounded-0">
                    Add Machine
                  </button>
                </Link>
              </div>
            </div>
            <table className="table table-primary">
              <thead>
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Machine Details</th>
                  <th scope="col">Machine</th>
                  <th scope="col">Responsible Manager</th>
                  <th scope="col">Purchasing</th>
                  <th scope="col">Location</th>
                  <th scope="col">Created At</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {machine?.map((i, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td width="250px">
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
                    <td width="200px">
                      {i?.machinetype}
                      <img
                        src={i?.imageUrl}
                        alt=""
                        className="w-100"
                      />
                    </td>

                    <td width="250px">{i?.ResponsiblemanagerName}</td>
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
                    <td width="200px">
                      {getDate(i?.createdAt)}
                    </td>

                    <td width="100px">
                      <button className="btn btn-danger mx-1 my-1" onClick={() => { deleteMachine(i?.id) }}>
                        <i className="bi bi-trash-fill fs-5"></i>
                      </button>

                      <Link to={"/admin/update-Machine/"+i?.id}>
                        <button className="btn btn-primary mx-1 my-1">
                          <i className="bi bi-pen-fill fs-5"></i>
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
