import React, { useState } from "react";
import EmptyComponent from "../../EmptyComponent/EmptyComponent";
import { Calendar } from "primereact/calendar";

export default function JobRequestEffectiveness() {
  const [date, setDate] = useState(null);
  return (
    <>
     <div className="jobContent px-4">
      <div className="grid">
          <div className="lg:col-3 md:col-3 sm:col-12">
            <div className="formField">
              <h6>Filter By</h6>
              <span className="p-float-label">
                <Calendar
                  value={date}
                  onChange={(e) => setDate(e.value)}
                  showIcon
                />
              </span>
            </div>
          </div>
        </div>
        </div>
        <EmptyComponent noDataMessage="No Data Found"/>
    </>
  );
}
