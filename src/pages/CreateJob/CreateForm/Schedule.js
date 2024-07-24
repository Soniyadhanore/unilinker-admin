/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import WeeklyShift from "../WeeklyShift/WeeklyShift";
import AddShift from "../../../Modals/AddShift/AddShift";
import CustomShift from "../CustomShift";

export default function Schedule({ setStep2Data, step2Data, scheduleType }) {
  const [date, setDate] = useState(null);
  const [addShiftShow, setAddShiftShow] = useState(false);

  useEffect(() => { 
    console.log(scheduleType);
  }, [scheduleType]);

  return (
    <>
      {scheduleType === "full-time" && 
        <div className="vertical-tab-content">
        {/* <Button className="btn btn-orange mb-4" onClick={() => setAddShiftShow(true)}>
          <i className="pi pi-plus mr-2" /> Add Shift Details
        </Button> */}
        <h4>Schedule</h4>
        <p>
          Define the schedule exactly how you want it to be displayed for
          applicants.
        </p>
        <div className="grid">
          <div className="lg:col-9 md:col-9 sm:col-12">
            <div className="formField">
              <h6>Start Date*</h6>
              <span className="p-float-label">
                <Calendar
                  minDate={new Date()}
                  value={step2Data?.fullTime?.startDate}
                  onChange={(e) => {
                    setStep2Data({
                      ...step2Data,
                      fullTime: { ...step2Data.fullTime, startDate: e.value, startDateError: "" },
                    });
                  }}
                  showIcon
                />
              </span>
              {step2Data?.fullTime?.startDateError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >{step2Data?.fullTime?.startDateError}</div>}
            </div>
            <div className="formField">
              <h6>End Date</h6>
              <span className="p-float-label">
                <Calendar
                  value={step2Data?.fullTime?.endDate}
                  minDate={new Date(step2Data?.fullTime?.startDate)}
                  onChange={(e) => {
                    setStep2Data({
                      ...step2Data,
                      fullTime: { ...step2Data.fullTime, endDate: e.value, endDateError: "" },
                    });
                  }}
                  showIcon
                />
              </span>
              {step2Data?.fullTime?.endDateError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                {step2Data?.fullTime?.endDateError}
              </div>}
            </div>
            <div className="formField">
              <h6>Vacancies*</h6>
              <span className="p-float-label">
                <InputText id="tile" value={step2Data?.fullTime?.vacancies} type="number"
                  onChange={(e) => {
                    setStep2Data({
                      ...step2Data,
                      fullTime: { ...step2Data.fullTime, vacancies: e.target.value, vacanciesError: "" },
                    });
                  }}
                />
                <label htmlFor="tile">Eg. 2, 8, 10</label>
              </span>
              {step2Data?.fullTime?.vacanciesError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >{step2Data?.fullTime?.vacanciesError}</div>}
            </div>
          </div>
        </div>
      </div>}

      {scheduleType === "weekly" && <WeeklyShift
        setStep2Data={setStep2Data}
        step2Data={step2Data}
      />}
      
      {scheduleType === "custom" &&
        <CustomShift
          setStep2Data={setStep2Data}
          step2Data={step2Data}
        />}


    </>
  );
}
