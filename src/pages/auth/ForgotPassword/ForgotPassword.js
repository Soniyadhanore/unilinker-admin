import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React, { useState } from "react";
import logoTop from "../../../assets/images/logo/Logo.svg";
import globalRequest from "../../../prototype/globalRequest";
import { validateEmail } from "../../../common/HelperFunctions";
import { API_ROUTES } from "../../../common/Enum";

const ForgotPassword = () => {
  
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();
  // const routeCustomerListing = () => {
  //   let path = `/master-table`;
  //   navigate(path);
  // };

  const forgotPasswordHandler = async () => {
    if (email === "") {
      setEmailError("Email is required");
      return false;
    }

    if (!validateEmail(email)) {
      setEmailError("Please Enter a valid email");
      return false;
    }

    const data = {
      email: email    
    };
    // Login Api Call
    await globalRequest(API_ROUTES?.FORGOTPASSWORD, "post", data, {})
      .then((res) => {
        console.log("res", res);
        if (res.ack === 1) {
          localStorage.setItem('myMessage', 'please check your email, we have sent a link on your email.');
          navigate("/");
        }else{
          setEmailError(res.errMsg);
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
              className="lg:col-12 md:col-12 sm:col-10 text-center"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
               
                <img src={logoTop} alt="logo" width="176px" />
               
              <div className="LoginForm  mt-4">
                <h3 className="h3 mb-2" style={{ textAlign: "center" }}>
                Forgot Password
                </h3>
                <p className="p2 mb-4" style={{ textAlign: "center" }}>
                Enter registered email address to receive reset password link
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
                        }} />
                        <label htmlFor="tile">Email Address</label>
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
                  <div className="lg:col-12 md:col-12 sm:col-12 text-right mb-2">
                    <Link to="/">Back to login</Link>
                  </div>
                  <div className="lg:col-12 md:col-12 sm:col-12">
                    <Button
                      className="btn btn-orange"
                      // onClick={() => {
                      //   routeCustomerListing()
                      // }}
                      onClick={() => forgotPasswordHandler()}
                    >
                      Send link
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

export default ForgotPassword;
