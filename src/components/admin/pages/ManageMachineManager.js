import { Link } from "react-router-dom";
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../Firebase";
import { PacmanLoader } from "react-spinners";
import moment from "moment";
import { toast } from "react-toastify";

export default function ManageMachines() {
  var [manager, setmanager] = useState([]);
  var [loading, setLoading] = useState(true);

  var spinnerObj = {
    margin: "100px auto",
    display: "block",
    borderColor: "red",
  };
  useEffect(() => {
    getAllmanager();
  }, []);
  const getAllmanager = () => {
    const managerRef = collection(db, "/addmanager");
    const que = query(managerRef, orderBy("createdAt", "asc"));
    onSnapshot(que, (querySnapshot) => {
      setTimeout(() => {
        setLoading(false);
      }, 700);
      setmanager(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };

  const getDate = (date)=>{
    let finalDate = moment(date.toDate()).format("MMM Do YY")
    return finalDate
  }

  const changeStatus =async (id,status)=>{
    setLoading(true)
    try{
      let managerRef = doc(db, 'addmanager', id);
      await updateDoc(managerRef, {status:status})
      setLoading(false)
      toast.success("Status Changed")
    }
    catch(err){
      setLoading(false)
      console.log("error in changing status of manager",err);
      toast.error("Something Went Wrong");

    }
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
            <Link to="/admin/manage-machine-manager">
              {" "}
              <li
                className="breadcrumb-item active text-info active"
                aria-current="page"
              >
                {" "}
                Manager
              </li>
            </Link>
          </ol>
          <h2>Machine Manager</h2>
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
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-10">
              <h1>List of Managers</h1>
            </div>
            <div className="col-lg-2 mt-2 text-end">
              <Link to="/admin/add-machine-manager">
                <button className="btn btn-primary rounded-0">
                  Add Manager
                </button>
              </Link>
            </div>
          </div>
          <table class="table table-primary">
            <thead>
              <tr>
                <th scope="col">S.no</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact</th>
                <th scope="col">ID Proof</th>
                <th scope="col">Address</th>
                <th scope="col">Regestered At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {manager?.map((i, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{i?.name}</td>
                  <td>{i?.email}</td>
                  <td>{i?.phone}</td>
                  <td width="150px">
                    <img src={i?.idProof} className="w-100" />
                  </td>
                  <td>{i?.address}</td>
                  <td>
                    {getDate(i?.createdAt)}
                  </td>
                  <td>{i?.status? "Active": "In-active"}</td>
                  <td>
                    {i?.status ? 
                      <button className="btn btn-danger mx-1 fs-5" onClick={()=>{
                        changeStatus(i?.id,false)
                      }}>
                        <i class="bi bi-person-x-fill"></i>
                      </button>
  
                      :
                      <button className="btn btn-success mx-1 fs-5 " onClick={()=>{changeStatus(i?.id,true)}}>
                        <i class="bi bi-person-check-fill"></i>
                      </button>

                    }
                    
                       

                    <Link to={"/admin/update-Manager/"+i?.id}>
                      <button className="btn btn-primary mx-1">
                        <i class="bi bi-pen-fill fs-5"></i>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
