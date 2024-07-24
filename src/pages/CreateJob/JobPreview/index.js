import React from "react";
import PropTypes from "prop-types";
import JobPreviewWeekly from "./JobPreviewWeekly";

const PreviewJob = ({ postJobData }) => {
  const { step1Data, step2Data, step3Data, areaOfWorkList } = postJobData;
  const changeDateFormat = (date) => {
    if (!date) return date;
    const givenDate = new Date(date);
    return `${givenDate.getFullYear()}-${(givenDate.getMonth() + 1).toString().padStart(2, "0")}-${givenDate.getDate().toString().padStart(2, "0")}`;

    // return new Date(date).toISOString().split("T")[0];
  };

  function findLabelByValue(value) {
    const foundItem = areaOfWorkList?.find((item) => item.code == value);
    return foundItem ? foundItem.name : null;
  }

  return (
    <>
      <div className="text-center ">
        <h4 className="h4 my-3  ">Preview Job</h4>
      </div>
      <div className="flex flex-column self-stretch items-center gap-4">
        {/* step-1 */}
        <div className="w-full bg-white-A700">
          <div className="p-3 bg-blue-50 ">
            <h4 className="h4 mb-0  ">Basic Info</h4>
          </div>
          <div className="p-3">
            <div className="grid">
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Degree Of Specialization</h5>
                  </div>
                  <div className="formField-details">
                    <h6>{step1Data?.degreeOfSpecialization?.name}</h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Work area</h5>
                  </div>
                  <div className="formField-details">
                    <h6>{findLabelByValue(step1Data?.areaOfWork.code)}</h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Job Title</h5>
                  </div>
                  <div className="formField-details">
                    <h6>{step1Data?.jobTitle}</h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Work Mode</h5>
                  </div>
                  <div className="formField-details">
                    <h6>{step1Data?.workMode?.code}</h6>
                  </div>
                </div>
              </div>              
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Job Address</h5>
                  </div>
                  <div className="formField-details">
                    <h6>{step1Data?.jobAddress}</h6>
                  </div>
                </div>
              </div>              
              {/* {step1Data?.jobAddress && (
                <div className="lg:col-6 md:col-12 sm:col-12">
                  <div className="formField-view my-0">
                    <div className="formField-heading">
                      <h5>Work Mode</h5>
                    </div>
                    <div className="formField-details">
                      <h6>{step1Data?.workMode?.code}</h6>
                    </div>
                  </div>
                </div>
              )} */}
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Schedule Type</h5>
                  </div>
                  <div className="formField-details">
                    <h6>{step1Data?.scheduleType.name}</h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Job Description</h5>
                  </div>
                  <div className="formField-details">
                    {step1Data?.jobDescription ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: step1Data?.jobDescription,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* step-2 */}
        <div className="w-full bg-white-A700">
          <div className="p-3 bg-blue-50 ">
            <h4 className="h4 mb-0  ">Schedule</h4>
          </div>
          <div className="p-3">
            {step1Data?.scheduleType.code == "full-time" ? (
              <div className="grid">
                <div className="lg:col-6 md:col-12 sm:col-12">
                  <div className="formField-view my-0">
                    <div className="formField-heading">
                      <h5>Start Date</h5>
                    </div>
                    <div className="formField-details">
                      <h6>
                        {step2Data?.fullTime?.startDate
                          ? changeDateFormat(step2Data?.fullTime?.startDate)
                          : "-"}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="lg:col-6 md:col-12 sm:col-12">
                  <div className="formField-view my-0">
                    <div className="formField-heading">
                      <h5>End Date</h5>
                    </div>
                    <div className="formField-details">
                      <h6>
                        {step2Data?.fullTime?.endDate
                          ? changeDateFormat(step2Data?.fullTime?.endDate)
                          : "-"}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="lg:col-6 md:col-12 sm:col-12">
                  <div className="formField-view my-0">
                    <div className="formField-heading">
                      <h5>Vacancies</h5>
                    </div>
                    <div className="formField-details">
                      <h6>{step2Data?.fullTime?.vacancies}</h6>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <JobPreviewWeekly
                step2Data={step2Data}
                scheduleType={step1Data?.scheduleType.code}
              />
            )}
          </div>
        </div>

        {/* step-3 */}
        <div className="w-full bg-white-A700">
          <div className="p-3 bg-blue-50 ">
            <h4 className="h4 mb-0  ">Other Info</h4>
          </div>
          <div className="p-3">
            <div className="grid">
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Payment Frequency</h5>
                  </div>
                  <div className="formField-details">
                    <h6>{step3Data?.payment_frequency?.name}</h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Amount</h5>
                  </div>
                  <div className="formField-details">
                    <h6>{step3Data?.amount ? step3Data?.amount : "-"}</h6>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>How to pay students</h5>
                  </div>
                  <div className="formField-details">
                    <h6>{step3Data?.how_to_pay_student?.name}</h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Type of Applicants</h5>
                  </div>
                  <div className="formField-details">
                    <h6>{step3Data?.type_of_applicant?.name}</h6>
                  </div>
                </div>
              </div>
              <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="formField-view my-0">
                  <div className="formField-heading">
                    <h5>Benefits</h5>
                  </div>
                  <div className="formField-details">
                    {step3Data?.benefits ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: step3Data?.benefits,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
              {step3Data?.teamIds?.length > 0 && (
                <div className="lg:col-6 md:col-12 sm:col-12">
                  <div className="formField-view my-0">
                    <div className="formField-heading">
                      <h5>Teams</h5>
                    </div>
                    <div className="formField-details flex" >
                      
                        {step3Data?.teamIds?.map((team, index) => {
                          return (
                            <span
                              key={index}
                              className="bg-gray-100 px-3 py-1 rounded-2xl mr-2 mb-2"
                            >
                              {team?.name}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PreviewJob;
PreviewJob.propTypes = {
  setOpenPreview: PropTypes.func,
  postJobData: PropTypes.object,
  setValue: PropTypes.func,
};
