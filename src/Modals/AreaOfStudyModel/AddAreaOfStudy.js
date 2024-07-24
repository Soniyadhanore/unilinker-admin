/* eslint-disable react/prop-types */
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { API_ROUTES } from "../../common/Enum";
import globalRequest from "../../prototype/globalRequest";

function AddAreaOfStudy({ show, onHide, isEditable, itemData }) {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [areaOfStudeName, setAreaOfStudeName] = useState("");
  const [areaOfStudeNameError, setAreaOfStudeNameError] = useState("");

  const [areaOfStudeNamePor, setAreaOfStudeNamePor] = useState("");
  const [areaOfStudeNamePorError, setAreaOfStudeNamePorError] = useState("");

  const handleCancel = () => {
    onHide();
  };

  useEffect(() => {
    if (isEditable) {
      setAreaOfStudeName(itemData.area_of_study_en);
      setAreaOfStudeNamePor(itemData.area_of_study_pt);
    }
  }, []);

  const resetFormValue = async () => {
    setAreaOfStudeName(null);
    setAreaOfStudeNameError("");
    setAreaOfStudeNamePor("");
    setAreaOfStudeNamePorError("");
  };

  const submitHandler = async () => {
    
    setIsSubmitting(true);
    let token = false;
    if (areaOfStudeName === "") {
      setAreaOfStudeNameError("Area Of Study(english) is required");
      token = true;
    }else{
      let inputValue = areaOfStudeName.replace(/[^A-Za-z\s]/g, "");
      if (inputValue !== areaOfStudeName){
        setAreaOfStudeNameError("Only alphabets are allow");
        token = true;
      }
    }
    if (areaOfStudeNamePor === "") {
      setAreaOfStudeNamePorError("Area Of Study(portuguese) is required");
      token = true;
    }else{
      // let inputValue = areaOfStudeNamePor.replace(/[^A-Za-z\s\-_]/g, "");
      // if (inputValue !== areaOfStudeNamePor){
      //   setAreaOfStudeNamePorError("Only alphabets and symbols are allow");
      //   token = true;
      // }
      let validCharactersRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿ\s]+$/; //\-_!@#$%^&*()
      if (!validCharactersRegex.test(areaOfStudeNamePor)) {
        setAreaOfStudeNamePorError("Only alphabets and symbols are allow");
        token = true;
      }
    }

    if (token) {
      setIsSubmitting(false);
      return false;
    }

    const data = {
      name_en: areaOfStudeName,
      name_pt: areaOfStudeNamePor,
    };

    let id = isEditable ? itemData.id : 0;

    let url = API_ROUTES?.ADDAREAOFSTUDYDATA;
    let method = "post";
    if (id > 0) {
      url = API_ROUTES?.EDITAREAOFSTUDYDATA + "/" + id;
      method = "put";
    }

    await globalRequest(url, method, data, {}, true)
      .then((res) => {
        setIsSubmitting(false);
        if (res.ack === 1) {
          onHide();
          resetFormValue();
        } else {
          setAreaOfStudeNameError(res.message);
          console.log("error");
        }
      })
      .catch((err) => {
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
        header={isEditable ? "Edit Area of study" : "Add Area of study"}
      >
        <div className="grid mt-3">
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText
                  id="tile"
                  value={areaOfStudeName}
                  onChange={(e) => {
                    setAreaOfStudeName(e.target.value.trimStart());
                    setAreaOfStudeNameError("");
                  }}
                  maxLength={100}
                />
                <label htmlFor="tile">Area of study (English)</label>
              </span>
              {areaOfStudeNameError && (
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  {areaOfStudeNameError}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText
                  id="tile"
                  value={areaOfStudeNamePor}
                  onChange={(e) => {
                    setAreaOfStudeNamePor(e.target.value.trimStart());
                    setAreaOfStudeNamePorError("");
                  }}
                  maxLength={100}
                />
                <label htmlFor="tile">Area of study(Portuguese)</label>
              </span>
              {areaOfStudeNamePorError && (
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  {areaOfStudeNamePorError}
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
            disabled={isSubmitting}
            className="btn btn-orange ml-1 mr-1"
            onClick={() => submitHandler()}
          >
            Save
          </Button>
        </div>
      </Dialog>
    </>
  );
}

export default AddAreaOfStudy;
