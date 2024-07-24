/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
import { useState, React, useEffect,useRef  } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "react-bootstrap";
import { Dropdown } from "primereact/dropdown";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import { Toast } from 'primereact/toast'; 
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";

function AddFaculty({ show, onHide, locationList, isEditable, itemData }) {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectDistrict, setDistrict] = useState(null);
  const [selectDistrictError, setDistrictError] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [facultyNameError, setFacultyNameError] = useState("");
  const [facultyNamePor, setFacultyNamePor] = useState("");
  const [facultyNamePorError, setFacultyNamePorError] = useState("");
  // const showSuccess = () => {
  //   toast.current.show({ severity: 'success', summary: 'Success', detail: 'Faculty successfully.', life: 3000 });
  // }    
  const [domainData, setDomainData] = useState([{ name: "", error: "" }]);

  useEffect(() => {
    if (isEditable) {
      setFacultyName(itemData.name_en);
      setFacultyNamePor(itemData.name_pt);
      setDistrict({
        name: itemData.location.district_en,
        code: itemData.location.id,
      });
      let domainDataArray = [];
      for (let it of itemData.faculty_domains)
        domainDataArray.push({ name: it.domain, error: "" });
      setDomainData(domainDataArray);
    }
  }, []);

  const handleCancel = () => {
    onHide();
  };

  const resetFormValue = async () => {
    setDistrict(null);
    setDistrictError("");
    setFacultyName("");
    setFacultyNameError("");
    setFacultyNamePor("");
    setFacultyNamePorError("");
    setDomainData([{ name: "", error: "" }]);
  };

  const submitHandler = async () => {
    setIsSubmitting(true);
    let token = false;
    
    if (!facultyName ||  facultyName === "") {
      setFacultyNameError("Faculty(english) is required");
      token = true;
    }else{
      let inputValue = facultyName.replace(/[^A-Za-z\s]/g, "");
      if (inputValue !== facultyName){
        setFacultyNameError("Only alphabets are allow");
        token = true;
      }
    }
    if (facultyNamePor === "") {
      setFacultyNamePorError("Faculty(portuguese) is required");
      token = true;
    }else{
      // let inputValue = facultyNamePor.replace(/^[A-Za-z\s\-_!@#$%^&*()]+$/g, "");
      // console.log(inputValue);
      // if (inputValue !== facultyNamePor){
      //   setFacultyNamePorError("Only alphabets and symbols are allow");
      //   token = true;
      // }
      let validCharactersRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿ\s]+$/; //\-_!@#$%^&*()
      if (!validCharactersRegex.test(facultyNamePor)) {
        setFacultyNamePorError("Only alphabets and symbols are allow");
        token = true;
      }
    }
    
    if (!selectDistrict) {
      setDistrictError("District is required");
      token = true;
    }

    // Check for validation errors
    const updatedDomainData = domainData.map((item) => {
      if (!item.name.trim()) {
        token = true;
        return { ...item, error: "Domain name is required." };
      }
      if (!item.name.includes(".")) {
        token = true;
        return { ...item, error: "Enter correct domain name like 'gmail.com'" };
      }
      if (item.name.includes("@")) {
        token = true;
        return { ...item, error: "Enter correct domain name like 'gmail.com'" };
      }     

      return { ...item, error: "" };
    });

    // Update domainData state with error messages
    setDomainData(updatedDomainData);

    if (token) {
      setIsSubmitting(false);
      return false;
    }

    let domain = [];
    for (let key in domainData) {
      domain.push(domainData[key].name);
    }

    const data = {
      name_en: facultyName,
      name_pt: facultyNamePor,
      location_id: selectDistrict.code,
      domain: domain,
    };

    let id = isEditable ? itemData.id : 0;

    let url = API_ROUTES?.ADDFACULTYDATA;
    let method = "post";
    if (id > 0) {
      url = API_ROUTES?.EDITFACULTYDATA + "/" + id;
      method = "put";
    }

    await globalRequest(url, method, data, {}, true)
      .then((res) => {
        setIsSubmitting(false);
        if (res.ack === 1) {
          onHide();
          resetFormValue();
          dispatch(
            setSnackbar({
              isOpen: true,
              message: id > 0 ? "Faculty successfully updated." : "Faculty successfully added." ,
              state: "success",
            })
          );
        } else {
          setFacultyNameError(res.message);
          console.log("error");
          // dispatch(
          //   setSnackbar({
          //     isOpen: true,
          //     message: "Something went wrong please try again some time later.",
          //     state: "error",
          //   })
          // );
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.error("err", err);
      });
  };

  // const handleInputChange = (inputValue) => {
  //   inputValue = inputValue.replace(/[^A-Za-z\s]/g, "");
  //   if (inputValue) return inputValue;
  // };
  // const handleInputChange1 = (inputValue) => {
  //   inputValue = inputValue.replace(/[^a-zA-Z0-9@.-]/g, "");
  //   if (inputValue) {
  //     return inputValue;
  //   }
  // };


  return (
    <>    
      <Dialog
        visible={show}
        onHide={onHide}
        draggable={false}
        style={{ width: "500px" }}
        className="delete-modal"
        header={isEditable ? "Edit Faculty" : "Add Faculty"}
      >
        <div className="grid mt-3">
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText
                  id="tile"
                  value={facultyName}
                  onChange={(e) => {
                    // let value = handleInputChange(e.target.value.trimStart());
                    setFacultyName(e.target.value.trimStart());
                    setFacultyNameError("");
                  }}
                  maxLength={100}
                />
                <label htmlFor="tile">Faculty(English)</label>
              </span>
              {facultyNameError && (
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  {facultyNameError}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText
                  id="tile"
                  value={facultyNamePor}
                  onChange={(e) => {
                    // let value = handleInputChange(e.target.value.trimStart());
                    setFacultyNamePor(e.target.value.trimStart());
                    setFacultyNamePorError("");                    
                  }}
                  maxLength={100}
                />
                <label htmlFor="tile">Faculty (Portuguese)</label>
              </span>
              {facultyNamePorError && (
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  {facultyNamePorError}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-12 md:col-12 sm:col-12">
            <div className="formField placeholderVisible">
              <span className="p-float-label ">
                <Dropdown
                  inputId="dd-district"
                  value={selectDistrict}
                  onChange={(e) => {
                    setDistrict(e.value);
                    setDistrictError("");
                  }}
                  options={locationList}
                  optionLabel="name"
                  placeholder="District"
                  className="p-inputtext-md"
                  size="small"
                />
              </span>
              {selectDistrictError && (
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  {selectDistrictError}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-12 md:col-12 sm:col-12">
            {domainData?.map((item, index) => {
              return (
                <div className="grid w-full" key={index}>
                  <div className="lg:col-11 md:col-11 sm:col-12">
                    <div className="formField placeholderVisible">
                      <span className="p-float-label">
                        <InputText
                          id="tile"
                          value={item?.name}
                          onChange={(e) => {
                            // const newValue = handleInputChange1(e.target.value);
                            const newValue = e.target.value;
                            // Create a copy of domainData
                            const updatedDomainData = [...domainData];
                            // Update the specific item's name property
                            updatedDomainData[index] = {
                              ...updatedDomainData[index],
                              name: newValue,
                              error: "",
                            };
                            // Set the updated domainData state
                            setDomainData(updatedDomainData);
                          }}
                          maxLength={50}
                        />
                        <label htmlFor="tile">Faculty Domain {index + 1}</label>
                      </span>

                      {item?.error && (
                        <div
                          style={{ color: "#DC362E", textAlign: "initial" }}
                          className="errorSize"
                        >
                          {item?.error}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="lg:col-1 md:col-1 sm:col-12">
                    <CustomTooltip
                      tooltipText={`${
                        index === 0 ? "Add Domain " : "Remove Domain "
                      }`}
                    >
                      {index === 0 ? (
                        <i
                          className="pi pi-plus-circle"
                          style={{ color: "#000", margin: "10px" }}
                          onClick={() => {
                            let prevDomainData = [...domainData];
                            prevDomainData.push({
                              name: "",
                            });
                            setDomainData(prevDomainData);
                          }}
                        />
                      ) : (
                        <i
                          className="pi pi-minus-circle"
                          style={{ color: "#000", margin: "10px" }}
                          onClick={() => {
                            // Create a copy of domainData excluding the item to be removed
                            const updatedDomainData = domainData.filter(
                              (_, idx) => idx !== index
                            );
                            setDomainData(updatedDomainData);
                          }}
                        />
                      )}
                    </CustomTooltip>
                  </div>
                </div>
              );
            })}
            {/* <div className="grid w-full">
              <div className="lg:col-11 md:col-11 sm:col-12">
                <div className="formField placeholderVisible">
                  <span className="p-float-label">
                    <InputText id="tile" />
                    <label htmlFor="tile">Faculty Domain</label>
                  </span>

                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Faculty Domain error
                  </div>
                </div>
              </div>
              <div className="lg:col-1 md:col-1 sm:col-12">
                <CustomTooltip tooltipText="Add Domain">
                  <i
                    className="pi pi-plus-circle"
                    style={{ color: "#000", margin: "10px" }}
                  />
                </CustomTooltip>
              </div>
            </div>
            <div className="grid w-full">
              <div className="lg:col-11 md:col-11 sm:col-12">
                <div className="formField placeholderVisible">
                  <span className="p-float-label">
                    <InputText id="tile" />
                    <label htmlFor="tile">Faculty Domain</label>
                  </span>

                  <div
                    style={{ color: "#DC362E", textAlign: "initial" }}
                    className="errorSize"
                  >
                    Faculty Domain error
                  </div>
                </div>
              </div>
              <div className="lg:col-1 md:col-1 sm:col-12">
                <CustomTooltip tooltipText="Add Domain">
                  <i
                    className="pi pi-minus-circle"
                    style={{ color: "#000", margin: "10px" }}
                  />
                </CustomTooltip>
              </div>
            </div> */}
          </div>
        </div>
        <div className=" text-right">
          <Button className="btn btn-gray mr-1" onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Toast ref={toast} />
          <Button
            disabled={isSubmitting}
            className="btn btn-orange ml-1 mr-1"
            onClick={() => {
              submitHandler();              
            }}
          >
            Save
          </Button>
        </div>
      </Dialog>
    </>
  );
}

export default AddFaculty;
