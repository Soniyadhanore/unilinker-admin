/** @format */
import { useState,React } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import userAvatar from "../../assets/images/structure/user.png";
import { Form } from "react-bootstrap";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const CreateAcademicInstitution = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCity, setSelectedCity] = useState();
  const faculty = [
    { name: "Option 1", code: "NY" },
    { name: "Option 2", code: "RM" },
    { name: "Option 3", code: "LDN" },
    { name: "Option 4", code: "IST" },
    { name: "Option 5", code: "PRS" },
  ];

  const countrySelector = [
    { code: "AD", label: "Andorra", phone: "376" },
    {
      code: "AE",
      label: "United Arab Emirates",
      phone: "971",
    },
    { code: "AF", label: "Afghanistan", phone: "93" },
    {
      code: "AG",
      label: "Antigua and Barbuda",
      phone: "1-268",
    },
    { code: "ID", label: "Indonesia", phone: "62" },
    { code: "IE", label: "Ireland", phone: "353" },
    { code: "IL", label: "Israel", phone: "972" },
    { code: "IM", label: "Isle of Man", phone: "44" },
    { code: "IN", label: "India", phone: "91" },
  ];
  const citySelector = [
    { name: "Option 1", code: "NY" },
    { name: "Option 2", code: "RM" },
    { name: "Option 3", code: "LDN" },
    { name: "Option 4", code: "IST" },
    { name: "Option 5", code: "PRS" },
  ];

  return (
    <>
      <section className="admin-content-wrapper ">
        <div className="adminContent">
          <div className="tablefilterheader p-4">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate("/academic-institutions");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0"> Create Academic Institutions </h4>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="create-form">
            <div className="grid mb-4">
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="profile-update mb-0">
                  <div className="profile-pic">
                    <label htmlFor="fileToUpload">
                      <img src={userAvatar} alt="Avatar" />
                      <InputText
                        type="file"
                        name="fileToUpload"
                        id="fileToUpload"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
             <div className="grid ">
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField">
                  <span className="p-float-label dropdownnew">
                    <Dropdown
                      inputId="type"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.value)}
                      options={faculty}
                      optionLabel="name"
                      className="w-full"
                    />
                    <label htmlFor="type">Faculty name</label>
                  </span>
                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Email Address error
                  </div>
                </div>
              </div>
              
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText id="title" />
                    <label htmlFor="title">Academic institutions name </label>
                  </span>
                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Academic institutions name error
                  </div>
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText id="title" />
                    <label htmlFor="title">Contact person full name</label>
                  </span>
                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Contact person full name error
                  </div>
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText id="title" />
                    <label htmlFor="title">Contact person Email</label>
                  </span>
                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Contact person email error
                  </div>
                </div>
              </div>
              
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField">
                <PhoneInput
                      country={'us'}
                      value={'+91'}                    
                    />
                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Contact number error
                  </div>
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText id="title" />
                    <label htmlFor="title">Commission Amount (euro)</label>
                  </span>
                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Commission amount error
                  </div>
                </div>
              </div>

              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField companyBillingAddress">
                  <span className="p-float-label">
                    <InputText id="title" />
                    <label htmlFor="title">Company billing address*</label>
                  </span>
                  <div className="country-city-selector mt-3">
                    <div className="cd-Selector">
                      <Autocomplete
                        id="country-select"
                        options={countrySelector}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              alt=""
                            />
                            {option.label} ({option.code}) +{option.phone}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose a country"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password", // disable autocomplete and autofill
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="cd-Selector">
                    <div className="">
                          <Dropdown
                            inputId="dd-city"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.value)}
                            options={citySelector}
                            optionLabel="name"
                            placeholder="City"
                            className="p-inputtext-sm"
                            size="small"
                            id="title"
                          />
                        </div>
                    </div>
                    <div className="cd-Selector">
                      <span className="p-float-label">
                         <InputText id="title" />
                         <label htmlFor="title">Pincode</label>
                      </span>
                    </div>
                  </div>
                </div>
               
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText id="title" />
                    <label htmlFor="title">TAX ID*</label>
                  </span>
                </div>
              </div>
            </div>
           
            <div className="grid">
              <div className="lg:col-5 md:col-5 sm:col-12 py-0">
              <div className="mt-3 ml-0">
                <h6 className="font-semibold">Platform fee applicability</h6>
              </div>
                <div className="formField-view">
                  <div className="formField-heading">
                    <h5>Platform Fee</h5>
                  </div>
                  <div className="formField-details mt-0 affiliateTop">
                    <Form.Check type="switch" label="Enable" />
                  </div>
                </div>
              </div>
            

              <div className="lg:col-5 md:col-5 sm:col-12 pl-4 py-0">
                <div className="mt-3 ml-0">
                   <h6 className="font-semibold">Affiliate Posting</h6>
                </div>
                <div className="formField-view">
                  <div className="formField-heading">
                    <h5>Post affiliate</h5>
                  </div>
                  <div className="formField-details mt-0 affiliateTop">
                    <Form.Check type="switch" label="Enable" />
                  </div>
                </div>
              </div>

            </div>

            <div className="grid">
              <div className="lg:col-5 md:col-6 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText id="tile" />
                    <label htmlFor="tile">Website URL</label>
                  </span>
                </div>
              </div>
              <div className="lg:col-1 md:col-1 sm:col-12 align-self-center">
                <CustomTooltip tooltipText="Add URL">
                  <i
                    className="pi pi-plus-circle"
                    style={{ color: "#000", margin: "10px" }}
                  />
                </CustomTooltip>
              </div>
            </div>

            <div className="grid text-right">
              <div className="lg:col-10 md:col-10 sm:col-12">
                <Button className="btn btn-gray mr-2">Cancel</Button>
                <Button className="btn btn-orange ml-1 mr-1">
                  Create account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateAcademicInstitution;
