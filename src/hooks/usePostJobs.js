import { API_ROUTES } from "../common/Enum";
import globalRequest from "../prototype/globalRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeLoader } from "../redux/reducers/loader";
import { setSnackbar } from "../redux/reducers/snackbar";

export const usePostJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //convert date format =>14/05/2024 to 2024-05-14
  const changeDateFormat = (dateData, type = "weekly") => {
    let date = dateData;
    if (!date) return date;

    if (type === "custom") {
      date = date.split("/").reverse().join("-");
    }
    const givenDate = new Date(date);
    return `${givenDate.getFullYear()}-${(givenDate.getMonth() + 1).toString().padStart(2, "0")}-${givenDate.getDate().toString().padStart(2, "0")}`;
    // return new Date(date)
    //   .toISOString()
    //   .split("T")[0];
  };

  function convertData(originalData, type = "weekly") {
    return originalData.map((shift) => {
      let { shiftName, vacancies, startDate, endDate, slots } = shift;

      // Convert slots object into array
      let convertedSlots;
      if (type === "custom") {
        convertedSlots = Object.keys(slots).map((day) => ({
          key: changeDateFormat(day, type),
          data: slots[day],
        }));

        // to get start and end date for custom schedule
        // const keys = Object.keys(slots);
        // startDate = keys[0];
        // endDate = keys[keys.length - 1];
      } else {
        convertedSlots = Object.keys(slots).map((day) => ({
          key: day,
          data: slots[day],
        }));
      }

      return {
        shiftName,
        vacancies,
        startDate: changeDateFormat(startDate, type),
        endDate: changeDateFormat(endDate, type),
        slots: convertedSlots,
      };
    });
  }

  const postJob = async (formData) => {
    //make team id comma separated
    let teamIds = formData?.teamIds?.map((team) => team.code).join(",");
    //format the schedule
    let convertedData;
    if (formData?.scheduleType == "full-time") {
      convertedData = [
        {
          startDate: changeDateFormat(formData?.fullTime?.startDate),
          endDate: changeDateFormat(formData?.fullTime?.endDate),
          vacancies: formData?.fullTime?.vacancies,
        },
      ];
    }
    if (formData?.scheduleType == "weekly") {
      convertedData = convertData(formData?.weekly, "weekly");
    }
    if (formData?.scheduleType == "custom") {
      convertedData = convertData(formData?.custom, "custom");
    }

    let data = {
      //step-1
      company_id: +formData?.companyId,
      employee_id: +formData?.employeeId,
      area_of_work_id: +formData?.areaOfWork,
      degree_of_specialization: formData?.degreeOfSpecialization,
      job_title: formData?.jobTitle,
      job_description: formData?.jobDescription,
      work_mode: formData?.workMode,
      job_address: formData?.jobAddress,
      job_city: formData?.job_city, //not required
      job_country: formData?.job_country, //not required
      job_latitude: formData?.lat,
      job_longitude: formData?.lng,
      location_id: +formData?.district,
      geofencing_radius: +formData?.geoRadius,
      schedule_type: formData?.scheduleType,
      //step-2
      schedule: convertedData,//JSON.stringify(convertedData),
      //step-3
      payment_frequency: formData?.payment_frequency,
      amount: +formData?.amount,
      how_to_pay_student: formData?.how_to_pay_student,
      benefits: formData?.benefits, // not mentioned in the postman
      type_of_applicant: formData?.type_of_applicant,
      teams: teamIds,
    };
    dispatch(changeLoader(true));
    try {
      const res = await globalRequest(
        API_ROUTES?.CREATE_JOB,
        "post",
        data,
        {},
        true
      );
      if (res?.ack === 1) {
        dispatch(
          setSnackbar({
            isOpen: true,
            message: "Job is successfully posted",
            state: "success",
          })
        );
        navigate(`/job-management`);
      }
    } catch (err) {
      console.error("error", err?.response?.data);
      dispatch(
        setSnackbar({
          isOpen: true,
          message: err?.response?.data?.message,
          state: "error",
        })
      );
    } finally {
      dispatch(changeLoader(false));
    }
  };

  return { postJob };
};
