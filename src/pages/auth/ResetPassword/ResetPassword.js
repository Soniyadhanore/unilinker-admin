import React, { useState } from "react";
import {  useParams,useNavigate } from "react-router-dom";//useNavigate
import { Password } from "primereact/password";
// import { Alert } from "react-bootstrap";
import { Button } from "primereact/button";
import logoTop from "../../../assets/images/logo/Logo.svg";
import globalRequest from "../../../prototype/globalRequest";
import { API_ROUTES } from "../../../common/Enum";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbar";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { code } = useParams();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // const [error, setError] = useState("");

  const submitHandler = async () => {
    let tokan = false;
    if (password === "") {
      setPasswordError("Password is required");
      tokan = true;
    }
    if (confirmPassword === "") {
      setConfirmPasswordError("Confirm Password is required");
      tokan = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Password not matched");
      tokan = true;
    }
    
    if(tokan)return false;
    
    const data = {
      newPassword: password,
      code: code,
    };
    // Login Api Call

    await globalRequest(API_ROUTES?.RESETPASSWORD, "post", data, {})
      .then((res) => {
        console.log("res", res);
        if (res.ack === 1) {
          localStorage.setItem('myMessage', 'Your password has been created');
          navigate("/master-table");          
        }else{
          // setError("user not found");
          // setTimeout(() => {        
          //   setError('');
          // }, 2000);
          dispatch(
            setSnackbar({
              isOpen: true,
              message: "User not found",
              state: "error",
            })
          );
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
              {/* {error && (
                  <Alert className='alert-danger' severity='error'>
                    {error}
                  </Alert>
                )} */}
                <h3 className="h3 mb-2" style={{ textAlign: "center" }}>
                  Set New Password
                </h3>
                <p className="p2 mb-4" style={{ textAlign: "center" }}>
                  Almost done. Enter your new password and you’re good to go.
                </p>
                <div className="grid">
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
                            setPasswordError("");
                          }}
                        />
                        <label htmlFor="tile">New password</label>
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
                  <div className="lg:col-12 md:col-12 sm:col-12">
                    <div className="formField">
                      <span className="p-float-label">
                        <Password
                          autoComplete="off"
                          toggleMask
                          feedback={false}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value.trimStart());
                            setConfirmPasswordError("");
                          }}
                        />
                        <label htmlFor="tile">Confrm New password</label>
                      </span>
                      {confirmPasswordError && (
                        <div
                          style={{ color: "#DC362E", textAlign: "initial" }}
                          className="errorSize"
                        >
                          {confirmPasswordError}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="lg:col-12 md:col-12 sm:col-12">
                    <Button
                      className="btn btn-orange"
                      onClick={() => submitHandler()}
                    >
                      Create Password
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

export default ResetPassword;
