/** @format */
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef, useState, React, useEffect } from "react";
import { Button } from "primereact/button";
import RejectStudentUnionModal from "../../Modals/RejectStudentUnionModal/RejectStudentUnionModal";
import { Divider } from "primereact/divider";
import { API_ROUTES } from "../../common/Enum";
import globalRequest from "../../prototype/globalRequest";
import { formatDateFunction, getPermissionFromAll } from "../../common/HelperFunctions";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../common/LocalVariable";
import jwtDecode from "jwt-decode";

const AcademicInstitutionsDetail = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [rejectStudentUnionModal, setRejectStudentUnionModal] = useState(false);

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);
  let AcademicRequests = getPermissionFromAll("academic requests", accessToken);

  let { id } = useParams();
  const [itemData, setItemData] = useState([]);

  const getSpecificData = async () => {
    await globalRequest(
      API_ROUTES?.GETSPECIFICCOMPANY + "/" + id,
      "get",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setItemData(res.data);
          console.log(itemData);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    getSpecificData();
  }, []);

  const handleStatusChange = async (status, item) => {
    await globalRequest(
      API_ROUTES?.UPDATESTATUSOFCOMPANYDATA(item?.addedBy),
      "put",
      { status: status },
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          getSpecificData();
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
                  navigate("/academic-institutions");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0">Academic Institutions Details</h4>
              <div className="tableFilterRow">
                <div className="tableFilterCol" style={{ width: "auto" }}>
                  {itemData.status === "pending" && (
                    <>
                      {
                        AcademicRequests.approve ? (
                          <Button
                        className="btn btn-green mr-1"
                        onClick={() => {
                          handleStatusChange("active", itemData);
                        }}
                      >
                        Accept
                      </Button>
                        ) : null
                      }
                      {
                        AcademicRequests.reject ? (
                          <Button
                        className="btn btn-red ml-1 mr-1"
                        onClick={() => {
                          setRejectStudentUnionModal(true);
                        }}
                      >
                        Reject
                      </Button>
                        ) : null 
                      }
                    </>
                  )}
                  {/* {itemData && itemData?.status === "rejected" ?  */}
                  { (itemData && itemData?.status !== "rejected") ? (                    
                      AcademicRequests.edit ? (
                        <Button className="btn btn-outline ml-1 " onClick={() => {
                          navigate("/edit-company/" + itemData.id);
                        }}>
                          <i className="fa fa-pencil" />
                        </Button>
                      ) : null                     
                  ) : null }
                </div>
              </div>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent">
            <div className="create-form">
              <div className="grid">
              {
                  (itemData?.type && itemData?.type==='institution') ? (
                    <>
                    <div className="lg:col-6 md:col-6 sm:col-12">
                      <div className="formField-view">
                        <div className="formField-heading">
                          <h5>Faculty name </h5>
                        </div>
                        <div className="formField-details">
                          <h6>{itemData?.facultyNameStr}</h6>
                        </div>
                      </div>
                    </div>
                    </>
                  ) : null
              }            
              {
                (itemData?.facultyNameStr==='Other' && itemData?.faculty_name!=='') ? 
                <>
                    <div className="lg:col-6 md:col-6 sm:col-12">
                      <div className="formField-view">
                        <div className="formField-heading">
                          <h5>Other Faculty name </h5>
                        </div>
                        <div className="formField-details">
                          <h6>{itemData?.faculty_name}</h6>
                        </div>
                      </div>
                    </div>
                    </> : null
              }    
                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Academic institutions name </h5>
                    </div>
                    <div className="formField-details">
                      <h6>{itemData?.company_institute_name}</h6>
                    </div>
                  </div>
                </div>
                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Contact Person Full Name</h5>
                    </div>
                    <div className="formField-details">
                      <h6>
                        {itemData?.user?.first_name} {itemData?.user?.last_name}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Contact person Email</h5>
                    </div>
                    <div className="formField-details">
                      <h6>{itemData?.user?.email}</h6>
                    </div>
                  </div>
                </div>
                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Contact Person Phone number</h5>
                    </div>
                    <div className="formField-details">
                      <h6>{itemData?.user?.mobile}</h6>
                    </div>
                  </div>
                </div>

                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Account created on</h5>
                    </div>
                    <div className="formField-details">
                      <h6>{ itemData?.createdAt ? formatDateFunction(itemData?.createdAt) : null}</h6>
                    </div>
                  </div>
                </div>
                {
                  (itemData?.type && itemData?.type!=='institution') ? (
                    <>
                    <div className="lg:col-6 md:col-6 sm:col-12">
                      <div className="formField-view">
                        <div className="formField-heading">
                          <h5>Tax ID </h5>
                        </div>
                        <div className="formField-details">
                          <h6>{itemData?.tax_id}</h6>
                        </div>
                      </div>
                    </div>
                    </>
                  ): ''
                }

                {itemData && itemData?.status !== "rejected" ? (
                  <>
                  <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Company billing address </h5>
                    </div>
                    <div className="formField-details">
                      <h6></h6>
                    </div>
                  </div>
                </div>
                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5> </h5>
                    </div>
                    <div className="formField-details">
                      <h6></h6>
                    </div>
                  </div>
                </div>

                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Platform Fee </h5>
                    </div>
                    <div className="formField-details">
                      <h6></h6>
                      {/* Enable */}
                    </div>
                  </div>
                </div>
                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Post affiliate </h5>
                    </div>
                    <div className="formField-details">
                      <h6></h6>
                    </div>
                  </div>
                </div>
                  </>
                ) :null }                
                {itemData && itemData?.status === "rejected" ? (
                  <>
                    <div className="lg:col-6 md:col-6 sm:col-12">
                      <div className="formField-view">
                        <div className="formField-heading">
                          <h5>Rejected date</h5>
                        </div>
                        <div className="formField-details">
                          <h6>{formatDateFunction(itemData?.createdAt)}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-6 md:col-6 sm:col-12">
                      <div className="formField-view">
                        <div className="formField-heading">
                          <h5>Rejected Reason </h5>
                        </div>
                        <div className="formField-details">
                          <h6>{itemData?.reasonOfReject}</h6>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toast ref={toast} />
      <RejectStudentUnionModal
        show={rejectStudentUnionModal}
        onHide={() => {
          setRejectStudentUnionModal(false);
          getSpecificData();
        }}
        item={itemData}
      />
    </>
  );
};

export default AcademicInstitutionsDetail;
