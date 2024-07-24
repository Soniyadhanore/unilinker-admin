/** @format */
import { useState,React, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import { removeCountryCode, validateEmail } from "../../common/HelperFunctions";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";

const CreateSubAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const [roleList, setRoleList] = useState({});
  const [formData, setFormData] = useState({});
  //Get Role Data
  const getRoleList = async () => {
    await globalRequest(
      API_ROUTES?.GETALLROLES,
      "get",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          let data = res.data;
          let list = [];
          for(let item of data.rows)list.push({ name: item.role_name, code: item.id })
          setRoleList(list);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    getRoleList();
  }, []);

  //error handle
  const errorHandle = (formData) => {
    let err = false;
    let errObj = { ...formData };    
    
    if (!formData?.first_name || formData?.first_name === "") {
      errObj.first_nameErr = "First name is required";
      err = true;
    }
    if (!formData?.last_name || formData?.last_name === "") {
      errObj.last_nameErr = "Last name is required";
      err = true;
    }
    if (!formData?.email || formData?.email === "") {
      errObj.emailErr = "Email is required";
      err = true;
    } else if (!validateEmail(formData?.email)) {
      errObj.emailErr = "Invalid Email";
      err = true;
    }
    if (!formData?.mobile || formData?.mobile === "" || formData?.mobile.length < 5) {
      errObj.mobileErr = "Mobile is required";
      err = true;
    }
    // if (!formData?.designation || formData?.designation === "") {
    //   errObj.designationErr = "Designation is required";
    //   err = true;
    // }    
    if (!formData?.role_id || formData?.role_id === "") {
      errObj.role_idErr = "Role is required";
      err = true;
    }    

    setFormData(errObj);
    return err;
  };

  const submitHandler = async () => {
    // console.log(selectedOption);
    let isError = errorHandle(formData);

    if (isError) {
      // window.scrollTo({
      //   top: 0,
      //   behavior: "smooth",
      // });
      return;
    }

    let data = {};
    data.first_name = formData.first_name;
    data.last_name = formData.last_name;
    data.email = formData.email;
    data.mobile = removeCountryCode(formData.mobile, formData.country_code);
    data.country_code = formData.country_code;
    data.country_code_str = formData.country_code_str;
    data.designation = formData.designation;
    data.role_id = formData.role_id.code;
    
    await globalRequest(
      API_ROUTES?.CREATESUBADMIN,
      "post",
      data,
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          // console.log("submit done");
          dispatch(
            setSnackbar({
              isOpen: true,
              message: "Sub admin account has been created",
              state: "success",
            })
          );
          navigate("/sub-admin");
        } else {
          let dispatchTokan = true;
          // console.log(res);
          if (res.message.length > 0) {
            for (let row of res.message) {
              // console.log('row',row)
              const keys = Object.keys(row);
              for (let key of keys) {
                const value = row[key];
                if (key === "email") {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      emailErr: value,
                    };
                  });
                  dispatchTokan = false;
                }
                if (key === "mobile") {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      mobileErr: value,
                    };
                  });
                  dispatchTokan = false;
                }
              }
            }
          }

          if (dispatchTokan) {
            dispatch(
              setSnackbar({
                isOpen: true,
                message:
                  "Something went wrong please try again some time later.",
                state: "error",
              })
            );
          }
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader p-4">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate("/sub-admin");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0"> Create Sub Admin Account</h4>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="create-form">
            <div className="grid">
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText id="tile" 
                    maxLength={50}
                    value={formData.first_name}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        first_name: e.target.value.trimStart(),
                        first_nameErr: "",
                      });
                    }} />
                    <label htmlFor="tile">First Name*</label>
                  </span>
                  {formData.first_nameErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.first_nameErr}
                    </div>
                  )}
                </div>
                <div className="formField">
                  <span className="p-float-label">
                    <InputText id="tile" maxLength={50}
                    value={formData.last_name}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        last_name: e.target.value.trimStart(),
                        last_nameErr: "",
                      });
                    }} />
                    <label htmlFor="tile">Last Name*</label>
                  </span>
                  {formData.last_nameErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.last_nameErr}
                    </div>
                  )}
                </div>
                <div className="formField">
                  <span className="p-float-label">
                    <InputText id="tile"
                    maxLength={100}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        email: e.target.value.trimStart(),
                        emailErr: "",
                      });
                    }} />
                    <label htmlFor="tile">Email Address*</label>
                  </span>
                  {formData.emailErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.emailErr}
                    </div>
                  )}
                </div>
                <div className="formField">
                  {/* <span className="p-float-label">
                    <InputText id="tile" />
                    <label htmlFor="tile">Mobile Number*</label>
                  </span> */}
                  <PhoneInput
                    country={"pt"}
                    value={formData?.mobile}
                    onChange={(e, h) => {
                      setFormData({
                        ...formData,
                        mobile: e,
                        country_code: h.dialCode,
                        country_code_str: h.countryCode,
                        mobileErr: "",
                      });
                    }}
                  />
                   {formData.mobileErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.mobileErr}
                    </div>
                  )}
                </div>
                <div className="formField">
                  <span className="p-float-label">
                    <InputText id="tile" 
                    maxLength={100}
                    value={formData.designation}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        designation: e.target.value.trimStart(),
                        designationErr: "",
                      });
                    }}
                    />
                    <label htmlFor="tile">Designation</label>
                  </span>
                  {formData.designationErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.designationErr}
                    </div>
                  )}
                </div>
                <div className="formField">
                  <span className="p-float-label">
                  <Dropdown
                  inputId="Role"
                    // value={selectedCity}
                    // onChange={(e) => setSelectedCity(e.value)}
                    options={roleList}
                    optionLabel="name"
                    placeholder="Select a Role"
                    className="w-full md:w-100rem"
                    value={formData.role_id}
                    onChange={(e) => {
                        setFormData({
                          ...formData,
                          role_id: e.value,
                          role_idErr: "",
                        });
                      }}
                      
                  />
                  <label htmlFor="Role">Role</label>
                  </span>
                  {formData.role_idErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.role_idErr}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid text-right">
              <div className="lg:col-5 md:col-5 sm:col-12">
                <Button className="btn btn-gray mr-2" onClick={() => navigate("/sub-admin")}>Cancel</Button>
                <Button className="btn btn-orange ml-1 mr-1" onClick={() => submitHandler()}>
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateSubAdmin;
