import { useState } from 'react';
import Axios from "axios";

function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [userPassword, setPasswordReg] = useState("");
  const [signupStatus, setsignupStatus] = useState("");
  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: userPassword
    }).then((response) => {
      if (response.data.result) {
        setsignupStatus("Signup Success")
      } else {
        setsignupStatus("Signup Failed");
      }
      console.log(response.data);
    })
  }

  const [loginStatus, setLoginStatus] = useState("");

  const [usernameLog, setUsernameLog] = useState("");
  const [userPasswordLog, setPasswordLog] = useState("");
  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: usernameLog,
      password: userPasswordLog
    }).then((response) => {
      if (response.data.result) {
        setLoginStatus("User Name: " + response.data.message[0].username)
      } else {
        setLoginStatus("Login failed");
      }
      console.log(response.data);
    })
  }

  return (
    <div className="container"><br></br>
      <div className='row'>
        <div className='col-md-6'>
          <div className="registration">
            <div className="form-control bg-dark text-white form-control-lg">Signup</div><br></br>
            <input type="text" onChange={(e) => { setUsernameReg(e.target.value) }} placeholder="Username" className='form-control'></input><br></br>
            <input type="text" onChange={(e) => { setPasswordReg(e.target.value) }} placeholder="Password" className='form-control'></input><br></br>
            <button onClick={register} className="btn form-control btn-success">Register</button>
          </div>
          <h4>{signupStatus}</h4>
        </div>
        <div className='col-md-6'>
          <div className='login'>
            <div className="form-control bg-dark text-white form-control-lg">Login</div><br></br>
            <input type="text" onChange={(e) => { setUsernameLog(e.target.value) }} placeholder='Username' className='form-control'></input>
            <br></br>
            <input type="password" onChange={(e) => { setPasswordLog(e.target.value) }} placeholder='password' className='form-control'></input>
            <br></br>
            <button onClick={login} className="btn form-control btn-success" >Login</button>
          </div>
          <h4>{loginStatus}</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
