/** @format */
import { useState,React } from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../Modals/DeleteModal/DeleteModal";
import { TabPanel, TabView } from "primereact/tabview";
import EffectivenessGraphComponent from "../../../Modals/EffectivenessGraphComponent/EffectivenessGraphComponent";
import JobInformation from "./JobInformationTab";
import JobApplication from "./JobApplications";
import JobHiredWorkers from "./JobHiredWorkers";
import JobPaymentLogs from "./JobPaymentLogs";
import CustomTooltip from "../../../Styles-Elements/CustomTooltip/CustomTooltip";

const JobManagementDetail = () => {
  const navigate = useNavigate();
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate("/job-management");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0"> Job ID</h4>
              {/* <Button className="status-btn success ml-3">
                Confirmed{" "}
              </Button>{" "}
              <span className="ml-2">01/01/2024</span> */}
              <div className="tableFilterRow">
                <div className="tableFilterCol" style={{ width: "auto" }}>
                  <Button className="btn btn-outline ml-1 mr-1">
                    Mark job as expired
                  </Button>
                  <CustomTooltip tooltipText={"Copy"}>
                    <Button className="btn btn-outline ml-1 mr-1">
                      <i
                        className="fa fa-copy"
                        onClick={() => {
                          navigate("");
                        }}
                      />
                    </Button>
                  </CustomTooltip>
                  <CustomTooltip tooltipText={"Edit"}>
                  <Button className="btn btn-outline ml-1 mr-1">
                    <i className="fa fa-pencil" />
                  </Button>
                  </CustomTooltip>
                  <CustomTooltip tooltipText={"Delete"}>
                  <Button className="btn btn-outline ml-1 mr-1" onClick={() => setDeleteModalShow(true)}>
                    <i
                      className="fa fa-trash"
                      
                    />
                  </Button>
                  </CustomTooltip>
                  <CustomTooltip tooltipText={"Reject"}>
                  <Button className="btn btn-outline ml-1 mr-1">
                    <i className="fa fa-close" />
                  </Button>
                  </CustomTooltip>
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
                <JobInformation />
              </TabPanel>
              <TabPanel header="Applications">
                <JobApplication />
              </TabPanel>
              <TabPanel header="Effectiveness">
                <EffectivenessGraphComponent />
              </TabPanel>
              <TabPanel header="Hired Workers">
                <JobHiredWorkers />
              </TabPanel>
              <TabPanel header="Payment logs">
                <JobPaymentLogs />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
      <DeleteModal
        show={DeleteModalShow}
        onHide={() => setDeleteModalShow(false)}
      />
    </>
  );
};

export default JobManagementDetail;
