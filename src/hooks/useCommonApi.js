import { API_ROUTES } from "../common/Enum";
import globalRequest from "../prototype/globalRequest";
import { useDispatch } from "react-redux";
import { changeLoader } from "../redux/reducers/loader";
import { useState } from "react";

export const useCommonApi = () => {
  const dispatch = useDispatch();
  const [areaOfWorkList, setAreaOfWorkList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  //area of work list
  const getAreaOfWork = async (data = {}) => {
    dispatch(changeLoader(true));
    try {
      const res = await globalRequest(
        API_ROUTES?.GET_AREA_OF_WORK,
        "post",
        data,
        {},
        true
      );
      if (res?.status === "SUCCESS") {
        let list = res?.data?.data;
        // { id: "", area_of_work_exp_en: "Select" },
        let list1 = [ ...list];
        const areaOfWrkList = list1?.map((item) => ({
          code: item?.id,
          name: item?.area_of_work_exp_en,
        }));
        setAreaOfWorkList(areaOfWrkList);
      }
    } catch (err) {
      console.error("error", err?.response?.data);
    } finally {
      dispatch(changeLoader(false));
    }
  };

  //location / district list
  const getLocationList = async (data = {}) => {
    dispatch(changeLoader(true));
    try {
      const res = await globalRequest(
        API_ROUTES?.GET_LOCATION_LIST,
        "post",
        data,
        {},
        true
      );
      if (res?.status === "SUCCESS") {
        let list = res?.data?.data;
        let list1 = [{ id: "", district_en: "Select" }, ...list];
        const locationList = list1?.map((item) => ({
          code: item?.id,
          name: item?.district_en,
        }));
        setLocationList(locationList);
      }
    } catch (err) {
      console.error("error", err?.response?.data);
    } finally {
      dispatch(changeLoader(false));
    }
  };

  return { getAreaOfWork, getLocationList, areaOfWorkList, locationList };
};
