/** @format */
import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Link, useNavigate, useParams } from "react-router-dom";
import userAvatar from "../../assets/images/structure/user.png";
import PastJobReview from "./PastJobReview";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import { useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Rating } from "primereact/rating";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import { Table } from "react-bootstrap";
import { API_ROUTES } from "../../common/Enum";
import globalRequest from "../../prototype/globalRequest";
import {
  calculateAge,
  capitalizeFirstLetter,
  formatDateFunction,
  getPermissionFromAll,
} from "../../common/HelperFunctions";
import { IMAGE_BASE_URL } from "../../BaseUrl";
// import Loaders from "../../Loaders";
import { InputSwitch } from "primereact/inputswitch";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../common/LocalVariable";
import jwtDecode from "jwt-decode";

const ViewStudent = () => {
  const navigate = useNavigate();
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [studentData, setStudentData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  // const [resumePdfFile, setResumePdfFile] = useState([]);

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);
  let student = getPermissionFromAll("student", accessToken);

  let { id } = useParams();

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
          setStudentData(res.data);
          setLocationData(res.locations);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    getStudentData();
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleDownload = async () => {
    try {
      window.open(IMAGE_BASE_URL + "resume/" + studentData.resume, "_blank");
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const deleteData = async () => {
    await globalRequest(
      API_ROUTES?.DELETESTUDENTDATA + "/" + id,
      "delete",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setDeleteModalShow(false);
          navigate("/student-listing");
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const handleStatusChange = async (item) => {
    await globalRequest(
      API_ROUTES?.CHANGEOFSTATUSSTUDENTDATA + "/" + item?.id,
      "put",
      { status: item?.user.status === "active" ? "inactive" : "active" },
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          getStudentData();
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
          <div className="tablefilterheader">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate("/student-listing");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0"> View Students</h4>
              <div className="tableFilterRow">
                <div className="flex align-items-center gap-3">
                  <InputSwitch
                    checked={
                      studentData?.user?.status === "active" ? true : false
                    }
                    onChange={() => handleStatusChange(studentData)}
                    disabled={student.update_status ? false : true}
                  />
                </div>
                <div className="tableFilterCol" style={{ width: "auto" }}>
                  {studentData?.resume && studentData.resume != "" ? (
                    <Button
                      className="btn btn-outline ml-1 mr-1"
                      onClick={() => {
                        handleDownload();
                      }}
                    >
                      Download CV
                    </Button>
                  ) : (
                    <Button
                      className="btn btn-outline ml-1 mr-1"
                      disabled={true}
                    >
                      Download CV
                    </Button>
                  )}
                  {/* <Button className="btn btn-outline ml-1 mr-1">
                    Update Status
                  </Button>
                  <Button className="btn btn-outline ml-1 mr-1">
                    Update Strikes
                  </Button> */}
                  {student.edit ? (
                    <CustomTooltip tooltipText={"Edit"}>
                      <Button
                        className="btn btn-outline ml-1 mr-1"
                        onClick={() => {
                          navigate("/edit-student/" + id);
                        }}
                      >
                        <i className="fa fa-pencil" />
                      </Button>
                    </CustomTooltip>
                  ) : null}
                  {student.delete ? (
                    <CustomTooltip tooltipText={"Delete"}>
                      <Button
                        className="btn btn-outline ml-1"
                        onClick={() => setDeleteModalShow(true)}
                      >
                        <i className="fa fa-trash" />
                      </Button>
                    </CustomTooltip>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="create-form">
            <div className="grid">
              <div className="lg:col-6 md:col-6 sm:col-12">
                <div className="profile-update">
                  <div className="profile-pic">
                    <label htmlFor="fileToUpload">
                      <img
                        src={
                          studentData?.user?.profile_pic &&
                          studentData?.user?.profile_pic != ""
                            ? IMAGE_BASE_URL +
                              "profile_pic/" +
                              studentData?.user?.profile_pic
                            : userAvatar
                        }
                        alt="Avatar"
                      />
                      <InputText name="fileToUpload" id="fileToUpload" />
                    </label>
                  </div>
                  <div className="align-self-center ml-3">
                    <h5>
                      {studentData?.user?.first_name}{" "}
                      {studentData?.user?.last_name}
                    </h5>
                    <Rating
                      value={0}
                      readOnly
                      cancel={false}
                      style={{ color: "#ffd559" }}
                    />
                    <span>{capitalizeFirstLetter(studentData?.status)}</span>
                  </div>
                  <div
                    className=""
                    style={{ color: "green", margin: "17px 0" }}
                  >
                    {studentData?.university_email_isverified && (
                      <VerifiedIcon />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid">
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5> Email Address</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {studentData?.user?.email
                        ? studentData?.user?.email
                        : "-"}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>University Email Address</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {studentData?.university_email
                        ? studentData?.university_email
                        : "-"}
                    </h6>
                  </div>
                </div>
              </div>

              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Student ID</h5>
                  </div>
                  <div className="formField-details">
                    <h6>#{studentData?.id ? studentData?.id : "-"}</h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Faculty</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {studentData?.faculty?.name_en
                        ? studentData?.faculty?.name_en
                        : "-"}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Degree (+ Area of Study)</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {studentData?.degree?.degree_en
                        ? studentData?.degree?.degree_en
                        : "-"}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Where are you available to work?</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {/* <Link className="m-0">View More</Link> */}
                      {locationData?.length > 0
                        ? locationData?.map((location, index) => {
                            return (
                              <span key={index}>
                                {location?.location?.district_en}{" "}
                                {index !==
                                studentData?.user?.student_languages?.length - 1
                                  ? ","
                                  : ""}
                              </span>
                            );
                          })
                        : "-"}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Spoken Languages & Level</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {studentData?.user?.student_languages.length > 0
                        ? studentData?.user?.student_languages?.map(
                            (lang, index) => {
                              return (
                                <span key={index}>
                                  {lang?.language?.language_en}{" "}
                                  {`(${lang?.level}) ${
                                    index !==
                                    studentData?.user?.student_languages
                                      ?.length -
                                      1
                                      ? ","
                                      : ""
                                  }`}
                                </span>
                              );
                            }
                          )
                        : "-"}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Created date</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {" "}
                      {studentData?.createdAt
                        ? formatDateFunction(studentData?.createdAt)
                        : "-"}{" "}
                    </h6>
                  </div>
                </div>
              </div>

              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Mobile Number</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {studentData?.user?.mobile
                        ? studentData?.user?.mobile
                        : "-"}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Age</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {studentData?.user?.dob
                        ? calculateAge(studentData?.user?.dob)
                        : "-"}{" "}
                      Years
                    </h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Year of Start of Degree</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {studentData?.start_year_of_degree
                        ? studentData?.start_year_of_degree
                        : "-"}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Area with work experience</h5>
                  </div>
                  <div className="formField-details">
                    <h6>-{/* Hospitality, Tourism */}</h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Unilinkr score</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {studentData?.user?.unilinkr_score
                        ? studentData?.user?.unilinkr_score
                        : "-"}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Strikes</h5>
                  </div>
                  <div className="formField-details">
                    <h6
                      className="underline text-blue cursor-pointer"
                      onClick={() => navigate("/strike-log/"+studentData.id)}
                    > { studentData?.user?.no_of_strikes }
                      <Link
                        to={`/strike-log/`+studentData.id}
                        className="m-0"
                        style={{ textDecoration: "underline" }}
                      >
                        {" "}
                        Strike logs
                      </Link>
                      {/* {studentData?.user?.no_of_strikes ? studentData?.user?.no_of_strikes : '-'} */}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Account privacy</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {" "}
                      {studentData.is_profile_public
                        ? "Private"
                        : "Public"}{" "}
                    </h6>
                  </div>
                </div>
              </div>

              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>About me</h5>
                  </div>
                  <div className="formField-details">
                    {/* {studentData?.differentiate_yourself} */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: studentData?.differentiate_yourself,
                      }}
                    />
                    {/* <h6>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor
                    </h6> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 ml-4">
              <h6>
                <b>Receiving Payment Info</b>
              </h6>
            </div>
            <div className="grid">
              <div className="lg:col-6 md:col-6 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Full name of holder name</h5>
                  </div>
                  <div className="formField-details">
                    <h6>{ studentData?.account_holder_name ? studentData?.account_holder_name : '-' }</h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-6 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>IBAN</h5>
                  </div>
                  <div className="formField-details">
                    <h6>{ studentData?.iban ? studentData?.iban : '-' }</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 ml-4">
              <h6>
                <b>Legal Info</b>
              </h6>
            </div>
            <div className="grid">
              <div className="lg:col-6 md:col-6 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>NIF (Número de Identifcação Fiscal)</h5>
                  </div>
                  <div className="formField-details">
                    <h6>{ studentData?.nif ? studentData?.nif : '-' }</h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-6 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Password</h5>
                  </div>
                  <div className="formField-details">
                    <div className="flex mb-2">
                      <div className="passwordHideShow">
                        <span
                          className={
                            passwordVisible ? "hidden" : "showPassword"
                          }
                        >
                          *********
                        </span>
                        <span
                          className={
                            passwordVisible ? "showPassword" : "hidden"
                          }
                        >
                          { studentData?.nif_password ? studentData?.nif_password : '-' }
                        </span>
                      </div>
                      <div className="passwordBtn">
                        <i
                          className={
                            passwordVisible
                              ? "pi pi-eye-slash relative top-[-2px] closeEye hidden"
                              : "pi pi-eye relative top-[-2px] openEye"
                          }
                          onClick={togglePasswordVisibility}
                        ></i>
                        <i
                          className={
                            passwordVisible
                              ? "pi pi-eye-slash relative top-[-2px] openEye"
                              : "pi pi-eye-slash relative top-[-2px] closeEye hidden"
                          }
                          onClick={togglePasswordVisibility}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 ml-4 mr-4">
              <h6 className="font-semibold">Current Job </h6>
              {/* <div className="jobProfile">
                <div className="grid">
                  <div className="lg:col-4 md:col-4 sm:col-12">
                    <div className="formField-view my-0">
                      <div className="formField-heading">
                        <h5 className="mb-3">Job title</h5>
                        <h6>Software Engineer</h6>
                        <h6>Software Engineer</h6>
                        <h6>Software Engineer</h6>
                        <h6>Software Engineer</h6>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-4 md:col-4 sm:col-12">
                    <div className="formField-view my-0">
                      <div className="formField-heading">
                        <h5 className="mb-3">Company Name</h5>
                        <h6>Amazon</h6>
                        <h6>Amazon</h6>
                        <h6>Amazon</h6>
                        <h6>Amazon</h6>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-4 md:col-4 sm:col-12">
                    <div className="formField-view my-0">
                      <div className="formField-heading">
                        <h5 className="mb-3">Start Date</h5>
                        <h6>12/02/2023</h6>
                        <h6>12/02/2023</h6>
                        <h6>12/02/2023</h6>
                        <h6>12/02/2023</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="container-fluid adminTableContent">
                <div className="tableContent">
                  <Table responsive style={{ border: "1px solid #d9dee3" }}>
                    <thead>
                      <tr>
                        <th>Job title</th>
                        <th>Company Name</th>
                        <th>Start Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <tr>
                        <td colSpan="3">
                          <Loaders />{" "}                          
                        </td>
                      </tr> */}
                      <tr>
                        <td>Software Engineer</td>
                        <td>Amazon </td>
                        <td>12/02/2023</td>
                      </tr>
                      <tr>
                        <td>Software Engineer</td>
                        <td>Amazon </td>
                        <td>12/02/2023</td>
                      </tr>
                      <tr>
                        <td>Software Engineer</td>
                        <td>Amazon </td>
                        <td>12/02/2023</td>
                      </tr>
                      <tr>
                        <td>Software Engineer</td>
                        <td>Amazon </td>
                        <td>12/02/2023</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>

            <div className="post-review">
              <h6>
                <b>Past Job Reviews</b>
              </h6>
              <div className="flex">
                <Rating
                  value={4}
                  readOnly
                  cancel={false}
                  style={{ color: "#ffd559" }}
                />
                <h5>4.5 Reviews</h5>
              </div>
            </div>
            <PastJobReview />
          </div>
        </div>
      </section>
      <DeleteModal
        show={DeleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        deleteFunction={() => {
          deleteData();
        }}
      />
    </>
  );
};

export default ViewStudent;
