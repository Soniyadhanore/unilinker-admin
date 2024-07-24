/** @format */
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef, useState, React, useEffect } from "react";
import { Paginator } from "primereact/paginator";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { TabPanel, TabView } from "primereact/tabview";
import Loaders from "../../Loaders";
const TransactionHistory = () => {
  const navigate = useNavigate();

  const toast = useRef(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  useEffect(()=>{
    setFirst(1);
    setRows(0);
  },[])

  // const showSuccess = () => {
  //   toast.current.show({
  //     severity: "success",
  //     summary: "Success",
  //     detail: "Message Content",
  //     life: 3000,
  //   });
  // };

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
              <h4 className="h4 mb-0"> Transaction history</h4>
              <div className="tableFilterRow ml-auto">
                <div className="tableSearchCol my-0">
                  <div className="p-inputgroup searchFilter">
                    <span className="p-input-icon-left w-full small-input">
                      <i className="pi pi-search" />
                      <InputText placeholder="Search" className="w-full" />
                    </span>
                  </div>
                </div>
                <div className="tableFilterCol" style={{ width: "auto" }}>
                  <Button className="btn btn-orange">
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent">
            <TabView className="vertical-tabview">
              <TabPanel header="Job Charges">
                <div className="tableContent px-5">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>
                          Transaction ID <ImportExportIcon />
                        </th>
                        <th>
                          Transaction Date <ImportExportIcon />
                        </th>
                        <th>
                          Job ID <ImportExportIcon />
                        </th>
                        <th>
                          Amount <ImportExportIcon />
                        </th>
                        <th>
                          Status <ImportExportIcon />
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td colSpan="6">
                        <Loaders />{" "}
                        {/* Replace with your actual Loader component */}
                      </td>
                    </tr>
                      <tr>
                        <td>1234</td>
                        <td>02/02/2024 </td>
                        <td>01</td>
                        <td>100</td>
                        <td>
                          <span className="status-btn pending">
                            Invitation pending
                          </span>
                        </td>
                        <td>
                          <i className="fa fa-download" />
                        </td>
                      </tr>
                      <tr>
                        <td>1234</td>
                        <td>02/02/2024 </td>
                        <td>01</td>
                        <td>100</td>
                        <td>
                          <span className="status-btn pending">
                            Invitation pending
                          </span>
                        </td>
                        <td>
                          <i className="fa fa-download" />
                        </td>
                      </tr>
                      <tr>
                        <td>1234</td>
                        <td>02/02/2024 </td>
                        <td>01</td>
                        <td>100</td>
                        <td>
                          <span className="status-btn pending">
                            Invitation pending
                          </span>
                        </td>
                        <td>
                          <i className="fa fa-download" />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className="Pagination-content mb-3">
                    <Paginator
                      first={first}
                      rows={rows}
                      totalRecords={25}
                      className="mt-2"
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Student Payment"></TabPanel>
              <TabPanel header="Affiliate Commission"></TabPanel>
            </TabView>
          </div>
        </div>
      </section>
      <Toast ref={toast} />
    </>
  );
};

export default TransactionHistory;
