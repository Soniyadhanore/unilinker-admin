/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
const TimeType = [
  { name: "10:00 AM", code: "10:00 AM" },
  { name: "10:00 AM", code: "10:00 AM" },
  { name: "10:00 AM", code: "10:00 AM" },
];
function AddShift(props) {
  const [date, setDate] = useState(null);
  const { show, onHide } = props;
  const [showSecondDialog, setShowSecondDialog] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedCity, setSelectedCity] = useState();
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };
  const handleContinue = () => {
    setShowSecondDialog(true);
    onHide(true);
  };

  const handleHide = () => {
    setShowSecondDialog(false);
  };
  return (
    <>
      {/* weekly step1  */}
      <Dialog
        visible={show}
        onHide={onHide}
        draggable={false}
        style={{ width: "600px" }}
        className="delete-modal"
        header={
          <>
            <p className="m-0">Shift - 1</p>
            <h6>
              Set weekly shifts. Changes saved will apply to all upcoming shifts
              for the selected period.
            </h6>
          </>
        }
      >
        <div className="grid">
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <div className="">
                <label htmlFor="username">Shift Name</label>
                <InputText />
              </div>
              <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                error
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <div className="">
                <label htmlFor="username">Vacancies</label>
                <div className="in-decremnt">
                  <button
                    style={{ borderRight: "1px solid #ced4da" }}
                    onClick={decrement}
                  >
                    -
                  </button>
                  <span>{count}</span>
                  <button
                    style={{ borderLeft: "1px solid #ced4da" }}
                    onClick={increment}
                  >
                    +
                  </button>
                </div>
              </div>
              <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                error
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <h6>Start Date 1</h6>
              <span className="p-float-label">
                <Calendar
                  value={date}
                  minDate={new Date()}
                  onChange={(e) => setDate(e.value)}
                  showIcon
                  className="p-calender-lerge"
                />
              </span>
              <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                Start Date error
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <h6>End Date</h6>
              <span className="p-float-label">
                <Calendar
                  value={date}
                  minDate={new Date()}
                  onChange={(e) => setDate(e.value)}
                  showIcon
                  className="p-calender-lerge"
                />
              </span>
              <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                End Date error
              </div>
            </div>
          </div>
        </div>
        <div className=" text-right">
          <Button className="btn btn-orange ml-1 mr-1" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </Dialog>
      {/* weekly step-2 */}
      <Dialog
        visible={showSecondDialog}
        onHide={handleHide}
        draggable={false}
        style={{ width: "600px" }}
        className="delete-modal"
        header={
          <>
            <p className="m-0">Morning Shift</p>
            <h6>
              Set weekly shifts. Changes saved will apply to all upcoming shifts
              for the selected period.
            </h6>
          </>
        }
      >
        <div className="grid mb-3">
          <div className="lg:col-4 md:col-4 sm:col-12">
            <div className="formField mt-2">
              <div className="flex align-items-center">
                <Checkbox inputId="ingredient1" />
                <label htmlFor="ingredient1" className="ml-2">
                  Monday
                </label>
              </div>
            </div>
          </div>
          <div className="lg:col-7 md:col-7 sm:col-12">
            <div style={{ display: "flex" }}>
              <div className="formField minwidth125 mb-0">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
              <div className="formField minwidth125 mb-0 ml-2">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
            </div>
            <span
              style={{ color: "#006491", fontWeight: "600", cursor: "pointer" }}
            >
              <i className="pi pi-plus mr-2" />
              Add More
            </span>
          </div>
          <div className="lg:col-1 md:col-1 sm:col-12">
            <div className="formField mt-3">
              <i className="pi pi-trash" style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
        <div className="grid mb-3">
          <div className="lg:col-4 md:col-4 sm:col-12">
            <div className="formField mt-2">
              <div className="flex align-items-center">
                <Checkbox inputId="ingredient2" />
                <label htmlFor="ingredient1" className="ml-2">
                  Tuesday
                </label>
              </div>
            </div>
          </div>
          <div className="lg:col-7 md:col-7 sm:col-12">
            <div style={{ display: "flex" }}>
              <div className="formField minwidth125 mb-0">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
              <div className="formField minwidth125 mb-0 ml-2">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
            </div>
            <span
              style={{ color: "#006491", fontWeight: "600", cursor: "pointer" }}
            >
              <i className="pi pi-plus mr-2" />
              Add More
            </span>
          </div>
          <div className="lg:col-1 md:col-1 sm:col-12">
            <div className="formField mt-3">
              <i className="pi pi-trash" style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
        <div className="grid mb-3">
          <div className="lg:col-4 md:col-4 sm:col-12">
            <div className="formField mt-2">
              <div className="flex align-items-center">
                <Checkbox inputId="ingredient3" />
                <label htmlFor="ingredient1" className="ml-2">
                  Wednesday
                </label>
              </div>
            </div>
          </div>
          <div className="lg:col-7 md:col-7 sm:col-12">
            <div style={{ display: "flex" }}>
              <div className="formField minwidth125 mb-0">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
              <div className="formField minwidth125 mb-0 ml-2">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
            </div>
            <span
              style={{ color: "#006491", fontWeight: "600", cursor: "pointer" }}
            >
              <i className="pi pi-plus mr-2" />
              Add More
            </span>
          </div>
          <div className="lg:col-1 md:col-1 sm:col-12">
            <div className="formField mt-3">
              <i className="pi pi-trash" style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
        <div className="grid mb-3">
          <div className="lg:col-4 md:col-4 sm:col-12">
            <div className="formField mt-2">
              <div className="flex align-items-center">
                <Checkbox inputId="ingredient4" />
                <label htmlFor="ingredient1" className="ml-2">
                  Thursday
                </label>
              </div>
            </div>
          </div>
          <div className="lg:col-7 md:col-7 sm:col-12">
            <div style={{ display: "flex" }}>
              <div className="formField minwidth125 mb-0">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
              <div className="formField minwidth125 mb-0 ml-2">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
            </div>
            <span
              style={{ color: "#006491", fontWeight: "600", cursor: "pointer" }}
            >
              <i className="pi pi-plus mr-2" />
              Add More
            </span>
          </div>
          <div className="lg:col-1 md:col-1 sm:col-12">
            <div className="formField mt-3">
              <i className="pi pi-trash" style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
        <div className="grid mb-3">
          <div className="lg:col-4 md:col-4 sm:col-12">
            <div className="formField mt-2">
              <div className="flex align-items-center">
                <Checkbox inputId="ingredient5" />
                <label htmlFor="ingredient1" className="ml-2">
                  Friday
                </label>
              </div>
            </div>
          </div>
          <div className="lg:col-7 md:col-7 sm:col-12">
            <div style={{ display: "flex" }}>
              <div className="formField minwidth125 mb-0">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
              <div className="formField minwidth125 mb-0 ml-2">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
            </div>
            <span
              style={{ color: "#006491", fontWeight: "600", cursor: "pointer" }}
            >
              <i className="pi pi-plus mr-2" />
              Add More
            </span>
          </div>
          <div className="lg:col-1 md:col-1 sm:col-12">
            <div className="formField mt-3">
              <i className="pi pi-trash" style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
        <div className="grid mb-3">
          <div className="lg:col-4 md:col-4 sm:col-12">
            <div className="formField mt-2">
              <div className="flex align-items-center">
                <Checkbox inputId="ingredient6" />
                <label htmlFor="ingredient1" className="ml-2">
                  Saturday
                </label>
              </div>
            </div>
          </div>
          <div className="lg:col-7 md:col-7 sm:col-12">
            <div style={{ display: "flex" }}>
              <div className="formField minwidth125 mb-0">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
              <div className="formField minwidth125 mb-0 ml-2">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
            </div>
            <span
              style={{ color: "#006491", fontWeight: "600", cursor: "pointer" }}
            >
              <i className="pi pi-plus mr-2" />
              Add More
            </span>
          </div>
          <div className="lg:col-1 md:col-1 sm:col-12">
            <div className="formField mt-3">
              <i className="pi pi-trash" style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
        <div className="grid mb-3">
          <div className="lg:col-4 md:col-4 sm:col-12">
            <div className="formField mt-2">
              <div className="flex align-items-center">
                <Checkbox inputId="ingredient7" />
                <label htmlFor="ingredient1" className="ml-2">
                  Sunday
                </label>
              </div>
            </div>
          </div>
          <div className="lg:col-7 md:col-7 sm:col-12">
            <div style={{ display: "flex" }}>
              <div className="formField minwidth125 mb-0">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
              <div className="formField minwidth125 mb-0 ml-2">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
            </div>
            <span
              style={{ color: "#006491", fontWeight: "600", cursor: "pointer" }}
            >
              <i className="pi pi-plus mr-2" />
              Add More
            </span>
          </div>
          <div className="lg:col-1 md:col-1 sm:col-12">
            <div className="formField mt-3">
              <i className="pi pi-trash" style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
        <div className="grid mb-3">
          <div className="lg:col-4 md:col-4 sm:col-12">
            <div className="formField ">
              <div className="flex align-items-center">
                <Checkbox inputId="ingredient1" />
                <Calendar
                  value={date}
                  onChange={(e) => setDate(e.value)}
                  showIcon
                  className="p-calender-lerge ml-2"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-7 md:col-7 sm:col-12">
            <div style={{ display: "flex" }}>
              <div className="formField minwidth125 mb-0">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
              <div className="formField minwidth125 mb-0 ml-2">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
            </div>
            <span
              style={{ color: "#006491", fontWeight: "600", cursor: "pointer" }}
            >
              <i className="pi pi-plus mr-2" />
              Add More
            </span>
          </div>
          <div className="lg:col-1 md:col-1 sm:col-12 ">
            <div className="formField mt-3">
              <i className="pi pi-trash" style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
        <div className="grid mb-3">
          <div className="lg:col-4 md:col-4 sm:col-12">
            <div className="formField">
              <div className="flex align-items-center">
                <Checkbox inputId="ingredient1" />
                <Calendar
                  value={date}
                  onChange={(e) => setDate(e.value)}
                  showIcon
                  className="p-calender-lerge ml-2"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-7 md:col-7 sm:col-12">
            <div style={{ display: "flex" }}>
              <div className="formField minwidth125 mb-0">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
              <div className="formField minwidth125 mb-0 ml-2">
                <span className="p-float-label w-full">
                  <Dropdown
                    inputId="dd-Specialization"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={TimeType}
                    optionLabel="name"
                    className="w-full"
                  />
                </span>
              </div>
            </div>
            <span
              style={{ color: "#006491", fontWeight: "600", cursor: "pointer" }}
            >
              <i className="pi pi-plus mr-2" />
              Add More
            </span>
          </div>
          <div className="lg:col-1 md:col-1 sm:col-12">
            <div className="formField mt-3">
              <i className="pi pi-trash" style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
        <div className=" text-right">
          <Button className="btn btn-gray mr-1">Cancel</Button>
          <Button className="btn btn-orange ml-1 mr-1">Save</Button>
        </div>
      </Dialog>
     
    </>
  );
}

export default AddShift;
