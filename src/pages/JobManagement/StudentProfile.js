/** @format */
import { React } from 'react';
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import userAvatar from "../../assets/images/structure/user.png";
import { InputText } from "primereact/inputtext";
import PastJobReview from "../StudentListing/PastJobReview";
import { Rating } from "primereact/rating";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";

const StudentProfile = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate("/job-management-id");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0"> Student Profile</h4>
              <div className="tableFilterRow">
                <div className="tableFilterCol" style={{ width: "auto" }}>
                  <CustomTooltip tooltipText={"Download CV"}>
                  <Button className="btn btn-outline ml-1 mr-1">
                    <i className="fa fa-download" 
                    />
                  </Button>
                  </CustomTooltip>

                  <CustomTooltip tooltipText={"Offer Given"}>
                  <Button className="btn btn-outline ml-1 mr-1">
                    <i className="fa fa-handshake-o" />
                  </Button>
                  </CustomTooltip>

                  <CustomTooltip tooltipText={"Cancel Offer"}>
                  <Button className="btn btn-outline ml-1 mr-1">
                    <i className="fa fa-close" />
                  </Button>
                  </CustomTooltip>
                </div>
              </div>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="create-form">
            <div className="grid">
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="profile-update">
                  <div className="profile-pic">
                    <label htmlFor="fileToUpload">
                      <img src={userAvatar} alt="Avatar" />
                      <InputText
                        type="file"
                        name="fileToUpload"
                        id="fileToUpload"
                      />
                    </label>
                    <h6>
                      <i className="fa fa-sort-numeric-asc" /> 250{" "}
                      <i className="fa fa-info-circle" />
                    </h6>
                  </div>
                  <div className="align-self-center ml-3">
                    <h5>
                      Sara Parker <VerifiedIcon style={{ color: "green" }} />
                    </h5>
                    <p className="m-0">University Institute of Lisbon</p>
                    <div className="flex">
                      <Rating value={4} readOnly cancel={false} />
                      <span className="ml-2 font-semibold">4.5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid">
              <div className="lg:col-12 md:col-12 sm:col-12">
                <div className="studentProfileStatus p-4">
                  <div className="grid">
                    <div className="lg:col-6 md:col-12 sm:col-12">
                      <div className="formField-view my-0">
                        <div className="formField-heading">
                          <h5> Applied on</h5>
                        </div>
                        <div className="formField-details">
                          <h6>25/01/2024 10:00am</h6>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-6 md:col-12 sm:col-12">
                      <div className="formField-view my-0">
                        <div className="formField-heading">
                          <h5>Applicant Type</h5>
                        </div>
                        <div className="formField-details">
                          <h6>Team (Team name)</h6>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-6 md:col-12 sm:col-12">
                      <div className="formField-view my-0">
                        <div className="formField-heading">
                          <h5>Shift</h5>
                        </div>
                        <div className="formField-details">
                          <h6>Shift 2</h6>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-6 md:col-12 sm:col-12">
                      <div className="formField-view my-0">
                        <div className="formField-heading">
                          <h5>Application Status</h5>
                        </div>
                        <div className="formField-details">
                          <h6>Under Review</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid">
              <div className="lg:col-12 md:col-12 sm:col-12">
                <div className="formField-view">
                  <div className="formField-heading">
                    <h5>About</h5>
                    <p>
                      {"Hi, I'm Sara! Originally from a small town near Porto, I ventured to Lisbon to pursue my passion for Business Management. Growing up, my parents instilled in me the values of hard work and education. Now, as a university student, I'm eager to apply what I've learned in the classroom to the real world."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-12 md:col-12 sm:col-12">
                <div className="formField-view">
                  <div className="formField-heading">
                    <h5>Education</h5>
                    <p>MBA, University of Lisbon, 2021-24</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-12 md:col-12 sm:col-12">
                <div className="formField-view">
                  <div className="formField-heading">
                    <h5>Area With Work Experience</h5>
                    <ul>
                      <li>Hospitality</li>
                      <li>Events/Festivals</li>
                      <li>Tutoring</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lg:col-12 md:col-12 sm:col-12">
                <div className="formField-view">
                  <div className="formField-heading">
                    <h5>Spoken Language</h5>
                    <ul>
                      <li>English - Intermediate</li>
                      <li>Portuguese - Advance</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lg:col-12 md:col-12 sm:col-12">
                <div className="formField-view">
                  <div className="formField-heading">
                    <h5>Preferred Work Location</h5>
                    <ul>
                      <li>Beja</li>
                      <li>Faro</li>
                      <li>Castelo Branco</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lg:col-12 md:col-12 sm:col-12">
                <div className="formField-view">
                  <div className="formField-heading">
                    <h5>Past Jobs Feedback</h5>
                  </div>

                </div>
                <PastJobReview />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentProfile;
