import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  convertTimeTo12Hour,
} from "../../../common/HelperFunctions";

const JobPreviewWeekly = ({ step2Data, scheduleType }) => {
  const { t } = useTranslation();
  const changeDateFormat = (dateData) => {
    let date = dateData;
    if (!date) return date;
    if (scheduleType === "custom") {
      date = new Date(date.split("/")[2], date.split("/")[1] - 1, date.split("/")[0]);
    }
    const givenDate = new Date(date);
    return `${givenDate.getFullYear()}-${(givenDate.getMonth() + 1).toString().padStart(2, "0")}-${givenDate.getDate().toString().padStart(2, "0")}`;

    // return new Date(date).toISOString().split("T")[0];
  };

  return (
    <>
      {scheduleType === "weekly" ? (
        <>
          {step2Data?.weekly?.map((shift, index) => {
            return (
              <div key={index} className="">
                <div className="p-4 mb-4 border border-bottom">
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <div>
                      <p className="text-gray-900_02 text-sm font-semibold mb-1">
                        Shift Name
                      </p>
                      <p className="text-gray-700 text-sm font-normal mb-0">
                        {shift?.shiftName ? shift?.shiftName : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-900_02 text-sm font-semibold mb-1">
                        Vacancies
                      </p>
                      <p className="text-gray-700 text-sm font-normal mb-0">
                        {shift?.vacancies}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-900_02 text-sm font-semibold mb-1">
                        Start Date
                      </p>
                      <p className="text-gray-700 text-sm font-normal mb-0">
                        {shift?.startDate
                          ? changeDateFormat(shift?.startDate)
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-900_02 text-sm font-semibold mb-1">
                        End Date
                      </p>
                      <p className="text-gray-700 text-sm font-normal mb-0">
                        {shift?.endDate
                          ? changeDateFormat(shift?.endDate)
                          : "-"}
                      </p>
                    </div>
                  </div>
                  {Object.entries(shift?.slots).map(
                    ([slotDay, slotArray], dayIndex) => {
                      if (slotArray?.length > 0)
                        return (
                          <div
                            key={dayIndex}
                            className="grid flex-wrap flex mt-3 gap-3"
                          >
                            <p className="capitalize text-sm mb-0">{slotDay}</p>
                            {slotArray?.map((timeSlot, slotIndex) => {
                              return (
                                <span key={slotIndex} className="text-sm">
                                  {convertTimeTo12Hour(timeSlot?.startTime)}-
                                  {convertTimeTo12Hour(timeSlot?.endTime)}
                                </span>
                              );
                            })}
                          </div>
                        );
                    }
                  )}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {step2Data?.custom?.map((shift, index) => {
            console.log(shift)
            return (
              <div key={index} className="">
                <div className="p-4 mb-4 border border-bottom">
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <div>
                      <p className="text-gray-900_02 text-sm font-semibold mb-1">
                        {t("postJob.shiftName")}
                      </p>
                      <p className="text-gray-700 text-sm font-normal mb-0">
                        {shift?.shiftName ? shift?.shiftName : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-900_02 text-sm font-semibold mb-1">
                        {t("postJob.startDate")}
                      </p>
                      <p className="text-gray-700 text-sm font-normal mb-0">
                        {shift?.startDate
                          ? changeDateFormat(shift?.startDate)
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-900_02 text-sm font-semibold mb-1">
                        {t("postJob.endDate")}
                      </p>
                      <p className="text-gray-700 text-sm font-normal mb-0">
                        {shift?.endDate
                          ? changeDateFormat(shift?.endDate)
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-900_02 text-sm font-semibold mb-1">
                        {t("postJob.vacancies")}
                      </p>
                      <p className="text-gray-700 text-sm font-normal mb-0">
                        {shift?.vacancies}
                      </p>
                    </div>
                  </div>
                  {Object.entries(shift?.slots).map(
                    ([slotDay, slotArray], dayIndex) => {
                      if (slotArray?.length > 0)
                        return (
                          <div
                            key={dayIndex}
                            className="grid flex-wrap flex mt-3 gap-3"
                          >
                            <p className="capitalize text-sm mb-0">
                              {slotDay}
                            </p>
                            {slotArray?.map((timeSlot, slotIndex) => {
                              return (
                                <span key={slotIndex} className="text-sm">
                                  {convertTimeTo12Hour(timeSlot?.startTime)}-
                                  {convertTimeTo12Hour(timeSlot?.endTime)}
                                </span>
                              );
                            })}
                          </div>
                        );
                    }
                  )}
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
export default JobPreviewWeekly;
JobPreviewWeekly.propTypes = {
  step2Data: PropTypes.func,
  scheduleType: PropTypes.string,
};
