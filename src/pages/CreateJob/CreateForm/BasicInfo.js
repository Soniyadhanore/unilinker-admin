import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import SwitchJobType from "../../../Modals/SwitchJobType/SwitchJobType";
import globalRequest from "../../../prototype/globalRequest";
import { API_ROUTES } from "../../../common/Enum";
import { getTextLengthOfTextEditor } from "../../../common/HelperFunctions";
import PropTypes from "prop-types";

// const specialized = [
//   { name: "Specialized", code: "specialized" },
//   { name: "Non-specialized", code: "non-specialized" },
// ];
// const workingMode = [
//   { name: "On-Site", code: "on-site" },
//   { name: "Remote", code: "remote" },
// ];
const company = [];
const employee = [];
const workingLocation = [];
const areaOfWork = [];
const degreeSpecializationSelectOptions = [
  { code: "specialized", name: "Specialized" },
  { code: "non-specialized", name: "Non-specialized" },
];
const workModeSelect = [
  { code: "on-site", name: "On-site" },
  { code: "remote", name: "Remote" },
];
const scheduleTypeSelect = [
  { code: "full-time", name: "Full Time" },
  { code: "weekly", name: "Weekly" },
  { code: "custom", name: "Custom" },
];

export default function BasicInfo({
  setStep1Data,
  step1Data,
  makeItClearSecondThirdStep,
  areaOfWorkList,
  locationList,
  forAddress,
  dataToCopy
}) {

  //Get Company Data
  const getCompanyData = async () => {
    await globalRequest(API_ROUTES?.GETCOMPANYDATAFORLIST, "get", {}, {}, true)
      .then((res) => {
        if (res.ack === 1) {
          let data = res?.data;
          company.splice(0, company.length)
          data.map((item) => {
            company.push({ name: item.company_institute_name, code: item.id });
          });
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  //Get Area of work Data
  const getAreaOfWork = async () => {
    await globalRequest(
      API_ROUTES?.GETAREAOFWORKDATAOFCOMPANY,
      "post",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.status === "SUCCESS") {
          let data = res?.data?.data;
          data.map((item) => {
            areaOfWork.push({ name: item.area_of_work_exp_en, code: item.id });
          });
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  //Get Working Location
  const getWorkingLocation = async () => {
    await globalRequest(
      API_ROUTES?.GETWORKGINLOCATIONFORCOMPANY,
      "post",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.status === "SUCCESS") {
          let data = res?.data?.data;
          data.map((item) => {
            workingLocation.push({ name: item.district_en, code: item.id });
          });
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  useEffect(() => {
    getCompanyData();
    getAreaOfWork();
    getWorkingLocation();

    }, []);
    
    useEffect(() => {
      const companyData = company.find((company) => company?.code === dataToCopy.company_institute_id)
      if (workingLocation.length > 0 && areaOfWork.length > 0 && company.length > 0 && dataToCopy?.company_institute_id) {
        setStep1Data({
          ...step1Data,
          companyId: companyData,
          degreeOfSpecialization: degreeSpecializationSelectOptions.find((item) => item?.code === dataToCopy.degree_of_specialization),
          jobTitle: dataToCopy.job_title,
          areaOfWork: areaOfWork.find((item) => item?.code === dataToCopy.area_of_work_id),
          jobDescription: dataToCopy.job_description,
          workMode: workModeSelect.find((item) => item?.code === dataToCopy.work_mode),
          district: workingLocation.find((item) => item?.code === dataToCopy.location_id),
          geoRadius: dataToCopy.geofencing_radius,
          scheduleType: scheduleTypeSelect.find((item) => item?.code === dataToCopy.schedule_type),
          jobAddress: dataToCopy.job_address,
          lat: dataToCopy.job_latitude,
          lng: dataToCopy.job_longitude,
          job_country: dataToCopy.job_country,
          job_city: dataToCopy.job_city,
          pinCode: dataToCopy.post_code
        })
        if (companyData) { getEmployeeData(companyData) }
      }
    
  }, [workingLocation, areaOfWork, company, dataToCopy]);

  //Get Company Data
  const getEmployeeData = async (companyData) => {
    // console.log("companyData", companyData);
    await globalRequest(
      API_ROUTES?.GETEMPLOYEEDATAOFCOMPANY + "/" + companyData.code,
      "get",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          let data = res?.data;
          employee.splice(0, employee.length)
          data.map((item) => {
            employee.push({ name: item.designation, code: item.id });
          });

          if (localStorage.getItem("jobId")) {
            localStorage.removeItem("jobId");
            setStep1Data(prev => ({
              ...prev,
              employeeId: employee.find((employee) => employee?.code === dataToCopy.employee_id)
            }));

          }
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const [changeScheduleTypeConfirmation, setChangeScheduleTypeConfirmation] = useState(false);
  const [newScheduleType, setNewScheduleType] = useState(null);

  return (
    <>
      <div className="vertical-tab-content">
        <h4>Basic Info</h4>
        <p>
          Fill the basic information about the job.
        </p>
        <div className="grid">
          <div className="lg:col-9 md:col-9 sm:col-12">
            <div className="formField">
              <h6>Company*</h6>
              <p>
              Company - Select a company from the list.
              </p>
              <span className="p-float-label w-full">
                <Dropdown
                  inputId="dd-companyBasicInfo"
                  value={step1Data?.companyId}
                  onChange={(e) => {
                    setStep1Data({ ...step1Data, companyId: e.target.value, companyIdError: '' })
                    getEmployeeData(e.target.value)
                  }}
                  options={company}
                  optionLabel="name"
                  className="w-full"
                />
                <label htmlFor="dd-Specialization">Select</label>
              </span>
              {step1Data?.companyIdError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >{step1Data?.companyIdError}</div>}
            </div>
            <div className="formField">
              <h6>Employee*</h6>
              <p>
              Employee - Select a employee from the list.
              </p>
              <span className="p-float-label w-full">
                <Dropdown
                  inputId="dd-companyBasicInfo"
                  value={step1Data?.employeeId}
                  onChange={(e) => setStep1Data({ ...step1Data, employeeId: e.value, employeeIdError: '' })}
                  options={employee}
                  optionLabel="name"
                  className="w-full"
                />
                <label htmlFor="dd-Specialization">Select</label>
              </span>
              { step1Data?.employeeIdError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                {step1Data?.employeeIdError}
              </div>}
            </div>
            <div className="formField">
              <h6>Degree of Specialization*</h6>
              <p>
              Specialized - The degree of the worker matters
              Non-Specialized - The degree of the worker does not matter
              </p>
              <span className="p-float-label w-full">
                <Dropdown
                  inputId="dd-Specialization"
                  value={step1Data?.degreeOfSpecialization}
                  onChange={(e) => {
                    setStep1Data((prev) => {
                      return {
                        ...prev,
                        degreeOfSpecialization:e.target.value,
                        degreeOfSpecializationError: "",
                      };
                    });
                  }}
                  options={degreeSpecializationSelectOptions}
                  optionLabel="name"
                  className="w-full"
                />
                <label htmlFor="dd-Specialization">Select</label>
              </span>
              {step1Data?.degreeOfSpecializationError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >{step1Data?.degreeOfSpecializationError}</div>}
            </div>
            <div className="formField">
              <h6>Job Title*</h6>
              <p>Job title displayed for applicants</p>
              <span className="p-float-label">
                <InputText
                  id="tile"
                  value={step1Data?.jobTitle}
                  onChange={(e) => {
                    setStep1Data((prev) => {
                      return {
                        ...prev,
                        jobTitle: e.target.value,
                        jobTitleError: "",
                      };
                    });
                  }}
                />
                <label htmlFor="tile">Eg. Accountant, HR</label>
              </span>
              { step1Data?.jobTitleError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >{step1Data?.jobTitleError}</div>}
            </div>
            <div className="formField">
              <h6>Work Area*</h6>
              <p>
              The category that best fits the tasks of the workers and your business
              </p>
              <span className="p-float-label w-full">
                <Dropdown
                  inputId="dd-Specialization"
                  options={areaOfWorkList}
                  value={step1Data?.areaOfWork}
                  onChange={(e) => {
                    setStep1Data((prev) => {
                      return {
                        ...prev,
                        areaOfWork: e.target.value,
                        areaOfWorkError: "",
                      };
                    });
                  }}
                  optionLabel="name"
                  className="w-full"
                />
                <label htmlFor="dd-Specialization">Select</label>
              </span>
              {step1Data?.areaOfWorkError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >{step1Data?.areaOfWorkError}</div>}
            </div>
            <div className="formField">
              <h6>Job Description*</h6>
              <p>
              Please mention all tasks to be performed by the workers and any conditions necessary to be a successful applicant.
              </p>
              <Editor
                // value={text}
                // onTextChange={(e) => setText(e.htmlValue)}
                style={{ height: "150px" }}
                value={
                  step1Data?.jobDescription ? step1Data?.jobDescription : ""
                }
                onTextChange={(value) => {
                  let jobDescription = value.htmlValue;
                  let count = getTextLengthOfTextEditor(jobDescription);
                  setStep1Data((prevData) => {
                    if (count > 1000) {
                      return {
                        ...prevData,
                        jobDescription,
                        jobDescriptionError: `Max characters limit should be less than 1000.`,
                      };
                    } 
                    // else if (count <= 150) {
                    //   return {
                    //     ...prevData,
                    //     jobDescription,
                    //     jobDescriptionError: `Max characters limit should be greater than 150.`,
                    //   };
                    // } 
                    else {
                      return {
                        ...prevData,
                        jobDescription,
                        jobDescriptionError: "",
                      };
                    }
                  });
                }}
              />
              {step1Data?.jobDescriptionError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >{step1Data?.jobDescriptionError}</div>}
            </div>
            <div className="formField">
              <h6>Work Mode*</h6>
              <p>
              On-site vs Remote. If on-site please specify address
              </p>
              <span className="p-float-label w-full">
                <Dropdown
                  inputId="dd-Specialization"
                  options={workModeSelect}
                  value={step1Data?.workMode}
                  onChange={(e) => {
                    setStep1Data((prev) => {
                      return {
                        ...prev,
                        workMode:e.target.value,
                        workModeError: "",
                      };
                    });
                  }}
                  optionLabel="name"
                  className="w-full"
                />
                <label htmlFor="dd-Specialization">Work Mode*</label>
              </span>
              { step1Data?.workModeError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >{step1Data?.workModeError}</div>}
            </div>
            <div className="formField">
              <h6>Job Address*</h6>
              <p>
                Job Location - Set the location of the job.
              </p>
              {/* <span className="p-float-label">
                <InputText id="tile" />
                <label htmlFor="tile">Eg. Job Location</label>
              </span> */}

              <InputText
              placeholder={"Search for an address"}
              
              className="fill"
              size="small"
              value={forAddress?.searchTerm}
              onChange={(e) => {
                
                forAddress?.setSearchTerm(e.target.value);
                forAddress?.setSearchLock(false);

                setStep1Data({
                  ...step1Data,
                  jobAddressError: "",
                });
              }}
            />
            {forAddress?.addressSuggestion.length > 0 && (
              <div className="w-full absolute left-0 border border-solid border-blue_gray_100 rounded-md bg-white_A700 mt-[-23px] overflow-hidden bg-white-A700 z-[9999]" style={{zIndex: 9}}>
                {forAddress?.addressSuggestion.map((address, index) => {
                  return (
                     <div
                     key={index}
                     className="flex flex-col items-start justify-start py-2 px-4 cursor-pointer border border-solid border-blue_gray_100"
                     style={{ backgroundColor: "white" }}
                     onClick={() => {
                       forAddress?.setSearchLock(true);
                       forAddress?.setAddressSuggestion([]);
                       forAddress?.setAddress(address);
                       forAddress?.setSearchTerm(address);
                     }}
                   >
                     <p className="common-pointer font-lato text-sm not-italic text-gray_900 tracking-[0.32px] mb-0">
                       {address}
                     </p>
                   </div>
                  );
                })}
              </div>
            )}

              {step1Data?.jobAddressError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                {step1Data?.jobAddressError}
              </div>}
            </div>
            <div className="formField">
              <h6>District*</h6>
              <p>
                Select your district
              </p>
              <span className="p-float-label w-full">
                <Dropdown
                  inputId="dd-companyBasicInfo"
                  options={locationList}
                  value={step1Data?.district}
                  onChange={(e) => {
                    setStep1Data((prev) => {
                      return {
                        ...prev,
                        district:e.target.value,
                        districtError: "",
                      };
                    });
                  }}
                  optionLabel="name"
                  className="w-full"
                />
                <label htmlFor="dd-Specialization">Select</label>
              </span>
              { step1Data?.districtError &&
              <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >{step1Data?.districtError}</div>}
            </div>
            <div className="formField">
              <h6>Geofencing Radius*</h6>
              <p>
              How close the worker needs to be from the specified address to check-in / check-out
              </p>
              <span className="p-float-label">
                <InputText
                  id="tile"
                  value={step1Data?.geoRadius}
                  onChange={(geoRadius) => {
                    if (isNaN(+geoRadius)) return;
                    setStep1Data((prev) => {
                      return {
                        ...prev,
                        geoRadius,
                        geoRadiusError: "",
                      };
                    });
                  }}
                />
                <label htmlFor="tile">Eg. 50, 100, 200mtr</label>
              </span>
              {/* <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                Geofencing Radius error
              </div> */}
            </div>
            <div className="formField">
              <h6>Job Type*</h6>
              <p>
              Custom - Specify exactly what days and times the workers need to do. Ideal for One-time jobs
              Weekly Recurring - Specify the weekly schedule for the worker, which should repeat over a period of time. Ideal for Part-times.
              Full-time - Ideal if you need a collaborator to join you approximately 35h+ per week.
              </p>
              <span className="p-float-label w-full">
                <Dropdown
                  inputId="dd-Specialization"
                  options={scheduleTypeSelect}
                  value={step1Data?.scheduleType}                  
                  onChange={(e) => {
                    if (
                      e.target.value.code !== step1Data?.scheduleType &&
                      e.target.value.code
                    ) {
                      setChangeScheduleTypeConfirmation(true);
                      setNewScheduleType(e.target.value);
                    } else {
                      setNewScheduleType(null);
                      setStep1Data((prev) => {
                        return {
                          ...prev,
                          scheduleType:e.target.value,
                          scheduleTypeError: "",
                        };
                      });
                    }
                  }}
                  optionLabel="name"
                  className="w-full"
                />
                {/* <label htmlFor="dd-Specialization">Full Time</label> */}
              </span>
              {/* <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                Job Type error
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <SwitchJobType
        show={changeScheduleTypeConfirmation}
        onHide={() => {
          setChangeScheduleTypeConfirmation(false);
        }}
        selectYes={() => {
          if (newScheduleType) {
            setStep1Data((prev) => {
              return {
                ...prev,
                scheduleType: newScheduleType,
                scheduleTypeError: "",
              };
            });
            setChangeScheduleTypeConfirmation(false);
            makeItClearSecondThirdStep();
          }
        }}
      />
    </>
  );
}

BasicInfo.propTypes = {
  setStep1Data: PropTypes.func,
  step1Data: PropTypes.object,
  makeItClearSecondThirdStep: PropTypes.func,
  areaOfWorkList: PropTypes.array,
  locationList: PropTypes.array,
  forAddress: PropTypes.object,
  dataToCopy: PropTypes.object,
};
