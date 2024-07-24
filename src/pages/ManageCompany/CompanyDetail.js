/** @format */
import { useState, React, useEffect } from "react";
// import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import userAvatar from "../../assets/images/structure/user.png";
import Portfolio from "../../assets/images/structure/portfolio.png";
import VerifiedIcon from "@mui/icons-material/Verified";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import CompanyWebsiteUrl from "../../Modals/CompanyWebsiteModel/CompanyWebsiteUrl";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import {
  capitalizeFirstLetter,
  formatDateFunction,
  getPermissionFromAll,
} from "../../common/HelperFunctions";
import { IMAGE_BASE_URL } from "../../BaseUrl";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";
import { Dialog } from "primereact/dialog";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../common/LocalVariable";
import jwtDecode from "jwt-decode";

const CompanyDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [addCompanyWebsite, setCompanyWebsiteModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [companyData, setCompanyData] = useState([]);

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);
  let manageUnicompanies = getPermissionFromAll(
    "manage unicompanies",
    accessToken
  );

  let { id } = useParams();

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
          setCompanyData(res.data);
          // console.log(companyData);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  const openModal = (image) => {
    setSelectedImage(image);
    setVisible(true);
  };

  // const closeModal = () => {
  //   setVisible(false);
  //   setSelectedImage('');
  // };
  useEffect(() => {
    getCompanyData();
  }, []);

  const handleStatusChangePlateformFee = async (item) => {
    await globalRequest(
      API_ROUTES?.CHANGEOFSTATUSOFCOMPONY + "/" + item.id,
      "put",
      { plateformFeeApplicability: item.plateformFeeApplicability },
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          getCompanyData();
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  const handleStatusChangeStudentDatabase = async (item) => {
    await globalRequest(
      API_ROUTES?.CHANGEOFSTATUSOFCOMPONY + "/" + item.id,
      "put",
      { studentDatabaseAccessibility: item.studentDatabaseAccessibility },
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          getCompanyData();
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const deleteCompanyData = async () => {
    await globalRequest(
      API_ROUTES?.DELETECOMPANYDATA + "/" + companyData.id,
      "delete",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setDeleteModalShow(false);
          getCompanyData();
          dispatch(
            setSnackbar({
              isOpen: true,
              message: res?.message,
              state: "success",
            })
          );
          navigate("/manage-company");
        } else {
          dispatch(
            setSnackbar({
              isOpen: true,
              message: res?.message,
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
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate("/manage-company");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0"> Company Detail</h4>
              <div className="tableFilterRow">
                <div className="tableFilterCol" style={{ width: "auto" }}>
                  {/* <Button className="btn btn-outline ml-1 mr-1">
                    Update Status
                  </Button> */}
                  {manageUnicompanies.edit ? (
                    <CustomTooltip tooltipText={"Edit"}>
                      <Button
                        className="btn btn-outline ml-1 mr-1"
                        onClick={() => {
                          navigate("/edit-company/" + companyData.id);
                        }}
                      >
                        <i className="fa fa-pencil" />
                      </Button>
                    </CustomTooltip>
                  ) : null}

                  {manageUnicompanies.delete ? (
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
              <div className="lg:col-9 md:col-8 sm:col-12">
                <div className="company-profile ">
                  <div className="company-update">
                    <div className="profile-pic">
                      <label htmlFor="fileToUpload">
                        <img
                          src={
                            companyData?.user?.profile_pic &&
                            companyData?.user?.profile_pic != ""
                              ? IMAGE_BASE_URL +
                                "logo/" +
                                companyData?.user?.profile_pic
                              : userAvatar
                          }
                          alt="Avatar"
                        />
                        {/* <InputText
                          type="file"
                          name="fileToUpload"
                          id="fileToUpload"
                        /> */}
                      </label>
                    </div>
                    <div className="align-self-center ml-3">
                      <h5>
                        {capitalizeFirstLetter(
                          companyData?.company_institute_name
                        )}{" "}
                        {companyData?.status &&
                        companyData?.status !== "pending" ? (
                          <VerifiedIcon style={{ color: "green" }} />
                        ) : (
                          ""
                        )}
                      </h5>
                      <span
                        style={{
                          color:
                            companyData?.status === "active"
                              ? "green"
                              : companyData?.status === "inactive"
                              ? "red"
                              : "black",
                        }}
                      >
                        {capitalizeFirstLetter(companyData?.status)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="company-profile  mt-3">
                  <div className="company-content">
                    <h6>Company Info</h6>
                    <div className="grid m-0">
                      {companyData?.faculty_id ? (
                        <div className="lg:col-4 md:col-12 sm:col-12 ">
                          <div className="formField-view my-0">
                            <div className="formField-heading">
                              <h5>Faculty Name</h5>
                              <h6> {companyData?.faculty_name} </h6>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {companyData?.tax_id && (
                        <div className="lg:col-4 md:col-12 sm:col-12 ">
                          <div className="formField-view my-0">
                            <div className="formField-heading">
                              <h5>Tax ID</h5>
                              <h6>{companyData?.tax_id}</h6>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="lg:col-4 md:col-12 sm:col-12">
                        <div className="formField-view my-0">
                          <div className="formField-heading">
                            <h5>Contact Person Full Name</h5>
                            <h6>
                              {capitalizeFirstLetter(
                                companyData?.user?.first_name
                              )}{" "}
                              {capitalizeFirstLetter(
                                companyData?.user?.last_name
                              )}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid m-0">
                      <div className="lg:col-4 md:col-12 sm:col-12 ">
                        <div className="formField-view my-0">
                          <div className="formField-heading">
                            <h5>Contact Person Phone Number</h5>
                            <h6>{companyData?.user?.mobile}</h6>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-4 md:col-12 sm:col-12">
                        <div className="formField-view my-0">
                          <div className="formField-heading">
                            <h5>Account Created Date</h5>
                            <h6>
                              {formatDateFunction(
                                companyData?.createdAt,
                                "dd-mm-yyyy"
                              )}
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-4 md:col-12 sm:col-12">
                        <div className="formField-view my-0">
                          <div className="formField-heading">
                            <h5>Contact Person Email</h5>
                            <h6>{companyData?.user?.email}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid m-0">
                      <div className="lg:col-4 md:col-12 sm:col-12 ">
                        <div className="formField-view my-0">
                          <div className="formField-heading">
                            <h5>Strikes</h5>
                            <h6>{companyData?.user?.no_of_strikes}</h6>
                          </div>
                        </div>
                      </div>
                      {companyData?.billing_address != "" ? (
                        <div className="lg:col-4 md:col-12 sm:col-12">
                          <div className="formField-view my-0">
                            <div className="formField-heading">
                              <h5>Company Billing Address</h5>
                              <h6>{companyData?.billing_address}</h6>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    {companyData?.about != "" ? (
                      <>
                        <Divider />
                        <h6>About Company</h6>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: companyData?.about,
                          }}
                        />
                      </>
                    ) : null}

                    {companyData?.user?.access === "company" ? (
                      <>
                        <Divider />
                        <h6>Commercial Certification Document</h6>
                        <Link
                          className="m-0"
                          style={{ textDecoration: "underline" }}
                          to={
                            IMAGE_BASE_URL +
                            "commercial_document/" +
                            companyData.commercial_document
                          }
                          target="_blank"
                        >
                          {companyData.commercial_document_display_name}
                        </Link>
                      </>
                    ) : null}

                    <Divider />
                    <h6>Platform fee applicability</h6>
                    <div className="grid m-0">
                      <div className="lg:col-6 md:col-6 sm:col-12 p-0">
                        <div className="formField-view">
                          <div className="formField-heading flex align-items-center gap-3">
                            <h5 className="mb-0">Platform Fee</h5>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              checked={companyData?.plateformFeeApplicability}
                              onChange={() => {
                                handleStatusChangePlateformFee(companyData);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Divider />
                    <h6>Student Database Accessibility</h6>
                    <div className="grid m-0">
                      <div className="lg:col-6 md:col-6 sm:col-12 p-0">
                        <div className="formField-view">
                          <div className="formField-heading flex align-items-center gap-3">
                            <h5 className="mb-0">Student Database</h5>
                            <Form.Check
                              type="switch"
                              id="custom-switch1"
                              checked={
                                companyData?.studentDatabaseAccessibility
                              }
                              onChange={() => {
                                handleStatusChangeStudentDatabase(companyData);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <Divider />
                    <h6>Affiliate Posting</h6>
                    <div className="grid m-0">
                      <div className="lg:col-6 md:col-6 sm:col-12 p-0">
                        <div className="formField-view my-0">
                          <div className="formField-heading">
                            <h5>Online Discounts</h5>
                            <h5>
                              Commission - <span> €15</span>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-6 md:col-6 sm:col-12 text-right">
                        <Form.Check type="switch" />
                      </div>
                    </div>
                    <div className="grid m-0">
                      <div className="lg:col-6 md:col-6 sm:col-12 p-0 align-self-center">
                        <div className="formField-view my-0">
                          <div className="formField-heading">
                            <h6>Website URL</h6>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-6 md:col-6 sm:col-12 text-right">
                        <button
                          className="btn btn-outline"
                          onClick={() => setCompanyWebsiteModal(true)}
                        >
                          Add Website Url
                        </button>
                      </div>
                    </div>
                    <div className="grid m-0">
                      <div className="lg:col-6 md:col-6 sm:col-12 p-0">
                        <div className="formField-view my-0">
                          <div className="formField-heading">
                            <h6>www.abc.com</h6>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-6 md:col-6 sm:col-12 text-right">
                        <CustomTooltip tooltipText={"Edit"}>
                          <i
                            className="fa fa-pencil mr-3"
                            onClick={() => {
                              navigate("");
                            }}
                          />
                        </CustomTooltip>
                        <CustomTooltip tooltipText={"Delete"}>
                          <i
                            className="fa fa-trash"
                            onClick={() => setDeleteModalShow(true)}
                          />
                        </CustomTooltip>
                      </div>
                    </div>
                    <div className="grid m-0">
                      <div className="lg:col-6 md:col-6 sm:col-12 p-0">
                        <div className="formField-view my-0">
                          <div className="formField-heading">
                            <h6>www.abc.com </h6>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-6 md:col-6 sm:col-12 text-right">
                        <CustomTooltip tooltipText={"Edit"}>
                          <i
                            className="fa fa-pencil mr-3"
                            onClick={() => {
                              navigate("");
                            }}
                          />
                        </CustomTooltip>
                        <CustomTooltip tooltipText={"Delete"}>
                          <i
                            className="fa fa-trash"
                            onClick={() => setDeleteModalShow(true)}
                          />
                        </CustomTooltip>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="lg:col-3 md:col-8 sm:col-12">
                <div className="company-profile">
                  <div className="">
                    <h6>
                      <b>Posted Jobs</b>
                    </h6>
                    <Link
                      to={"/job-management?companyId=" + companyData.id}
                      className="m-0"
                      style={{ textDecoration: "underline" }}
                    >
                      Please refer to Job Management
                    </Link>
                  </div>
                  <div className="mt-3 ">
                    <h6>
                      <b>Employees</b>
                    </h6>
                    <Link
                      to={"/employees-list/" + companyData.id}
                      className="m-0"
                      style={{ textDecoration: "underline" }}
                    >
                      View employees
                    </Link>
                  </div>
                  <div className="mt-3">
                    <h6>
                      <b>Posted Affiliates</b>
                    </h6>
                    <Link
                      className="m-0"
                      style={{ textDecoration: "underline" }}
                    >
                      view all affiliates posted
                    </Link>
                  </div>
                  <div className="mt-3 ">
                    <h6>
                      <b>Transaction history</b>
                    </h6>
                    <Link
                      to="/transaction-history"
                      className="m-0"
                      style={{ textDecoration: "underline" }}
                    >
                      View history
                    </Link>
                  </div>
                  <div className="mt-3 ">
                    <h6>
                      <b>Strike count</b>
                    </h6>
                    <Link
                      to={`/company-strike-log/`+companyData.id}
                      className="m-0"
                      style={{ textDecoration: "underline" }}
                    >
                      View strike logs
                    </Link>
                  </div>
                </div>
                {companyData?.user?.portfolio_images != "" ? (
                  <div className="company-profile  mt-3">
                    <div className="">
                      <h6>
                        <b>Portfolio</b>
                      </h6>
                    </div>
                    <div className="mt-3 ">
                      <div className="company-portfolioIMG grid m-0">
                        {companyData?.user?.portfolio_images.map(
                          (item, index) => {
                            return (
                              <div className="lg:col-6" key={index}>
                                <img
                                  src={
                                    item.image_url === ""
                                      ? Portfolio
                                      : IMAGE_BASE_URL +
                                        "portfolio_image/" +
                                        item.image_url
                                  }
                                  alt="Portfolio Name"
                                  onClick={() =>
                                    openModal(
                                      IMAGE_BASE_URL +
                                        "portfolio_image/" +
                                        item.image_url
                                    )
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeleteModal
        show={DeleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        deleteFunction={() => {
          deleteCompanyData();
        }}
      />
      <CompanyWebsiteUrl
        show={addCompanyWebsite}
        onHide={() => setCompanyWebsiteModal(false)}
      />
      <Dialog
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        {/* <a onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px' }}><i className="pi 
pi-times-circle" /></a> */}
        <img
          src={selectedImage}
          alt="Full View"
          style={{
            width: "100%",
            maxHeight: "70vh",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </Dialog>
    </>
  );
};

export default CompanyDetail;
