import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { toast } from "react-toastify";
import { db, storage } from "../../../Firebase";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';

export default function UpdateMachine() {
  const nav = useNavigate();
  var [name, setname] = useState("");
  // var [image, setimage] = useState();
  // var [imageurl, setimageurl] = useState();
  var [brandname, setbrandname] = useState("");
  var [modelnumber, setmodelnumber] = useState("");
  var [machinecost, setmachinecost] = useState("");
  var [purchasedate, setpurchasedate] = useState("");
  var [purchasedFrom, setpurchasedFrom] = useState("");
  var [warrentydate, setwarrentydate] = useState("");
  var [InstallationDate, setInstallationDate] = useState("");
  var [ResponsiblemanagerId, setResponsiblemanagerId] = useState("");
  var [ResponsiblemanagerName, setResponsiblemanagerName] = useState("");
  var [locat, setlocat] = useState("");
  var [loading, setloading] = useState(false);

  var [manager, setmanager] = useState([]);

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileName, setFileName] = useState(null);

  var spinnerObj = {
    margin: "100px auto",
    display: "block",
    borderColor: "red",
  };

  const params = useParams()
  const machineId = params.id

  useEffect(() => {
    getMachine();
    getManagers();
  }, [])   

  const getMachine = async ()=>{
    let machineRef= doc(db, "machine", machineId);
    let categorySnap = await getDoc(machineRef);
    if(categorySnap.exists()){
      let categoryData = categorySnap.data()
      setname(categoryData.name);
      setbrandname(categoryData.brandname);
      setmachinecost(categoryData.machinecost);
      setmodelnumber(categoryData.modelnumber);
      setpurchasedFrom(categoryData.purchasedFrom);
      setpurchasedate(categoryData.purchasedate);
      setwarrentydate(categoryData.warrentydate);
      setInstallationDate(categoryData.InstallationDate);
      setResponsiblemanagerId(categoryData.ResponsiblemanagerId);
      setResponsiblemanagerName(categoryData.ResponsiblemanagerName);
      setlocat(categoryData.locat);   
    }
  }

  const getManagers = () => {
    const managerRef = collection(db, "/addmanager");
    const que = query(managerRef, where("status", "==", true));
    onSnapshot(que, (querySnapshot) => {
      setTimeout(() => {
        // setloading(false);
      }, 700);
      setmanager(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }

  const handleForm = (e) => {
    e.preventDefault();

    if(!!file) uploadFile();
    else saveData()
    setloading(true);

  };

  const uploadFile = () => {
    if (!file) {
      alert("Please Upload the image first");
      setTimeout(() => {
        setloading(false);
      }, 500)
      return
    }

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

  const saveData = async () => {
    try {
      let machineRef = doc(db, "/machine", machineId);
      let obj = {
        name: name,
        brandname: brandname,
        modelnumber: modelnumber,
        machinecost: machinecost,
        purchasedate: purchasedate,
        warrentydate: warrentydate,
        InstallationDate: InstallationDate,
        
        ResponsiblemanagerId: ResponsiblemanagerId,
        ResponsiblemanagerName: ResponsiblemanagerName,
        locat: locat,
        purchasedFrom:purchasedFrom
      }  

      if(!!imageUrl) obj.imageUrl = imageUrl
      
      await updateDoc(machineRef, obj);
      setloading(false);
      nav("/admin/manage-machine");

      setTimeout(() => {
        toast.success("Machine Updated");
      }, 500);
    } catch (error) {
      setloading(false);
      toast.error("Something Went Wrong");
      console.log("Error in update machine", error);
    }
  }

  useEffect(() => {
    if (!!imageUrl) saveData();
  }, [imageUrl])

    
  const chooseManager = (id) => {
    
    if (!!id) {


      let data = manager?.filter((x) => { return x.id == id })[0].name
      console.log(data);

      setResponsiblemanagerName(data)
      setResponsiblemanagerId(id);
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
            <Link to="/admin/update-machine">
              {" "}
              <li
                className="breadcrumb-item active text-info active"
                aria-current="page"
              >
                {" "}
                Update Machine
              </li>
            </Link>
          </ol>
          <h2>Update Machine</h2>
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
                      <label htmlFor="name">Machine Name</label>
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
                      <label htmlFor="Brand Name">Brand Name</label>
                      <input
                        type="text"
                        name="Brand Name"
                        value={brandname}
                        onChange={(e) => {
                          setbrandname(e.target.value);
                        }}
                        className="form-control"
                        id="Brand Name"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="model number">Model Number</label>
                      <input
                        type="text"
                        value={modelnumber}
                        onChange={(e) => {
                          setmodelnumber(e.target.value);
                        }}
                        name="model number"
                        className="form-control"
                        id="model number"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="Machine Cost">Machine Cost</label>
                      <input
                        type="number"
                        name="Machine Cost"
                        value={machinecost}
                        onChange={(e) => {
                          setmachinecost(e.target.value);
                        }}
                        className="form-control"
                        id="Machine Cost"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="Responsiblemanager">
                        Responsible Manager
                      </label>
                      <select
                        name="Responsiblemanager"
                        value={ResponsiblemanagerId}
                        onChange={(e)=>{chooseManager(e.target.value)}}
                        className="form-control"
                        id="Responsiblemanager"
                      >
                        <option value="" disabled selected>Select Responsible Manager</option>
                        {
                          manager?.map((i, index) => (
                            <option value={i?.id}>{i?.name}</option>
                          ))
                        }

                      </select>
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="Machine Image">Machine Image</label>
                      <input
                        type="file"
                        name="Machine Image"
                        value={fileName}

                        onChange={(e) => {
                          setFileName(e.target.value);
                          setFile(e.target.files[0]);
                        }}
                        className="form-control"
                        id="Machine Image"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="Purchase Date"> Purchase Date</label>
                      <input
                        type="date"
                        name="Purchase Date"
                        value={purchasedate}
                        onChange={(e) => {
                          setpurchasedate(e.target.value);
                        }}
                        className="form-control"
                        id="Purchase Date"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="InstallationDate"> Installation Date</label>
                      <input
                        type="date"
                        value={InstallationDate}
                        onChange={(e) => {
                          setInstallationDate(e.target.value);
                        }}
                        name="InstallationDate "
                        className="form-control"
                        id="InstallationDate "
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="Warranty Expiry Date">
                        {" "}
                        Warranty Expiry Date
                      </label>
                      <input
                        type="date"
                        name="Warranty Expiry Date"
                        value={warrentydate}
                        onChange={(e) => {
                          setwarrentydate(e.target.value);
                        }}
                        className="form-control"
                        id="Warranty Expiry Date"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="Purchased From">
                        {" "}
                        Purchased From
                      </label>
                      <input
                        type="text"
                        name="Purchased From"
                        value={purchasedFrom}
                        onChange={(e) => {
                          setpurchasedFrom(e.target.value);
                        }}
                        className="form-control"
                        id="Purchased From"
                      />
                    </div>
                  </div>

                  <div className="form-group col-md-12">
                    <label htmlFor="locat">Location(Room No.)</label>
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        id="locat"
                        style={{ height: "50px" }}
                        value={locat}
                        onChange={(e) => {
                          setlocat(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>

                  
                  <div className="text-center">
                    <button type="submit">Update Machine</button>
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
