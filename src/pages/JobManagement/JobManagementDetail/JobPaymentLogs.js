import { Button } from "primereact/button";
import React, { useState, useRef, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Menu } from "primereact/menu";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Paginator } from "primereact/paginator";
import { Calendar } from "primereact/calendar";
import CustomTooltip from "../../../Styles-Elements/CustomTooltip/CustomTooltip";
import Loaders from "../../../Loaders";

export default function JobPaymentLogs() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  useEffect(() => {
    setFirst(1);
    setRows(0);
  }, []);
  const [date, setDate] = useState(null);
  const menuRight = useRef(null);
  const items = [
    { label: "option1" },
    { label: "option2" },
    { label: "option3" },
  ];
  return (
    <>
      <div className="container-fluid adminTableContent">
        <div className="flex justify-content-end align-items-start pr-4">
          <div className="formField">
            <span className="p-float-label small-input ml-1 mr-1">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                showIcon
              />
            </span>
          </div>
          <Menu model={items} popup ref={menuRight} id="popup_menu_right" />
          <Button
            className="btn btn-light"
            onClick={(event) => menuRight.current.toggle(event)}
            aria-controls="popup_menu_right"
            aria-haspopup
          >
            <i className="pi pi-filter mr-2"></i> Filter
          </Button>
          <button className="btn btn-outline ml-1 mr-1">Export</button>
        </div>
        <div className="tableContent">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  Transaction ID <ImportExportIcon />
                </th>
                <th>
                  Shift <ImportExportIcon />
                </th>
                <th>
                  Student <ImportExportIcon />
                </th>
                <th>
                  Amount <ImportExportIcon />
                </th>
                <th>
                  Net Payable <ImportExportIcon />
                </th>
                <th>
                  Payment Date <ImportExportIcon />
                </th>
                <th>
                  Company user <ImportExportIcon />
                </th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="9">
                  <Loaders /> {/* Replace with your actual Loader component */}
                </td>
              </tr>
              <tr>
                <td>12345</td>
                <td>shift_name</td>
                <td>Adam Smith</td>
                <td>Euro 50</td>
                <td>Euro 24</td>
                <td>01/02/2024</td>
                <td>John Smith</td>
                <td>
                  <span className="btn btn-light">Pending</span>
                </td>
                <td className="text-center">--</td>
              </tr>
              <tr>
                <td>12345</td>
                <td>shift_name</td>
                <td>Adam Smith</td>
                <td>Euro 50</td>
                <td>Euro 24</td>
                <td>01/02/2024</td>
                <td>John Smith</td>
                <td>
                  <span className="btn btn-light">Paid</span>
                </td>
                <td className="text-center">
                  <CustomTooltip tooltipText={"Download"}>
                    <i className="fa fa-download" />
                  </CustomTooltip>
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
      </div>
    </>
  );
}
