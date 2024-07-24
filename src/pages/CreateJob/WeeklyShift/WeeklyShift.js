/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import AddShift from "./Modals/AddShift";
import AddEditWeeklySlots from "../../../Modals/AddEditWeeklySlots";
import { formatDateFunction } from "../../../common/HelperFunctions"

function WeeklyShift({ setStep2Data, step2Data }) {

  const [addShift, setAddShift] = useState(false);
  const [editShift, setEditShift] = useState(false);
  const [editShiftData, setEditShiftData] = useState(null);
  const [addWeeklySlotShow, setAddWeeklySlotShow] = useState(false);
  const [prevShiftDayIndex, setPrevShiftDayIndex] = useState(null);

  const handleAddShift = () => {
    setAddShift(true);
  };

  const handleAddShiftClose = () => {
    setAddShift(false);
  };

  const handleDuplicateShift = (shiftIndex) => {
    let prevWeeklyData = [...step2Data.weekly];
    //make new shift name logic

    let newShiftData = {
      ...prevWeeklyData[shiftIndex],
      shiftName: `${prevWeeklyData[shiftIndex]?.shiftName}_1`,
    };

    prevWeeklyData.push(newShiftData);

    setStep2Data((prev) => {
      return {
        ...prev,
        weekly: prevWeeklyData,
      };
    });
  };

  const handleDeleteShift = (shiftIndex) => {
    let prevWeeklyData = [...step2Data.weekly];

    prevWeeklyData?.splice(shiftIndex, 1);
    setStep2Data((prev) => {
      return {
        ...prev,
        weekly: prevWeeklyData,
      };
    });
  };
  
  return (
    <>
      <div className="vertical-tab-content" style={{ width: "688px" }}>
        <div className="w-full">
          <div className="mb-0">
            <p className="text-[16px] font-semibold mb-[8px]">
              Schedule
            </p>
            <p className="text-[14px] text-gray-700 font-normal">
            Define the schedule exactly how you want it to be displayed for applicants.
            </p>
          </div>
        </div>
      </div>

      {step2Data?.weekly?.map((shift, shiftIndex) =>
        <div className="vertical-tab-content" style={{ width: "688px", marginBottom: "20px" }}
          key={`shift-${shiftIndex}`}
        >
        <div className="custom-weekly">
          <div className="content">
            <div className="title">{shift?.shiftName ? shift?.shiftName : ""}</div>
            <div className="details">
              <div className="info">Vacancies: {shift?.vacancies}</div>
              <div className="dot" />
              <div className="info">{formatDateFunction(shift?.startDate)} to {formatDateFunction(shift?.endDate)}</div>
            </div>
            {/* formatDateFunction */}
          </div>
          <div className="actions">
            <i className="pi pi-pencil"
              onClick={() => {
                setEditShiftData({
                  shift: shift,
                  shiftIndex: shiftIndex,
                });
                setEditShift(true);
              }}
            />
            <i className="pi pi-copy"
            onClick={() => {
              handleDuplicateShift(shiftIndex);
            }}
            />
            <i className="pi pi-trash"
             onClick={() => {
              handleDeleteShift(shiftIndex);
            }}
            />
          </div>
        </div>

        <div className="tableContent weekly-table">
          <Table bordered responsive className="m-0">
            <thead>
              <tr>
                <th className="text-center">Mon</th>
                <th className="text-center">Tue</th>
                <th className="text-center">Wed</th>
                <th className="text-center">Thu</th>
                <th className="text-center">Fri</th>
                <th className="text-center">Sat</th>
                <th className="text-center">Sun</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              {Object.entries(shift?.slots).map(
                ([slotDay, slotArray], dayIndex) => {
                  return (
                    <td className="text-center" key={dayIndex + slotDay}>
                      {slotArray?.map((timeSlot, slotIndex) => {
                         return (
                          <>
                            <p key={slotIndex} style={{
                              marginBottom: "8px",
                              padding:'2px 8px',
                              borderRadius: '4px',
                              background: "#E5F2FF",
                            }}>
                              {timeSlot?.startTime} - {timeSlot?.endTime}
                            </p>
                          </>
                         );
                       })}
                        <p
                         className="cursor-pointer on-hover"
                         onClick={() => {
                           setPrevShiftDayIndex(slotDay);
                           setEditShiftData({
                             shift: shift,
                             shiftIndex: shiftIndex,
                           });
                           setAddWeeklySlotShow(true);
                         }}
                       >
                        + Add
                       </p>
                    </td>
                  );
                }
              )}
              </tr>
            </tbody>
          </Table>
        </div>
      </div>)}

      <Button className="m-4 btn-orange" >
        <span onClick={() => handleAddShift()}>
          Add Shift
        </span>
      </Button>

      {addShift && (
        <AddShift
          onClose={handleAddShiftClose}
          setStep2Data={setStep2Data}
          step2Data={step2Data}
        />
      )}

      {editShift && editShiftData ? (
        <AddShift
          onClose={() => {
            setEditShift(false);
            setEditShiftData(null);
          }}
          isEdit={editShiftData ? true : false}
          setStep2Data={setStep2Data}
          step2Data={step2Data}
          editShiftData={editShiftData?.shift}
          shiftIndex={editShiftData?.shiftIndex}
        />
      ) : null}

{addWeeklySlotShow && (
        <AddEditWeeklySlots
          open={addWeeklySlotShow}
          onClose={() => {
            setAddWeeklySlotShow(false);
          }}
          setStep2Data={setStep2Data}
          step2Data={step2Data}
          prevShift={editShiftData?.shift}
          shiftIndex={editShiftData?.shiftIndex}
          slotDay={prevShiftDayIndex}
          editShiftOpenPopup={() => {
            setEditShift(true);
            setAddWeeklySlotShow(false);
          }}
        />
      )}

    </>
  );
}

export default WeeklyShift;
