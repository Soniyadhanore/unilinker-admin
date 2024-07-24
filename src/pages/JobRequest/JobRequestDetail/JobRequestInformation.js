import React from "react";
import { Link } from "react-router-dom";
import Schedule from "../../JobManagement/JobManagementDetail/Schedule";
import PropTypes from "prop-types";
import {
  capitalizeFirstLetter,
  formatDateFunction,
} from "../../../common/HelperFunctions";

export default function JobRequestInformation({ jobData }) {
  let teamName = "";
  if (jobData?.job_teams) {
    let teams = [];
    jobData?.job_teams.map((item) => {
      teams.push(item.team.team_name);
    });
    teamName = teams.join(",");
  }
  return (
    <>
      <div className="jobContent px-4">
        <div className="grid">
          <div className="lg:col-6 md:col-5 sm:col-12">
            <div className="flex flex-column">
              <div className="formField-view">
                <div className="formField-heading">
                  <h5>Job Title</h5>
                </div>
                <div className="formField-details">
                  <h6> {capitalizeFirstLetter(jobData?.job_title)} </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-5 sm:col-12">
            <div className="flex flex-column">
              <div className="formField-view">
                <div className="formField-heading">
                  <h5>Job Posted by</h5>
                </div>
                <div className="formField-details">
                  <h6>
                    {" "}
                    {capitalizeFirstLetter(
                      jobData?.company_institute?.user?.first_name
                    ) +
                      " " +
                      capitalizeFirstLetter(
                        jobData?.company_institute?.user?.last_name
                      )}{" "}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-5 sm:col-12">
            <div className="flex flex-column">
              <div className="formField-view">
                <div className="formField-heading">
                  <h5>Job Posted on</h5>
                </div>
                <div className="formField-details">
                  <h6>
                    {" "}
                    {formatDateFunction(
                      jobData?.createdAt,
                      "dd/mm/yyyy",
                      true
                    )}{" "}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view my-0">
              <div className="formField-heading">
                <h5>Job Type</h5>
              </div>
              <div className="formField-details">
                <h6>{jobData?.degree_of_specialization}</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view my-0">
              <div className="formField-heading">
                <h5>Job Start Date</h5>
              </div>
              <div className="formField-details">
                <h6>
                  {jobData?.job_shifts?.length > 0
                    ? formatDateFunction(
                        jobData?.job_shifts[0]?.start_date,
                        "dd/mm/yyyy"
                      )
                    : "-"}
                </h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view my-0">
              <div className="formField-heading">
                <h5>Job End Date</h5>
              </div>
              <div className="formField-details">
                <h6>
                  {jobData?.job_shifts?.length > 0 &&
                  jobData?.job_shifts[0]?.end_date
                    ? formatDateFunction(
                        jobData?.job_shifts[0]?.end_date,
                        "dd/mm/yyyy",
                        true
                      )
                    : "-"}
                </h6>
              </div>
            </div>
          </div>

          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view my-0">
              <div className="formField-heading">
                <h5>Type of applicants</h5>
              </div>
              <div className="formField-details">
                <h6>{jobData?.type_of_applicant}</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view my-0">
              <div className="formField-heading">
                <h5>Teams</h5>
              </div>
              <div className="formField-details">
                <h6>{teamName != "" ? teamName : "-"}</h6>
              </div>
            </div>
          </div>

          {jobData?.status === "rejected" && (
            <>
              <div className="lg:col-6 md:col-6 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Job Rejected on</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {" "}
                      {jobData?.rejection_date
                        ? formatDateFunction(
                            jobData?.rejection_date,
                            "dd/mm/yyyy",
                            true
                          )
                        : "-"}{" "}
                    </h6>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* <div className="lg:col-6 md:col-6 sm:col-12">
         <div className="formField-view my-0">
                <div className="formField-heading">
                  <h5>Job Category</h5>
                </div>
                <div className="formField-details">
                  <h6>{ jobData?.shedule_type }</h6>
                </div>
              </div> 
              </div> */}
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view my-0">
              <div className="formField-heading">
                <h5>Address</h5>
              </div>
              <div className="formField-details">
                <h6>{jobData?.job_address ? jobData?.job_address : "-"}</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view my-0">
              <div className="formField-heading">
                <h5>Work Area</h5>
              </div>
              <div className="formField-details">
                <h6>{jobData?.location?.district_en}</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view my-0">
              <div className="formField-heading">
                <h5>Work Mode</h5>
              </div>
              <div className="formField-details">
                <h6>{jobData?.work_mode ? jobData?.work_mode : "-"}</h6>
              </div>
            </div>
          </div>
          {jobData?.work_mode == "on-site" ? (
            <>
              <div className="lg:col-6 md:col-6 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Geofencing Radius</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {jobData?.geofencing_radius
                        ? jobData?.geofencing_radius
                        : "-"}
                    </h6>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {jobData?.status === "rejected" && (
            <>
              <div className="lg:col-6 md:col-6 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Reason of rejection</h5>
                  </div>
                  <div className="formField-details">
                    <h6>
                      {jobData?.reason_of_rejection
                        ? jobData?.reason_of_rejection
                        : "-"}
                    </h6>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mt-3 mb-4">
          <h6 className="font-bold text-black">Payment Details</h6>
        </div>
        <div className="grid">
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view my-0">
              <div className="formField-heading">
                <h5>Payment frequency</h5>
              </div>
              <div className="formField-details">
                <h6>
                  {jobData?.payment_frequency
                    ? capitalizeFirstLetter(jobData?.payment_frequency)
                    : "-"}
                </h6>
              </div>
            </div>
          </div>

          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view my-0">
              <div className="formField-heading">
                <h5>Amount </h5>
              </div>
              <div className="formField-details">
                <h6>{jobData?.amount ? "€ " + jobData?.amount : "-"}</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view my-0">
              <div className="formField-heading">
                <h5>How to pay students?</h5>
              </div>
              <div className="formField-details">
                {jobData?.how_to_pay_student ? (
                  <>
                    <h6>
                      {jobData?.how_to_pay_student}
                      {/* <i className="pi pi-info-circle" /> */}
                    </h6>
                    <Link>View business model details</Link>
                  </>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-12 md:col-12 sm:col-12">
            <div className="formField-view my-0">
              <div className="formField-heading">
                <h5>Description</h5>
              </div>
              <div className="formField-details">
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobData?.job_description,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="lg:col-12 md:col-12 sm:col-12">
            <div className="formField-view my-0">
              <div className="formField-heading">
                <h5>Benefits</h5>
              </div>
              <div className="formField-details">
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobData?.benefits,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Schedule
        jobShifts={jobData?.job_shifts}
        jobType={jobData?.schedule_type}
      />

      {/* This is Empty Component */}
    </>
  );
}

JobRequestInformation.propTypes = {
  jobData: PropTypes.object.isRequired,
  jobType: PropTypes.string.isRequired,
};
