/** @format */
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef, useState,React } from "react";
import { Button } from "primereact/button";
import RejectStudentUnionModal from "../../Modals/RejectStudentUnionModal/RejectStudentUnionModal";
import { Divider } from "primereact/divider";

const AcademicInstitutionsView = () => {
  const navigate = useNavigate();

  const toast = useRef(null);
  const [rejectStudentUnionModal, setRejectStudentUnionModal] = useState(false);

  return (
    <>
      <section className="admin-content-wrapper ">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate("/academic-institutions");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0">View Academic Institutions</h4>
              <div className="tableFilterRow">
                <div className="tableFilterCol" style={{ width: "auto" }}>
                  <Button className="btn btn-lightPink ml-1 mr-1">
                    Rejected
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent">
          <div className="create-form">
              <div className="grid">
                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Faculty name </h5>
                    </div>
                    <div className="formField-details">
                      <h6>Instituto Universitário de Lisboa</h6>
                    </div>
                  </div>
                  </div>
                  <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Academic institutions name </h5>
                    </div>
                    <div className="formField-details">
                      <h6>Instituto Universitário de Lisboa</h6>
                    </div>
                  </div>
                  </div>
                  <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Contact Person Full Name</h5>
                    </div>
                    <div className="formField-details">
                      <h6>Bella James</h6>
                    </div>
                  </div>
                  </div>
                  <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Contact person Email</h5>
                    </div>
                    <div className="formField-details">
                      <h6>bella123@gmail.com</h6>
                    </div>
                  </div>
                  </div>
                  <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Contact Person Phone number</h5>
                    </div>
                    <div className="formField-details">
                      <h6>+91 9874563210</h6>
                    </div>
                  </div>
                  </div>

                  <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Account created on</h5>
                    </div>
                    <div className="formField-details">
                      <h6>22-01-2024</h6>
                    </div>
                  </div>
                </div>
                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Tax ID </h5>
                    </div>
                    <div className="formField-details">
                      <h6>2589633</h6>
                    </div>
                  </div>
                </div>
                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Company billing address </h5>
                    </div>
                    <div className="formField-details">
                      <h6>Contrary to popular belief, Lorem Ipsum is not simply random text</h6>
                    </div>
                  </div>
                </div>
                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Account created on</h5>
                    </div>
                    <div className="formField-details">
                      <h6>22-01-2024</h6>
                    </div>
                  </div>
                </div>
                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Rejected date</h5>
                    </div>
                    <div className="formField-details">
                      <h6>01-02-2024</h6>
                    </div>
                  </div>
                </div>
                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Platform Fee </h5>
                    </div>
                    <div className="formField-details">
                      <h6>Enable</h6>
                    </div>
                  </div>
                </div>
               
                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Post affiliate </h5>
                    </div>
                    <div className="formField-details">
                      <h6>Enable</h6>
                    </div>
                  </div>
                </div>
                <div className="lg:col-6 md:col-6 sm:col-12">
                  <div className="formField-view">
                    <div className="formField-heading">
                      <h5>Rejected Reason </h5>
                    </div>
                    <div className="formField-details">
                      <h6>Lorem ipsum is placeholder text commonly</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toast ref={toast} />
      <RejectStudentUnionModal
        show={rejectStudentUnionModal}
        onHide={() => setRejectStudentUnionModal(false)}
      />
    </>
  );
};

export default AcademicInstitutionsView;
