/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import AddFaculty from "../../Modals/FacultyModal/AddFaculty";
import { Dropdown } from "primereact/dropdown";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import { Paginator } from "primereact/paginator";
import { PAGIANTION, getPermissionFromAll } from "../../common/HelperFunctions";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Loaders from "../../Loaders";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../common/LocalVariable";
import jwtDecode from "jwt-decode";

const FacultyTable = () => {
  const dispatch = useDispatch();
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [addFacultyModal, setAddFacultyModal] = useState(false);
  const [selectedDistrict, setDistrict] = useState(null);
  const [facultyList, setFacultyList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [locationDropDownList, setLocationDropDownList] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [sortby, setSortby] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(PAGIANTION);
  const [page, setPage] = useState(1);
  const [overflowHidden, setOverflowHidden] = useState(false);

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);
  let master = getPermissionFromAll("master", accessToken);

  const getFacultyData = async () => {
    setLoading(true);
    let sortBy = "id";
    let orderBy = "desc";
    if (sortby != "") sortBy = sortby;
    if (sortOrder != "") orderBy = sortOrder;
    setLoading(true);
    let params = {
      page: page,
      limit: PAGIANTION,
      sort_by: sortBy,
      order_by: orderBy,
    };
    if (selectedDistrict?.code > 0)
      params = {
        page: page,
        limit: PAGIANTION,
        district: selectedDistrict?.code,
        sort_by: sortBy,
        order_by: orderBy,
      };
    // const res = await globalRequest(API_ROUTES?.GETFACULTYDATA, 'get', {}, { params: params }, true);
    await globalRequest(
      API_ROUTES?.GETFACULTYDATA,
      "get",
      {},
      { params: params },
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setFacultyList(res.data?.rows || []);
          setTotalCount(res.data?.count || 0);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  const getLocationData = async () => {
    await globalRequest(API_ROUTES?.GETLOCATIONDATA, "get", {}, {}, true)
      .then((res) => {
        if (res.ack === 1) {
          let data = [];
          let data1 = [];
          data.push({ name: "All", code: 0 });
          for (let row of res.data.rows) {
            data.push({ name: row.district_en, code: row.id });
            data1.push({ name: row.district_en, code: row.id });
          }
          setLocationList(data);
          setLocationDropDownList(data1);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  const deleteFacultyData = async () => {
    await globalRequest(
      API_ROUTES?.DELETEFACULTYDATA + "/" + itemData.id,
      "delete",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setDeleteModalShow(false);
          getFacultyData();
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
      API_ROUTES?.CHANGESTATUSFACULTYDATA + "/" + item.id,
      "put",
      { status: item.status === "active" ? "inactive" : "active" },
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          getFacultyData();
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
  const toggleOverflow = (value) => {
    setOverflowHidden(value);
    // setLoading(true)
  };

  useEffect(() => {
    getLocationData();
  }, []);
  useEffect(() => {
    getFacultyData();
  }, [page, selectedDistrict, sortby, sortOrder]);
  useEffect(() => {
    toggleOverflow(addFacultyModal);
  }, [addFacultyModal]);

  //sort function
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
      {overflowHidden && <style>{`body { overflow: hidden; }`}</style>}
      <div className="tableContent">
        <div className="text-right pb-3">
          <div className="flex align-items-center justify-content-end">
            <span className="small-drop ml-1 mr-1">
              <Dropdown
                inputId="dd-district"
                value={selectedDistrict}
                onChange={(e) => setDistrict(e.value)}
                options={locationList}
                optionLabel="name"
                placeholder="All"
                className="p-inputtext-sm"
                size="small"
              />
            </span>
            {master.create ? (
              <button
                className="btn btn-orange ml-1 mr-3"
                onClick={() => {
                  setAddFacultyModal(true);
                  setIsEditable(false);
                }}
              >
                Add Faculty
              </button>
            ) : null}
          </div>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>
                {"Faculty Name"}{" "}
                <span
                  className="sort-arrow-table"
                  onClick={() => sortFunction("faculty_name")}
                >
                  {" "}
                  <ImportExportIcon />{" "}
                </span>{" "}
              </th>
              <th style={{ width: "300px" }}>
                {"District"}{" "}
                <span
                  className="sort-arrow-table"
                  onClick={() => sortFunction("district")}
                >
                  {" "}
                  <ImportExportIcon />{" "}
                </span>
              </th>
              <th style={{ width: "200px" }}>{"Status"}</th>
              <th style={{ width: "200px", textAlign: "center" }}>
                {"Action"}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">
                  <Loaders /> {/* Replace with your actual Loader component */}
                </td>
              </tr>
            ) : facultyList && facultyList.length > 0 ? (
              facultyList?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.name_en}</td>
                  <td style={{ width: "300px" }}>
                    {item?.location?.district_en}
                  </td>
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
                    {master.edit && (
                      <CustomTooltip tooltipText={"Edit"}>
                        <i
                          className="fa fa-pencil"
                          // onClick={() => setEditFacultyModal(true)}
                          onClick={() => {
                            setIsEditable(true);
                            setItemData(item);
                            setAddFacultyModal(true);
                          }}
                        />
                      </CustomTooltip>
                    )}
                    {master.delete && (
                      <CustomTooltip tooltipText={"Delete"}>
                        <i
                          className="fa fa-trash"
                          onClick={() => {
                            setDeleteModalShow(true);
                            setItemData(item);
                          }}
                        />
                      </CustomTooltip>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  <EmptyComponent noDataMessage="No Data Found" />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {/* {console.log(first, rows, totalCount)} */}
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
          onHide={() => {
            setDeleteModalShow(false);
          }}
          deleteFunction={() => {
            deleteFacultyData();
          }}
        />
      )}
      {addFacultyModal && (
        <AddFaculty
          show={addFacultyModal}
          onHide={() => {
            setAddFacultyModal(false);
            getFacultyData();
          }}
          locationList={locationDropDownList}
          isEditable={isEditable}
          itemData={itemData}
        />
      )}
    </>
  );
};

export default FacultyTable;
