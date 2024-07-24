import "./Login.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import logoTop from "../../../assets/images/logo/Logo.svg";
import { validateEmail } from "../../../common/HelperFunctions";
import { Alert } from "react-bootstrap";
import globalRequest from "../../../prototype/globalRequest";
import { API_ROUTES } from "../../../common/Enum";
import addDeleteGetLocalStorage from "../../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../../common/LocalVariable";

const Login = () => {
  //new state
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [storedMessage, setStoredMessage] = useState('');

  const [toaster, setToaster] = useState({
    visibilty: false,
    status: "",
    text: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve the message from localStorage when the component mounts
    const message = localStorage.getItem('myMessage');
    localStorage.setItem('myMessage', '');
    if (message) {
      setStoredMessage(message);
      setTimeout(() => {        
        setStoredMessage('');
      }, 3000); 
    }

    const AdminAccess = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
    if(AdminAccess)navigate('/master-table')

  }, []); 
  

  const loginHandler = async () => {

    let token = false;

    if (email === "") {
      setEmailError("Email is required");
      token = true;
    }

    if (!validateEmail(email)) {
      setEmailError("Please Enter a valid email");
      token = true;
    }

    if (password === "") {
      setPasswordError("Password is required");
      token = true;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter valid password");
      token = true;
    }

    if(token){
      return false;
    }

    const data = {
      uname: email,
      password: password,
      role: "admin",
    };
    // console.log(data);
    // Login Api Call
    console.log("data-1")
    await globalRequest(API_ROUTES?.LOGIN, "post", data, {})
      .then((res) => {
        console.log("res", res);
        if (res.ack === 1) {
          let token = res?.data?.token;
          addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, token, "add","single");
          setToaster({
            status: "success",
            text: "Login successfully",
            visibilty: true,
          });
          navigate("/master-table");
          // setTimeout(() => {            
          // }, 700);          
        }else{
          setToaster({
            status: "error",
            text: "Incorrect Email or Password",
            visibilty: true,
          });
          setTimeout(() => {
            setToaster({ ...toaster, visibilty: false });
            navigate(`/`);
          }, 700);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  return (
    <>
      <div className="Login-page">
        <div className="LoginformContent">
          <div className="grid">
            <div
              className="lg:col-8 md:col-8 sm:col-10 text-center"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              
                <img src={logoTop} alt="logo" width="176px" />
           

              <div className="LoginForm  mt-4">
                {toaster.visibilty && (
                  <Alert className={`alert-${toaster.status==='error'?'danger':toaster.status}`} severity={toaster.status}>
                    {toaster.text}
                  </Alert>
                )}
                {storedMessage && (
                  <Alert className='alert-success' severity='success'>
                    {storedMessage}
                  </Alert>
                )}                
                <h3 className="h3 mb-2" style={{ textAlign: "center" }}>
                  Admin Login
                </h3>
                <p className="p2 mb-4" style={{ textAlign: "center" }}>
                  Please fill in all the required information
                </p>

                <div className="grid">
                  <div className="lg:col-12 md:col-12 sm:col-12">
                    <div className="formField">
                      <span className="p-float-label">
                        <InputText
                          id="tile"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value.trimStart());
                            setEmailError("");
                          }}
                        />
                        <label htmlFor="tile">Email*</label>
                      </span>
                      {emailError && (
                        <div
                          style={{ color: "#DC362E", textAlign: "initial" }}
                          className="errorSize"
                        >
                          {emailError}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="lg:col-12 md:col-12 sm:col-12">
                    <div className="formField">
                      <span className="p-float-label">
                        <Password
                          autoComplete="off"
                          toggleMask
                          feedback={false}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value.trimStart());
                            setPasswordError("")
                          }}
                        />
                        <label htmlFor="tile">Password*</label>
                      </span>
                      {passwordError && (
                        <div
                          style={{ color: "#DC362E", textAlign: "initial" }}
                          className="errorSize"
                        >
                          {passwordError}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="lg:col-12 md:col-12 sm:col-12 text-right mb-2">
                    <Link to="/forgot-password">Forgot Password</Link>
                  </div>
                  <div className="lg:col-12 md:col-12 sm:col-12">
                    <Button
                      className="btn btn-orange"
                      type="button"
                      // onClick={() => {
                      //   navigate("/master-table");
                      // }}
                      onClick={() => loginHandler()}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
