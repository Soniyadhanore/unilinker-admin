/* eslint-disable no-unused-vars */
/** @format */
import { useRef, useState, React, useEffect } from "react";
import "../../pages/CreateJob/CreateJob.scss";
import { Divider } from "primereact/divider";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import { TabView, TabPanel } from "primereact/tabview";
import BasicInfo from "./CreateForm/BasicInfo";
import Schedule from "./CreateForm/Schedule";
import OtherInfo from "./CreateForm/OtherInfo";
import { Button } from "react-bootstrap";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLocation } from "../../hooks/useGoogleLocation";
import { useCommonApi } from "../../hooks/useCommonApi";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";
import { getTextLengthOfTextEditor } from "../../common/HelperFunctions";
import { usePostJobs } from "../../hooks/usePostJobs";
import PreviewJob from './JobPreview'
import { API_ROUTES } from "../../common/Enum";
import globalRequest from "../../prototype/globalRequest";

const CreateJob = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [postJobData, setPostJobData] = useState({});

  const handleChange = (event) => {
    let newValue = event.index;
    // setValue(newValue);
    if (newValue === 0) setValue(newValue);
    if (newValue === 1) {
      handleStep1Errors(step1Data);
    }
    if (newValue === 2) {
      if (!done.step1) {
        handleStep1Errors(step1Data);
        return;
      }
      handleStep2Errors(step2Data);
    }
  };

  const toast = useRef(null);
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const navigate = useNavigate();
  const [dataToCopy, setDataToCopy] = useState({});

  // all states
  const [step1Data, setStep1Data] = useState({
    companyId: "",
    employeeId: "",
    degreeOfSpecialization: "", //"specialized"
    jobTitle: "",
    areaOfWork: "", //id
    jobDescription: "",
    workMode: "", //remote, on-site
    jobAddress: "", //required only for on-site
    lat: "", //required only for on-site
    lng: "", //required only for on-site
    district: "", //id
    geoRadius: "50",
    scheduleType: { code: "full-time", name: "Full Time" }, //full-time, weekly, custom
    //extra fields for address
    job_country: "",
    job_city: "",
    pinCode: "",
  });
  const [step2Data, setStep2Data] = useState({
    fullTime: {
      startDate: null,
      endDate: null,
      vacancies: "1",
    },
    weekly: [],
    custom: [],
  });
  const [step3Data, setStep3Data] = useState({
    payment_frequency: "", //monthly or hourly or per-shift or agreement
    amount: "",
    benefits: "",
    how_to_pay_student: "", //Via Uni-linker (Automated Green Receipts), Green Receipts, Isolated Acts, Employment Contract, Other
    type_of_applicant: "", //public or team-only
    teamIds: [], //comma separated // { name: "Team-1", id: 1 },
  });
  const [active, setActive] = useState({
    step1: true,
    step2: false,
    step3: false,
  });
  const [done, setDone] = useState({
    step1: false,
    step2: false,
    step3: false,
  });
  const [openPreview, setOpenPreview] = useState(false);
  const [stepsNotComplete, setStepsNotComplete] = useState({
    step1: false,
    step2: false,
    step3: false,
  });
  // console.log(stepsNotComplete);

  const getDataToCopy = async (id) => {
    const response = await globalRequest(
      API_ROUTES?.GETSPECIFICJOB + "/" + id,
      "get",
      {},
      {},
      true
    )
    setDataToCopy(response.data)
    if (response.data.schedule_type === "full-time") {
      setStep2Data((prev) => {
        return {
          ...prev,
          fullTime: {
            startDate: new Date(response.data?.job_shifts[0].start_date),
            endDate: new Date(response.data?.job_shifts[0]?.end_date),
            vacancies: response.data?.job_shifts[0]?.no_of_vacancies.toString(),
          },
        };
      });
    } else if (response.data.schedule_type === "weekly") {
      const weeklyData = response.data?.job_shifts.map ((shift) => {
        const slots = JSON.parse(shift?.shift_schedule);
        let slotWithName = slots.map ((slot) => {
          let slotData = {}
          slotData[slot.key] = slot.data;
          return slotData
        })
        const result = slotWithName.reduce((acc, curr) => {
          const day = Object.keys(curr)[0];
          acc[day] = curr[day];
          return acc;
        }, {});
        return {
          shiftName: shift.shift_name,
          vacancies: shift.no_of_vacancies.toString(),
          startDate: new Date(shift?.start_date),
          endDate: new Date(shift?.end_date),
          slots: result,
        };
      })
      setStep2Data((prev) => {
        return {
          ...prev,
          weekly: weeklyData,
        };
      });
    } else if (response.data.schedule_type === "custom") {
      
      setStep2Data((prev) => {
        const customData = response.data?.job_shifts.map ((shift) => {
          console.log(shift?.shift_schedule);
          const slots = JSON.parse(shift?.shift_schedule);
          let slotWithName = slots.map ((slot) => {
            let slotData = {}
            slotData[slot.key] = slot.data;
            return slotData
          })
          
          const result = slotWithName.reduce((acc, curr) => {
            const day = Object.keys(curr)[0];
            acc[day] = curr[day];
            return acc;
          }, {});
          console.log('custom data', result);
          return {
            shiftName: shift.shift_name,
            vacancies: shift.no_of_vacancies.toString(),
            startDate: shift?.start_date.split('T')[0].split('-').reverse().join('/'),
            endDate: shift?.end_date.split('T')[0].split('-').reverse().join('/'),
            slots: result,
          };
        })
        return {
          ...prev,
          custom: customData,
        };
      });
    }
  }

  //make reset data1 and data2 when change the schedule type
  const makeItClearSecondThirdStep = () => {
    setStep2Data({
      fullTime: {
        startDate: null,
        endDate: null,
        vacancies: "1",
      },
      weekly: [],
      custom: [],
    });
    setStep3Data({});
  };

  const handleStep1Errors = (step1Data) => {
    let error = false;
    let errObj = { ...step1Data };
    errObj.companyIdError = "";
    if (!step1Data?.companyId) {
      errObj.companyIdError = "Company is required";
      error = true;
    }
    errObj.employeeIdError = "";
    if (!step1Data?.employeeId) {
      errObj.employeeIdError = "Employee is required";
      error = true;
    }
    errObj.degreeOfSpecializationError = "";
    if (!step1Data?.degreeOfSpecialization) {
      errObj.degreeOfSpecializationError =
        "Degree Of Specialization is required";
    }
    errObj.jobTitleError = "";
    if (!step1Data?.jobTitle) {
      errObj.jobTitleError = "Job title is required";
      error = true;
    }
    errObj.areaOfWorkError = "";
    if (!step1Data?.areaOfWork) {
      errObj.areaOfWorkError = "Area of work is required";
      error = true;
    }
    errObj.jobDescriptionError = "";
    if (!step1Data?.jobDescription) {
      errObj.jobDescriptionError = "Job description is required";
      error = true;
    }
    errObj.jobDescriptionError = "";
    if (step1Data?.jobDescription) {
      let count = getTextLengthOfTextEditor(step1Data?.jobDescription);
      let e = "";
      if (count > 1000) {
        e = `Max characters limit should be less than 1000.`;
        error = true;
      } 
      // else if (count <= 150) {
      //   e = `Max characters limit should be greater than 150.`;
      //   error = true;
      // }
      errObj.jobDescriptionError = e;
    }
    errObj.workModeError = "";
    if (!step1Data?.workMode) {
      errObj.workModeError = "Work mode is required";
      error = true;
    }
    errObj.jobAddressError = "";
    if (step1Data?.workMode.code === "on-site") {
      if (!step1Data?.jobAddress || !step1Data?.lat || !step1Data?.lng) {
        errObj.jobAddressError = "Address is required";
        error = true;
      }
    }
    errObj.districtError = "";
    if (!step1Data?.district) {
      errObj.districtError = "District is required";
      error = true;
    }
    errObj.geoRadiusError = "";
    if (!step1Data?.geoRadius) {
      errObj.geoRadiusError = "Geo-fencing Radius is required";
      error = true;
    }
    errObj.scheduleTypeError = "";
    if (!step1Data?.scheduleType) {
      errObj.scheduleTypeError = "Schedule type is required";
      error = true;
    }

    setStep1Data(errObj);

    if (!error) {
      console.log("no error");
      setValue(1);
      setActive({ ...active, step1: false, step2: true, step3: false });
      setDone({ ...done, step1: true, step2: false, step3: false });
    } else {
      console.log("error");
      setActive({ ...active, step1: true, step2: false, step3: false });
      setDone({ ...done, step1: false, step2: false, step3: false });

    }
  };

  const handleStep2Errors = (step2Data) => {
    let error = false;
    let errObj = { ...step2Data };
    errObj.fullTime.startDateError = "";
    errObj.fullTime.vacanciesError = "";
    if (step1Data?.scheduleType.code === "full-time") {
      console.log(step2Data?.fullTime?.startDate);
      if (!step2Data?.fullTime?.startDate) {
        errObj.fullTime.startDateError = "Start date is required";
        error = true;
      }
      // if (!step2Data?.fullTime?.endDate) {
      //   errObj.fullTime.endDateError = "End date is required";
      //   error = true;
      // }
      if (!step2Data?.fullTime?.vacancies) {
        errObj.fullTime.vacanciesError = "Vacancies is required";
        error = true;
      } else if (step2Data?.fullTime?.vacancies < 1) {
        errObj.fullTime.vacanciesError = "Vacancies should be greater than 0";
        error = true;
      }
    }
    errObj.weeklyError = "";
    if (step1Data?.scheduleType.code === "weekly") {
      if (step2Data?.weekly?.length < 1) {
        errObj.weeklyError = "Shift is required";
        error = true;
      }
    }
    errObj.customError = "";
    if (step1Data?.scheduleType.code === "custom") {
      if (step2Data?.custom?.length < 1) {
        errObj.customError = "Shift is required";
        error = true;
      }
    }

    // console.log("errObj", errObj);
    setStep2Data(errObj);
    if (!error) {
      setValue(2);
      setActive({ ...active, step1: false, step2: false, step3: true });
      setDone({ ...done, step1: true, step2: true, step3: false });
    } else {
      setActive({ ...active, step1: false, step2: true, step3: false });
      setDone({ ...done, step1: true, step2: false, step3: false });

    }
  };

  const handleStep3Errors = (step3Data) => {
    let error = false;
    let errObj = {
      ...step3Data,
      amountError: "",
      benefitsError: "",
      how_to_pay_studentError: "",
      payment_frequencyError: "",
      type_of_applicantError: "",
      
    };
    errObj.payment_frequencyError = "";
    if (!step3Data?.payment_frequency) {
      errObj.payment_frequencyError = "Payment frequency is required";
      error = true;
    }
    errObj.amountError = "";
    if (!step3Data?.amount) {
      errObj.amountError = "Amount is required";
      error = true;
    } else if (step3Data?.amount < 0) {
      errObj.amountError = "Amount cannot be negative";
      error = true;
    }
    errObj.benefitsError = "";
    if (!step3Data?.benefits) {
      errObj.benefitsError = "Benefits is required";
      error = true;
    }
    errObj.benefitsError = "";
    if (step3Data?.benefits) {
      let count = getTextLengthOfTextEditor(step3Data?.benefits);
      let e = "";
      if (count > 1000) {
        e = `Max characters limit should be less than 1000.`;
        error = true;
      } else if (count <= 150) {
        e = `Max characters limit should be greater than 150.`;
        error = true;
      }
      errObj.benefitsError = e;
    }

    errObj.how_to_pay_studentError = "";
    if (!step3Data?.how_to_pay_student?.code) {
      errObj.how_to_pay_studentError = "How to pay student is required";
      error = true;
    }
    errObj.type_of_applicantError = "";
    if (!step3Data?.type_of_applicant?.code) {
      errObj.type_of_applicantError = "Type of Applicants is required";
      error = true;
    }
    errObj.teamIdsError = "";
    if (step3Data?.type_of_applicant.code === "team-only") {
      if (step3Data?.teamIds?.length < 1) {
        errObj.teamIdsError = "Teams are required";
        error = true;
      }
    }
    setStep3Data(errObj);
    if (!error) {
      setActive({ ...active, step1: false, step2: false, step3: false });
      setDone({ ...done, step1: true, step2: true, step3: true });
      handleAllStepErrors();
    } else {
      setActive({ ...active, step1: false, step2: true, step3: false });
      setDone({ ...done, step1: true, step2: true, step3: false });
    }
  };

  //handle all steps errors
  const handleAllStepErrors = () => {
    let error = false;
    // step-1
    let errObjStep1 = { ...step1Data };
    if (!step1Data?.degreeOfSpecialization) {
      errObjStep1.degreeOfSpecializationError =
        "Degree Of Specialization is required";
      error = true;
    }
    if (!step1Data?.jobTitle) {
      errObjStep1.jobTitleError = "Job title is required";
      error = true;
    }
    if (!step1Data?.areaOfWork) {
      errObjStep1.areaOfWorkError = "Area of work is required";
      error = true;
    }
    if (!step1Data?.jobDescription) {
      errObjStep1.jobDescriptionError = "Job description is required";
      error = true;
    }
    if (step1Data?.jobDescription) {
      let count = getTextLengthOfTextEditor(step1Data?.jobDescription);
      let e = "";
      if (count > 1000) {
        e = `Max characters limit should be less than 1000.`;
        error = true;
      } 
      // else if (count <= 150) {
      //   e = `Max characters limit should be greater than 150.`;
      //   error = true;
      // }
      errObjStep1.jobDescriptionError = e;
    }
    if (!step1Data?.workMode) {
      errObjStep1.workModeError = "Work mode is required";
      error = true;
    }
    if (step1Data?.workMode === "on-site") {
      if (!step1Data?.jobAddress || !step1Data?.lat || !step1Data?.lng) {
        errObjStep1.jobAddressError = "Address is required";
        error = true;
      }
    }
    if (!step1Data?.district) {
      errObjStep1.districtError = "District is required";
      error = true;
    }
    if (!step1Data?.geoRadius) {
      errObjStep1.geoRadiusError = "Geo-fencing Radius is required";
      error = true;
    }
    if (!step1Data?.scheduleType) {
      errObjStep1.scheduleTypeError = "Schedule type is required";
      error = true;
    }

    // step-2
    let error2 = false;
    let errObjStep2 = { ...step2Data };
    if (step1Data?.scheduleType === "full-time") {
      if (!step2Data?.fullTime?.startDate) {
        errObjStep2.fullTime.startDateError = "Start date is required";
        error2 = true;
      }
      // if (!step2Data?.fullTime?.endDate) {
      //   errObjStep2.fullTime.endDateError = "End date is required";
      //   error2 = true;
      // }
      console.log(step2Data?.fullTime);
      if (!step2Data?.fullTime?.vacancies) {
        errObjStep2.fullTime.vacanciesError = "Vacancies is required";
        error2 = true;
      } else if (+step2Data?.fullTime?.vacancies < 1) {
        errObjStep2.fullTime.vacanciesError = "Vacancies should be greater than 0";
        error2 = true;
      }
    }
    if (step1Data?.scheduleType === "weekly") {
      if (step2Data?.weekly?.length < 1) {
        errObjStep2.weeklyError = "Shift is required";
        error2 = true;
      }
    }
    if (step1Data?.scheduleType === "custom") {
      if (step2Data?.custom?.length < 1) {
        errObjStep2.customError = "Shift is required";
        error2 = true;
      }
    }

    //step-3
    let error3 = false;
    let errObjStep3 = { ...step3Data };
    if (!step3Data?.payment_frequency) {
      errObjStep3.payment_frequencyError = "Payment frequency is required";
      error3 = true;
    }
    if (!step3Data?.amount) {
      errObjStep3.amountError = "Amount is required";
      error3 = true;
    }
    if (!step3Data?.benefits) {
      errObjStep3.benefitsError = "Benefits is required";
      error3 = true;
    }
    if (step3Data?.benefits) {
      let count = getTextLengthOfTextEditor(step3Data?.benefits);
      let e = "";
      if (count > 1000) {
        e = `Max characters limit should be less than 1000.`;
        error3 = true;
      } else if (count <= 150) {
        e = `Max characters limit should be greater than 150.`;
        error3 = true;
      }
      errObjStep3.benefitsError = e;
    }
    if (!step3Data?.how_to_pay_student.code) {
      errObjStep3.how_to_pay_studentError = "How to pay student is required";
      error3 = true;
    }
    if (!step3Data?.type_of_applicant.code) {
      errObjStep3.type_of_applicantError = "Type of Applicants is required";
      error3 = true;
    }
    if (step3Data?.type_of_applicant.code === "team-only") {
      console.log(step3Data?.teamIds);
      if (step3Data?.teamIds?.length < 1) {
        errObjStep3.teamIdsError = "Teams are required";
        error3 = true;
      }
    }

    if (error || error2 || error3) {
      dispatch(
        setSnackbar({
          isOpen: true,
          message: "Complete all required fields to post this job.",
          state: "error",
        })
      );
      setStepsNotComplete({
        step1: error,
        step2: error2,
        step3: error3,
      });
    } else {
      setPostJobData({ step1Data, step2Data, step3Data, areaOfWorkList });
      setOpenPreview(true);
    }
  };

  const handlePreview = () => {
    if (value == 2 && !openPreview) {
      handleStep3Errors(step3Data);
    } else {
      if (openPreview) {
        handleSubmitPostJob();
      } else {
        handleAllStepErrors();
      }
    }
  };

  //handle submit post job
  const { postJob } = usePostJobs();
  const handleSubmitPostJob = () => {
    let data = {
      ...step1Data,
      areaOfWork: step1Data?.areaOfWork?.code,
      companyId: step1Data?.companyId?.code,
      degreeOfSpecialization: step1Data?.degreeOfSpecialization?.code,
      district: step1Data?.district?.code,
      employeeId: step1Data?.employeeId?.code,
      scheduleType: step1Data?.scheduleType?.code,
      workMode: step1Data?.workMode?.code,
      ...step2Data,
      ...step3Data,
      how_to_pay_student: step3Data?.how_to_pay_student?.code,
      payment_frequency: step3Data?.payment_frequency?.code,
      type_of_applicant: step3Data?.type_of_applicant?.code,
    };
    postJob(data);
  };

  //custom hooks for dropdown list
  const { getLocationList, getAreaOfWork, locationList, areaOfWorkList } = useCommonApi();
  // const { getTeamListForDropDown, teamListForDropDown } = useTeams();
  useEffect(() => {
    getAreaOfWork();
    getLocationList();
    // getTeamListForDropDown();
  }, []);

  //===================================================================//
  //get google api custom hooks
  const {
    getGoogleAddressSuggestions,
    getLatLongByAddress,
    setAddressSuggestion,
    setFullAddress,
    addressSuggestion,
    fullAddress,
    latLng,
  } = useGoogleLocation();
  //google api integration
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [searchLock, setSearchLock] = useState(false);
  const [address, setAddress] = useState("");

  //set billing address
  useEffect(() => {
    if (fullAddress) {
      setStep1Data({
        ...step1Data,
        jobAddress: address, //required only for on-site
        lat: latLng?.lat ? latLng?.lat : "", //required only for on-site
        lng: latLng?.lng ? latLng?.lng : "", //required only for on-site
        job_country: fullAddress?.country,
        job_city: fullAddress?.city,
        pinCode: fullAddress?.zipCode,
        jobAddressError: "",
      });
    } else {
      setStep1Data((prevData) => {
        return {
          ...prevData,
          jobAddress: "", //required only for on-site
          lat: "", //required only for on-site
          lng: "", //required only for on-site
          job_country: "",
          job_city: "",
          pinCode: "",
        };
      });
    }
  }, [fullAddress]);

  useEffect(() => {
    if (latLng?.lng && latLng?.lat) {
      setStep1Data((prevData) => {
        return {
          ...prevData,
          lat: latLng?.lat,
          lng: latLng?.lng,
        };
      });
    }
  }, [latLng]);

  //search list of address
  useEffect(() => {
    if (search && !searchLock) getGoogleAddressSuggestions(search);
    else setAddressSuggestion([]);
  }, [search]);

  //debounce for address
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  //get lat lgn by selected address
  useEffect(() => {
    if (address) {
      getLatLongByAddress(address);
    }
  }, [address]);

  useEffect(() => {
    if (localStorage.getItem("jobId")) {
      console.log("jobId", localStorage.getItem("jobId"));
      getDataToCopy(localStorage.getItem("jobId"));
    }
  }, []);

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate(-1);
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0"> Create Job</h4>
              <div className="tableFilterRow">
                {value > 1 && <div className="tableFilterCol" style={{ width: "auto" }}>
                  {openPreview && <Button
                    className="btn btn-orange mr-3"
                    onClick={() => { setOpenPreview(false); }}
                  >
                    Close Preview
                  </Button>}

                  <Button
                    className="btn btn-orange"
                    onClick={() => { handlePreview(); }}
                  >
                    {!openPreview?"Preview":"Post Job"}
                  </Button>

                </div>}
              </div>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />

          {
            openPreview? <PreviewJob
            setOpenPreview={setOpenPreview}
            postJobData={postJobData}
            setValue={setValue}
            />:
            <div className="container-fluid adminTableContent">
            <TabView
              className="vertical-tabview"
              value={value}
              activeIndex={value}
              onTabChange={handleChange}
            >
              <TabPanel
                header={
                  <>
                    <span className={`round-cou ${done.step1 && "active"}`}>
                    {/* current,active */}
                    {!done.step1 ?
                      <span>1</span>:
                      <i className="fa fa-check" />
                    }
                    </span>
                    <span>Basic Info</span>
                  </>
                }
              >
                <BasicInfo
                  setStep1Data={setStep1Data}
                  step1Data={step1Data}
                  makeItClearSecondThirdStep={makeItClearSecondThirdStep}
                  areaOfWorkList={areaOfWorkList}
                  locationList={locationList}
                  dataToCopy={dataToCopy}
                  forAddress={{
                    getGoogleAddressSuggestions,
                    getLatLongByAddress,
                    setAddressSuggestion,
                    setFullAddress,
                    addressSuggestion,
                    fullAddress,
                    latLng,
                    searchTerm,
                    setSearchTerm,
                    search,
                    setSearch,
                    searchLock,
                    setSearchLock,
                    address,
                    setAddress,
                  }}
                />
              </TabPanel>
              <TabPanel
                header={
                  <>
                    <span className={`round-cou ${done.step2 && "active"}`}>
                      {!done.step2 ? <span>2</span>: <i className="fa fa-check" />}
                    </span>
                    <span>Schedule</span>
                  </>
                }
              >
                <Schedule
                  setStep2Data={setStep2Data}
                  step2Data={step2Data}
                  scheduleType={step1Data?.scheduleType?.code}
                />
              </TabPanel>
              <TabPanel
                header={
                  <>
                    <span className="round-cou round-remove default">
                      <span>3</span>
                      {/* <i className="fa fa-check" /> */}
                    </span>
                    <span>Other Info</span>
                  </>
                }
              >
                <OtherInfo
                  dataToCopy={dataToCopy}
                  setStep3Data={setStep3Data}
                  step3Data={step3Data}
                  step1Data={step1Data}
                />
              </TabPanel>
            </TabView>
          </div>}

        </div>
      </section>
      <DeleteModal
        show={DeleteModalShow}
        onHide={() => setDeleteModalShow(false)}
      />
      <Toast ref={toast} />
    </>
  );
};

export default CreateJob;
