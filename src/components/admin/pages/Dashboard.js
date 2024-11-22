import { collection, collectionGroup, getCountFromServer, onSnapshot, orderBy, query, where } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../Firebase";

export default function Dashboard() {
  const nav = useNavigate()
  var isLogin = sessionStorage.getItem('isLogin')

  const logout = () => {
    sessionStorage.clear()
    nav('/login')
  }

  var [service, setservice] = useState([]);
  var [countmanagers, setcountmanagers] = useState([]);
  var [countmachines, setcountmachines] = useState([]);
  var [countservices, setcountservices] = useState([]);
  var [loading, setLoading] = useState(true);

  var spinnerObj = {
    margin: "100px auto",
    display: "block",
    borderColor: "red",
  };
  useEffect(() => {
    getAllservices();
    getDashboard()
  }, []);

  const getDashboard = async () => {
    const managerRef = collection(db, '/addmanager');
    const snapshotManager = await getCountFromServer(query(managerRef, where('status', '==', true)));
    setcountmanagers(snapshotManager.data().count)

    const machineRef = collection(db, '/machine');
    const snapshotMachine = await getCountFromServer(query(machineRef, where('status', '==', true)));
    setcountmachines(snapshotMachine.data().count)

    const serviceRef = collection(db, '/services');
    const snapshotService = await getCountFromServer(query(serviceRef, where('status', '==', true)));
    setcountservices(snapshotService.data().count)
    
  }   

  const getAllservices = () => {
    const machineRef = collection(db, "/services");
    //
    const que = query(machineRef, where("status", '==', true), orderBy('nextdate', 'asc'));
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
            <li>Dashboard</li>
          </ol>
          <h2>Dashboard</h2>

        </div>
      </section>



      <section id="services" className="services section-bg">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h2>Welcome Admin</h2>

          </div>

          <div className="row">
            <div className="col-xl-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon-box w-100 text-center">
                <div className="icon"> <i class="bi bi-person"></i></div>
                <h4><Link to="/admin/manage-machine-manager">Machine Managers</Link></h4>
                <p className="fw-bolder fs-2">{countmanagers}</p>
              </div>
            </div>  

            <div className="col-xl-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
              <div className="icon-box w-100 text-center">
                <div className="icon"><i className="bx bx-file"></i></div>
                <h4><Link to="/admin/manage-machine">Machine </Link></h4>
                <p className="fw-bolder fs-2">{countmachines}</p>
              </div>
            </div>

            <div className="col-xl-4 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="300">
              <div className="icon-box w-100 text-center">
                <div className="icon"><i className="bx bx-tachometer"></i></div>
                <h4><Link to="/admin/view-services">Services</Link></h4>
                <p className="fw-bolder fs-2">{countservices}</p>
              </div>
            </div>
      

          </div>

        </div>
      </section>





      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-10">
            <h1>Upcoming Services</h1>
          </div>

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
              <th scope="col">Description</th>
              <th scope="col">Added At</th>
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
                  Service Date: {i?.serviceDate} <br />
                  Next Date: <b>{i?.nextdate}</b>
                </td>
                <td>
                  {i?.technician}<br />
                  {i?.technicianContact}
                </td>

                <td>{i?.description}</td>
                <td>{getDate(i?.createdAt)}</td>

              </tr>
            ))}

          </tbody>
        </table> x
      </div>




    </>
  );
}
