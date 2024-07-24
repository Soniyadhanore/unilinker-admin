/**
 * this file contains all the global helper functions
 */

import { IMAGE_BASE_URL } from "../BaseUrl";

export const PAGIANTION =  10;

//validate email
export const validateEmail = (email) => {
    // Regular expression pattern for a valid email address
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Use test method to match the pattern against the email address
    return pattern.test(email);
};

//validate password
export const validatePassword = (password) => {
  // Check password length
  if (password.length < 8) {
    return false;
  }
  // Check if password has a mix of uppercase, lowercase letters, numbers and symbols
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// compare with current date
export const isSameDate = (dateString) => {
  const dateToCompare = new Date(dateString);
  const today = new Date();

  return (
    dateToCompare.getUTCFullYear() === today.getUTCFullYear() &&
    dateToCompare.getUTCMonth() === today.getUTCMonth() &&
    dateToCompare.getUTCDate() === today.getUTCDate()
  );
};

//format date
export const formatDateFunction = (
  inputDate,
  format = "dd/mm/yyyy",
  time = false
) => {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  let timeOfDate = ``;
  if (time) {
    let hours = date.getHours();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, "0");
    timeOfDate = ` ${hours}:${minutes} ${amOrPm}`;
  }

  if (format === "dd/mm/yyyy") {
    if (time) return `${day}/${month}/${year} ${timeOfDate}`;
    return `${day}/${month}/${year}`;
  } else if (format === "yyyy-mm-dd") {
    if (time) return `${year}-${month}-${day} ${timeOfDate}`;
    return `${year}-${month}-${day}`;
  } else if (format === "mm/dd/yyyy") {
    if (time) return `${month}/${day}/${year} ${timeOfDate}`;
    return `${month}/${day}/${year}`;
  } else if (format === "dd-mm-yyyy") {
    if (time) return `${day}-${month}-${year} ${timeOfDate}`;
    return `${day}-${month}-${year}`;
  }
};

//convert image to base64
export const image_to_base64 = async (file) => {
  let result_base64 = await new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => {
      console.error(error);
      // alert("An Error occurred please try again, File might be corrupt");
    };
    fileReader.readAsDataURL(file);
  });
  return result_base64;
};

//compress base64 image
export const reduce_image_file_size = async (
  base64Str,
  MAX_WIDTH = 650,
  MAX_HEIGHT = 650
) => {
  let resized_base64 = await new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL()); // this will return base64 image results after resize
    };
  });
  return resized_base64;
};

///manage image cropper
export const handleUploadImage = async (file) => {
  const original = file; //already base64
  //compressed image file
  let compressed = await reduce_image_file_size(original);
  //find the size of the original and compressed file
  const binaryDataCompressed = atob(compressed.split(",")[1]);
  const fileSizeMBCompressed = (
    binaryDataCompressed?.length /
    (1024 * 1024)
  ).toFixed(2);
  if (fileSizeMBCompressed <= 5) {
    // setselect_img(null);
    // await setExistingImages([...existingImages, singleImgObj]);
    return { res: "success", data: compressed };
  } else {
    return { res: "error", data: "File size should be less than 5MB" };
  }
};

export const capitalizeFirstLetter = (str) => {
  return  str && str!=='' ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};

export const calculateAge = (birthDateStr=0) => {
  const today = new Date();
    console.log('today',today,birthDateStr);
    if (birthDateStr){ 
      const [day, month, year] = birthDateStr.split('/').map(Number);
      // Create a new Date object for the birthdate
      const birthDate = new Date(year, month - 1, day); // month - 1 because months are zero-based in JavaScript

      // Calculate the difference in milliseconds
      const ageDiffMs = today - birthDate;

      // Convert the difference from milliseconds to years
      const ageDate = new Date(ageDiffMs); // Epoch reference
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

      return calculatedAge;
    }else return 0;

    
}

export const validateStringForName = (inputValue) => {
  inputValue = inputValue.replace(/[^A-Za-z\s]/g, "");
  if (inputValue) return inputValue;
};

