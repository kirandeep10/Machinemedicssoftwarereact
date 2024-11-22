import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { Outlet,useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import { useEffect } from 'react';




export default function AdminMaster(){
    const nav = useNavigate()
    let authenticate = sessionStorage.getItem('isLogin')
    useEffect(()=>{
        if(!authenticate){
            nav('/login')
            setTimeout(()=>{
                toast.error("Please Login First")
            },500)
        }
    },[])
    return(
        <>
           <ToastContainer/>
            <AdminHeader/>
            
            <Outlet/>
            <AdminFooter/>
        </>
    )
}