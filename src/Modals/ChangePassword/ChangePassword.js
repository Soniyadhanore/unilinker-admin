/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "react-bootstrap";
import { Password } from "primereact/password";
import { API_ROUTES } from "../../common/Enum";
import globalRequest from "../../prototype/globalRequest";
import { setSnackbar } from "../../redux/reducers/snackbar";
import { useDispatch } from "react-redux";

function ChangePassword(props) {
  const dispatch = useDispatch();
  const { show, onHide } = props;
  // const [oldPassword, setOldPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    oldPassword:'',
    oldPasswordErr:'',
    newPassword:'',
    newPasswordErr:'',
    confirmPassword:'',
    confirmPasswordErr:''
  });

  //error handle
  const errorHandle = (formData) => {
    let err = false;
    let errObj = { ...formData };

    if (!formData?.oldPassword || formData?.oldPassword === "") {
      errObj.oldPasswordErr = "old password is required";
      err = true;
    }
    if (!formData?.newPassword || formData?.newPassword === "") {
      errObj.newPasswordErr = "new password is required";
      err = true;
    }
    if (!formData?.confirmPassword || formData?.confirmPassword === "") {
      errObj.confirmPasswordErr = "confirm password is required";
      err = true;
    }

    if ((formData?.newPassword && formData?.confirmPassword) && (formData?.newPassword!=formData?.confirmPassword)) {
      errObj.confirmPasswordErr = "password not matched";
      err = true;
    }    

    setFormData(errObj);
    return err;
  };

  const submitHandler = async () => {
    let isError = errorHandle(formData);
    
    if (isError) {
      return;
    }

    let data = {};
    data.oldPassword = formData.oldPassword;
    data.newPassword = formData.newPassword;
    
    await globalRequest(API_ROUTES?.CHANGEPASSWORD, "post", data, {}, true)
      .then((res) => {
        if (res.ack === 1) {
          onHide(true);
          dispatch(
            setSnackbar({
              isOpen: true,
              message: "Password is successfully changed",
              state: "success",
            })
          );          
        } else {

          setFormData((prev) => {
            return {
              ...prev,
              oldPasswordErr: res.message,
            };
          });

          
            // dispatch(
            //   setSnackbar({
            //     isOpen: true,
            //     message:
            //       "Something went wrong please try again some time later.",
            //     state: "error",
            //   })
            // );
          
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  return (
    <>
      <Dialog
        visible={show}
        onHide={onHide}
        draggable={false}
        style={{ width: "500px" }}
        className="delete-modal"
        header="Change Password"
      >
        <div className="create-form pt-0">
          <div className="grid m-0 w-full">
            <div className="lg:col-12 md:col-12 sm:col-12 p-0">
              <div className="formField">
                <span className="p-float-label">
                  <Password
                    value={formData.oldPassword}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        oldPassword: e.target.value.trimStart(),
                        oldPasswordErr: "",
                      });
                    }}
                    toggleMask
                    feedback={false}
                  />
                  <label htmlFor="tile">Old Password</label>
                </span>
                {formData.oldPasswordErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.oldPasswordErr}
                    </div>
                  )}
              </div>
              <div className="formField">
                <span className="p-float-label">
                  <Password
                    value={formData.newPassword}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        newPassword: e.target.value.trimStart(),
                        newPasswordErr: "",
                      });
                    }}
                    toggleMask
                    feedback={false}
                  />
                  <label htmlFor="tile">New Password</label>
                </span>
                {formData.newPasswordErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.newPasswordErr}
                    </div>
                  )}
              </div>
              <div className="formField">
                <span className="p-float-label">
                  <Password
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value.trimStart(),
                        confirmPasswordErr: "",
                      });
                    }}
                    toggleMask
                    feedback={false}
                  />
                  <label htmlFor="tile">Confrm new Password</label>
                </span>
                {formData.confirmPasswordErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.confirmPasswordErr}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="grid text-right justify-content-end ">
          <div className="lg:col-10 md:col-5 sm:col-12">
            <Button className="btn btn-orange ml-1 mr-1" onClick={() => submitHandler()}>Save</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ChangePassword;
