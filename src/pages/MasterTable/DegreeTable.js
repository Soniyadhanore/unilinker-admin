/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"; //,useRef
import { Table, Form } from "react-bootstrap";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
// import EditDegree from "../../Modals/DegreeModal/EditDegreeModal";
import AddDegree from "../../Modals/DegreeModal/AddDegreeModal";
import { Dropdown } from "primereact/dropdown";
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

const DegreeTable = () => {
  const dispatch = useDispatch();

  const [addDegreeModal, setAddDegreeModal] = useState(false);
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedAreaOfDegree, setSelectedAreaOfDegree] = useState();

  const [degreeList, setDegreeList] = useState([]);
  const [areaOfStudyList, setAreaOfStudyList] = useState([]);
  const [areaOfStudyDropDownList, setAreaOfStudyDropDownList] = useState([]);

  const [isEditable, setIsEditable] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(PAGIANTION);
  const [page, setPage] = useState(1);
  const [sortby, setSortby] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);
  let master = getPermissionFromAll("master", accessToken);

  const getDegreeData = async () => {
    setLoading(true);
    let sortBy = "id";
    let orderBy = "desc";
    if (sortby != "") sortBy = sortby;
    if (sortOrder != "") orderBy = sortOrder;
    let params = {
      page: page,
      limit: PAGIANTION,
      sort_by: sortBy,
      order_by: orderBy,
    };
    if (selectedAreaOfDegree?.code > 0)
      params = {
        page: page,
        limit: PAGIANTION,
        areaOfDegre: selectedAreaOfDegree?.code,
        sort_by: sortBy,
        order_by: orderBy,
      };

    await globalRequest(
      API_ROUTES?.GETDEGREEDATA,
      "get",
      {},
      { params: params },
      true
    )
      .then((res) => {
        console.log("res", res);
        if (res.ack === 1) {
          setDegreeList(res.data?.rows || []);
          setTotalCount(res.data?.count || 0);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  const getAreaOfStudyData = async () => {
    let params = { status: "active" };
    await globalRequest(
      API_ROUTES?.GETAREAOFSTUDYDATA,
      "get",
      {},
      { params: params },
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          if (res.data?.rows) {
            let dt = [];
            let dt1 = [];
            dt.push({ name: "All", code: 0 });
            for (let row of res.data.rows) {
              dt.push({ name: row.area_of_study_en, code: row.id });
              dt1.push({ name: row.area_of_study_en, code: row.id });
            }
            setAreaOfStudyList(dt);
            setAreaOfStudyDropDownList(dt1);
          }
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  const deleteDegreeData = async () => {
    await globalRequest(
      API_ROUTES?.DELETEDEGREEDATA + "/" + itemData.id,
      "delete",
      {},
      {},
      true
    )
      .then((res) => {
        setDeleteModalShow(false);
        console.log(res.message);
        if (res.ack === 1) {
          getDegreeData();
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
      API_ROUTES?.CHANGESTATUSDEGREEDATA + "/" + item.id,
      "put",
      { status: item.status === "active" ? "inactive" : "active" },
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          getDegreeData();
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
    getAreaOfStudyData();
  }, []);
  useEffect(() => {
    getDegreeData();
  }, [page, selectedAreaOfDegree, sortby, sortOrder]);

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
      <div className="tableContent">
        <div className="text-right pb-3">
          <div className="flex align-items-center justify-content-end">
            <span className="small-drop ml-1 mr-1">
              <Dropdown
                inputId="dd-account"
                value={selectedAreaOfDegree}
                onChange={(e) => setSelectedAreaOfDegree(e.value)}
                options={areaOfStudyList}
                optionLabel="name"
                placeholder="All"
                className="p-inputtext-sm"
                size="small"
              />
            </span>
            { master.create ? (
              <button
                className="btn btn-orange ml-1 mr-3"
                onClick={() => {
                  setAddDegreeModal(true);
                  setIsEditable(false);
                }}
              >
                Add Degree
              </button>
            ) : null }            
          </div>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>
                {"DEGREE NAME"}{" "}
                <span
                  className="sort-arrow-table"
                  onClick={() => sortFunction("name")}
                >
                  {" "}
                  <ImportExportIcon />{" "}
                </span>
              </th>
              <th>
                {"AREA OF STUDY ASSOCIATED"}{" "}
                <span
                  className="sort-arrow-table"
                  onClick={() => sortFunction("area_of_study")}
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
            ) : degreeList && degreeList.length > 0 ? (
              degreeList?.map((item, index) => (
                <tr key={index}>
                  <td>{item.degree_en} </td>
                  <td>{item.area_of_study.area_of_study_en} </td>
                  <td style={{ width: "200px" }}>
                    {
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={item?.status === "active" ? true : false}
                        onChange={() => {
                          handleStatusChange(item);
                        }}
                        disabled={master.update_status ? false : true}
                      />
                    }
                  </td>
                  <td style={{ width: "200px", textAlign: "center" }}>
                    {master.edit ? (
                      <CustomTooltip tooltipText={"Edit"}>
                        <i
                          className="fa fa-pencil"
                          // onClick={() => setEditDegreeModal(true)}
                          onClick={() => {
                            setIsEditable(true);
                            setItemData(item);
                            setAddDegreeModal(true);
                          }}
                        />
                      </CustomTooltip>
                    ) : null}
                    {master.delete ? (
                      <CustomTooltip tooltipText={"Delete"}>
                        <i
                          className="fa fa-trash"
                          // onClick={() => setDeleteModalShow(true)}
                          onClick={() => {
                            setDeleteModalShow(true);
                            setItemData(item);
                          }}
                        />
                      </CustomTooltip>
                    ) : null}
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
      <DeleteModal
        show={DeleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        deleteFunction={() => {
          //call here
          deleteDegreeData();
        }}
      />
      {addDegreeModal && (
        <AddDegree
          show={addDegreeModal}
          // onHide={() => setAddDegreeModal(false)}
          onHide={() => {
            setAddDegreeModal(false);
            getDegreeData();
          }}
          areaOfStudyList={areaOfStudyDropDownList}
          isEditable={isEditable}
          itemData={itemData}
        />
      )}
      {/* <EditDegree
        show={editDegreeModal}
        onHide={() => setEditDegreeModal(false)}
      /> */}
      {/* <Toast ref={toast} /> */}
    </>
  );
};

export default DegreeTable;
