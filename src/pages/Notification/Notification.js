/** @format */
// import "../SubAdmin/SubAdmin.scss";
import { React, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Divider } from "primereact/divider";
// import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import SendNewNotification from "../../Modals/SendNewNotification/SendNewNotificaton";
import Loaders from "../../Loaders";

const Notification = () => {
  const toast = useRef(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [sendNewNotificationModal, setSendNewNotificationModal] = useState(false);
  useEffect(() => {
    setFirst(1);
    setRows(0);
  }, []);

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader p-4">
            <div className="tableHeader">
              <h4 className="h4 mb-0">Notification</h4>
              <Button className="btn btn-orange ml-auto" onClick={() => setSendNewNotificationModal(true)}>
                Send New
              </Button>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent">
            <div className="tableContent">
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      Message <ImportExportIcon />
                    </th>
                    <th>
                      User type <ImportExportIcon />
                    </th>
                    <th>
                      Sent Date <ImportExportIcon />
                    </th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td colSpan="3">
                        <Loaders />{" "}
                        {/* Replace with your actual Loader component */}
                      </td>
                    </tr>
                  <tr>
                    <td>Neque porro quisquam est qui dolorem....</td>
                    <td>Company</td>
                    <td>13/02/2024</td>
                  </tr>
                  <tr>
                    <td>Neque porro quisquam est qui dolorem....</td>
                    <td>Student</td>
                    <td>13/02/2024</td>
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
          </div>
        </div>
      </section>
      <Toast ref={toast} />
      <SendNewNotification
        show={sendNewNotificationModal}
        onHide={() => setSendNewNotificationModal(false)}
      />
    </>
  );
};

export default Notification;
