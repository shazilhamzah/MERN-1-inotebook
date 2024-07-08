import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const host = "http://localhost:5000";

const Signup = (props) => {
  const [creds, setCreds] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useNavigate();

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (creds.password !== creds.cpassword) {
      e.preventDefault();
      props.showAlert(" Both passwords must be same.","danger")
      return;
    } else {
      e.preventDefault();
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: creds.name,
          email: creds.email,
          password: creds.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        localStorage.setItem("token", json.authToken);
        history("/");
        props.showAlert("Account Created Successfully","success")
      }
      else{
        props.showAlert("Some error occured","danger")
      }
      
    }
  };

  return (
    <>
      <form className="mb-3 my-3 container" onSubmit={handleSubmit}>
      <h1 className="my-3">Create an account to continue to iNotebook</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            value={creds.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={creds.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={creds.password}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={creds.cpassword}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Signup
        </button>
      </form>
    </>
  );
};

export default Signup;
