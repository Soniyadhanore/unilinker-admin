import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState,useRef, useEffect } from "react";
import { Table } from "react-bootstrap";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Paginator } from "primereact/paginator";
import { Menu } from 'primereact/menu';
import { useNavigate } from "react-router-dom";
import CustomTooltip from "../../../Styles-Elements/CustomTooltip/CustomTooltip";
import Loaders from "../../../Loaders";

export default function JobApplication() {
  const navigate = useNavigate();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const menuRight = useRef(null);
  useEffect(()=>{
    setFirst(1);
    setRows(0);
  },[])
  const items = [
    { label: 'option1'},
    { label: 'option2'},
    { label: 'option3'},
  ];
  return (
    <>
      <div className="container-fluid adminTableContent">
        <div className="tableHeader">
          <div className="tableFilterRow ml-auto pb-4 pr-4">
            <div className="tableSearchCol">
              <div className="p-inputgroup searchFilter">
                <span className="p-input-icon-left w-full small-input">
                  <i className="pi pi-search" />
                  <InputText placeholder="Search" className="w-full" />
                </span>
              </div>
            </div>
            <div className="tableSearchCol ml-1">
              <div className="tableFilterRow ml-auto">
                <div className="FilterCol" style={{ width: "auto" }}>
                <Menu model={items} popup ref={menuRight} id="popup_menu_right" />
                    <Button className="btn btn-light" onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu_right" aria-haspopup >
                    <i className="pi pi-filter mr-2"></i> Filter 
                    </Button>
                </div>
              </div>
            </div>
            <div className="tableFilterCol ml-1" style={{ width: "auto" }}>
              <Button
                className="btn btn-orange"
                onClick={() => {
                  navigate("");
                }}
              >
                <i className="pi pi-eye mr-2"></i> View shortlisted students
              </Button>
            </div>
          </div>
        </div>
        <div className="tableContent">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  Student <ImportExportIcon />
                </th>
                <th>
                  Email Address <ImportExportIcon />
                </th>
                <th>
                  Applied Date/time <ImportExportIcon />
                </th>
                <th>
                  Shift <ImportExportIcon />
                </th>
                <th>
                  Applicant type <ImportExportIcon />
                </th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7">
                  <Loaders />{" "}
                  {/* Replace with your actual Loader component */}
                </td>
              </tr>
              <tr>
                <td
                  onClick={() => {
                    navigate("/student-profile");
                  }}
                >
                  Sara Parker
                </td>
                <td>sara@gmail.com</td>
                <td>25/01/2024 10:00am</td>
                <td>Shift 2</td>
                <td>Public</td>
                <td>
                  <span className="btn btn-light">Rejected</span>
                </td>
                <td className="text-center">
                  <CustomTooltip tooltipText={"Download"}>
                    <i className="fa fa-download" />
                  </CustomTooltip>
                  <CustomTooltip tooltipText={"Chat"}>
                    <i className="fa fa-commenting-o" />
                  </CustomTooltip>
                  <CustomTooltip tooltipText={"Mark as Hired"}>
                    <i className="fa fa-calendar-check-o" />
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
