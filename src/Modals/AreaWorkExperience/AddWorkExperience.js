/* eslint-disable react/prop-types */
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { API_ROUTES } from "../../common/Enum";
import globalRequest from "../../prototype/globalRequest";

function AddWorkExperience({ show, onHide, isEditable, itemData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [areaOfWorkExperienceName, setAreaOfWorkExperienceName] = useState("");
  const [areaOfWorkExperienceError, setAreaOfWorkExperienceError] =
    useState("");

  const [areaOfWorkExperienceNamePor, setAreaOfWorkExperienceNamePor] =
    useState("");
  const [
    areaOfWorkExperienceNamePorError,
    setAreaOfWorkExperienceNamePorError,
  ] = useState("");

  const handleCancel = () => {
    onHide();
  };

  useEffect(() => {
    if (isEditable) {
      console.log(
        "dsad ",
        itemData.area_of_work_exp_en,
        itemData.area_of_work_exp_pt
      );
      setAreaOfWorkExperienceName(itemData.area_of_work_exp_en);
      setAreaOfWorkExperienceNamePor(itemData.area_of_work_exp_pt);
    }
  }, [isEditable]);

  const resetFormValue = async () => {
    setAreaOfWorkExperienceName("");
    setAreaOfWorkExperienceNamePor("");
  };

  const submitHandler = async () => {
    setIsSubmitting(true);
    let token = false;
    if (areaOfWorkExperienceName === "") {
      setAreaOfWorkExperienceError(
        "Area Of Work Experience(english) is required"
      );
      token = true;
    }else{
      let inputValue = areaOfWorkExperienceName.replace(/[^A-Za-z\s]/g, "");
      if (inputValue !== areaOfWorkExperienceName){
        setAreaOfWorkExperienceError("Only alphabets are allow");
        token = true;
      }
    }
    if (areaOfWorkExperienceNamePor === "") {
      setAreaOfWorkExperienceNamePorError(
        "Area Of Work Experience(portuguese) is required"
      );
      token = true;
    }else{
      // let inputValue = areaOfWorkExperienceNamePor.replace(/[^A-Za-z\s\-_]/g, "");
      // if (inputValue !== areaOfWorkExperienceNamePor){
      //   setAreaOfWorkExperienceNamePorError("Only alphabets and symbols are allow");
      //   token = true;
      // }
      let validCharactersRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿ\s]+$/; //\-_!@#$%^&*()
      if (!validCharactersRegex.test(areaOfWorkExperienceNamePor)) {
        setAreaOfWorkExperienceNamePorError("Only alphabets and symbols are allow");
        token = true;
      }
    }

    if (token) {
      setIsSubmitting(false);
      return false;
    }

    const data = {
      name_en: areaOfWorkExperienceName,
      name_pt: areaOfWorkExperienceNamePor,
    };

    let id = isEditable ? itemData.id : 0;

    let url = API_ROUTES?.ADDAREAOFWORKEXPERIENCEDATA;
    let method = "post";
    if (id > 0) {
      url = API_ROUTES?.EDITAREAOFWORKEXPERIENCEDATA + "/" + id;
      method = "put";
    }

    await globalRequest(url, method, data, {}, true)
      .then((res) => {
        setIsSubmitting(false);
        if (res.ack === 1) {
          console.log("submit");
          onHide();
          resetFormValue();
        } else {
          setAreaOfWorkExperienceError(res.message);
          console.log("error");
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
        style={{ width: "750px" }}
        className="delete-modal"
        header={isEditable ? "Edit Area of work experience" : "Add Area of work experience"}
      >
        <div className="grid mt-3">
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText
                  id="tile"
                  value={areaOfWorkExperienceName}
                  onChange={(e) => {
                    setAreaOfWorkExperienceName(e.target.value.trimStart());
                    setAreaOfWorkExperienceError("");
                  }}
                  maxLength={100}
                />

                <label htmlFor="tile">Area of work experience (English)</label>
              </span>
              {areaOfWorkExperienceError && (
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  {areaOfWorkExperienceError}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText
                  id="tile"
                  value={areaOfWorkExperienceNamePor}
                  onChange={(e) => {
                    setAreaOfWorkExperienceNamePor(e.target.value.trimStart());
                    setAreaOfWorkExperienceNamePorError("");
                  }}
                  maxLength={100}
                />
                <label htmlFor="tile">
                  Area of work experience (Portuguese)
                </label>
              </span>
              {areaOfWorkExperienceNamePorError && (
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  {areaOfWorkExperienceNamePorError}
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

export default AddWorkExperience;
