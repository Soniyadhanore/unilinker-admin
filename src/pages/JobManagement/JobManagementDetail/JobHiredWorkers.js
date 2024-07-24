import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Menu } from "primereact/menu";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Paginator } from "primereact/paginator";
import CustomTooltip from "../../../Styles-Elements/CustomTooltip/CustomTooltip";
import Loaders from "../../../Loaders";

export default function JobHiredWorkers() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  useEffect(() => {
    setFirst(1);
    setRows(0);
  }, []);
  const menuRight = useRef(null);
  const items = [
    { label: "option1" },
    { label: "option2" },
    { label: "option3" },
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
                  <Menu
                    model={items}
                    popup
                    ref={menuRight}
                    id="popup_menu_right"
                  />
                  <Button
                    className="btn btn-light"
                    onClick={(event) => menuRight.current.toggle(event)}
                    aria-controls="popup_menu_right"
                    aria-haspopup
                  >
                    <i className="pi pi-filter mr-2"></i> Filter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tableContent">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  Employee Name <ImportExportIcon />
                </th>
                <th>
                  Email Address <ImportExportIcon />
                </th>
                <th>
                  Hired Date <ImportExportIcon />
                </th>
                <th>
                  Applicant Type <ImportExportIcon />
                </th>
                <th>
                  Offer <ImportExportIcon />
                </th>
                <th>
                  Schedule <ImportExportIcon />
                </th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7">
                  <Loaders /> {/* Replace with your actual Loader component */}
                </td>
              </tr>
              <tr>
                <td>Erick Gibson</td>
                <td>erickdgibson@rhyta.com</td>
                <td>25/01/2024</td>
                <td>Public</td>
                <td>Joboffer.pdf</td>
                <td>Morning, Evening Shift</td>
                <td className="text-center">
                  <CustomTooltip tooltipText={"Edit"}>
                    <i className="fa fa-pencil" />
                  </CustomTooltip>
                  <CustomTooltip tooltipText={"Delete"}>
                    <i className="fa fa-trash" />
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
