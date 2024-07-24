/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button, Form } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { generateHours, convertTimeTo12Hour, slotTimeValidation, buttonStatus, capitalizeFirstLetter } from '../../../../common/HelperFunctions'
import FormSelect from 'react-bootstrap/FormSelect'
import { setSnackbar } from "../../../../redux/reducers/snackbar";
import { useDispatch } from "react-redux";

function AddShift({
  onClose,
  setStep2Data,
  step2Data,
  isEdit=false,
  shiftIndex=0,
  editShiftData
}) {
  const dispatch = useDispatch();
  const [weekStep1Popup, setWeekStep1Popup] = useState(true);
  const [weekStep2Popup, setWeekStep2Popup] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
 const [error, setError] = useState({ status: true });

  const [shiftData, setShiftData] = useState({
    shiftName: "",
    shiftNameError: '',
    vacancies: 1,
    vacanciesError: '',
    startDate: null,
    startDateError: '',
    endDate: null,
    endDateError: '',
  });

  const [slots, setSlots] = useState({
    monday: [{ startTime: '', endTime: '' }],
    tuesday: [{ startTime: '', endTime: '' }],
    wednesday: [{ startTime: '', endTime: '' }],
    thursday: [{ startTime: '', endTime: '' }],
    friday: [{ startTime: '', endTime: '' }],
    saturday: [{ startTime: '', endTime: '' }],
    sunday: [{ startTime: '', endTime: '' }],
  });

  useEffect(() => {
    if (isEdit && editShiftData) {
      setShiftData((prev) => {
        return {
          ...prev,
          shiftName: editShiftData?.shiftName,
          vacancies: editShiftData?.vacancies,
          startDate: editShiftData?.startDate,
          endDate: editShiftData?.endDate,
        };
      });
      setSlots(editShiftData?.slots);
    }
  }, []);

  const increment = () => {
    setShiftData({ ...shiftData, vacancies: shiftData.vacancies + 1, vacanciesError: '' });
  };

  const decrement = () => {
    if (shiftData.vacancies <= 1) return;
    setShiftData({ ...shiftData, vacancies: shiftData.vacancies - 1, vacanciesError: '' });
  };
  const handleContinue = () => {
    let isValid = true;
    let error = {
      shiftNameError: '',
      vacanciesError: '',
      startDateError: '',
      endDateError: '',
    };
    console.log(shiftData.shiftName.trim() == "");
    if (shiftData.shiftName.trim() == "") {
      error.shiftNameError = 'Shift name is required'
      isValid = false;
    }
    if (shiftData.vacancies <= 0) {
      error.vacanciesError = 'Vacancies is required'
      isValid = false;
    }
    if (!shiftData.startDate) {
      error.startDateError = 'Start date is required'
      isValid = false;
    }
    if (!shiftData.endDate) {
      error.endDateError = 'End date is required'
      isValid = false;
    }
    if (!isValid) {
      setShiftData({ ...shiftData, ...error });
      return;
    }

    setWeekStep2Popup(true);
    setWeekStep1Popup(false);
  };

  const backToStep1 = () => {
    setWeekStep1Popup(true);
    setWeekStep2Popup(false);
  };

  //handle delete time slot
  const addTimeSlot = (day) => {
    let allSlots = slots?.[day];
    let slot = [...allSlots];
    slot.push({ startTime: '', endTime: '' });
    setSlots((prev) => {
      return {
        ...prev,
        [day]: slot,
      };
    });
  };
  //handle delete time slot
  const deleteTimeSlot = (day, index) => {
    setSlots((prev) => {
      const updatedSlots = [...prev[day]];
      updatedSlots.splice(index, 1);
      return {
        ...prev,
        [day]: updatedSlots,
      };
    });
  };

  const handleDayCheckbox = (day) => {
    console.log(day);
    let daySlot = slots?.[day];
    setSlots((prev) => {
      return {
        ...prev,
        [day]: daySlot?.length > 0 ? [] : [{ startTime: "", endTime: "" }],
      };
    });
  };

  const handleSubmitSlot = () => {
    let error = "";
    for (const [key, value] of Object.entries(slots)) {
      if (value.length > 0) {
        value.forEach((slot) => {
          if (slot.startTime == "" || slot.endTime == "") {
            error = "Slot time is required";
          }
        })
      }
    }
    if (error) {
      dispatch(
        setSnackbar({
          isOpen: true,
          message: error,
          state: "error",
        })
      );
      return;
    }
    let prevWeekData = step2Data?.weekly || [];

    let newWeeklyData = {
      ...shiftData,
      slots,
    };
    //if edit then update only shift index data else add new shift
    if (isEdit) {
      prevWeekData[shiftIndex] = newWeeklyData;
    } else {
      prevWeekData?.push(newWeeklyData);
    }
    console.log(prevWeekData);
    setStep2Data((prev) => {
      return {
        ...prev,
        weekly: prevWeekData,
      };
    });
    onClose();
  };

  useEffect(() => {
    const validation = slotTimeValidation(slots);
    setButtonDisabled(false);
    if (validation.status == false) {
      setButtonDisabled(true);
    }
    setError(validation);
  }, [slots]);


  return (
    <>
      {/* weekly step1  */}
      <Dialog
        visible={weekStep1Popup}
        onHide={onClose}
        draggable={false}
        style={{ width: "600px" }}
        className="delete-modal"
        header={
          <>
            <p className="m-0">Shift</p>
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
                <InputText
                  value={shiftData.shiftName}
                  onChange={(e) => {
                    setShiftData({ ...shiftData, shiftName: e.target.value, shiftNameError: '' });
                  }}
                />
              </div>
              {shiftData?.shiftNameError !== '' &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                {shiftData?.shiftNameError}
              </div>}
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
                  > - </button>
                  <span>{shiftData?.vacancies}</span>
                  <button
                    style={{ borderLeft: "1px solid #ced4da" }}
                    onClick={increment}
                  > + </button>
                </div>
              </div>
              {shiftData?.vacanciesError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                {shiftData?.vacanciesError}
              </div>}
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <h6>Start Date</h6>
              <span className="p-float-label">
                <Calendar
                  minDate={new Date()}
                  value={shiftData.startDate}
                  onChange={(e) => {
                    setShiftData({ ...shiftData, startDate: e.value, startDateError: '' });
                  }}
                  showIcon
                  className="p-calender-lerge"
                />
              </span>
              {shiftData?.startDateError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                {shiftData?.startDateError}
              </div>}
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <h6>End Date</h6>
              <span className="p-float-label">
                <Calendar
                  minDate={new Date()}
                  value={shiftData.endDate}
                  onChange={(e) => {
                    setShiftData({ ...shiftData, endDate: e.value, endDateError: '' });
                  }}
                  showIcon
                  className="p-calender-lerge"
                />
              </span>
              {shiftData?.endDateError &&
                <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                {shiftData?.endDateError}
              </div>}
            </div>
          </div>
        </div>
        <div className=" text-right">
          <Button className="btn btn-orange ml-1 mr-1" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </Dialog>


      <Dialog
        visible={weekStep2Popup}
        onHide={backToStep1}
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
        {Object.entries(slots).map(([slotDay, slotArray], dayIndex) => (
          <div className="grid mb-3" key={dayIndex}>
            <div className="lg:col-4 md:col-4 sm:col-12">
              <div className="formField mt-2">
                <div className="flex align-items-center">
                  <Checkbox
                    inputId={`ingredient-${dayIndex}`}
                    checked={slotArray?.length > 0 ? true : false}
                    onChange={() =>  handleDayCheckbox(slotDay) }
                  />
                  <label htmlFor={`ingredient-${dayIndex}`} className="ml-2">
                    {capitalizeFirstLetter(slotDay)}
                  </label>
                </div>
              </div>
            </div>
            <div className="lg:col-7 md:col-7 sm:col-12">

             {slotArray?.map((slot, index) =>
              <div style={{ display: "flex"}} key={`${slotDay}-${index}`}>
                <div className="formField minwidth125 mb-0">
                  <span className="p-float-label w-full">
                    <FormSelect
                      
                      value={slot?.startTime}
                      onChange={(e) => {
                        let daySlot = [...slots[slotDay]];
                        daySlot[index].startTime = e.target.value;
                        setSlots((prev) => {
                          return {
                            ...prev,
                            [slotDay]: daySlot,
                          };
                        });
                      }}
                    >
                      <option key={`${slotDay}-start-${index}-0`} value={''}>Select start time</option>
                      {generateHours(30).map((hour, index2) =>
                        <option key={`${slotDay}-start-${index}-${index2}`} value={hour}>{convertTimeTo12Hour(hour)}</option>
                      )}
                    </FormSelect>
                  </span>
                  {error?.["startTime"]?.[slotDay]?.[index] ? (
                    <div className="red-error absolute left-0 bottom-[-16px] text-red-700">
                      {
                        error?.["startTime"]?.[slotDay]?.[index]
                          ?.message
                      }
                    </div>
                  ) : null}
                </div>
                <div className="formField minwidth125 mb-0 ml-2">
                  <span className="p-float-label w-full">
                  <FormSelect
                    value={slot?.endTime}
                    onChange={(e) => {
                      let daySlot = [...slots[slotDay]];
                      daySlot[index].endTime = e.target.value;
                      setSlots((prev) => {
                        return {
                          ...prev,
                          [slotDay]: daySlot,
                        };
                      });
                    }}
                  >
                    <option key={`${slotDay}-end-${index}-0`} value={''}>Select end time</option>
                      {generateHours(30).map((hour, index2) =>
                        <option key={`${slotDay}-end-${index}-${index2}`} value={hour}>{convertTimeTo12Hour(hour)}</option>
                      )}
                    </FormSelect>
                  </span>
                  {error?.["endTime"]?.[slotDay]?.[index] ? (
                    <div className="red-error absolute left-0 bottom-[-16px] text-red-700">
                      {error?.["endTime"]?.[slotDay]?.[index]?.message}
                    </div>
                  ) : null}
                </div>
                {index !== 0 && (
                <div
                  className="lg:col-1 md:col-1 sm:col-12"
                  onClick={() => deleteTimeSlot(slotDay, index) }
                >
                  <div className="formField ">
                    <i className="pi pi-trash" style={{cursor:"pointer"}}/>
                  </div>
                </div>)}
              </div>)}

              {slotArray?.length > 0 ? (
                <span
                  style={{ color: "#006491", fontWeight: "600", cursor:"pointer" }}
                  onClick={() => addTimeSlot(slotDay) }
                >
                  <i className="pi pi-plus mr-2" />
                  Add More
                </span>
              ) : <span>Closed</span>}
            </div>
          </div>
          ))}
        
        <div className=" text-right">
          <Button className="btn btn-gray mr-1" onClick={backToStep1}> Back </Button>
          <Button className="btn btn-orange ml-1 mr-1" onClick={handleSubmitSlot}
            disabled={buttonDisabled}
          >Save</Button>
        </div>
      </Dialog>

    </>
  );
}

export default AddShift;
