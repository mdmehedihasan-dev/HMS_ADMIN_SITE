import { useContext, useEffect, useState } from "react"
import { Context } from "../main"
import axios from "axios"
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const {isAuthenticated} = useContext(Context)

  useEffect(()=>{
    const featchAllDoctor = async()=>{
     try {
      const {data} = await axios.get('https://hospital-management-backend-287f.onrender.com/api/v1/user/doctors',{
        withCredentials:true
      })
        setDoctors(data.doctors)
      
     } catch (error) {
      console.log(error.response.data.message)
     }
    }
    featchAllDoctor()
  },[])

  if(!isAuthenticated){
    return <Navigate to={'/login'} />
  }
  return (
    <>
    <section className="page doctors">
      <h1 style={{color:"#fff"}}>DOCTORS</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((element,index) => {
            return (
              <div key={index}  className="card">
                <img
                  src={element.docPhoto && element.docPhoto.url}
                  alt="doctor avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.doctorDepartment}</span>
                  </p>
                  <p>
                    NID: <span>{element.nid}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>
    </section>
    
    </>
  )
}

export default Doctors