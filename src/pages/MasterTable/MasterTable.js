/** @format */
import { useState, React } from "react";//useEffect
import { TabView, TabPanel } from "primereact/tabview";

import { Divider } from "primereact/divider";
import AddDegree from "../../Modals/DegreeModal/AddDegreeModal";
import AddLocation from "../../Modals/Location/AddLocation";
import AddWorkExperience from "../../Modals/AreaWorkExperience/AddWorkExperience";
import AddLanguage from "../../Modals/Languages/AddLanguage";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import EditFaculty from "../../Modals/FacultyModal/EditFaculty";
import AddAreaOfStudy from "../../Modals/AreaOfStudyModel/AddAreaOfStudy";
import EditAreaOfStudy from "../../Modals/AreaOfStudyModel/EditAreaOfStudy";
import AddFaculty from "../../Modals/FacultyModal/AddFaculty";
import EditLocation from "../../Modals/Location/EditLocation";
import EditWorkExperience from "../../Modals/AreaWorkExperience/EditWorkExperience";
import EditLanguage from "../../Modals/Languages/EditLanguage";
import EditDegree from "../../Modals/DegreeModal/EditDegreeModal";
import AreaOfStudyTable from "./AreaOfStudyTable";
import DegreeTable from "./DegreeTable";
import LocationsTable from "./LocationsTable";
import AreaOfWorkExperienceTable from "./AreaOfWorkExperienceTable";
import LanguagesTable from "./LanguagesTable";
import FacultyTable from "./FacultyTable";
// import globalRequest from "../../prototype/globalRequest";
// import { API_ROUTES } from "../../common/Enum";

const MasterTable = () => {
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [addFacultyModal, setAddFacultyModal] = useState(false);
  const [editFacultyModal, setEditFacultyModal] = useState(false);
  const [addAreaOfStudyModal, setAddAreaOfStudyModal] = useState(false);
  const [editAreaOfStudyModal, setEditAreaOfStudyModal] = useState(false);
  const [addDegreeModal, setAddDegreeModal] = useState(false);
  const [editDegreeModal, setEditDegreeModal] = useState(false);
  const [addLocationsModal, setAddLocationsModal] = useState(false);
  const [editLocationsModal, setEditLocationsModal] = useState(false);
  const [addWorkExperienceModal, setAddWorkExperienceModal] = useState(false);
  const [editWorkExperienceModal, setEditWorkExperienceModal] = useState(false);
  const [addLanguagesModal, setAddLanguagesModal] = useState(false);
  const [editLanguagesModal, setEditLanguagesModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <h4 className="h4 mb-0">Master table</h4>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent">
            <TabView
              activeIndex={tabIndex}
              onTabChange={(e) => {
                setTabIndex(e.index);
              }}
              className="master-tabs"
            >
              <TabPanel header="Faculty">
                <FacultyTable />
              </TabPanel>
              <TabPanel header="Area of Study">                
                <AreaOfStudyTable />
              </TabPanel>
              <TabPanel header="Degree">
                <DegreeTable />
              </TabPanel>
              <TabPanel header="Locations">
                <LocationsTable />
              </TabPanel>
              <TabPanel header="Area of work experience">
                <AreaOfWorkExperienceTable />
              </TabPanel>
              <TabPanel header="Languages">
                <LanguagesTable />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
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
      <EditDegree
        show={editDegreeModal}
        onHide={() => setEditDegreeModal(false)}
      />
      <AddLocation
        show={addLocationsModal}
        onHide={() => setAddLocationsModal(false)}
      />
      <EditLocation
        show={editLocationsModal}
        onHide={() => setEditLocationsModal(false)}
      />
      <AddWorkExperience
        show={addWorkExperienceModal}
        onHide={() => setAddWorkExperienceModal(false)}
      />
      <EditWorkExperience
        show={editWorkExperienceModal}
        onHide={() => setEditWorkExperienceModal(false)}
      />
      <AddLanguage
        show={addLanguagesModal}
        onHide={() => setAddLanguagesModal(false)}
      />
      <EditLanguage
        show={editLanguagesModal}
        onHide={() => setEditLanguagesModal(false)}
      />
    </>
  );
};

export default MasterTable;
