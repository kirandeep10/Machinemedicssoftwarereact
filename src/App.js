import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminMaster from "./components/admin/layout/AdminMaster";
import Dashboard from "./components/admin/pages/Dashboard";
import Master from "./components/customer/layout/Master";
import Home from "./components/customer/pages/Home";
import About from "./components/customer/pages/About";
import Error from "./Error";
import Login from "./components/auth/Login";
import ManageMachineManager from "./components/admin/pages/ManageMachineManager";
import AddMachineManager from "./components/admin/pages/AddMachineManager";
import ManageMachine from "./components/admin/pages/ManageMachine";
import AddMachines from "./components/admin/pages/AddMachines";
import UpdateMachineManager from "./components/admin/pages/UpdateMachineManager";
import UpdateMachine from "./components/admin/pages/UpdateMachine";
import ViewServices from "./components/admin/pages/ViewServices";    
import "react-toastify/dist/ReactToastify.css";   
import ViewMachines from "./components/customer/pages/ViewMachines";
import AddServices from "./components/customer/pages/AddServices";
import ManageServices from "./components/customer/pages/ManageServices";
import UpdateServices from "./components/customer/pages/UpdateServices";
import UpcomingServices from "./components/customer/pages/UpcomingServices";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>  
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Master />}>
            <Route path="/home" element={<Home />} />
            <Route path="/upcoming-services" element={<UpcomingServices />} />
            <Route path="/view-machine" element={<ViewMachines />} />
            <Route path="/add-service/:id" element={<AddServices />} />
            <Route path="/manage-service" element={<ManageServices />} />
            <Route path="/update-service/:id" element={<UpdateServices />} />
          </Route>
   
          <Route path="/admin" element={<AdminMaster />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route
              path="/admin/manage-machine-manager"
              element={<ManageMachineManager />}
            />  
            <Route
              path="/admin/add-machine-manager"
              element={<AddMachineManager />}
            />
            <Route path="/admin/add-machine" element={<AddMachines />} />
            <Route path="/admin/manage-machine" element={<ManageMachine/>} />
            
            <Route path="/admin/update-Machine/:id" element={<UpdateMachine/>}/>
            <Route path="/admin/update-Manager/:id" element={<UpdateMachineManager/>}/>
            <Route path="/admin/view-services" element={<ViewServices/>}/>

          </Route>

          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
