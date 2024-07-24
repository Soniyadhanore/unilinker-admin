/** @format */
import { useState, React } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import "react-phone-input-2/lib/style.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Calendar } from "primereact/calendar";
// All cities
const cities = [
  { name: "Option 1", code: "NY" },
  { name: "Option 2", code: "RM" },
  { name: "Option 3", code: "LDN" },
  { name: "Option 4", code: "IST" },
  { name: "Option 5", code: "PRS" },
];
// All webUrl
const webUrl = [
  { name: "Option 1", code: "NY" },
  { name: "Option 2", code: "RM" },
  { name: "Option 3", code: "LDN" },
  { name: "Option 4", code: "IST" },
  { name: "Option 5", code: "PRS" },
];

const AddAffiliate = () => {
  const [date, setDate] = useState(null);
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [typeOfAffiliate, setTypeOfAffiliate] = useState(null);
  const [category, setCategory] = useState(null);
  const [WebsiteUrl, setWebsiteUrl] = useState(null);

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader p-4">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate("/manage-unaffiliated");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0"> Add Affiliate</h4>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="create-form">
            <div className="grid">
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField mb-4">
                  <span className="p-float-label dropdownnew">
                    <Dropdown
                      inputId="Company"
                      value={company}
                    onChange={(e) => setCompany(e.value)}
                    options={cities}
                      optionLabel="name"
                      className="w-full"
                    />
                    <label htmlFor="Company">Company*</label>
                  </span>
                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Company error
                  </div>
                </div>
                <div className="formField mb-4">
                  <span className="p-float-label dropdownnew">
                    <Dropdown
                      inputId="Affiliate"
                      value={typeOfAffiliate}
                    onChange={(e) => setTypeOfAffiliate(e.value)}
                    options={cities}
                      optionLabel="name"
                      className="w-full"
                    />
                    <label htmlFor="Affiliate">Type of Affiliate*</label>
                  </span>
                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Type of Affiliate error
                  </div>
                </div>
                <div className="formField mb-4">
                <span className="p-float-label dropdownnew">
                    <Dropdown
                      inputId="Category"
                      value={category}
                    onChange={(e) => setCategory(e.value)}
                    options={cities}
                      optionLabel="name"
                      className="w-full"
                    />
                    <label htmlFor="Category">Category*</label>
                  </span>
                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Category error
                  </div>
                </div>

                <div className="formField mb-4">
                  <span className="p-float-label">
                    <InputText id="tile" />
                    <label htmlFor="tile">Title*</label>
                  </span>
                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Title error
                  </div>
                </div>
                <div className="formField mb-4">
                  <CKEditor
                    config={{ placeholder: "Description..." }}
                    editor={ClassicEditor}
                    data="<p></p>"
                  />
                </div>

                <div className="formField mb-4">
                  <span className="p-float-label dropdownnew">
                    <Dropdown
                      inputId="type"
                      value={WebsiteUrl}
                      onChange={(e) => setWebsiteUrl(e.value)}
                      options={webUrl}
                      optionLabel="name"
                      className="w-full"
                    />
                    <label htmlFor="type">Website URL*</label>
                  </span>
                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Category error
                  </div>
                </div>
                <div className="formField mb-4">
                  <span className="p-float-label">
                    <InputText id="tile" />
                    <label htmlFor="tile">Website URL*</label>
                  </span>
                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Website URL error
                  </div>
                </div>
                <div className="formField mb-4">
                  <span className="p-float-label">
                    <Calendar
                      id="expiryDate"
                      placeholder={"Expiry Date"}
                      value={date}
                      onChange={(e) => setDate(e.value)}
                      showIcon
                    />
                    <label htmlFor="expiryDate">Expiry Date</label>
                  </span>
                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Expiry Date error
                  </div>
                </div>
              </div>
            </div>

            <div className="grid text-right">
              <div className="lg:col-5 md:col-5 sm:col-12">
                <Button className="btn btn-gray mr-2">Cancel</Button>
                <Button className="btn btn-orange ml-1 mr-1">
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddAffiliate;
