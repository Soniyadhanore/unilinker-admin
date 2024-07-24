/* eslint-disable react/prop-types */
import { useState, React } from "react";
import { Calendar } from "primereact/calendar";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import { Table } from "react-bootstrap";
import FilterPayment from "./FilterPayment";
// import Loaders from "../../Loaders";

const JobPaymentsTableComponent = () => {
  const [date, setDate] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <>
      <div className="tableContent">
        <div className="text-right">
          <div className="flex justify-content-end align-items-start">
            <div className="formField">
              <span className="p-float-label small-input ml-1 mr-1">
                <Calendar
                  value={date}
                  onChange={(e) => setDate(e.value)}
                  showIcon
                />
              </span>
            </div>
            <button className="btn btn-outline ml-1 mr-1">Import</button>
            <button className="btn btn-outline ml-1 mr-1">Export</button>
            <button
              className="btn btn-light ml-1 mr-3 flex align-items-center"
              onClick={toggleFilter}
              aria-controls="popup_menu_right"
              aria-haspopup
            >
              <i className="pi pi-filter p-0 mx-0"></i> Filter
            </button>
          </div>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th style={{ width: "300px" }}>{"Transaction ID"}</th>
              <th style={{ width: "300px" }}>{"Company name"}</th>
              <th style={{ width: "300px" }}>{"Job name"}</th>
              <th style={{ width: "300px" }}>{"Shift name"}</th>
              <th style={{ width: "300px" }}>{"Student name "}</th>
              <th style={{ width: "300px" }}>{"Payment date"}</th>
              <th style={{ width: "300px" }}>{"Total amount"}</th>
              <th style={{ width: "300px" }}>{"Payable amount"}</th>
              <th style={{ width: "300px" }}>{"Status"}</th>
              <th style={{ textAlign: "center" }}>Receipt</th>
              <th style={{ textAlign: "center" }}>Other</th>
              <th style={{ textAlign: "center" }}>
                {"Action"}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td colSpan="11">
                <Loaders />
              </td>
            </tr> */}
            <tr>
              <td>{"12345"}</td>
              <td>{"Company XYZ"}</td>
              <td>{"Job Name XYZ"}</td>
              <td>{"Shift name123"}</td>
              <td>
                <span>{"Adam Smith"}</span>
                <p className="mb-0">adamsmith@gmail.com</p>
              </td>
              <td>{"01/02/2024"}</td>
              <td>{"Euro 50"}</td>
              <td>{"Euro 45"}</td>
              <td>
                <span className="btn btn-light">{"Pending"}</span>
              </td>
              <td className="text-center">
              <CustomTooltip tooltipText={"Download Receipt"}>
                  <i className="fa fa-download" />
                </CustomTooltip>
              </td>
              <td className="text-center">
              <CustomTooltip tooltipText={"Download Other File"}>
                  <i className="fa fa-download" />
                </CustomTooltip>
              </td>
              <td className="text-center">
                <CustomTooltip tooltipText={"View Invoice"}>
                  <i className="fa fa-eye" />
                </CustomTooltip>
              </td>
            </tr>
            <tr>
              <td>{"12345"}</td>
              <td>{"Company ABC"}</td>
              <td>{"Job Name ABC"}</td>
              <td>{"Shift name1234"}</td>
              <td>
                <span>{"Adam Smith"}</span>
                <p className="mb-0">adamsmith@gmail.com</p>
              </td>
              <td>{"01/02/2024"}</td>
              <td>{"Euro 50"}</td>
              <td>{"Euro 45"}</td>
              <td>
                <span className="btn btn-light">{"Complete"}</span>
              </td>
              <td className="text-center">
              <CustomTooltip tooltipText={"Download Receipt"}>
                  <i className="fa fa-download" />
                </CustomTooltip>
              </td>
              <td className="text-center">
              <CustomTooltip tooltipText={"Download Other File"}>
                  <i className="fa fa-download" />
                </CustomTooltip>
              </td>
              <td className="text-center">
                <CustomTooltip tooltipText={"View Invoice"}>
                  <i className="fa fa-eye" />
                </CustomTooltip>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <FilterPayment open={filterOpen} onClose={toggleFilter} />
    </>
  );
};

export default JobPaymentsTableComponent;
