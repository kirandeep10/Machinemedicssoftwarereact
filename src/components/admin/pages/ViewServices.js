import { collection, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../Firebase";
import { PacmanLoader } from "react-spinners";
import moment from "moment";
import { toast } from "react-toastify";
export default function ViewServices() {
  var [service, setservice] = useState([]);
  var [loading, setLoading] = useState(true);

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
    const que = query(machineRef, where("status", '==', true),  orderBy('createdAt','desc'));
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

  return (
    <>

      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <Link to='/admin/dashboard'><li className="breadcrumb-item active" aria-current="page">Dashboard</li></Link>/
            <Link to='/admin/view-services'> <li className="breadcrumb-item active text-info active" aria-current="page">View Services</li></Link>
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
              <th scope="col">Manager</th>
              <th scope="col">Purchase & Warrenty</th>
              <th scope="col">Service Date</th>
              <th scope="col">Technician</th>
              <th scope="col">Next Date</th>
              <th scope="col">Description</th>
              <th scope="col">Added At</th>
              {/* <th scope="col">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {service?.map((i, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{i?.machineName}<br />{i?.brandname}<br />Rs. {i?.machinecost}<br /></td>
                <td>{i?.ResponsiblemanagerName}</td>
                <td width="200px">
                  Purchasing :{i?.purchasedate}<br />
                  Warrenty :{i?.warrentydate}
                </td>
                <td>
                  {i?.serviceDate}
                </td>
                <td>
                  {i?.technician}<br />
                  {i?.technicianContact}
                </td>

                <td>{i?.nextdate}</td>
                <td>{i?.description}</td>
                <td>{getDate(i?.createdAt)}</td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </>
  )
}