/** @format */
import { useState, React } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import JobPaymentsTableComponent from "./JobPaymentsTableComponent";
import JobFeeTableComponent from "./JobFeeTableComponent";
import AffiliateCommissionTableComponent from "./AffiliateCommissionTableComponent";
import { Divider } from "primereact/divider";

const Payments = () => {
  // const [editDegreeModal, setEditDegreeModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader p-4">
            <div className="tableHeader">
              <h4 className="h4 mb-0">Payments</h4>
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
              <TabPanel header="Student payment">
                <JobPaymentsTableComponent />
              </TabPanel>
              <TabPanel header="Job Charges">
                <JobFeeTableComponent />
              </TabPanel>
              <TabPanel header="Affiliate Commission">
                <AffiliateCommissionTableComponent />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payments;
