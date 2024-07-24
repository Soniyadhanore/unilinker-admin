/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Button } from "react-bootstrap";
import {
  buttonStatus,
  slotTimeValidation,
  generateHours,
  convertTimeTo12Hour,
} from "../../common/HelperFunctions";
import FormSelect from "react-bootstrap/FormSelect";

const AddEditWeeklySlots = ({
  open,
  onClose,
  setStep2Data,
  step2Data,
  prevShift,
  slotDay,
  shiftIndex,
  editShiftOpenPopup,
}) => {
  const [error, setError] = useState({ status: true });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [slots, setSlots] = useState({
    monday: [{ startTime: "", endTime: "" }],
    tuesday: [{ startTime: "", endTime: "" }],
    wednesday: [{ startTime: "", endTime: "" }],
    thursday: [{ startTime: "", endTime: "" }],
    friday: [{ startTime: "", endTime: "" }],
    saturday: [{ startTime: "", endTime: "" }],
    sunday: [{ startTime: "", endTime: "" }],
  });

  //check form is Edit or create
  useEffect(() => {
    if (prevShift) {
      let preSlots = JSON.stringify(prevShift?.slots);
      preSlots = JSON.parse(preSlots);
      let editSlot = preSlots[slotDay];

      if (editSlot?.length < 1) {
        editSlot.push({ startTime: "", endTime: "" });
        preSlots[slotDay] = editSlot;
      }
      setSlots(preSlots);
    }
  }, []);

  //handle close popup
  const handleClose = () => {
    onClose();
  };

  //handle delete time slot
  const addTimeSlot = (day) => {
    let allSlots = slots?.[day];
    let slot = [...allSlots];
    slot.push({ startTime: "", endTime: "" });
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

  //handle submit
  const handleSubmitSlot = () => {
    console.log("ajsdkajsdlasjd");
    let prevWeekData = step2Data?.weekly || [];

    let newWeeklyData = {
      ...prevShift,
      slots,
    };
    //if edit then update only shift index data else add new shift
    prevWeekData[shiftIndex] = newWeeklyData;
    setStep2Data((prev) => {
      return {
        ...prev,
        weekly: prevWeekData,
      };
    });
    handleClose();
  };

  //handle button disabled
  useEffect(() => {
    setButtonDisabled(
      buttonStatus(slots, {
        monday: slots?.monday?.length ? true : false,
        tuesday: slots?.tuesday?.length ? true : false,
        wednesday: slots?.wednesday?.length ? true : false,
        thursday: slots?.thursday?.length ? true : false,
        friday: slots?.friday?.length ? true : false,
        saturday: slots?.saturday?.length ? true : false,
        sunday: slots?.sunday?.length ? true : false,
      })
    );
  }, [slots]);
  //check validation for slots
  useEffect(() => {
    const validation = slotTimeValidation(slots);
    console.log(validation);
    if (validation.status == false) {
      setButtonDisabled(true);
    }
    setError(validation);
  }, [slots]);

  return (
    <>
      {/* weekly day edit slots */}
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: "450px" }}
        className=" m-auto"
      >
        <div className="w-full max-w-[588px] p-3">
          <div className="flex justify-content-between mb-[12px]">
            <p className="text-[16px] font-semibold mb-0">
              {prevShift?.shiftName}
            </p>

            <i className="pi pi-times cursor-pointer" onClick={handleClose} />
          </div>
          <p className="text-[14px] text-gray-700 font-normal">
            Your editing only this Days shift only to set regular shift go to{" "}
            <span
              className="underline font-semibold cursor-pointer"
              onClick={editShiftOpenPopup}
            >
              shift edit
            </span>
          </p>
          {/* Weekly Shift start */}
          {/* ============================================================== */}
          {slots[slotDay]?.map((slot, index) => {
            return (
              <div
                key={index}
                className="flex gap-3 align-items-center mb-[20px] mt-3"
              >
                <div className="relative w-full max-w-140">
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
                    {generateHours(30).map((hour, index2) => (
                      <option
                        key={`${slotDay}-start-${index}-${index2}`}
                        value={hour}
                      >
                        {convertTimeTo12Hour(hour)}
                      </option>
                    ))}
                  </FormSelect>
                  {error?.["startTime"]?.[slotDay]?.[index] ? (
                    <div className="red-error absolute left-0 bottom-[-16px] text-red-700">
                      {error?.["startTime"]?.[slotDay]?.[index]?.message}
                    </div>
                  ) : null}
                </div>
                <div className="relative w-full max-w-140">
                  <FormSelect
                    value={slot?.endTime}
                    onChange={(e) => {
                      let daySlot = [...slots[slotDay]];
                      daySlot[index].endTime = e.target.value;
                      console.log(daySlot);
                      setSlots((prev) => {
                        return {
                          ...prev,
                          [slotDay]: daySlot,
                        };
                      });
                    }}
                  >
                    {generateHours(30).map((hour, index2) => (
                      <option
                        key={`${slotDay}-start-${index}-${index2}`}
                        value={hour}
                      >
                        {convertTimeTo12Hour(hour)}
                      </option>
                    ))}
                  </FormSelect>
                  {error?.["endTime"]?.[slotDay]?.[index] ? (
                    <div className="red-error absolute left-0 bottom-[-16px] text-red-700">
                      {error?.["endTime"]?.[slotDay]?.[index]?.message}
                    </div>
                  ) : null}
                </div>
                {index !== 0 && (
                  <i
                    className="pi pi-trash"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      deleteTimeSlot(slotDay, index);
                    }}
                  />
                )}
              </div>
            );
          })}
          {slots[slotDay]?.length > 0 ? (
            <span
              onClick={() => {
                addTimeSlot(slotDay);
              }}
              className="mt-3 block"
              style={{ color: "#006491", fontWeight: "600", cursor: "pointer" }}
            >
              <i className="pi pi-plus mr-2" />
              Add More
            </span>
          ) : (
            <span>Closed</span>
          )}
          {/* ============================================================== */}

          {/* Weekly Shift end */}
        </div>
        <div className="flex justify-content-end align-end px-3 pb-3">
          <Button className="btn btn-gray mr-1" onClick={handleClose}>Cancel</Button>
          <Button
            className="btn btn-orange ml-1 mr-1"
            disabled={buttonDisabled}
            onClick={handleSubmitSlot}
          >
            Save
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default AddEditWeeklySlots;
