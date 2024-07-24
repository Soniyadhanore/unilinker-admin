/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "react-bootstrap";
import { API_ROUTES } from "../../common/Enum";
import globalRequest from "../../prototype/globalRequest";

function AddLanguage({ show, onHide, isEditable, itemData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [languageName, setlanguageName] = useState("");
  const [languageNameError, setLanguageNameError] = useState("");

  const [languageNamePor, setlanguageNamePor] = useState("");
  const [languageNamePorError, setLanguageNamePorError] = useState("");

  const handleCancel = () => {
    onHide();
  };

  useEffect(() => {
    if (isEditable) {
      setlanguageName(itemData.language_en);
      setlanguageNamePor(itemData.language_pt);
    }
  }, [isEditable]);

  const resetFormValue = async () => {
    setlanguageName("");
    setlanguageNamePor("");
  };

  const submitHandler = async () => {
    setIsSubmitting(true);
    let token = false;
    if (languageName === "") {
      setLanguageNameError("Language(english) is required");
      token = true;
    } else {
      let inputValue = languageName.replace(/[^A-Za-z\s]/g, "");
      if (inputValue !== languageName) {
        setLanguageNameError("Only alphabets are allow");
        token = true;
      }
    }
    if (languageNamePor === "") {
      setLanguageNamePorError("Language(portuguese) is required");
      token = true;
    } else {
      // let inputValue = languageNamePor.replace(/[^A-Za-z\s\-_]/g, "");
      // if (inputValue !== languageNamePor){
      //   setLanguageNamePorError("Only alphabets and symbols are allow");
      //   token = true;
      // }
      let validCharactersRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿ\s]+$/; //\-_!@#$%^&*()
      if (!validCharactersRegex.test(languageNamePor)) {
        setLanguageNamePorError("Only alphabets and symbols are allow");
        token = true;
      }
    }

    if (token) {
      setIsSubmitting(false);
      return false;
    }

    const data = {
      name_en: languageName,
      name_pt: languageNamePor,
    };

    let id = isEditable ? itemData.id : 0;

    let url = API_ROUTES?.ADDLANGUAGEDATA;
    let method = "post";
    if (id > 0) {
      url = API_ROUTES?.EDITLANGUAGEDATA + "/" + id;
      method = "put";
    }

    await globalRequest(url, method, data, {}, true)
      .then((res) => {
        setIsSubmitting(false);
        if (res.ack === 1) {
          onHide();
          resetFormValue();
        } else {
          setLanguageNameError(res.message);
          console.log("error");
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

  return (
    <>
      <Dialog
        visible={show}
        onHide={onHide}
        style={{ width: "500px" }}
        className="delete-modal"
        header={isEditable ? "Edit Language" : "Add Language"}
        draggable={false}
      >
        <div className="grid mt-3">
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText
                  id="tile"
                  value={languageName}
                  maxLength={100}
                  onChange={(e) => {
                    // let value = handleInputChange(e.target.value.trimStart());
                    let value = e.target.value.trimStart();
                    setlanguageName(value);
                    setLanguageNameError("");
                  }}
                />
                <label htmlFor="tile">Language (English)</label>
              </span>
              {languageNameError && (
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  {languageNameError}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText
                  id="tile"
                  value={languageNamePor}
                  maxLength={100}
                  onChange={(e) => {
                    setlanguageNamePor(e.target.value.trimStart());
                    setLanguageNamePorError("");
                  }}
                />
                <label htmlFor="tile">Language (Portuguese)</label>
              </span>
              {languageNamePorError && (
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  {languageNamePorError}
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

export default AddLanguage;
