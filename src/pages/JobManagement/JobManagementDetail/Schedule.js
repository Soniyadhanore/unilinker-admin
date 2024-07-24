import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Divider } from "primereact/divider";
import PropTypes from "prop-types";
import {
  capitalizeFirstLetter,
  formatDateFunction,
  getDayOfWeek,
} from "../../../common/HelperFunctions";
import { timeShowValue } from "../../../common/constants";

export default function Schedule({ jobShifts,jobType }) {
  return (
    <>
      <div className="mt-3 px-4">
        <h6 className="font-semibold text-lg">Schedule</h6>
      </div>
      <div className="px-4  schedule-timing">
        <Accordion activeIndex={0}>
          {jobShifts?.map((item, index) => {
            let shift_scheduleStr =  (item?.shift_schedule && item?.shift_schedule!='') ? JSON.parse(item?.shift_schedule) : ''; 
            return (
              <AccordionTab
                key={index}
                header={
                  <>
                    <h6 className="mb-2">
                      {capitalizeFirstLetter(item?.shift_name)}
                    </h6>
                    <p>
                      Vacancies: {item?.no_of_vacancies} -{" "}
                      {formatDateFunction(item?.start_date, "dd/mm/yyyy")} { item?.end_date ? ' to '+formatDateFunction(item?.end_date, "dd/mm/yyyy") : ' '}
                    </p>
                  </>
                }
              >
                {(item?.shift_schedule && item?.shift_schedule!='') &&
                  shift_scheduleStr?.map((slot, slotIndex) => {
                    return (
                      <>
                        <div
                          className="flex justify-content-between p-2"
                          key={slotIndex}
                        >
                          <h6> { jobType==='custom' ? getDayOfWeek(slot?.key) : '' }  { capitalizeFirstLetter(slot?.key)}</h6>
                          {slot?.data.map((row, ind) => {
                            return (
                              <h6 key={ind}>
                                {" "}
                                {timeShowValue[row.startTime]}  { timeShowValue[row.endTime] ? ' - '+ timeShowValue[row.endTime] : ''}
                              </h6>
                            )
                          })}
                        </div>
                        <Divider className="mt-0 mb-1" />
                      </>
                    );
                  })}
              </AccordionTab>
            );
          })}
          {/* <AccordionTab
            header={
              <>
                <h6 className="mb-2">Afternoon Shift</h6>
                <p>Vacancies: 5 - 01/03/2024 to 31/03/2024</p>
              </>
            }
          >
            <div className="flex justify-content-between p-2">
              <h6>Fri, 01/03/2024</h6>
              <h6>10:00 AM - 08:00 PM</h6>
            </div>
            <Divider className="mt-0 mb-1" />
            <div className="flex justify-content-between p-2">
              <h6>Mon, 01/03/2024</h6>
              <h6>10:00 AM - 08:00 PM</h6>
            </div>
            <Divider className="mt-0 mb-1" />
            <div className="flex justify-content-between p-2">
              <h6>Wed, 01/03/2024</h6>
              <h6>10:00 AM - 08:00 PM</h6>
            </div>
            <Divider className="mt-0 mb-1" />
            <div className="flex justify-content-between p-2">
              <h6>Thu, 01/03/2024</h6>
              <h6>10:00 AM - 08:00 PM</h6>
            </div>
          </AccordionTab> */}
          {/* <AccordionTab
            header={
              <>
                <h6 className="mb-2">Evening Shift</h6>
                <p>Vacancies: 5 - 01/03/2024 to 31/03/2024</p>
              </>
            }
          >
            <div className="flex justify-content-between p-2">
              <h6>Fri, 01/03/2024</h6>
              <h6>10:00 AM - 08:00 PM</h6>
            </div>
            <Divider className="mt-0 mb-1" />
            <div className="flex justify-content-between p-2">
              <h6>Mon, 01/03/2024</h6>
              <h6>10:00 AM - 08:00 PM</h6>
            </div>
            <Divider className="mt-0 mb-1" />
            <div className="flex justify-content-between p-2">
              <h6>Wed, 01/03/2024</h6>
              <h6>10:00 AM - 08:00 PM</h6>
            </div>
            <Divider className="mt-0 mb-1" />
            <div className="flex justify-content-between p-2">
              <h6>Thu, 01/03/2024</h6>
              <h6>10:00 AM - 08:00 PM</h6>
            </div>
          </AccordionTab> */}
        </Accordion>
      </div>
    </>
  );
}

Schedule.propTypes = {
  jobShifts: PropTypes.object.isRequired,
  jobType: PropTypes.string.isRequired
};
