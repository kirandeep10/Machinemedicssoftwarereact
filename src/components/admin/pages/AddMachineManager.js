import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { toast } from "react-toastify";

import { auth, db, storage } from "../../../Firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function AddMachineManager() {
  const nav = useNavigate();
  var [name, setname] = useState("");
  var [address, setaddress] = useState("");
  var [phone, setphone] = useState("");
  var [email, setemail] = useState("");
  var [password, setpassword] = useState("");
  var [file, setFile] = useState(null);
  var [fileName, setFileName] = useState("");
  var [imageUrl, setImageUrl] = useState("");
  var [uid, setuid] = useState("");

  var [loading, setloading] = useState(false);

  var spinnerObj = {
    margin: "100px auto",
    display: "block",
    borderColor: "red",
  };
  const handleForm = (e) => {
    e.preventDefault();
    
    setloading(true);
    signUp()
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


  const signUp = async () => {
    try{
      let res = await createUserWithEmailAndPassword(auth, email, password)
      setloading(false);
      setuid(res.user.uid)
      uploadFile()
    }catch(err){
      console.log("Error in signup", err);
      
      setloading(false);
      toast.error(err.message);
    }    
  }

  const addManager = ()=>{
    setloading(true)
    try {
      let managerRef = collection(db, "/addmanager");
      addDoc(managerRef, {
        name: name,
        address: address,
        phone: phone,
        email: email,
        idProof: imageUrl,
        uid:uid,
        userType:2,
        createdAt: Timestamp.now(),
        status: true,
      });
      setloading(false);
      nav("/admin/manage-machine-manager");

      setTimeout(() => {
        toast.success("New Manager Added");
      }, 500);
    } catch (error) {
      setloading(false);
      toast.error("Something Went Wrong");
      console.log("Error in add manager", error);
    }
  }

  useEffect(()=>{
    if(!!imageUrl) addManager();
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

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                        className="form-control"
                        id="email"
                        placeholder="abc@gmail.com"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label for="phone">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        pattern=".{6,}" title="Six or more characters"
                        value={password} 
                        onChange={(e) => {
                          setpassword(e.target.value);
                        }}
                        id="password"
                        placeholder="Enter Password(Six or more characters)"
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
                    <button type="submit">Add Manager</button>
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
