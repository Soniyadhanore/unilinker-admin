import { API_ROUTES } from "../common/Enum";
import globalRequest from "../prototype/globalRequest";
import { useDispatch } from "react-redux";
import { changeLoader } from "../redux/reducers/loader";
import { useState } from "react";

export const useTeams = () => {
  const dispatch = useDispatch();
  const [teamList, setTeamList] = useState([]);
  const [teamListForDropDown, setTeamListForDropDown] = useState([]);

  const getTeamList = async (params = {}) => {
    dispatch(changeLoader(true));
    try {
      const res = await globalRequest(
        API_ROUTES?.GET_TEAM_LIST,
        "get",
        {},
        { params },
        true
      );
      if (res?.status === "SUCCESS") {
        setTeamList(res?.data);
      }
    } catch (err) {
      console.error("error", err?.response?.data);
    } finally {
      dispatch(changeLoader(false));
    }
  };
  const getTeamListForDropDown = async (id, params = {}) => {
    dispatch(changeLoader(true));
    try {
      const res = await globalRequest(
        API_ROUTES?.GET_TEAM_LIST_FOR_DROPDOWN(id),
        "get",
        {},
        { params },
        true
      );
      if (res?.ack === 1) {
        let list = res?.data?.rows || [];
        const updatedTeams = list.map((team) => {
          return {
            name: team.team_name,
            code: team?.id,
          };
        });
        setTeamListForDropDown(updatedTeams);
      }
    } catch (err) {
      console.error("error", err?.response?.data);
    } finally {
      dispatch(changeLoader(false));
    }
  };

  return { getTeamList, teamList, getTeamListForDropDown, teamListForDropDown };
};
