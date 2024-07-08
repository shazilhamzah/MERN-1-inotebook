import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
const host="http://localhost:5000"


const Login = (props) => {

    const [creds,setCreds] = useState({email:"",password:""})
    let history = useNavigate();

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
      };

    const handleSubmit =async(e)=> {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({email:creds.email,password:creds.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token',json.authToken);
            history("/");
            props.showAlert(" Logged in Successfully","success")
          }
          else{
            props.showAlert(" Invalid Credentials","danger")
          }
    }


  return (
    <>
      <form className="mb-3 my-3 container" onSubmit={handleSubmit}>
    <h1 className="my-3">Login to continue to iNotebook</h1>
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
        <button type="submit" className="btn btn-primary my-2">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YWVkNTBiMGVjYjI1ZDdkOGQwMmM3In0sImlhdCI6MTcyMDM4MTY0Nn0.A86CCwCeLCCIPcF1gE5WnKAAyP4H72BxQKOsFrz_q_A