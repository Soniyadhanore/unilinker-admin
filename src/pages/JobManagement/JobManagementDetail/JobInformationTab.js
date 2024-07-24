import React from "react";
import Schedule from "./Schedule";

export default function JobInformation() {
  return (
    <>
      <div className="jobContent px-4">
        <div className="grid">
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Company</h5>
              </div>
              <div className="formField-details">
                <h6>Vila Vita Parc</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Job Posted by</h5>
              </div>
              <div className="formField-details">
                <h6>John Smith</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Job Type</h5>
              </div>
              <div className="formField-details">
                <h6>Specialised</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Job mode</h5>
              </div>
              <div className="formField-details">
                <h6>On-site</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Work Area</h5>
              </div>
              <div className="formField-details">
                <h6>Hospitality</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Type of applicants</h5>
              </div>
              <div className="formField-details">
                <h6>Teams</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Description</h5>
              </div>
              <div className="formField-details">
                <h6>
                  Here description of schedule, task, conditions will come
                </h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Branch</h5>
              </div>
              <div className="formField-details">
                <h6>Branch1</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Confirmed</h5>
              </div>
              <div className="formField-details">
                <h6>01/01/2024</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Job Posted on</h5>
              </div>
              <div className="formField-details">
                <h6>01/02/2024 10:00 am</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Job Category</h5>
              </div>
              <div className="formField-details">
                <h6>Weekly Recurring</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Address</h5>
              </div>
              <div className="formField-details">
                <h6>Somewhere in lisbon</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Teams</h5>
              </div>
              <div className="formField-details">
                <h6>Team 1, Team 2</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 ">
          <h6 className="font-semibold text-lg">Payment Details</h6>
        </div>
        <div className="grid">
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Payment frequency</h5>
              </div>
              <div className="formField-details">
                <h6>Per shift</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Benefits</h5>
              </div>
              <div className="formField-details">
                <h6>
                  Here description of schedule, task, conditions will come
                </h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>Amount</h5>
              </div>
              <div className="formField-details">
                <h6>40 euro</h6>
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField-view">
              <div className="formField-heading">
                <h5>How to pay students?</h5>
              </div>
              <div className="formField-details">
                <h6>Through Unilinkr</h6>
              </div>
            </div>
          </div>
        </div>
        <Schedule />
      </div>
    </>
  );
}