export const handleInputChange1 = (inputValue) => {
  inputValue = inputValue.replace(/[^a-zA-Z0-9@.-]/g, "");
  if (inputValue) {
    return inputValue;
  }
};

export const removeCountryCode = (phoneNumber, countryCode) => {
  if (!phoneNumber || !countryCode) return phoneNumber;
  // Check if the phoneNumber starts with the countryCode
  if (phoneNumber.startsWith(countryCode)) {
    // Remove the countryCode from the phoneNumber
    return phoneNumber.slice(countryCode.length);
  } else {
    // Return the phoneNumber unchanged if countryCode is not found
    return phoneNumber;
  }
};

export const SHOW_IMG = (path)=>{
  return `${IMAGE_BASE_URL}${path}`
}

export const getFullAddress = (data) => {
  // Check for a successful response from the Geocoding API
  if (data?.status === "OK" && data?.results.length > 0) {
    const result = data.results[0];
    const addressComponents = result.address_components;

    // Define default values for city, state, and zipCode
    let city = "Unknown";
    let state = "Unknown";
    let zipCode = "Unknown";
    let country = "unknown";

    for (let i = 0; i < addressComponents.length; i++) {
      const component = addressComponents[i];
      const types = component.types;
      if (
        types.includes("locality") ||
        types.includes("administrative_area_level_2")
      ) {
        city = component.long_name;
      } else if (types.includes("administrative_area_level_1")) {
        state = component.long_name;
      } else if (types.includes("postal_code")) {
        zipCode = component.long_name;
      } else if (types.includes("country")) {
        country = component.long_name;
      }
    }

    // Extract the formatted address
    const formattedAddress = result.formatted_address;

    return {
      address: formattedAddress,
      city: city,
      state: state,
      zipCode: zipCode,
      country: country,
    };
  } else {
    console.log("Geocoding API request failed or no results found.");
  }
};

export const getTextLengthOfTextEditor = (text) => {
  if(!text) return ""
  // Remove HTML tags and newline characters and count remaining characters
  return text.replace(/<[^>]*>/g, "").replace(/\n/g, "").length;
};

//get day name from date
export const getDayOfWeek = (dateString, type = "short") => {
  if (!dateString) return null;
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysOfWeek2 = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [day, month, year] = dateString.split("/");
  const date = new Date(`${year}-${month}-${day}`);
  const dayOfWeekIndex = date.getDay();
  if (type === "full") return daysOfWeek2[dayOfWeekIndex];
  return daysOfWeek[dayOfWeekIndex];
};

export const slotTimeValidationForCustom = (slots) => {
  console.log("slots--", slots);
  const newObj1 = {};
  const newObj2 = {};

  for (const date in slots) {
    newObj1[date] = {};
    newObj2[date] = {};
  }
  let result = {
    status: true,
    startTime: { ...newObj1 },
    endTime: { ...newObj2 },
  };
  for (let key in slots) {
    let daySlots = slots[key];
    for (let i = 0; i < daySlots.length; i++) {
      if (daySlots[i].startTime !== "" && daySlots[i].endTime !== "") {
        let startTime =
          Number(daySlots[i].startTime?.split(":")[0]) +
          Number(daySlots[i].startTime?.split(":")[1]) / 60;
        let endTime =
          Number(daySlots[i].endTime?.split(":")[0]) +
          Number(daySlots[i].endTime?.split(":")[1]) / 60;
        if (startTime >= endTime) {
          result.status = false;
          result["endTime"][key][i] = {
            message: "Invalid time",
          };
        }
      }
      if (i > 0) {
        if (daySlots[i].startTime !== "") {
          let endTime2 =
            Number(daySlots[i - 1].endTime.split(":")[0]) +
            Number(daySlots[i - 1].endTime.split(":")[1]) / 60;
          let startTime =
            Number(daySlots[i].startTime.split(":")[0]) +
            Number(daySlots[i].startTime.split(":")[1]) / 60;
          if (endTime2 > startTime) {
            result.status = false;
            result["startTime"][key][i] = {
              message: "Invalid time",
            };
          }
        }
      }
    }
  }
  return result;
};

