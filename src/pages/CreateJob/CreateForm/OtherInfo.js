/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from 'primereact/multiselect';

import { Editor } from "primereact/editor";
import {useTeams} from "../../../hooks/useTeams";


const paymentFrequencySelect = [
  { code: "monthly", name: "Monthly" },
  { code: "hourly", name: "Hourly" },
  { code: "per-shift", name: "Per-Shift" },
  { code: "agreement", name: "Agreement" },
];
const typeOfApplicantsSelect = [
  { code: "public", name: "Public" },
  { code: "team-only", name: "Team Only" },
];


export default function OtherInfo({ setStep3Data, step3Data, step1Data, dataToCopy}) {
const { getTeamListForDropDown, teamListForDropDown } = useTeams();

let [howToPayStudentsSelect, setHowToPayStudentsSelect] = React.useState([
  {
    code: "Via Unilinkr (Automated Green Receipts)",
    name: "Via Unilinkr (Automated Green Receipts)",
  },
  { code: "Green Receipts", name: "Green Receipts" },
  { code: "Isolated Acts", name: "Isolated Acts" },
  { code: "Employment Contract", name: "Employment Contract" },
  { code: "Other", name: "Other" },
]);
  
  React.useLayoutEffect(() => {
    getTeamListForDropDown(step1Data?.companyId?.code);
  }, []);

  React.useEffect(() => {
    const teamIdFromDataToCopy = dataToCopy?.job_teams?.map((item) => item?.team_id);
    if (teamIdFromDataToCopy) {
      setStep3Data((prev) => ({
        ...prev,
        teamIds: teamListForDropDown.filter((item) => teamIdFromDataToCopy?.includes(item?.code))
      }));
    }
  }, [teamListForDropDown]);

  React.useEffect(() => {
    if (step3Data?.payment_frequency?.code === "agreement") {
      howToPayStudentsSelect = [
        { code: "Green Receipts", name: "Green Receipts" },
        { code: "Isolated Acts", name: "Isolated Acts" },
        { code: "Employment Contract", name: "Employment Contract" },
        { code: "Other", name: "Other" },
      ]
      setHowToPayStudentsSelect(howToPayStudentsSelect)
    } else {
      howToPayStudentsSelect = [
        {
          code: "Via Unilinkr (Automated Green Receipts)",
          name: "Via Unilinkr (Automated Green Receipts)",
        },
        { code: "Green Receipts", name: "Green Receipts" },
        { code: "Isolated Acts", name: "Isolated Acts" },
        { code: "Employment Contract", name: "Employment Contract" },
        { code: "Other", name: "Other" },
      ]
      setHowToPayStudentsSelect(howToPayStudentsSelect)
    }
  }, [step3Data?.payment_frequency]);

  React.useEffect(() => {
    if (dataToCopy) {
      
      setStep3Data({
        ...step3Data,
        payment_frequency: paymentFrequencySelect.find((item) => item.code === dataToCopy?.payment_frequency),
        amount: dataToCopy?.amount,
        benefits: dataToCopy?.benefits,
        how_to_pay_student: howToPayStudentsSelect.find((item) => item.code === dataToCopy?.how_to_pay_student),
        type_of_applicant: typeOfApplicantsSelect.find((item) => item.code === dataToCopy?.type_of_applicant)
      });
    }
  } , [dataToCopy]);

  return (
    <>
      <div className="vertical-tab-content">
        <h4>Other Info</h4>
        <div className="grid">
          <div className="lg:col-9 md:col-9 sm:col-12">
            <div className="formField">
              <h6>Payment Frequency*</h6>
              <p>
                How often are you paying the worker
              </p>
              <span className="p-float-label w-full">
                <Dropdown
                  inputId="dd-Specialization"
                  value={step3Data?.payment_frequency}
                  onChange={(e) => {
                    setStep3Data({ ...step3Data, payment_frequency: e.value, payment_frequencyError: "" });
                  }}
                  options={paymentFrequencySelect}
                  optionLabel="name"
                  className="w-full"
                />
                <label htmlFor="dd-Specialization">Select</label>
              </span>
              {step3Data?.payment_frequencyError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                {step3Data?.payment_frequencyError}
              </div>}
            </div>

            {step3Data?.payment_frequency?.code !== 'agreement' &&
              <div className="formField">
              <h6>Amount*</h6>
              <p>How much are you paying and at what rate</p>
              <span className="p-float-label">
                <InputText
                  id="tile" value={step3Data?.amount}
                  type="number"
                  onChange={(e) => setStep3Data({ ...step3Data, amount: e.target.value, amountError: "" })}
                />
                <label htmlFor="tile">Amount</label>
              </span>
              {step3Data?.amountError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                {step3Data?.amountError}
              </div>}
            </div>}
            <div className="formField">
              <h6>Benefits*</h6>
              <p>Here you can mention any extra benefits the worker may get</p>
              <Editor
                value={step3Data?.benefits}
                onTextChange={(e) => {
                  setStep3Data((prevData) => { 
                    return { ...prevData, benefits: e.htmlValue, benefitsError: "" };
                  });
                }}
                style={{ height: "150px" }}
              />
              {step3Data?.benefitsError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                {step3Data?.benefitsError}
              </div>}
            </div>
            <div className="formField">
              <h6>How to pay students?*</h6>
              <p>Specify here how you will pay the worker</p>
              <span className="p-float-label w-full">
                <Dropdown
                  inputId="dd-Specialization"
                  value={step3Data?.how_to_pay_student}
                  onChange={(e) => 
                    {
                      setStep3Data({ ...step3Data, how_to_pay_student: e.value, how_to_pay_studentError: "" });
                    }
                  }
                  options={howToPayStudentsSelect}
                  optionLabel="name"
                  className="w-full"
                />
                <label htmlFor="dd-Specialization">Select</label>
              </span>
              {step3Data?.how_to_pay_studentError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                 {step3Data?.how_to_pay_studentError}
              </div>}
            </div>
            <div className="formField">
              <h6>Type of Applicants*</h6>
              <p>Open the job either for your teams only or for everyone at Unilinkr</p>
              <span className="p-float-label w-full">
                <Dropdown
                  inputId="dd-Specialization"
                  value={step3Data?.type_of_applicant}
                  onChange={(e) => {
                    setStep3Data({ ...step3Data, type_of_applicant: e.value, type_of_applicantError: "" });
                  }}
                  options={typeOfApplicantsSelect}
                  optionLabel="name"
                  className="w-full"
                />
                <label htmlFor="dd-Specialization">On-Site</label>
              </span>
              {step3Data?.type_of_applicantError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                {step3Data?.type_of_applicantError}
              </div>}
            </div>
           {step3Data?.type_of_applicant?.code === "team-only" &&
            <div className="formField">
              <h6>Teams*</h6>
              <p>Please select all the teams you want to open this job for.</p>
              <span className="p-float-label w-full">
                <MultiSelect 
                  inputId="dd-Specialization"
                  value={step3Data?.teamIds}
                  onChange={(e) => {
                    setStep3Data({ ...step3Data, teamIds: e.value });
                  }}
                  multiple
                  options={teamListForDropDown}
                  optionLabel="name"
                  className="w-full"
                />
                <label htmlFor="dd-Specialization">Teams</label>
              </span>
              {step3Data?.teamIdsError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                {step3Data?.teamIdsError}
              </div>}
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}
