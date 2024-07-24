import { API_ROUTES } from "common/Enum";
import globalRequest from "prototype/globalRequest";
import { useDispatch } from "react-redux";
import { changeLoader } from "../redux/reducers/loader";
import { setSnackbar } from "../redux/reducers/snackbar";
import { useState } from "react";
import { getTextLengthOfTextEditor } from "common/HelperFunctions";

export const useHelps = () => {
  const dispatch = useDispatch();

  //states
  const [helpsList, setHelpList] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [helpsAndSupportErrors, setHelpsAndSupportErrors] = useState(null);

  const getCategoryTypeList = async () => {
    dispatch(changeLoader(true));
    try {
      const res = await globalRequest(
        API_ROUTES?.GET_CATEGORY_LIST,
        "get",
        {},
        {},
        true
      );
      if (res?.status === "SUCCESS") {
        let list = res?.data;
        let list1 = [{ id: "", type_en: "Type" }, ...list];
        const categoryList = list1?.map((item) => ({
          value: item?.id,
          label: item?.type_en,
        }));
        setCategoryList(categoryList);
      }
    } catch (err) {
      console.error("error", err?.response?.data);
    } finally {
      dispatch(changeLoader(false));
    }
  };

  const getHelpsList = async (filters) => {
    let params = filters;
    dispatch(changeLoader(true));
    try {
      const res = await globalRequest(
        API_ROUTES?.GET_HELPS_AND_SUPPORT,
        "get",
        {},
        { params: params },
        true
      );
      if (res?.status === "SUCCESS") {
        setHelpList(res?.data);
      }
    } catch (err) {
      console.error("error", err?.response?.data);
    } finally {
      dispatch(changeLoader(false));
    }
  };

  //handle submit error
  const handleError = (data) => {
    let error = false;
    let errObj = { ...data };

    if (!data?.type_id) {
      errObj.type_idError = "Type is required";
      error = true;
    }
    if (data?.type_id === 3) {
      if (!data?.job_id) {
        errObj.job_idError = "job Id is required";
        error = true;
      }
    }
    if (!data?.title) {
      errObj.titleError = "Title is required";
      error = true;
    }
    if (getTextLengthOfTextEditor(data?.message) > 300) {
      errObj.messageError = "Max characters limit should be less than 300.";
      error = true;
    }
    if (!data?.message) {
      errObj.messageError = "Message is required";
      error = true;
    }

    return { error, errObj };
  };

  const createHelp = async (formData, handleClose, handleCallListAgain) => {
    let { error, errObj } = handleError(formData);
    if (error) {
      setHelpsAndSupportErrors(errObj);
      return;
    } else {
      setHelpsAndSupportErrors(null);
    }

    let data = {
      type_id: formData?.type_id,
      job_id: formData?.job_id,
      title: formData?.title,
      message: formData?.message,
    };

    dispatch(changeLoader(true));
    try {
      const res = await globalRequest(
        API_ROUTES?.ADD_HELPS_AND_SUPPORT,
        "post",
        data,
        {},
        true
      );
      if (res?.status === "SUCCESS") {
        dispatch(
          setSnackbar({
            isOpen: true,
            message: res?.message,
            state: "success",
          })
        );
        handleClose ? handleClose() : null;
        handleCallListAgain ? handleCallListAgain() : null;
      }
    } catch (err) {
      console.error("error", err?.response?.data);
    } finally {
      dispatch(changeLoader(false));
    }
  };

  return {
    getCategoryTypeList,
    getHelpsList,
    categoryList,
    createHelp,
    helpsList,
    helpsAndSupportErrors,
  };
};
