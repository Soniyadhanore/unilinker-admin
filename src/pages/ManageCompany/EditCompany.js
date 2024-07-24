/** @format */
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate, useParams } from "react-router-dom";
import userAvatar from "../../assets/images/structure/user.png";
import { Form } from "react-bootstrap";
// import { FileUpload } from "primereact/fileupload";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import CloseIcon from "@mui/icons-material/Close";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import {
  SHOW_IMG,
  removeCountryCode,
  validateEmail,
} from "../../common/HelperFunctions";
import { setSnackbar } from "../../redux/reducers/snackbar";
import { useDispatch } from "react-redux";
import CropImgModal from "../../Modals/CropImgModal";
import { useGoogleLocation } from "../../hooks/useGoogleLocation";
import { IMAGE_BASE_URL } from "../../BaseUrl";

const faculty = [];

const EditCompany = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  let { id } = useParams();
  const [formData, setFormData] = useState({});
  const [facultyNameShow, setFacultyNameShow] = useState("");
  const [removedPortfolioImages, setRemovedPortfolioImages] = useState([]);

  useEffect(() => {
    if (facultyNameShow !== "Other") {
      setFacultyNameShow("");
      setFormData({
        ...formData,
        facultyName: "",
        facultyNameErr: "",
      });
    }
  }, [facultyNameShow]);

  // get google api custom hooks
  const {
    getGoogleAddressSuggestions,
    getLatLongByAddress,
    setAddressSuggestion,
    addressSuggestion,
    setFullAddress,
    fullAddress,
    latLng,
  } = useGoogleLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [searchLock, setSearchLock] = useState(false);
  const [address, setAddress] = useState("");

  //set billing address
  useEffect(() => {
    if (fullAddress) {
      // console.log(fullAddress);
      setFormData({
        ...formData,
        billing_address: address,
        billing_city: fullAddress?.city,
        billing_country: fullAddress?.country,
        billing_pincode: fullAddress?.zipCode,
        billing_addressErr: "",
        billing_cityErr: "",
        billing_countryErr: "",
        billing_pincodeErr: "",
      });
    } else {
      setFormData({
        ...formData,
        location: "",
        city: "",
        country: "",
        pinCode: "",
      });
    }
  }, [fullAddress]);

  //search list of address
  useEffect(() => {
    // console.log('search && !searchLock',search , searchLock);
    if (search && !searchLock) getGoogleAddressSuggestions(search);
    else setAddressSuggestion([]);
  }, [search]);

  //debounce for address
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  //get lat lgn by selected address
  useEffect(() => {
    if (address) {
      getLatLongByAddress(address);
    }
  }, [address]);

  //update form with errors
  useEffect(() => {
    if (latLng?.lng && latLng?.lat) {
      // console.log(latLng);
      setFormData((prevData) => {
        return {
          ...prevData,
          billing_latitude: latLng?.lat,
          billing_longitude: latLng?.lng,
        };
      });
    }
  }, [latLng]);

  // const onUpload = () => {};
  // const academicUpload = () => {};

  const getFacultyData = async () => {
    await globalRequest(API_ROUTES?.GETFACULTYDATA, "get", {}, {}, true)
      .then((res) => {
        if (res.ack === 1) {
          for (let fac of res.data.rows) {
            faculty.push({ name: fac.name_en, code: fac.id });
          }
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  //Get Company Data
  const getCompanyData = async () => {
    await globalRequest(
      API_ROUTES?.GETSPECIFICCOMPANY + "/" + id,
      "get",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          let user = res?.data?.user;
          let data = res?.data;

          let facultData = "";
          if (data?.faculty_id) {
            facultData = {
              name: data?.facultyNameStr,
              code: data?.faculty_id,
            };
          }
          setSelectedOption(data.type);
          // console.log(data.prev_commercial_document_name);

          setAddress(data?.billing_address);
          setSearchTerm(data?.billing_address);
          setAddressSuggestion([]);
          setSearchLock(true);
          if (facultData.name === "Other") setFacultyNameShow("Other");

          setFormData({
            faculty_id: facultData,
            tax_id: data?.tax_id,
            company_institute_name: data?.company_institute_name,
            facultyName: data?.faculty_name,
            about: data?.about,

            billing_address: data?.billing_address,
            billing_country: data?.billing_country,
            billing_city: data?.billing_city,
            billing_pincode: data?.billing_pincode,
            billing_latitude: data?.billing_latitude,
            billing_longitude: data?.billing_longitude,

            prev_commercial_document: data?.commercial_document,
            commercial_document: data?.commercial_document,
            commercial_document_size: data?.commercial_document_size,
            commercial_document_display_name:
              data?.commercial_document_display_name,
            prev_commercial_document_name:
              data?.commercial_document_display_name,

            plateformFeeApplicability: data?.plateformFeeApplicability,
            studentDatabaseAccessibility: data?.studentDatabaseAccessibility,
            first_name: user?.first_name,
            last_name: user?.last_name,
            email: user?.email,
            country_code: user?.country_code,
            country_code_str: user?.country_code_str,
            no_of_strikes: user?.no_of_strikes,
            mobile: user?.country_code + user?.mobile,
            prevProfile: user?.profile_pic,
            portfolio_images: user?.portfolio_images,
          });
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    // getFacultyData();
    // getCompanyData();
    try {
      // Using fetch
      Promise.all([
        getFacultyData(),        
      ]);
    } catch (error) {
      console.error("error", error);
    } finally {
      setTimeout(() => {
        getCompanyData();
      }, 500);
      // getCompanyData();
    }
  }, []);

  //error handle
  const errorHandle = (formData) => {
    let err = false;
    let errObj = { ...formData };

    // console.log(selectedOption);
    if (selectedOption === "company") {
      if (!formData?.tax_id || formData?.tax_id === "") {
        errObj.tax_idErr = "Tax id is required";
        err = true;
      }
      if (
        !formData?.company_institute_name ||
        formData?.company_institute_name === ""
      ) {
        errObj.company_institute_nameErr = "Company name is required";
        err = true;
      }
    } else {
      if (!formData?.faculty_id?.code) {
        errObj.faculty_idErr = "Faculty is required";
        err = true;
      }
      if (
        !formData?.company_institute_name ||
        formData?.company_institute_name === ""
      ) {
        errObj.company_institute_nameErr =
          "Academic institutions name is required";
        err = true;
      }
      if (facultyNameShow === "Other") {
        if (!formData?.facultyName || formData?.facultyName === "") {
          errObj.facultyNameErr = "Faculty name is required";
          err = true;
          console.log("facultyNameShow", errObj);
        }
      }
    }
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
    // if (!formData?.mobile || formData?.mobile === "") {
    //   errObj.mobileErr = "Mobile is required";
    //   err = true;
    // }
    if (!formData?.billing_address || formData?.billing_address === "") {
      errObj.billing_addressErr = "Billing address is required";
      err = true;
    }
    if (!formData?.billing_country || formData?.billing_country === "") {
      errObj.billing_countryErr = "Billing country is required";
      err = true;
    }
    if (!formData?.billing_city || formData?.billing_city === "") {
      errObj.billing_cityErr = "Billing city is required";
      err = true;
    }
    if (!formData?.billing_pincode || formData?.billing_pincode === "") {
      errObj.billing_pincodeErr = "Billing pincode is required";
      err = true;
    }
    if (!formData?.about || formData?.about === "") {
      errObj.aboutErr = "About is required";
      err = true;
    }
    if (
      !formData?.commercial_document ||
      formData?.commercial_document === ""
    ) {
      errObj.commercial_document = "Commercial document is required";
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
    data.type = selectedOption;
    data.logo = formData.profileImg;
    if (formData.faculty_id) data.faculty_id = formData.faculty_id.code;
    if (formData.facultyName) data.faculty_name = formData.facultyName;
    data.tax_id = formData.tax_id;
    data.first_name = formData.first_name;
    data.last_name = formData.last_name;
    data.company_institute_name = formData.company_institute_name;
    data.email = formData.email;
    data.mobile = removeCountryCode(formData.mobile, formData.country_code);
    data.country_code = formData.country_code;
    data.country_code_str = formData.country_code_str;
    data.billing_address = formData.billing_address;
    data.billing_country = formData.billing_country;
    data.billing_city = formData.billing_city;
    data.billing_pincode = formData.billing_pincode;
    data.billing_latitude = ""; //formData.latitude;
    data.billing_longitude = ""; //formData.longitude;
    data.about = formData.about;
    data.plateformFeeApplicability = formData.plateformFeeApplicability;
    data.studentDatabaseAccessibility = formData.studentDatabaseAccessibility;
    data.no_of_strikes = formData.no_of_strikes;

    data.commercial_document = formData.commercial_document;
    data.commercial_document_size = formData.commercial_document_size;
    data.commercial_document_display_name = formData.commercial_document_name;
    let type = formData.commercial_document_type;

    data.portfolioImages = formData.portfolioImages;
    data.removedPortfolioImages = removedPortfolioImages;

    if (type) {
      type = type.split("/");
      data.commercial_document_type = type[type.length - 1];
    }

    await globalRequest(
      API_ROUTES?.EDITCOMPANYREQUESTDATA + "/" + id,
      "put",
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
              message: "Data is successfully updated",
              state: "success",
            })
          );
          navigate("/manage-company");
        } else {
          let dispatchTokan = true;
          if (res.errMsg.length > 0) {
            for (let row of res.errMsg) {
              // console.log(row);
              const keys = Object.keys(row);
              for (let key of keys) {
                const value = row[key];
                // console.log("key", key, value);
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

  // const removeImage = (formData) => {
  //   setFormData({
  //     ...formData,
  //     profileImg: "",
  //     prevProfile: "",
  //   });
  // };

  const handleCommercialDocumentChange = (event) => {
    const file = event.target.files[0];
    if (file?.type !== "application/pdf") {
      dispatch(
        setSnackbar({
          isOpen: true,
          message: `Invalid File Please UploadA file Within The Size Limit Of 10MB`,
          state: "error",
        })
      );
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64File = reader.result.split(",")[1]; // Extracting base64 data
        let sizeInKb = (file.size / 1024).toFixed(2);
        let sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
        let size;
        if (+sizeInKb < 1000) size = sizeInKb + "Kb";
        else size = sizeInMb + "Mb";

        setFormData({
          ...formData,
          commercial_document: base64File,
          commercial_document_name: file?.name,
          commercial_document_size: size,
          commercial_document_type: file?.type,
          // prev_resume_name:''
        });
      };
      reader.onerror = (error) => {
        console.error("Error reading the file:", error);
      };
    }
    let fileInput = document.getElementById("commercialDocument");
    fileInput.value = "";
  };

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate(-1);
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="create-form" id="companyUser">
            <h4 className="h4 mb-2">
              {" "}
              {selectedOption === "company"
                ? "Edit New Company"
                : "Edit Academic Institutions"}{" "}
            </h4>
            <div className="grid">
              <div className="lg:col-5 md:col-5 sm:col-12 pb-4">
                <div className="profile-update mb-0">
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
              </div>
            </div>
            <div className="grid">
              {selectedOption === "company" ? (
                <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                  <div className="formField">
                    <span className="p-float-label">
                      <InputText
                        id="title"
                        value={formData.tax_id}
                        maxLength={20}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            tax_id: e.target.value.trimStart(),
                            tax_idErr: "",
                          });
                        }}
                      />
                      <label htmlFor="title">TAX ID</label>
                    </span>
                    {formData.tax_idErr && (
                      <div
                        style={{ color: "#DC362E", textAlign: "initial" }}
                        className="errorSize"
                      >
                        {formData.tax_idErr}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                  <div className="formField">
                    <span className="p-float-label dropdownnew">
                      <Dropdown
                        inputId="type"
                        value={formData.faculty_id}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            faculty_id: e.value,
                            faculty_idErr: "",
                          });
                          setFacultyNameShow(e.value.name);
                        }}
                        options={faculty}
                        optionLabel="name"
                        className="w-full"
                      />
                      <label htmlFor="type">Faculty name*</label>
                    </span>
                    {formData.faculty_idErr && (
                      <div
                        style={{ color: "#DC362E", textAlign: "initial" }}
                        className="errorSize"
                      >
                        {formData.faculty_idErr}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {facultyNameShow && facultyNameShow === "Other" ? (
                <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                  <div className="formField">
                    <span className="p-float-label">
                      <InputText
                        id="title"
                        value={formData.facultyName}
                        maxLength={50}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            facultyName: e.target.value.trimStart(),
                            facultyNameErr: "",
                          });
                        }}
                      />
                      <label htmlFor="title">Faculty Name</label>
                    </span>
                    {formData.facultyNameErr && (
                      <div
                        style={{ color: "#DC362E", textAlign: "initial" }}
                        className="errorSize"
                      >
                        {formData.facultyNameErr}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="title"
                      value={formData.company_institute_name}
                      maxLength={50}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          company_institute_name: e.target.value.trimStart(),
                          company_institute_nameErr: "",
                        });
                      }}
                    />
                    <label htmlFor="title">
                      {" "}
                      {selectedOption === "company"
                        ? "Company name*"
                        : "Academic institutions name*"}{" "}
                    </label>
                  </span>
                  {formData.company_institute_nameErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.company_institute_nameErr}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="title"
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
                    <label htmlFor="title">Contact person first name* </label>
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
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="title"
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
                    <label htmlFor="title">Contact person last name*</label>
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
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="title"
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
                    <label htmlFor="title">Contact person Email*</label>
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
              </div>

              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField pt-0">
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
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField p-0">
                  <span className="p-float-label">
                    <InputText
                      id="title"
                      // value={formData.billing_address}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     billing_address: e.target.value.trimStart(),
                      //     billing_addressErr: "",
                      //   });
                      // }}
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target?.value?.trimStart());
                        setSearchLock(false);

                        setFormData({
                          ...formData,
                          locationError: "",
                        });
                      }}
                    />
                    <label htmlFor="title">Company billing address*</label>
                    {!searchTerm ? (
                      <i
                        className="pi pi-map-marker"
                        style={{
                          position: "absolute",
                          right: "1rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      ></i>
                    ) : (
                      <i
                        className="pi pi-times"
                        onClick={() => {
                          setSearchTerm("");
                          setFullAddress(null);
                          setFormData({
                            ...formData,
                            billing_address: "",
                            billing_addressErr: "",
                          });
                        }}
                        style={{
                          position: "absolute",
                          right: "1rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      ></i>
                    )}
                  </span>
                  {formData.billing_addressErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial", bottom:"-17px"}}
                      className="errorSize"
                    >
                      {formData.billing_addressErr}
                    </div>
                  )}
                  {addressSuggestion?.length > 0 && (
                    <div className="custom-container">
                      <ul>
                        {addressSuggestion.map((address, index) => {
                          return (
                            <li
                              key={index}
                              onClick={() => {
                                setSearchLock(true);
                                setAddressSuggestion([]);
                                setAddress(address);
                                setSearchTerm(address);
                              }}
                            >
                              {address}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField pb-1">
                  <span className="p-float-label">
                    <InputText
                      id="title"
                      value={formData.billing_country}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          billing_country: e.target.value.trimStart(),
                          billing_countryErr: "",
                        });
                      }}
                    />
                    <label htmlFor="title">Country*</label>
                  </span>
                  {formData.billing_countryErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial", bottom:"-17px" }}
                      className="errorSize"
                    >
                      {formData.billing_countryErr}
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="title"
                      value={formData.billing_city}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          billing_city: e.target.value.trimStart(),
                          billing_cityErr: "",
                        });
                      }}
                    />
                    <label htmlFor="title">City*</label>
                  </span>
                  {formData.billing_cityErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.billing_cityErr}
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="title"
                      className="w-full"
                      value={formData.billing_pincode}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          billing_pincode: e.target.value.trimStart(),
                          billing_pincodeErr: "",
                        });
                      }}
                    />
                    <label htmlFor="title">Pincode</label>
                  </span>
                  {formData.billing_pincodeErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.billing_pincodeErr}
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="title"
                      className="w-full"
                      value={formData.no_of_strikes}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          no_of_strikes: e.target.value.trimStart(),
                          no_of_strikesErr: "",
                        });
                      }}
                    />
                    <label htmlFor="title">No of strikes</label>
                  </span>
                  {formData.no_of_strikesErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.no_of_strikesErr}
                    </div>
                  )}
                </div>
              </div>

              {selectedOption === "company" && (
                <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                  <div className="formField flex">
                    {/* <FileUpload
                      mode="basic"
                      name="demo[]"
                      url="/api/upload"
                      accept="image/*"
                      maxFileSize={1000000}
                      onUpload={onUpload}
                      chooseLabel="Commercial Certification Document"
                      className="file-uploadNew"
                    /> */}
                    <div className="image-def">
                      <input
                        id="commercialDocument"
                        className="file-uploadNew"
                        type="file"
                        accept=".pdf"
                        onChange={handleCommercialDocumentChange}
                      />

                      <div className="image-def-content">
                        <i className="pi pi-file-pdf" />
                        <p>Commercial Certification Document</p>
                      </div>
                    </div>
                    <a href={IMAGE_BASE_URL+'commercial_document/'+formData.commercial_document} target='_blank' rel="noreferrer" >{formData.commercial_document_display_name}</a>
                    {/* <lable className="align-self-center">
                      {formData.commercial_document_display_name}
                    </lable> */}

                    {formData.commercial_documentErr && (
                      <div
                        style={{ color: "#DC362E", textAlign: "initial" }}
                        className="errorSize"
                      >
                        {formData.commercial_documentErr}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div
                  className="formField pt-0 flex "
                  style={{ flexWrap: "wrap" }}
                >
                  {/* <FileUpload
                    mode="basic"
                    name="demo[]"
                    url="/api/upload"
                    accept="image/*"
                    maxFileSize={1000000}
                    onUpload={academicUpload}
                    chooseLabel="Portfolio"
                    className="file-uploadNew"
                  /> */}

                  <div className="image-def">
                    <input
                      id="PortfolioImages"
                      type="file"
                      className="file-uploadNew cursor-pointer maxwidth114"
                      accept="image/jpeg, image/png"
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectCropImage(e, 10, "PortfolioImages");
                        setCropType("portfolio");
                      }}
                    />
                    <div className="image-def-content maxwidth114">
                      <i className="pi pi-upload" />
                      <p>Portfolio</p>
                    </div>
                  </div>
                  {formData.portfolio_images &&
                    formData.portfolio_images.map((item, index) => {
                      return (
                        <>
                          <div className="close-icon">
                            <img
                              key={index}
                              src={SHOW_IMG(
                                `portfolio_image/${item?.image_url}`
                              )}
                              className="small-image"
                            />
                            <i
                              className="pi pi-times cursor-pointer"
                              onClick={() => {
                                let prevImags = formData.portfolio_images;
                                prevImags = [...prevImags];
                                //remove image from list
                                prevImags?.splice(index, 1);
                                setFormData((prev) => {
                                  return {
                                    ...prev,
                                    portfolio_images: prevImags,
                                  };
                                });
                                setRemovedPortfolioImages((prev) => [
                                  ...prev,
                                  item,
                                ]);
                              }}
                            />
                          </div>
                        </>
                      );
                    })}
                  {formData?.portfolioImages?.map((portfolio, index) => {
                    return (
                      <>
                        <div className="close-icon">
                          <img
                            key={index + portfolio?.type}
                            src={portfolio?.img}
                            alt="portfolio"
                            className="small-image"
                          />
                          <i
                            className="pi pi-times cursor-pointer"
                            onClick={() => {
                              let prevImags = formData.portfolioImages;
                              prevImags = [...prevImags];
                              //remove image from list
                              prevImags?.splice(index, 1);
                              setFormData((prev) => {
                                return {
                                  ...prev,
                                  portfolioImages: prevImags,
                                };
                              });
                            }}
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-10 md:col-10 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <label className="aboutCompany">About company*</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={formData.about || ""}
                      onChange={(e, d) => {
                        let data = d.getData();
                        setFormData((prev) => {
                          return {
                            ...prev,
                            about: data,
                            aboutErr: "",
                          };
                        });
                      }}
                    />
                  </span>
                  {formData.aboutErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.aboutErr}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="grid">
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="mt-3">
                  <h6 className="font-semibold">
                    Platform fee applicability*{" "}
                    <i className="fa fa-info-circle"></i>
                  </h6>
                </div>
                <div className="grid m-0">
                  <div className="lg:col-5 md:col-5 sm:col-12 py-0 p-0">
                    <div className="formField-view">
                      <div className="formField-heading">
                        <h5>Platform Fee</h5>
                      </div>
                      <div className="formField-details affiliateTop">
                        <Form.Check
                          type="switch"
                          checked={formData.plateformFeeApplicability}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              plateformFeeApplicability:
                                e.target.value.trimStart(),
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="mt-3">
                  <h6 className="font-semibold">
                    Student Database Accessibility*
                  </h6>
                </div>
                <div className="grid m-0">
                  <div className="lg:col-5 md:col-5 sm:col-12 py-0 p-0">
                    <div className="formField-view">
                      <div className="formField-heading">
                        <h5>Student Database</h5>
                      </div>
                      <div className="formField-details affiliateTop">
                        <Form.Check
                          type="switch"
                          checked={formData.studentDatabaseAccessibility}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              studentDatabaseAccessibility:
                                e.target.value.trimStart(),
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid text-right">
              <div className="lg:col-10 md:col-10 sm:col-12">
                <Button
                  className="btn btn-gray mr-2"
                  onClick={() => navigate("/manage-company")}
                >
                  Cancel
                </Button>
                <Button
                  className="btn btn-orange ml-1 mr-1"
                  onClick={() => submitHandler()}
                >
                  Update account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default EditCompany;
