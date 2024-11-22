
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader, PacmanLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { auth, db } from '../../Firebase';
export default function Login() {
  const nav = useNavigate();
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [loading, setLoading] = useState(false)
  var [manager, setManager] = useState([])

  var spinnerObj = {
    margin: "100px  auto",
    display: "block",
    borderColor: "red",
  };
  

  

  const loginSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    try{
      let res = await signInWithEmailAndPassword(auth, email, password)
      setLoading(false)
      checkUser(res.user.uid)
    }catch(err){
      setLoading(false)
      toast.error(err.message)
      console.log(err);
      
    }
  };

  const checkUser = (uid)=>{
    setLoading(true)
    let managerRef = collection(db, "/addmanager")
    let que = query(managerRef, where("uid","==",uid))
    onSnapshot(que, (querySnapshot)=>{
      setTimeout(()=>{
        setLoading(false)
      },700)

      let uData = querySnapshot.docs.map((doc)=>({
        id:doc.id, ...doc.data()
      }))
      
      
      if(uData[0]?.userType == 1){
        sessionStorage.setItem("userType",uData[0].userType)
        sessionStorage.setItem("name",uData[0].name)
        sessionStorage.setItem("id",uData[0].id)
        sessionStorage.setItem("isLogin",true)
        
        nav('/admin/dashboard')
        
      }
      else if(uData[0]?.userType == 2){
        if(uData[0].status){
          sessionStorage.setItem("userType", uData[0].userType)
          sessionStorage.setItem("name",uData[0].name)  
          sessionStorage.setItem("id",uData[0].id)  
          sessionStorage.setItem("data", JSON.stringify(uData))
          sessionStorage.setItem("isLogin",true)
          nav('/home')
          
        }
        else{
          toast.error("Account Inactive, Contact Admin")
          console.log(3);
          
        }
      }else{
        toast.error("Invalid Credentials")
        console.log(4);
        
      }

    })

  }

  return (
    <>
      <ToastContainer />

      <section id="hero" className="d-flex align-items-center">

        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-2 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
              <h1>Machine Medics</h1>
              <h2>Manage Your Machine Service</h2>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <a href="#form-div" className="btn-get-started scrollto">Login For more...</a>
                {/* <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="glightbox btn-watch-video"><i className="bi bi-play-circle"></i><span>Watch Video</span></a> */}
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
              <img src="assets/img/hero-img.png" className="img-fluid animated" alt="" />
            </div>
          </div>
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

      <div className={loading && 'display-none'}>
        <section id="contact" className="contact">

          <div className="container" data-aos="fade-up">



            <div className="row" id="form-div">

              <div className="col-lg-12 mt-2 mt-lg-0 d-flex align-items-stretch">
                <form
                  onSubmit={loginSubmit}
                  action="forms/contact.php"
                  method="post"
                  role="form"
                  className="php-email-form"
                >
                  <div class="row">
                    <div className="form-group col-md-6">
                    <label for="email">Your Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    // pattern=".{8,}" title="Eight or more characters"
                    />
                  </div>
                  </div>
                  

                  <div className="text-center">
                    <button type="submit" class="btn btn-primary">Login</button>
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






