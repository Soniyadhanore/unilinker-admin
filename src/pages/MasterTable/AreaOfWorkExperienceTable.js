/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import AddWorkExperience from "../../Modals/AreaWorkExperience/AddWorkExperience";
import EditWorkExperience from "../../Modals/AreaWorkExperience/EditWorkExperience";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import { Paginator } from "primereact/paginator";
import { PAGIANTION, getPermissionFromAll } from "../../common/HelperFunctions";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Loaders from "../../Loaders";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../common/LocalVariable";
import jwtDecode from "jwt-decode";

const AreaOfWorkExperienceTable = () => {
  const dispatch = useDispatch();
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [addWorkExperienceModal, setAddWorkExperienceModal] = useState(false);
  const [editWorkExperienceModal, setEditWorkExperienceModal] = useState(false);
  const [areaOfWorkExperienceList, setAreaOfWorkExperienceList] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(PAGIANTION);
  const [page, setPage] = useState(1);
  const [sortby, setSortby] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");

  const [isEditable, setIsEditable] = useState(false);
  const [itemData, setItemData] = useState([]);

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);
  let master = getPermissionFromAll("master", accessToken);

  const getAreaOfWorkExperienceData = async () => {
    setLoading(true);
    let sortBy = "id";
    let orderBy = "desc";
    if (sortby != "") sortBy = sortby;
    if (sortOrder != "") orderBy = sortOrder;
    let params = { page: page, limit: PAGIANTION, sort_by: sortBy,order_by: orderBy };
    await globalRequest(
      API_ROUTES?.GETAREAOFWORKEXPERIENCEDATA,
      "get",
      {},
      { params: params },
      true
    )
      .then((res) => {
        console.log("res", res);
        if (res.ack === 1) {
          setAreaOfWorkExperienceList(res.data?.rows || []);
          setTotalCount(res.data?.count || 0);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const deleteFacultyData = async () => {
    await globalRequest(
      API_ROUTES?.DELETEAREAOFWORKEXPERIENCEDATA + "/" + itemData.id,
      "delete",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setDeleteModalShow(false);
          getAreaOfWorkExperienceData();
          dispatch(
            setSnackbar({
              isOpen: true,
              message: res?.message,
              state: "success",
            })
          );
        } else {
          dispatch(
            setSnackbar({
              isOpen: true,
              message: res?.message,
              state: "error",
            })
          );
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const handleStatusChange = async (item) => {
    await globalRequest(
      API_ROUTES?.CHANGESTATUSAREAOFWORKEXPERIENCEDATA + "/" + item.id,
      "put",
      { status: item.status === "active" ? "inactive" : "active" },
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          getAreaOfWorkExperienceData();
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const onPageChange = (event) => {
    setPage(event.page + 1);
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    getAreaOfWorkExperienceData();
  }, [page,sortby, sortOrder]);

  const sortFunction = (sortType) => {
    setSortby(sortType);
    if (sortOrder == "ASC") {
      setSortOrder("DESC");
    } else {
      setSortOrder("ASC");
    }
  };

  return (
    <>
      <div className="tableContent">
        <div className="text-right pb-3">
          <div className="flex align-items-center justify-content-end">
            {
              master.create ? (
                <button
              className="btn btn-orange ml-1 mr-3"
              onClick={() => {
                setAddWorkExperienceModal(true);
                setIsEditable(false);
              }}
            >
              Add area of work experience
            </button>
              ) : null
            }            
          </div>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>{"Area of work experience"} <span className="sort-arrow-table" onClick={() => sortFunction("name")} >{" "}<ImportExportIcon />{" "}</span></th>
              <th style={{ width: "200px" }}>{"Status"}</th>
              <th style={{ width: "200px", textAlign: "center" }}>
                {"Action"}
              </th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
          <tr>
            <td colSpan="3">
              <Loaders /> {/* Replace with your actual Loader component */}
            </td>
          </tr>
          ) : areaOfWorkExperienceList && areaOfWorkExperienceList.length > 0 ? (
              areaOfWorkExperienceList?.map((item, index) => (
                <tr key={item.area_of_work_exp_en + index}>
                  <td>{item.area_of_work_exp_en}</td>
                  <td style={{ width: "200px" }}>
                    {
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={item?.status === "active" ? true : false}
                        onChange={() => {
                          handleStatusChange(item);
                        }}
                        disabled={ master.update_status ? false : true }
                      />
                    }
                  </td>
                  <td style={{ width: "200px", textAlign: "center" }}>
                    {
                      master.edit ? (<CustomTooltip tooltipText={"Edit"}>
                        <i
                          className="fa fa-pencil"
                          // onClick={() => setEditWorkExperienceModal(true)}
                          onClick={() => {
                            setIsEditable(true);
                            setItemData(item);
                            setAddWorkExperienceModal(true);
                          }}
                        />
                      </CustomTooltip>) : null
                    }
                    {
                      master.delete ? (
                        <CustomTooltip tooltipText={"Delete"}>
                      <i
                        className="fa fa-trash"
                        onClick={() => {
                          setDeleteModalShow(true);
                          setItemData(item);
                        }}
                      />
                    </CustomTooltip>
                      ) : null
                    }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">
                  <EmptyComponent noDataMessage="No Data Found"/>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="Pagination-content mb-3">
        <span className="ml-3 ">Total Count : {totalCount}</span>
          {totalCount && totalCount > 0 ? (
            <Paginator
              first={first}
              rows={rows}
              totalRecords={totalCount}
              className=""
              onPageChange={onPageChange}
            />
          ) : null}
        </div>
      </div>
      {DeleteModalShow && (
        <DeleteModal
          show={DeleteModalShow}
          onHide={() => setDeleteModalShow(false)}
          deleteFunction={() => {
            //call here
            deleteFacultyData();
          }}
        />
      )}
      {addWorkExperienceModal && (
        <AddWorkExperience
          show={addWorkExperienceModal}
          onHide={() => {
            setAddWorkExperienceModal(false);
            getAreaOfWorkExperienceData();
          }}
          isEditable={isEditable}
          itemData={itemData}
        />
      )}
      <EditWorkExperience
        show={editWorkExperienceModal}
        onHide={() => setEditWorkExperienceModal(false)}
      />
    </>
  );
};

export default AreaOfWorkExperienceTable;
