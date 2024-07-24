/** @format */
import React, { useEffect } from "react";
import "./Profile.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
// import { Link } from "react-router-dom";
// import EditIcon from "@mui/icons-material/Edit";
// import CloseIcon from "@mui/icons-material/Close";
import CropImgModal from "../../Modals/CropImgModal";
import { useState } from "react";
import ChangePassword from "../../Modals/ChangePassword/ChangePassword";
import userAvatar from "../../assets/images/structure/user.png";
// import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { useNavigate } from "react-router-dom";
import {
  SHOW_IMG,
  removeCountryCode,
  validateEmail,
} from "../../common/HelperFunctions";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import { setSnackbar } from "../../redux/reducers/snackbar";
import { useDispatch } from "react-redux";

import jwt_decode from "jwt-decode";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../common/LocalVariable";

// import CropImgModal from "../../Modals/CropImgModal";

const Profile = () => {
  const dispatch = useDispatch();
  const [changePasswordShow, setChangePassword] = useState(false);
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  useEffect(() => {
    const data = addDeleteGetLocalStorage(STORAGE.USER_TOKEN, {}, "get");
    let decode = jwt_decode(data);
    setFormData((prev) => ({
      ...prev,
      first_name: decode?.first_name,
      last_name: decode?.last_name,
      email: decode?.email,
      mobile: decode?.country_code + ' ' +decode?.mobile,
      prevProfile: decode?.profile_pic,
    }));
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
      errObj.emailErr = "Invalide Email";
      err = true;
    }
    if (!formData?.mobile || formData?.mobile === "") {
      errObj.mobileErr = "Mobile is required";
      err = true;
    }

    setFormData(errObj);
    return err;
  };

  const submitHandler = async () => {
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
    data.logo = formData.profileImg;

    await globalRequest(API_ROUTES?.PROFILEUPDATE, "post", data, {}, true)
      .then((res) => {
        if (res.ack === 1) {
          // console.log("submit done");
          addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, res.data, "add","single");
          dispatch(
            setSnackbar({
              isOpen: true,
              message: "Data is successfully updated",
              state: "success",
            })
          );          
        } else {
          let dispatchTokan = true;
          if (res.errMsg.length > 0) {
            for (let row of res.errMsg) {
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

  //cropper manage
  const [cropType, setCropType] = useState(null);
  const [select_img, setSelect_img] = useState(null);
  const [showCropperDialog, setShowCropperDialog] = useState(false);
  const [imgType, setImgType] = useState(null);
  const handleCloseDialog = () => {
    setShowCropperDialog(false);
  };

  const handleSelectCropImage = (e, size, tagId) => {
    if (
      e.target.files[0].size > size * 1024 * 1024 ||
      (e.target.files[0].type !== "image/jpeg" &&
        e.target.files[0].type !== "image/png")
    ) {
      dispatch(
        setSnackbar({
          isOpen: true,
          message: `Invalid File Please UploadA JPEG Or PNG Image Within The Size Limit Of ${size}MB`,
          state: "error",
        })
      );
      let file = document.getElementById(tagId);
      file.value = "";
      return;
    }
    setSelect_img(URL.createObjectURL(e.target.files[0]));
    if (e.target.files[0].type === "image/jpeg") {
      setImgType("jpeg");
    }
    if (e.target.files[0].type === "image/png") {
      setImgType("png");
    }
    setShowCropperDialog(true);
    let file = document.getElementById(tagId);
    file.value = "";
    setFormData({
      ...formData,
      prevProfile: "",
    });
  };

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader p-4">
            <div className="tableHeader">
              <h4 className="h4 mb-0">Profile</h4>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="create-form">
            <div className="grid">
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="profile-update">
                  <div className="profile-pic">
                  {formData?.profileImg || formData?.prevProfile ? (
                      <div>
                        {/* <span>
                          <CloseIcon
                            onClick={() => {
                              removeImage(formData);
                            }}
                          />
                        </span> */}
                      </div>
                    ) : null}
                    <label htmlFor="profileImage">
                      <img
                        src={
                          formData?.prevProfile
                            ? SHOW_IMG(`profile_pic/${formData?.prevProfile}`)
                            : formData?.profileImg
                            ? formData?.profileImg
                            : userAvatar
                        }
                        alt="Avatar"
                      />
                      <input
                        id="profileImage"
                        type="file"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/jpeg, image/png"
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelectCropImage(e, 10, "profileImage");
                          setCropType("profile");
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="formField">
                  <span className="p-float-label p-input-icon-right edit-icon w-full">
                    {/* <CustomTooltip tooltipText={'Edit'}
                    >
                      <EditIcon />
                    </CustomTooltip> */}
                    <InputText
                      id="tile"
                      maxLength={50}
                      value={formData.first_name}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          first_name: e.target.value.trimStart(),
                          first_nameErr: "",
                        });
                      }}
                    />
                    <label htmlFor="tile">First Name</label>
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
                  <span className="p-float-label p-input-icon-right edit-icon w-full">
                    {/* <CustomTooltip tooltipText={'Edit'}
                    >
                      <EditIcon />
                    </CustomTooltip> */}
                    <InputText
                      id="tile"
                      maxLength={50}
                      value={formData.last_name}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          last_name: e.target.value.trimStart(),
                          last_nameErr: "",
                        });
                      }}
                    />
                    <label htmlFor="tile">Last Name</label>
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
                  <span className="p-float-label p-input-icon-right edit-icon w-full">
                    {/* <CustomTooltip tooltipText={"Edit"}>
                      <EditIcon />
                    </CustomTooltip> */}
                    <InputText
                      id="tile"
                      maxLength={100}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          email: e.target.value.trimStart(),
                          emailErr: "",
                        });
                      }}
                    />
                    <label htmlFor="tile">Email</label>
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
                  <span className="p-float-label p-input-icon-right edit-icon w-full">
                    {/* <CustomTooltip tooltipText={"Edit"}>
                      <EditIcon />
                    </CustomTooltip> */}
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
                  </span>
                  {formData.mobileErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.mobileErr}
                    </div>
                  )}
                </div>
                <div className="sub-content">
                  <h4 className="ml-0 mt-4">Subscribers</h4>
                  <div className="sub-contentFields">
                    <div className="align-self-center">
                      <h5>Student List</h5>
                    </div>
                    <div>
                      <button className="btn btn-outline">Export</button>
                    </div>
                  </div>
                  <div className="sub-contentFields">
                    <div className="align-self-center">
                      <h5>Companies List</h5>
                    </div>
                    <div>
                      <button className="btn btn-outline">Export</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid text-right mt-2">
              <div className="lg:col-5 md:col-5 sm:col-12">
                <Button
                  className="btn btn-outline ml-1 mr-1"
                  onClick={() => setChangePassword(true)}
                >
                  Change Password
                </Button>
                <Button
                  className="btn btn-orange ml-1 mr-1"
                  onClick={() => submitHandler()}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ChangePassword
        show={changePasswordShow}
        onHide={() => setChangePassword(false)}
      />

{select_img && (
        <CropImgModal
          open={showCropperDialog}
          onClose={handleCloseDialog}
          select_img={select_img}
          setCropImg={(newImg) => {
            if (cropType === "portfolio") {
              let prevImags = formData?.portfolioImages || [];
              let newPortfolioImgs = [...prevImags];
              newPortfolioImgs.push({ img: newImg, type: imgType });
              setFormData((prev) => {
                return {
                  ...prev,
                  portfolioImages: newPortfolioImgs,
                };
              });
            } else if (cropType === "profile") {
              setFormData((prev) => {
                return {
                  ...prev,
                  profileImg: newImg,
                  profileType: imgType,
                };
              });
            }

            setSelect_img(null);
            setImgType(null);
            handleCloseDialog();
          }}
        />
      )}

    </>
  );
};

export default Profile;
