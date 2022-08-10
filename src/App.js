import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Axios from "axios";

function App() {
  const [usernameReg,setUsernameReg]=useState("");
  const [userPassword,setPasswordReg]=useState("");
  const [signupStatus,setsignupStatus]=useState("");
  const register=()=>{
    Axios.post("http://localhost:3001/register",{
      username:usernameReg, 
      password:userPassword
    }).then((response)=>{
      if(response.data.result){
        setsignupStatus("Signup Success")
      }else{
        setsignupStatus("Signup Failed");
      }
      console.log(response.data);
    })
  }

  const [loginStatus,setLoginStatus]=useState("");

  const [usernameLog,setUsernameLog]=useState("");
  const [userPasswordLog,setPasswordLog]=useState("");
  const login=()=>{
    Axios.post("http://localhost:3001/login",{
      username:usernameLog, 
      password:userPasswordLog
    }).then((response)=>{
      if(response.data.result){
        setLoginStatus("User Name: "+response.data.message[0].username)
      }else{
        setLoginStatus("Login failed");
      }
      console.log(response.data);
    })
  }

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <input type="text" onChange={(e)=>{setUsernameReg(e.target.value)}} placeholder="Username"></input><br></br>
        <input type="text" onChange={(e)=>{setPasswordReg(e.target.value)}} placeholder="Password"></input><br></br>
        <button onClick={register}>Register</button>
      </div>
      <h1>{signupStatus}</h1> <hr></hr>
      <div className='login'>
        <h1>Login</h1>
        <input type="text" onChange={(e)=>{setUsernameLog(e.target.value)}} placeholder='Username'></input>
        <br></br>
        <input type="password" onChange={(e)=>{setPasswordLog(e.target.value)}} placeholder='password'></input>
        <br></br>
        <button onClick={login} >Login</button>
      </div>
      <h1>{loginStatus}</h1>
    </div>
  );
}

export default App;
