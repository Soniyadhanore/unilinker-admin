/* eslint-disable react/prop-types */
import { useState, React } from "react";
import AddDegree from "../../Modals/DegreeModal/AddDegreeModal";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import EditFaculty from "../../Modals/FacultyModal/EditFaculty";
import AddAreaOfStudy from "../../Modals/AreaOfStudyModel/AddAreaOfStudy";
import EditAreaOfStudy from "../../Modals/AreaOfStudyModel/EditAreaOfStudy";
import AddFaculty from "../../Modals/FacultyModal/AddFaculty";
// import EditDegree from "../../Modals/DegreeModal/EditDegreeModal";
import { Calendar } from "primereact/calendar";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import Filter from "../Filter/Filter";
import { Table } from "react-bootstrap";
import Loaders from "../../Loaders";

const AffiliateCommissionTableComponent = () => {
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [addFacultyModal, setAddFacultyModal] = useState(false);
  const [editFacultyModal, setEditFacultyModal] = useState(false);
  const [addAreaOfStudyModal, setAddAreaOfStudyModal] = useState(false);
  const [editAreaOfStudyModal, setEditAreaOfStudyModal] = useState(false);
  const [addDegreeModal, setAddDegreeModal] = useState(false);
  // const [editDegreeModal, setEditDegreeModal] = useState(false);
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
            <i
              className="pi pi-filter-fill mr-2 mt-1"
              onClick={toggleFilter}
              aria-controls="popup_menu_right"
              aria-haspopup
            />
          </div>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th style={{ width: "300px" }}>{"Affiliate"}</th>
              <th style={{ width: "300px" }}>{"Affiliate Type"}</th>
              <th style={{ width: "300px" }}>{"Company"}</th>
              <th style={{ width: "300px" }}>{"Commission Amount"}</th>
              <th style={{ width: "300px" }}>{"Transaction ID"}</th>
              <th style={{ width: "300px" }}>{"Transaction Date"}</th>
              <th style={{ width: "300px", textAlign: "center" }}>
                {"Action"}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7">
                <Loaders /> {/* Replace with your actual Loader component */}
              </td>
            </tr>
            <tr>
              <td>{"Affiliate title"}</td>
              <td>{"Online"}</td>
              <td>{"ABC company"}</td>
              <td>{"Euro 20"}</td>
              <td>{"12345"}</td>
              <td>{"01/02/2024"}</td>
              <td className="text-center">
                <CustomTooltip tooltipText={"Download"}>
                  <i className="fa fa-download" />
                </CustomTooltip>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <DeleteModal
        show={DeleteModalShow}
        onHide={() => setDeleteModalShow(false)}
      />
      <AddFaculty
        show={addFacultyModal}
        onHide={() => setAddFacultyModal(false)}
      />
      <EditFaculty
        show={editFacultyModal}
        onHide={() => setEditFacultyModal(false)}
      />
      <AddAreaOfStudy
        show={addAreaOfStudyModal}
        onHide={() => setAddAreaOfStudyModal(false)}
      />
      <EditAreaOfStudy
        show={editAreaOfStudyModal}
        onHide={() => setEditAreaOfStudyModal(false)}
      />
      <AddDegree
        show={addDegreeModal}
        onHide={() => setAddDegreeModal(false)}
      />
      {/* <EditDegree
      show={editDegreeModal}
      onHide={() => setEditDegreeModal(false)}
    /> */}
      <Filter open={filterOpen} onClose={toggleFilter} />
    </>
  );
};

export default AffiliateCommissionTableComponent;
