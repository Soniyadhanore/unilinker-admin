/* eslint-disable react/prop-types */
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Dropdown } from "primereact/dropdown";
import { API_ROUTES } from "../../common/Enum";
import globalRequest from "../../prototype/globalRequest";
import { validateStringForName } from "../../common/HelperFunctions";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";
// const allAreaStudy = [
//   { name: "New York", code: "NY" },
//   { name: "Rome", code: "RM" },
//   { name: "London", code: "LDN" },
//   { name: "Istanbul", code: "IST" },
//   { name: "Paris", code: "PRS" },
// ];

function AddDegree({ show, onHide, areaOfStudyList, isEditable, itemData }) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedAreaStudy, setSelectedAreaStudy] = useState(null);
  const [selectedAreaStudyError, setSelectedAreaStudyError] = useState("");

  const [degreeName, setDegreeName] = useState("");
  const [degreeNameError, setDegreeNameError] = useState("");

  const [degreeNamePor, setDegreeNamePor] = useState("");
  const [degreeNamePorError, setDegreeNamePorError] = useState("");

  useEffect(() => {
    if (isEditable) {
      setDegreeName(itemData.degree_en);
      setDegreeNamePor(itemData.degree_pt);
      setSelectedAreaStudy({
        name: itemData.area_of_study.area_of_study_en,
        code: itemData.area_of_study.id,
      });
    }
  }, []);

  const handleCancel = () => {
    onHide();
  };

  const resetFormValue = async () => {
    setDegreeName("");
    setDegreeNamePor("");
    setSelectedAreaStudy(null);
  };

  const submitHandler = async () => {
    setIsSubmitting(true);
    let token = false;
    if (degreeName === "") {
      setDegreeNameError("Degree(english) is required");
      token = true;
    }else{
      let inputValue = degreeName.replace(/[^A-Za-z\s]/g, "");
      if (inputValue !== degreeName){
        setDegreeNameError("Only alphabets are allow");
        token = true;
      }
    }
    if (degreeNamePor === "") {
      setDegreeNamePorError("Degree(portuguese) is required");
      token = true;
    }else{
      // let inputValue = degreeNamePor.replace(/[^A-Za-z\s\-_]/g, "");
      // if (inputValue !== degreeNamePor){
      //   setDegreeNamePorError("Only alphabets and symbols are allow");
      //   token = true;
      // }
      let validCharactersRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿ\s]+$/; //\-_!@#$%^&*()
      if (!validCharactersRegex.test(degreeNamePor)) {
        setDegreeNamePorError("Only alphabets and symbols are allow");
        token = true;
      }
    }
    // console.log(selectDistrict);
    if (!selectedAreaStudy) {
      setSelectedAreaStudyError("Area of study is required");
      token = true;
    }

    if (token) {
      setIsSubmitting(false);
      return false;
    }

    const data = {
      name_en: degreeName,
      name_pt: degreeNamePor,
      area_of_study_id: selectedAreaStudy.code,
    };

    let id = isEditable ? itemData.id : 0;

    let url = API_ROUTES?.ADDDEGREEDATA;
    let method = "post";
    if (id > 0) {
      url = API_ROUTES?.EDITDEGREEDATA + "/" + id;
      method = "put";
    }

    await globalRequest(url, method, data, {}, true)
      .then((res) => {
        setIsSubmitting(false);
        if (res.ack === 1) {
          setIsSubmitting(false);
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
          setDegreeNameError(res.message);
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

  return (
    <>
      <Dialog
        visible={show}
        onHide={onHide}
        draggable={false}
        style={{ width: "500px" }}
        className="delete-modal"
        header= {isEditable ?  "Edit Degree" : "Add Degree"}
      >
        <div className="grid mt-3">
          <div className="lg:col-12 md:col-12 sm:col-12">
            <div className="formField">
              <span className="p-float-label w-full dropdownnew">
                <Dropdown
                  inputId="dd-degree"
                  value={selectedAreaStudy}
                  // onChange={(e) => setSelectedAreaStudy(e.value)}
                  onChange={(e) => {
                    setSelectedAreaStudy(e.value);
                    setSelectedAreaStudyError("");
                  }}
                  options={areaOfStudyList}
                  optionLabel="name"
                  className="w-full"
                  itemTemplate={(option) => (
                    <div className={`custom-li-420`}>
                       {option.name}
                    </div>
                  )}

                />
                <label htmlFor="dd-degree">Area of study</label>
              </span>
              {selectedAreaStudyError && (
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  {selectedAreaStudyError}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText
                  id="tile"
                  value={degreeName}
                  onChange={(e) => {
                    let value = validateStringForName(e.target.value.trimStart())
                    setDegreeName(value);
                    setDegreeNameError("");
                  }}
                  maxLength={100}
                />
                <label htmlFor="tile">Degree (English)</label>
              </span>
              {degreeNameError && (
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  {degreeNameError}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText
                  id="tile"
                  value={degreeNamePor}
                  onChange={(e) => {
                    let value = validateStringForName(e.target.value.trimStart())
                    setDegreeNamePor(value);
                    setDegreeNamePorError("");
                  }}
                  maxLength={100}
                />
                <label htmlFor="tile">Degree (Portuguese)</label>
              </span>
              {degreeNamePorError && (
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  {degreeNamePorError}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" text-right">
          <Button className="btn btn-gray mr-1" onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Button
            className="btn btn-orange ml-1 mr-1"
            disabled={isSubmitting}
            onClick={() => submitHandler()}
          >
            Save
          </Button>
        </div>
      </Dialog>
    </>
  );
}

export default AddDegree;
