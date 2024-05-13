import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nid, setNid] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docPhoto, setDocPhoto] = useState("");
  const [docPhotoPreview, setDocPhotoPreview] = useState("");

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Medicine",
   
  ];

  const handlePhoto = (e)=>{
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = ()=>{
      setDocPhotoPreview(reader.result)
      setDocPhoto(file)
    }
  }


  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      // const formData = new FormData();
      // formData.append("firstName", firstName);
      // formData.append("lastName", lastName);
      // formData.append("email", email);
      // formData.append("phone", phone);
      // formData.append("password", password);
      // formData.append("nid", nid);
      // formData.append("dob", dob);
      // formData.append("gender", gender);
      // formData.append("doctorDepartment", doctorDepartment);
      // formData.append("docPhoto", docPhoto);
      await axios
        .post("https://hospital-management-backend-287f.onrender.com/api/v1/user/doctor/addnew", {firstName,lastName,email,password,phone,nid,dob,gender,doctorDepartment,docPhoto}, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigate("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNid("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }









  return (
    <>
        <section className="page">
      <section className="container  add-doctor-form">
       
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleAddNewDoctor}>
          <div className="first-wrapper">
            <div>
              <img
                src={
                  docPhotoPreview ? `${docPhotoPreview}` : "/Screenshot_6.png"
                }
                alt="Doctor Photo"
              />
              <input type="file" onChange={handlePhoto} />
            </div>
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="number"
                placeholder="NID"
                value={nid}
                onChange={(e) => setNid(e.target.value)}
              />
              <input
                type={"date"}
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={doctorDepartment}
                onChange={(e) => {
                  setDoctorDepartment(e.target.value);
                }}
              >
                <option value="">Select Department</option>
                {departmentsArray.map((depart, index) => {
                  return (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  );
                })}
              </select>
              <button style={{cursor:"pointer", }} type="submit">Register New Doctor</button>
            </div>
          </div>
        </form>
      </section>
    </section> 

    </>
  )
}

export default AddNewDoctor