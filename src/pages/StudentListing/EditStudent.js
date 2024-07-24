//** @format */
import { useState, React, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { InputSwitch } from "primereact/inputswitch";
import CloseIcon from "@mui/icons-material/Close";
import userAvatar from "../../assets/images/structure/user.png";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import { Calendar } from "primereact/calendar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AccountVerifiedModal from "../../Modals/AccountVerified";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import {
  SHOW_IMG,
  capitalizeFirstLetter,
  formatDateFunction,
  removeCountryCode,
  validateEmail,
} from "../../common/HelperFunctions";
import CropImgModal from "../../Modals/CropImgModal";
import { setSnackbar } from "../../redux/reducers/snackbar";
import { useDispatch } from "react-redux";
// All faculty
const faculty = [];
const spokenLanguage = [];
const labelLanguage = [
  { name: "Beginner", code: "Beginner" },
  { name: "Intermediate", code: "Intermediate" },
  { name: "Advance", code: "Advance" },
  { name: "Fluent", code: "Fluent" },
];
const startDegree = [];
const locations = [];
// All Multi Options
const accountPrivacy = [
  { name: "Public", code: "public" },
  { name: "Private", code: "private" },
];

const EditStudent = () => {
  const [areaWithWorkExperiences, setAreaWithWorkExperiences] = useState([]);
  const [degree, setDegree] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [accountVerified, setAccountVerified] = useState(false);
  const [domainData, setDomainData] = useState([
    {
      language: {},
      lable: {},
    },
  ]);

  const [formData, setFormData] = useState({});

  let { id } = useParams();

  //Get Student Data
  const getStudentData = async () => {
    await globalRequest(
      API_ROUTES?.GETSPECIFICSTUDENT + "/" + id,
      "get",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          let user = res?.data?.user;
          let data = res?.data;
          setStudent({
            id: data.id,
            university_email: data.university_email,
            university_email_isverified: data.university_email_isverified,
            university_verified_on: data.university_verified_on,
          });

          let locationData = [];
          for (let row of res.locations)
            locationData.push({
              name: row?.location?.district_en,
              code: row?.location?.id,
            });

          let area_with_work_expData = [];
          for (let row of user.student_area_of_works) {
            area_with_work_expData.push({
              name: row?.area_of_work_experience?.area_of_work_exp_en,
              code: row?.area_of_work_experience?.id,
            });
          }
          // console.log('area_with_work_expData',area_with_work_expData);

          let languageData = [];
          for (let row of user.student_languages) {
            let lan = {
              language: {
                name: row?.language?.language_en,
                code: row?.language?.id,
              },
              lable: {
                name: capitalizeFirstLetter(row?.level),
                code: row?.level,
              },
            };
            languageData.push(lan);
          }
          setDomainData(languageData);

          let dobDate = "";
          if (user?.dob !== "NaN/NaN/NaN") {
            let dob = user?.dob.split("/");
            dobDate = new Date(dob[1] + "/" + dob[0] + "/" + dob[2]);
          }

          // console.log("mobile", user?.country_code + user?.mobile);

          setFormData({
            first_name: user?.first_name,
            last_name: user?.last_name,
            email: user?.email,
            university_email: data?.university_email,
            mobile: user?.country_code + user?.mobile,
            faculty_id: {
              name: data?.faculty?.name_en,
              code: data?.faculty?.id,
            },
            start_year_of_degree: {
              name: parseInt(data?.start_year_of_degree),
              code: parseInt(data?.start_year_of_degree),
            },
            degree_id: {
              name: data?.degree?.degree_en,
              code: data?.degree?.id,
            },
            dob: dobDate,
            prevProfile: user?.profile_pic,
            location: locationData,
            area_with_work_exp: area_with_work_expData,
            prev_resume: data?.resume,
            resume: data?.resume,
            resume_size: data?.resume_size,
            resume_name: "",
            prev_resume_name: data?.resume_display_name,
            resume_type: "pdf",
            differentiate_yourself: data?.differentiate_yourself,
            language: [],
            is_profile_public: data?.is_profile_public
              ? { name: "Public", code: "public" }
              : { name: "Private", code: "private" },
            no_of_strikes: res.data?.user?.no_of_strikes,
            holder_name: "",
            iban_number: "",
          });
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  //Get Faculty Data
  const getFacultyData = async () => {
    await globalRequest(API_ROUTES?.GETFACULTYDATA, "get", {}, {}, true)
      .then((res) => {
        if (res.ack === 1) {
          // let getFacultyData = []
          for (let fac of res.data.rows) {
            faculty.push({ name: fac.name_en, code: fac.id });
          }
          // setFacultyData(getFacultyData);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  //Get Degree Data
  const getDereeData = async () => {
    await globalRequest(API_ROUTES?.GETDEGREEDATA, "get", {}, {}, true)
      .then((res) => {
        if (res.ack === 1) {
          let degree = [];
          for (let deg of res.data.rows) {
            degree.push({ name: deg.degree_en, code: deg.id });
          }
          setDegree(degree);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  //Get Location Data
  const getLocationData = async () => {
    await globalRequest(API_ROUTES?.GETLOCATIONDATA, "get", {}, {}, true)
      .then((res) => {
        if (res.ack === 1) {
          for (let district of res.data.rows) {
            locations.push({ name: district.district_en, code: district.id });
          }
          // setFacultyData(getFacultyData);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  //Get Area with work expirencr Data
  const getAreaWithWorkExperiencesData = async () => {
    await globalRequest(
      API_ROUTES?.GETAREAOFWORKEXPERIENCEDATA,
      "get",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          let areaWithWorkExperiences = [];
          for (let row of res.data.rows) {
            areaWithWorkExperiences.push({
              name: row.area_of_work_exp_en,
              code: row.id,
            });
          }
          // console.log('areaWithWorkExperiences',areaWithWorkExperiences);
          setAreaWithWorkExperiences(areaWithWorkExperiences);
          // setFacultyData(getFacultyData);

          // console.log("areaWithWorkExperiences1", areaWithWorkExperiences);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  //Get Langauge Data
  const getLangaugeData = async () => {
    await globalRequest(API_ROUTES?.GETLANGUAGEDATA, "get", {}, {}, true)
      .then((res) => {
        if (res.ack === 1) {
          for (let row of res.data.rows) {
            spokenLanguage.push({ name: row.language_en, code: row.id });
          }
          // setFacultyData(getFacultyData);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const approveStudent = async () => {
    // console.log(student);
    let data = {
      university_email_isverified: student.university_email_isverified
        ? false
        : true,
    };
    await globalRequest(
      API_ROUTES?.ACCOUNTVERIFICVATION + "/" + student.id,
      "put",
      data,
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setAccountVerified(false);
          // getStudentData();
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const [isApiCall, setIsApiCall] = useState(false);
  useEffect(() => {
    let resultData = async () => {
      try {
        // Using fetch
        await Promise.all([
          getFacultyData(),
          getDereeData(),
          getLocationData(),
          getAreaWithWorkExperiencesData(),
          getLangaugeData(),
        ]);
        // console.log("step1");
      } catch (error) {
        console.error("error", error);
      } finally {
        // getStudentData();
        setIsApiCall(true);
        // console.log("step2");
      }
    };

    resultData();

    //create start Year of Degree values
    let date = new Date();
    for (let i = 1970; i <= date.getFullYear(); i++)
      startDegree.push({ name: i, code: i });
  }, []);

  useEffect(() => {
    if (isApiCall) {
      // console.log("step3");
      getStudentData();
    }
  }, [isApiCall]);

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
    if (!formData?.university_email || formData?.university_email === "") {
      errObj.university_emailErr = "University Email is required";
      err = true;
    } else if (!validateEmail(formData?.university_email)) {
      errObj.university_emailErr = "University Email is required";
      err = true;
    }
    if (!formData?.mobile) {
      errObj.mobileErr = "Mobile is required";
      err = true;
    }
    if (!formData?.faculty_id?.code) {
      errObj.faculty_idErr = "Faculty is required";
      err = true;
    }
    if (!formData?.start_year_of_degree?.code) {
      errObj.start_year_of_degreeErr = "Start year of degree is required";
      err = true;
    }
    if (!formData?.degree_id?.code) {
      errObj.degree_idErr = "Degree is required";
      err = true;
    }
    if (!formData?.dob) {
      errObj.dobErr = "DOB is required";
      err = true;
    }
    if (!formData?.location.length === 0) {
      errObj.locationErr = "Location is required";
      err = true;
    }
    if (!formData?.area_with_work_exp.length === 0) {
      errObj.area_with_work_expErr = "Area is required";
      err = true;
    }
    if (!formData?.differentiate_yourself) {
      errObj.differentiate_yourselfErr = "About is required";
      err = true;
    }
    // if (!formData?.no_of_strikes) {
    //   errObj.no_of_strikesErr = "Strikes is required";
    //   err = true;
    // }
    if (!formData?.is_profile_public) {
      errObj.is_profile_publicErr = "profile visibility is required";
      err = true;
    }

    if (!formData?.language) {
      errObj.languageErr = "Language is required";
      err = true;
    }
    // if (!formData?.holder_name) {
    //   errObj.holder_nameErr = "Holder name is required";
    //   err = true;
    // }
    // if (!formData?.iban_number) {
    //   errObj.iban_numberErr = "IBAN number is required";
    //   err = true;
    // }

    setFormData(errObj);
    return err;
  };

  const submitHandler = async () => {
    let isError = errorHandle(formData);

    if (isError) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    let data = {};
    data.profileImg = formData.profileImg;
    data.first_name = formData.first_name;
    data.last_name = formData.last_name;
    data.email = formData.email;
    data.university_email = formData.university_email;
    data.mobile = removeCountryCode(formData.mobile, formData.country_code);
    data.country_code = formData.country_code;
    data.country_code_str = formData.country_code_str;
    data.faculty_id = formData.faculty_id.code;
    data.start_year_of_degree = formData.start_year_of_degree.code;
    data.degree_id = formData.degree_id.code;
    data.dob = formatDateFunction(formData.dob, "dd/mm/yyyy");
    data.location = JSON.stringify(formData.location);
    data.area_with_work_exp = JSON.stringify(formData.area_with_work_exp);
    data.is_profile_public =
      formData.is_profile_public.code === "public" ? true : false;
    data.no_of_strikes = formData.no_of_strikes;
    data.resume = formData.resume;
    data.resume_size = formData.resume_size;
    let type = formData.resume_type;
    type = type.split("/");
    data.resume_type = type[type.length - 1];
    data.differentiate_yourself = formData.differentiate_yourself;
    let lang = [];
    for (let dt of domainData)
      lang.push({ language_id: dt.language.code, level: dt.lable.code });
    data.languageData = JSON.stringify(lang);
    data.holder_name = formData.holder_name;
    data.iban_number = formData.iban_number;

    await globalRequest(
      API_ROUTES?.EDITSTUDENTDATA + "/" + id,
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
          navigate("/student-listing");
        } else {
          // console.log("error Aahe");
          dispatch(
            setSnackbar({
              isOpen: true,
              message: "Something went wrong please try again some time later.",
              state: "error",
            })
          );
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  //cropper manage
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

  const removeImage = (formData) => {
    setFormData({
      ...formData,
      profileImg: "",
      prevProfile: "",
    });
  };

  const handleCommercialDocumentChange = (event) => {
    const file = event.target.files[0];
    if (file?.type !== "application/pdf") {
      dispatch(
        setSnackbar({
          isOpen: true,
          message: `Invalid File Please UploadA PDF Within The Size Limit Of 10MB`,
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
          resume: base64File,
          resume_name: file?.name,
          resume_size: size,
          resume_type: file?.type,
          prev_resume_name: "",
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
          <div className="tablefilterheader p-4">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate("/student-listing");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0"> Edit Students</h4>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="create-form">
            <div className="grid">
              <div className="lg:col-12 md:col-12 sm:col-12">
                <div className="profile-update">
                  <div className="profile-pic">
                    {formData?.profileImg || formData?.prevProfile ? (
                      <div>
                        <span>
                          <CloseIcon
                            onClick={() => {
                              removeImage(formData);
                            }}
                          />
                        </span>
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
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex align-items-center gap-3">
                  <label>Account verified</label>
                  <InputSwitch
                    checked={student.university_email_isverified}
                    onChange={() => setAccountVerified(true)}
                  />
                </div>
              </div>
            </div>
            <div className="grid">
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="tile"
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
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="tile"
                      value={formData.last_name}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          last_name: e.target.value.trimStart(),
                          last_nameErr: "",
                        });
                      }}
                    />
                    <label htmlFor="tile">Last name</label>
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
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="tile"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          email: e.target.value.trimStart(),
                          emailErr: "",
                        });
                      }}
                    />
                    <label htmlFor="tile">Email Address</label>
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
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      disabled
                      id="universityEmail"
                      value={formData.university_email}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          university_email: e.target.value.trimStart(),
                          university_emailErr: "",
                        });
                      }}
                    />
                    <label htmlFor="tile">University Email</label>
                  </span>
                  {formData.university_emailErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.university_emailErr}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
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
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label w-full dropdownnew">
                    <Dropdown
                      inputId="dd-faculty"
                      value={formData.faculty_id}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          faculty_id: e.value,
                          faculty_idErr: "",
                        });
                      }}
                      options={faculty}
                      optionLabel="name"
                      className="w-full"
                    />
                    <label htmlFor="dd-faculty">Faculty</label>
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
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label w-full dropdownnew">
                    <Dropdown
                      inputId="dd-start-degree"
                      value={formData.start_year_of_degree}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          start_year_of_degree: e.value,
                          start_year_of_degreeErr: "",
                        });
                      }}
                      options={startDegree}
                      optionLabel="name"
                      className="w-full"
                    />
                    <label htmlFor="dd-account">Year of Start of Degree</label>
                  </span>
                  {formData.start_year_of_degreeErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.start_year_of_degreeErr}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label w-full dropdownnew">
                    <Dropdown
                      inputId="dd-degree"
                      value={formData.degree_id}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          degree_id: e.value,
                          degree_idErr: "",
                        });
                      }}
                      options={degree}
                      optionLabel="name"
                      className="w-full"
                    />
                    <label htmlFor="dd-degree">Degree (+ Area of Study)</label>
                  </span>
                  {formData.degree_idErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.degree_idErr}
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label" htmlFor="dob">
                    <Calendar
                      id="dob"
                      maxDate={new Date()}
                      value={formData.dob}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dob: e.value,
                          dobErr: "",
                        });
                      }}
                      showIcon
                    />
                    <label htmlFor="dob">Date of Birth</label>
                  </span>
                  {formData.dobErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.dobErr}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label w-full dropdownnew">
                    <MultiSelect
                      value={formData.location}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          location: e.value,
                          locationErr: "",
                        });
                      }}
                      options={locations}
                      optionLabel="name"
                      display="chip"
                      placeholder="Select your work?"
                      maxSelectedLabels={3}
                      className="w-full dropdownnew"
                    />
                    <label>Where are you available to work?</label>
                  </span>
                  {formData.locationErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.locationErr}
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label w-full dropdownnew">
                    <MultiSelect
                      value={formData.area_with_work_exp}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          area_with_work_exp: e.value,
                          area_with_work_expErr: "",
                        });
                      }}
                      options={areaWithWorkExperiences}
                      optionLabel="name"
                      display="chip"
                      placeholder="Select Area with work experience"
                      maxSelectedLabels={3}
                      className="w-full dropdownnew"
                    />
                    <label>Area with work experience</label>
                  </span>
                  {formData.area_with_work_expErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.area_with_work_expErr}
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label w-full dropdownnew">
                    <Dropdown
                      inputId="dd-account"
                      value={formData.is_profile_public}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          is_profile_public: e.value,
                          is_profile_publicErr: "",
                        });
                      }}
                      options={accountPrivacy}
                      optionLabel="name"
                      className="w-full"
                    />
                    <label htmlFor="dd-account">Account privacy</label>
                  </span>
                  {formData.is_profile_publicErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.is_profile_publicErr}
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="tile"
                      value={formData.no_of_strikes}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          no_of_strikes: e.target.value.trimStart(),
                          no_of_strikesErr: "",
                        });
                      }}
                    />
                    <label htmlFor="tile">Strikes</label>
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
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                <div className="image-def new-full-design">
                      <input
                        id="commercialDocument"
                        className="file-uploadNew"
                        type="file"
                        accept=".pdf"
                        onChange={handleCommercialDocumentChange}
                      />
                  
                      <div className="image-def-content">
                      <i className="pi pi-file-pdf" />
                      {!formData.resume_name && (                        
                        <p>Commercial Certification Document</p>
                      )}
                      {formData.resume_name && (
                         <p>{formData.resume_name} </p>
                      )}
                      {formData.prev_resume_name && (
                        <a
                          href={`${SHOW_IMG("resume/" + formData.resume)}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {formData.prev_resume_name}
                        </a>
                      )}
                      {formData.resumeErr && (
                        <div
                          style={{ color: "#DC362E", textAlign: "initial" }}
                          className="errorSize"
                        >
                          {formData.resumeErr}
                        </div>
                      )}
                      </div>
                 
                  </div>
                  
                </div>
              </div>
              <div className="lg:col-10 md:col-10 sm:col-12">
                <div className="formField">
                  <CKEditor
                    config={{ placeholder: "About me" }}
                    editor={ClassicEditor}
                    data={formData.differentiate_yourself || ""}
                    onChange={(e, d) => {
                      let data = d.getData();
                      setFormData((prev) => {
                        return {
                          ...prev,
                          differentiate_yourself: data,
                          differentiate_yourselfErr: "",
                        };
                      });
                    }}
                  />
                  {formData.differentiate_yourselfErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.differentiate_yourselfErr}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid">
              {domainData?.map((item, index) => {
                return (
                  <div
                    className="lg:col-10 md:col-10 sm:col-12 p-0"
                    key={index}
                  >
                    <div className="grid mx-0 w-full">
                      <div className="lg:col-11 md:col-10 sm:col-10 p-0">
                        <div className="grid mx-0 w-full">
                          <div className="lg:col-6 md:col-6 sm:col-12 py-0">
                            <div className="formField w-full">
                              <span className="p-float-label w-full dropdownnew">
                                <Dropdown
                                  inputId="dd-lang1"
                                  value={item.language}
                                  onChange={(e) => {
                                    let prevArr = [...domainData];
                                    prevArr[index].language = e.value;

                                    setDomainData(prevArr);
                                  }}
                                  options={spokenLanguage}
                                  optionLabel="name"
                                  className="w-full"
                                />
                                <label htmlFor="dd-lang">Spoken Language</label>
                              </span>
                            </div>
                          </div>
                          <div className="lg:col-6 md:col-6 sm:col-12 py-0">
                            <div className="formField w-full">
                              <span className="p-float-label w-full dropdownnew">
                                <Dropdown
                                  inputId="dd-lang"
                                  value={item.lable}
                                  onChange={(e) => {
                                    let prevArr = [...domainData];
                                    prevArr[index].lable = e.value;

                                    setDomainData(prevArr);
                                  }}
                                  options={labelLanguage}
                                  optionLabel="name"
                                  className="w-full"
                                />
                                <label htmlFor="dd-lang">label</label>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-1 md:col-2 sm:col-2 flex align-items-start justify-content-center">
                        <CustomTooltip
                          tooltipText={`${
                            index === 0 ? "Add More " : "Remove "
                          }`}
                        >
                          {index === 0 ? (
                            <i
                              className="pi pi-plus-circle"
                              style={{ color: "#000", margin: "10px" }}
                              onClick={() => {
                                let prevDomainData = [...domainData];
                                prevDomainData.push({
                                  language: {},
                                  lable: {},
                                });
                                setDomainData(prevDomainData);
                              }}
                            />
                          ) : (
                            <i
                              className="pi pi-minus-circle"
                              style={{ color: "#000", margin: "10px" }}
                              onClick={() => {
                                // Create a copy of domainData excluding the item to be removed
                                const updatedDomainData = domainData.filter(
                                  (_, idx) => idx !== index
                                );
                                setDomainData(updatedDomainData);
                              }}
                            />
                          )}
                        </CustomTooltip>
                      </div>
                    </div>
                  </div>
                );
              })}
              <Divider className="mt-0 mb-1" />
            </div>

            <div className="mt-3 ml-4">
              <h6>
                <b>Receiving Payment Info</b>
              </h6>
            </div>
            <div className="grid">
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="tile"
                      value={formData.holder_name}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          holder_name: e.target.value.trimStart(),
                          holder_nameErr: "",
                        });
                      }}
                    />
                    <label htmlFor="tile">Full name of holder name</label>
                  </span>
                  {formData.holder_nameErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.holder_nameErr}
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="tile"
                      value={formData.iban_number}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          iban_number: e.target.value.trimStart(),
                          iban_numberErr: "",
                        });
                      }}
                    />
                    <label htmlFor="tile">IBAN</label>
                  </span>
                  {formData.iban_numberErr && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData.iban_numberErr}
                    </div>
                  )}
                </div>
              </div>
              <Divider className="mt-0 mb-1" />
            </div>
            <div className="grid text-right mt-5">
              <div className="lg:col-10 md:col-10 sm:col-12">
                <Button
                  className="btn btn-gray mr-2"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="btn btn-orange ml-1 mr-1"
                  onClick={() => submitHandler()}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AccountVerifiedModal
        show={accountVerified}
        onHide={() => setAccountVerified(false)}
        student={student}
        approveFunction={() => {
          approveStudent();
          // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        }}
      />

      {select_img && (
        <CropImgModal
          open={showCropperDialog}
          onClose={handleCloseDialog}
          select_img={select_img}
          setCropImg={(newImg) => {
            setFormData((prev) => {
              return {
                ...prev,
                profileImg: newImg,
                profileType: imgType,
              };
            });
            setSelect_img(null);
            setImgType(null);
            handleCloseDialog();
          }}
        />
      )}
    </>
  );
};

export default EditStudent;
