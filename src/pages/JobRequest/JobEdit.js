/** @format */

import { useState, React, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import userAvatar from "../../assets/images/structure/user.png";
// import { InputTextarea } from "primereact/inputtextarea";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";
import { Editor } from "primereact/editor";
import { useCommonApi } from "../../hooks/useCommonApi";
import { useGoogleLocation } from "../../hooks/useGoogleLocation";
import {
  capitalizeFirstLetter,
  getTextLengthOfTextEditor,
} from "../../common/HelperFunctions";
import { IMAGE_BASE_URL } from "../../BaseUrl";

// const workingLocation = [];
// const areaOfWork = [];
const workModeSelect = [
  { code: "on-site", name: "On-site" },
  { code: "remote", name: "Remote" },
];
const paymentFrequencySelect = [
  { code: "monthly", name: "Monthly" },
  { code: "hourly", name: "Hourly" },
  { code: "per-shift", name: "Per-Shift" },
  { code: "agreement", name: "Agreement" },
];

// setStep1Data,
// step1Data,
// makeItClearSecondThirdStep,
//  areaOfWorkList,
// locationList,
//
const JobEdit = () => {
  // const navigate = useNavigate();
  // const [selectedType, setSelectedType] = useState(null);
  // const [allMultiOption, setAllMultiOption] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [DeleteModalShow, setDeleteModalShow] = useState(false);
  // const [rejectJobRequestModal, setRejectJobRequestModal] = useState(false);
  // const [tabIndex, setTabIndex] = useState(0);
  // const setEditFacultyModal = async () => {};

  // const [jobData, setJobData] = useState(false);
  const [companyData, setCompanyData] = useState("");
  const [formData, setFormData] = useState({});

  let { id } = useParams();

  const getJobData = async () => {
    await globalRequest(
      API_ROUTES?.GETSPECIFICJOB + "/" + id,
      "get",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          // setJobData(res.data);
          let data = res.data;
          setSearchTerm(data?.job_address);
          setCompanyData(data?.company_institute);
          setSearchLock(true);
          setFormData((prev) => ({
            ...prev,
            jobTitle: data?.job_title,
            jobDescription: data?.job_description,
            workMode: {
              name: capitalizeFirstLetter(data?.work_mode),
              code: data?.work_mode,
            },
            geoRadius: data?.geofencing_radius,
            jobAddress: data?.job_address,
            // job_city: data?.job_city,
            // job_country: data?.job_country,
            paymentFrequency: {
              name: capitalizeFirstLetter(data?.payment_frequency),
              code: data?.payment_frequency,
            },
            benefits: data?.benefits,
            amount: data?.amount,
            areaOfWork: {
              name: data?.area_of_work_experience?.area_of_work_exp_en,
              code: data?.area_of_work_experience?.id,
            },
            district: {
              name: data?.location?.district_en,
              code: data?.location?.id,
            },
          }));
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    getJobData();
  }, []);

  const errorHandle = (formData) => {
    let err = false;
    let errObj = { ...formData };

    if (!formData?.jobTitle || formData?.jobTitle === "") {
      errObj.jobTitleError = "Job title is required";
      err = true;
    }
    if (!formData?.jobDescription || formData?.jobDescription === "") {
      errObj.jobDescriptionError = "Job description is required";
      err = true;
    }
    if (!formData?.geoRadius || formData?.geoRadius === "") {
      errObj.geoRadiusError = "Job geoRadius is required";
      err = true;
    }
    if (!formData?.amount || formData?.amount === "") {
      errObj.amountError = "Amount is required";
      err = true;
    }
    if (!formData?.benefits || formData?.benefits === "") {
      errObj.benefitsError = "Benefits is required";
      err = true;
    }

    console.log(errObj)

    setFormData(errObj);
    return err;
  };

  const submitHandler = async () => {
    let isError = errorHandle(formData);

    if (isError) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    console.log(formData);
    let data = {};
    data.amount = formData.amount;
    data.area_of_work_id = formData.areaOfWork.code;
    data.benefits = formData.benefits;
    data.location_id = formData.district.code;
    data.geofencing_radius = formData.geoRadius;
    data.job_address = formData.jobAddress;
    data.job_description = formData.jobDescription;
    data.job_title = formData.jobTitle;
    data.payment_frequency = formData.paymentFrequency.code;
    data.work_mode = formData.workMode.code;

    if(formData?.job_city)data.job_city = formData.job_city;
    if(formData?.job_country)data.job_country = formData.job_country;
    if(formData?.lat)data.lat = formData.lat;
    if(formData?.lng)data.lng = formData.lng;

    await globalRequest(
      API_ROUTES?.EDIT_JOB + "/" + id,
      "put",
      data,
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          // console.log("submit done");
          dispatch(
            setSnackbar({
              isOpen: true,
              message: "Job is successfully updated",
              state: "success",
            })
          );
          navigate("/job-management");
        } else {
          console.log("error Aahe");
          dispatch(
            setSnackbar({
              isOpen: true,
              message: "Something went wrong please try again some time later.",
              state: "error",
            })
          );
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  //custom hooks for dropdown list
  const { getLocationList, getAreaOfWork, locationList, areaOfWorkList } =
    useCommonApi();
  // const { getTeamListForDropDown, teamListForDropDown } = useTeams();
  useEffect(() => {
    getAreaOfWork();
    getLocationList();
    // getTeamListForDropDown();
  }, []);

  ////google api for address //
  //===================================================================//
  //get google api custom hooks
  const {
    getGoogleAddressSuggestions,
    getLatLongByAddress,
    setAddressSuggestion,
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
      setFormData((prev) => ({
        ...prev,
        jobAddress: address, //required only for on-site
        lat: latLng?.lat ? latLng?.lat : "", //required only for on-site
        lng: latLng?.lng ? latLng?.lng : "", //required only for on-site
        job_country: fullAddress?.country,
        job_city: fullAddress?.city,
        pinCode: fullAddress?.zipCode,
        jobAddressError: "",
      }));
    } else {
      setFormData((prevData) => {
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
      setFormData((prevData) => {
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

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader p-4">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate(-1);
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0"> Edit Job request</h4>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="create-form">
            <div className="grid">
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="profile-update mb-0">
                  <div className="profile-pic">
                    <label htmlFor="fileToUpload">
                      <img
                        // src={userAvatar}
                        src={
                          companyData?.user?.profile_pic &&
                          companyData?.user?.profile_pic != ""
                            ? IMAGE_BASE_URL +
                              "logo/" +
                              companyData?.user?.profile_pic
                            : userAvatar
                        }
                        alt="Avatar"
                      />
                      <InputText
                        type="file"
                        name="fileToUpload"
                        id="fileToUpload"
                      />
                    </label>
                  </div>
                  <div className="align-self-center ml-3">
                    <h5>{companyData?.company_institute_name}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid">
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField mb-0">
                  <span className="p-float-label">
                    <InputText
                      id="tile"
                      value={formData?.jobTitle}
                      onChange={(e) => {
                        setFormData((prev) => {
                          return {
                            ...prev,
                            jobTitle: e.target.value,
                            jobTitleError: "",
                          };
                        });
                      }}
                    />
                    <label htmlFor="tile">Job Title</label>
                  </span>
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField mb-0">
                  <span className="p-float-label w-full">
                    <Dropdown
                      inputId="dd-Specialization"
                      options={areaOfWorkList}
                      value={formData?.areaOfWork}
                      onChange={(e) => {
                        setFormData((prev) => {
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
                    <label htmlFor="dd-Specialization">Area Of Work</label>
                  </span>
                </div>
              </div>
              <div className="lg:col-10 md:col-10 sm:col-12">
                <div className="formField p-0">
                  <h6>Description</h6>
                  <Editor
                    // value={text}
                    // onTextChange={(e) => setText(e.htmlValue)}
                    style={{ height: "100px" }}
                    value={
                      formData?.jobDescription ? formData?.jobDescription : ""
                    }
                    onTextChange={(value) => {
                      let jobDescription = value.htmlValue;
                      let count = getTextLengthOfTextEditor(jobDescription);
                      setFormData((prevData) => {
                        if (count > 1000) {
                          return {
                            ...prevData,
                            jobDescription,
                            jobDescriptionError: `Max characters limit should be less than 1000.`,
                          };
                        } else if (count <= 150) {
                          return {
                            ...prevData,
                            jobDescription,
                            jobDescriptionError: `Max characters limit should be greater than 150.`,
                          };
                        } else {
                          return {
                            ...prevData,
                            jobDescription,
                            jobDescriptionError: "",
                          };
                        }
                      });
                    }}
                  />
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label w-full">
                    <Dropdown
                      inputId="dd-Specialization"
                      options={workModeSelect}
                      value={formData?.workMode}
                      onChange={(e) => {
                        setFormData((prev) => {
                          return {
                            ...prev,
                            workMode: e.target.value,
                            workModeError: "",
                          };
                        });
                      }}
                      optionLabel="name"
                      className="w-full"
                    />
                    <label htmlFor="dd-Specialization">Job Mode*</label>
                  </span>
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="Geoloation"
                      value={formData?.geoRadius}
                      onChange={(e) => {
                        let geoRadius = e.target.value;
                        if (isNaN(+geoRadius)) return;
                        setFormData((prev) => {
                          return {
                            ...prev,
                            geoRadius,
                            geoRadiusError: "",
                          };
                        });
                      }}
                    />
                    <label htmlFor="Geoloation">Geofence radius</label>
                  </span>
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  {/* <h6>Job Address*</h6>
                  <p>Job Location - Set the location of the job.</p> */}
                  {/* <span className="p-float-label">
                <InputText id="tile" />
                <label htmlFor="tile">Eg. Job Location</label>
              </span> */}

                  <InputText
                    placeholder={"Search for an address"}
                    className="fill"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setSearchLock(false);

                      setFormData((prev) => ({
                        ...prev,
                        jobAddressError: "",
                      }));
                    }}
                  />
                  {addressSuggestion.length > 0 && (
                    <div
                      className="w-full absolute left-0 border border-solid border-blue_gray_100 rounded-md bg-white_A700 mt-[-23px] overflow-hidden bg-white-A700 z-[9999]"
                      style={{ zIndex: 9 }}
                    >
                      {addressSuggestion.map((address, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-start justify-start py-2 px-4 cursor-pointer border border-solid border-blue_gray_100"
                            style={{ backgroundColor: "white" }}
                            onClick={() => {
                              setSearchLock(true);
                              setAddressSuggestion([]);
                              setAddress(address);
                              setSearchTerm(address);
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

                  {formData?.jobAddressError && (
                    <div
                      style={{ color: "#DC362E", textAlign: "initial" }}
                      className="errorSize"
                    >
                      {formData?.jobAddressError}
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <Dropdown
                      inputId="dd-District"
                      options={locationList}
                      value={formData?.district}
                      onChange={(e) => {
                        setFormData((prev) => {
                          return {
                            ...prev,
                            district: e.target.value,
                            districtError: "",
                          };
                        });
                      }}
                      optionLabel="name"
                      className="w-full"
                    />
                    <label htmlFor="dd-District">District</label>
                  </span>
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText
                      id="Amount"
                      value={formData?.amount}
                      onChange={(e) => {
                        let amount = e.target.value;
                        if (isNaN(+amount)) return;
                        setFormData((prev) => {
                          return {
                            ...prev,
                            amount,
                            amountError: "",
                          };
                        });
                      }}
                    />
                    <label htmlFor="Amount">Job Amount</label>
                  </span>
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label dropdownnew">
                    <Dropdown
                      inputId="PaymentFrequency"
                      options={paymentFrequencySelect}
                      value={formData?.paymentFrequency}
                      onChange={(e) => {
                        setFormData((prev) => {
                          return {
                            ...prev,
                            paymentFrequency: e.target.value,
                            paymentFrequencyError: "",
                          };
                        });
                      }}
                      optionLabel="name"
                      className="w-full"
                    />
                    <label htmlFor="PaymentFrequency">Payment frequency</label>
                  </span>
                </div>
              </div>
              <div className="lg:col-10 md:col-10 sm:col-12">
                <div className="formField p-0">
                  <h6>Benefits</h6>
                  <Editor
                    value={formData?.benefits ? formData?.benefits : ""}
                    onTextChange={(value) => {
                      let benefits = value.htmlValue;
                      let count = getTextLengthOfTextEditor(benefits);
                      setFormData((prevData) => {
                        if (count > 1000) {
                          return {
                            ...prevData,
                            benefits,
                            benefitsError: `Max characters limit should be less than 1000.`,
                          };
                        } else if (count <= 150) {
                          return {
                            ...prevData,
                            benefits,
                            benefitsError: `Max characters limit should be greater than 150.`,
                          };
                        } else {
                          return {
                            ...prevData,
                            benefits,
                            benefitsError: "",
                          };
                        }
                      });
                    }}
                    style={{ height: "100px" }}
                  />
                </div>
              </div>
            </div>

            <Divider className="mt-0 mb-1" />
            <div className="grid text-right">
              <div className="lg:col-10 md:col-10 sm:col-12">
                <Button
                  className="btn btn-gray mr-2"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="btn btn-orange ml-1 mr-1"
                  onClick={() => submitHandler()}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobEdit;
