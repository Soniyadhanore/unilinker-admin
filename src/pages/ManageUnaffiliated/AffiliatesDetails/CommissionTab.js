/** @format */
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, React, useEffect } from "react";
import { Paginator } from "primereact/paginator";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Loaders from "../../../Loaders";

const CommissionTab = () => {
  const navigate = useNavigate();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  useEffect(() => {
    setFirst(1);
    setRows(0);
  }, []);
  return (
    <>
      <div className="tableContent">
        <Table responsive>
          <thead>
            <tr>
              <th>
                Student
                <ImportExportIcon />
              </th>
              <th>
                Faculty <ImportExportIcon />
              </th>
              <th>
                Used Date <ImportExportIcon />
              </th>
              <th>
                Commission Amount <ImportExportIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4">
                <Loaders /> {/* Replace with your actual Loader component */}
              </td>
            </tr>
            <tr>
              <td
                onClick={() => {
                  navigate("/academic-institutions-details");
                }}
              >
                Erick D
              </td>
              <td>University of Lisbon</td>
              <td>01/02/2023</td>
              <td>15 euro</td>
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
    </>
  );
};

export default CommissionTab;
