/** @format */
import { useState, React, useEffect } from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate, useParams } from "react-router-dom";
import DeleteModal from "../../../Modals/DeleteModal/DeleteModal";
import { TabPanel, TabView } from "primereact/tabview";
import JobRequestInformation from "./JobRequestInformation";
import JobRequestApplication from "./JobRequestApplication";
import JobRequestEffectiveness from "./JobRequestEffectiveness";
import JobRequestHired from "./JobRequestHired";
import CustomTooltip from "../../../Styles-Elements/CustomTooltip/CustomTooltip";
import RejectJobRequestModal from "../../../Modals/RejectJobRequestModal/RejectJobRequestModal";
import { API_ROUTES } from "../../../common/Enum";
import globalRequest from "../../../prototype/globalRequest";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbar";
import addDeleteGetLocalStorage from "../../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../../common/LocalVariable";
import jwtDecode from "jwt-decode";
import { getPermissionFromAll } from "../../../common/HelperFunctions";

const JobDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [rejectJobRequestModal, setRejectJobRequestModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  // const setEditFacultyModal = async () => {};

  const [jobData, setJobData] = useState(false);
  const [itemData, setItemData] = useState([]);

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);
  let jobRequests = getPermissionFromAll("job requests", accessToken);
  let jobManagement = getPermissionFromAll("job management", accessToken);

  let { id } = useParams();

  const getJobData = async () => {
    await globalRequest(
      API_ROUTES?.GETSPECIFICJOB + "/" + id,
      "get",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setJobData(res.data);
          console.log(jobData);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    getJobData();
  }, []);

  const showAccept = async (item) => {

    let data = {
      status: "confirmed",
    };
    await globalRequest(
      API_ROUTES?.UPDATEJOBSTATUS+'/'+item?.id,
      "put",
      data,
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          getJobData();
          dispatch(
            setSnackbar({
              isOpen: true,
              message: "Job successfully approved.",
              state: "success",
            })
          );
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const deleteData = async () => {
    await globalRequest(
      API_ROUTES?.DELETEJOB + "/" + jobData.id,
      "delete",
      {},
      {},
      true
    )
      .then((res) => {
        setDeleteModalShow(false);
        if (res.ack === 1) {          
          dispatch(
            setSnackbar({
              isOpen: true,
              message: res?.message,
              state: "success",
            })   
          );
          navigate(-1);
        }
        else {
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
                  navigate(-1);
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />

              <h4 className="h4 mb-0"> Job ID : { jobData.slug }</h4>

              {jobData.status === "rejected" && (
                <Button className="btn btn-lightPink ml-3">Rejected</Button>
              )}

              <div className="tableFilterRow">
                <div className="tableFilterCol" style={{ width: "auto" }}>
                  {jobData.status === "pending" && (
                    <>
                    {
                      jobRequests.approve ? (
                        <Button className="btn btn-orange ml-1 mr-1" onClick={ ()=>{ showAccept(jobData) } }>
                          Accept
                        </Button>
                      ) : null
                    }
                    {
                      jobRequests.reject ? (
                        <Button
                          className="btn btn-outline ml-1 mr-1"
                          onClick={() => {
                            setRejectJobRequestModal(true), 
                            setItemData(jobData);
                          }}
                        >
                          Reject
                        </Button>
                      ) : null
                    }
                    </>
                  )}
                  {
                    jobManagement.create ? (
                      <CustomTooltip tooltipText={"Copy"}>
                        <Button className="btn btn-outline ml-1 mr-1">
                          <i
                            className="fa fa-copy"
                            onClick={() => {
                              localStorage.setItem("jobId", id);
                              navigate("/create-job");
                            }}
                          />
                        </Button>
                      </CustomTooltip>
                    ) : null
                  }

                  {
                    jobRequests.delete ? (
                      <CustomTooltip tooltipText={"Delete"}>
                    <Button className="btn btn-outline ml-1 mr-1">
                      <i
                        className="fa fa-trash"
                        onClick={() => {setDeleteModalShow(true),setItemData(jobData)}}
                      />
                    </Button>
                  </CustomTooltip>
                    ) : null 
                  }                                    
                  
                </div>
              </div>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent">
            <TabView
              activeIndex={tabIndex}
              onTabChange={(e) => {
                setTabIndex(e.index);
              }}
            >
              <TabPanel header="Information">
                <JobRequestInformation jobData={jobData} />
              </TabPanel>
              <TabPanel header="Applications">
                <JobRequestApplication jobData={jobData} />
              </TabPanel>
              <TabPanel header="Effectiveness">
                <JobRequestEffectiveness />
              </TabPanel>
              <TabPanel header="Hired"  >
                <JobRequestHired jobData={jobData} />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
      <DeleteModal
        show={DeleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        deleteFunction={() => {
          //call here
          deleteData();
        }}
      />
      <RejectJobRequestModal
        show={rejectJobRequestModal}
        onHide={() => setRejectJobRequestModal(false)}
        callApi={() => {getJobData()}}
        item={itemData}
      />
    </>
  );
};

export default JobDetail;