export const slotTimeValidation = (slots) => {
  let result = {
    status: true,
    startTime: {
      sunday: {},
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
    },
    endTime: {
      sunday: {},
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
    },
  };
  for (let key in slots) {
    let daySlots = slots[key];
    for (let i = 0; i < daySlots.length; i++) {
      if (daySlots[i].startTime !== "" && daySlots[i].endTime !== "") {
        let startTime =
          Number(daySlots[i].startTime?.split(":")[0]) +
          Number(daySlots[i].startTime?.split(":")[1]) / 60;
        let endTime =
          Number(daySlots[i].endTime?.split(":")[0]) +
          Number(daySlots[i].endTime?.split(":")[1]) / 60;
        if (startTime >= endTime) {
          result.status = false;
          result["endTime"][key][i] = {
            message: "Invalid time",
          };
        }
      }
      if (i > 0) {
        if (daySlots[i].startTime !== "") {
          let endTime2 =
            Number(daySlots[i - 1].endTime.split(":")[0]) +
            Number(daySlots[i - 1].endTime.split(":")[1]) / 60;
          let startTime =
            Number(daySlots[i].startTime.split(":")[0]) +
            Number(daySlots[i].startTime.split(":")[1]) / 60;
          if (endTime2 > startTime) {
            result.status = false;
            result["startTime"][key][i] = {
              message: "Invalid time",
            };
          }
        }
      }
    }
  }
  return result;
};

export const generateHours = (timeDifference = 10) => {
  const hours = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += timeDifference) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      const time = `${formattedHour}:${formattedMinute}`;
      hours.push(time);
    }
  }
  hours.push(`24:00`);
  return hours;
};

export const convertTimeTo12Hour = (time) => {
  console.log(time);
  // Check if the input time is a valid string in the format "HH:mm"
  if (!/^\d{2}:\d{2}$/.test(time) && !/^\d{2}:\d{2}:\d{2}$/.test(time) ) {
    return "Invalid time format";
  }

  const hours = parseInt(time.split(":")[0], 10);
  const minutes = parseInt(time.split(":")[1], 10);

  // Check if hours and minutes are valid
  // if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
  //   return "Invalid time values";
  // }

  const am_pm = hours >= 12 ? "PM" : "AM";
  let hour = hours % 12;
  hour = hour === 0 ? 12 : hour;
  const hourStr = hour < 10 ? `0${hour}` : hour;
  const minuteStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hourStr}:${minuteStr} ${am_pm}`;
};

export const buttonStatus = (slots, dayCheck) => {
  let cond1 = false;
  let cond2 = false;
  for (const [key, value] of Object.entries(dayCheck)) {
    if (value) {
      cond1 = true;
      for (let i = 0; i < slots[key].length; i++) {
        if (slots[key][i].startTime == "" || slots[key][i].endTime == "") {
          cond2 = true;
          break;
        }
      }
    }
  }
  if (cond1 && !cond2) {
    return false;
  } else {
    return true;
  }
};


export const parseDate = (dateString) => {
  if (!dateString) return;
  const [day, month, year] = dateString.split("/");
  return new Date(year, month - 1, day);
};
export const getAllDatesBetweenTwoRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = parseDate(startDate);
  const end = parseDate(endDate);

  while (currentDate <= end) {
    dates.push(currentDate.toLocaleDateString("en-GB"));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

export const getPermissionFromAll = (name, accessToken) => {

  let permission = '';
  if(accessToken!=''){
    if(accessToken?.role_permissions){
      for (let item of accessToken.role_permissions){
        if( item.moduleName.toLowerCase() == name.toLowerCase() ){
         permission = item;
        }
     }
    }else{
      if(accessToken.access=='admin'){
        permission = {
          create:1, delete: 1,edit: 1,moduleName: name,update_status: 1,view: 1 ,approve:1,reject:1
        };
      }else{
        permission = {
          create:0, delete: 0,edit: 0,moduleName: name,update_status: 0,view: 0  
        };
      } 
    }    
  } 
  
  return permission;
};