/** @format */
import { useState,React } from "react";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../Modals/DeleteModal/DeleteModal";
import InformationTab from "./InformationTab";
import CommissionTab from "./CommissionTab";
import EffectivenessGraphComponent from "../../../Modals/EffectivenessGraphComponent/EffectivenessGraphComponent";
import CustomTooltip from "../../../Styles-Elements/CustomTooltip/CustomTooltip";
import { Toast } from "primereact/toast";
import { useRef} from "react";

const AffiliatesDetails = () => {
  const navigate = useNavigate();
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const toast = useRef(null);


  const showMarkExpired = () => {
    toast.current.show({
      severity: "success",
      summary: "Mark Us Expired",
      life: 3000,
    });
  };

  
  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader pb-2">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate("/manage-unaffiliated");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0">Affiliates Details</h4>
              <div className="tableFilterRow">
                <div className="tableFilterCol" style={{ width: "auto" }}>
                  <Button className="btn btn-outline ml-1 mr-1">Rejected</Button>
                  <Button className="btn btn-outline ml-1 mr-1">Approved</Button>
                  <Button className="btn btn-outline ml-1 mr-1" onClick={showMarkExpired}>
                    Mark Us Expire
                  </Button>
                  <Button className="btn btn-outline ml-1">
                    Update Status
                  </Button>
                  <CustomTooltip tooltipText={"Edit"}>
                    <Button className="btn btn-outline ml-1" onClick={() => {
                          navigate("/affiliates-edit");
                        }}>
                      <i
                        className="fa fa-pencil"
                        
                      />
                    </Button>
                  </CustomTooltip>
                  <CustomTooltip tooltipText={"Delete"}>
                    <Button className="btn btn-outline ml-1" onClick={() => setDeleteModalShow(true)}>
                      <i
                        className="fa fa-trash"                        
                      />
                    </Button>
                  </CustomTooltip>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid adminTableContent">
            <TabView
              activeIndex={tabIndex}
              onTabChange={(e) => {
                setTabIndex(e.index);
              }}
            >
              <TabPanel header="Effectiveness">
                <EffectivenessGraphComponent />
              </TabPanel>
              <TabPanel header="Information">
                <InformationTab />
              </TabPanel>
              <TabPanel header="Commission">
                <CommissionTab />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
      <DeleteModal
        show={DeleteModalShow}
        onHide={() => setDeleteModalShow(false)}
      />
      <Toast ref={toast} />
    </>
  );
};

export default AffiliatesDetails;
