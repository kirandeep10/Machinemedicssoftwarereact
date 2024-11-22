import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { toast } from "react-toastify";

import { auth, db, storage } from "../../../Firebase";
import { addDoc, collection, getDoc, Timestamp, doc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function UpdateMachineManager() {
  const nav = useNavigate();
  var [name, setname] = useState("");
  var [address, setaddress] = useState("");
  var [phone, setphone] = useState("");
  var [file, setFile] = useState(null);
  var [fileName, setFileName] = useState("");
  var [imageUrl, setImageUrl] = useState("");

  var [loading, setloading] = useState(false);

  var spinnerObj = {
    margin: "100px auto",
    display: "block",
    borderColor: "red",
  };

  useEffect(()=>{
    getManager()
  },[])

  const params = useParams()
  const id = params.id

   
  const getManager = async ()=>{
    let managerRef = doc(db, '/addmanager', id);
    let managerSnap = await getDoc(managerRef);
    if(managerSnap.exists()){
      let managerData = managerSnap.data()
      setname(managerData.name);
      setphone(managerData.phone);
      setaddress(managerData.address);
    }
  }   
   
  const handleForm = (e) => {
    e.preventDefault();
    
    setloading(true);
    if(!!file) uploadFile()
    else updateManager()
  };

  const uploadFile = () => {
    if (!file) {
      alert("Please Upload the image first");
      setTimeout(()=>{
        setloading(false);
      },500)
      return
    } 
    setloading(true)
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => { },
      (err) => console.log("Error in uploading the image", err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          
          setImageUrl(url);
        })
      }
    )

  }




  const updateManager = ()=>{
    setloading(true)
    try {
      let managerRef = doc(db, "/addmanager", id);
      let data = {
        name: name,
        address: address,
        phone: phone,
      }
      if(!!imageUrl) data.idProof = imageUrl
      updateDoc(managerRef, data);
      setloading(false);
      nav("/admin/manage-machine-manager");

      setTimeout(() => {
        toast.success("Manager Updated");
      }, 500);
    } catch (error) {
      setloading(false);
      toast.error("Something Went Wrong");
      console.log("Error in update manager", error);
    }
  }

  useEffect(()=>{
    if(!!imageUrl) updateManager();
  },[imageUrl])

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
            <Link to="/admin/add-machine-manager">
              {" "}
              <li
                className="breadcrumb-item active text-info active"
                aria-current="page"
              >
                Add Machine Manager
              </li>
            </Link>
          </ol>
          <h2>AddMachineManager</h2>
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
                      <label for="name">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => {
                          setname(e.target.value);
                        }}
                        className="form-control"
                        id="name"
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <label for="phone">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={phone}
                        onChange={(e) => {
                          setphone(e.target.value);
                        }}
                        id="phone"
                        maxLength="10"
                        placeholder="Enter your Number"
                      />
                    </div>
                  </div>

                 
                  <div className="col-md-12">
                    <label for="Id Proof">Id Proof</label>
                    <input
                      type="file"
                      name="Id Proof"
                      value={fileName}
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setFileName(e.target.value);
                      }}
                      className="form-control"
                      id="Id Proof"
                    />
                  </div>
                  <div class="col-12">
                    <label for="address">Address</label>
                    <div class="form-floating">
                      <textarea
                        class="form-control"
                        id="address"
                        style={{ height: "70px" }}
                        value={address}
                        onChange={(e) => {
                          setaddress(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button type="submit">Update Manager</button>
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
