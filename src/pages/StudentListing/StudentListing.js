/** @format */
import * as React from "react";
import { InputText } from "primereact/inputtext";
import { Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef, useState, useEffect } from "react";
import { Paginator } from "primereact/paginator";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import { Divider } from "primereact/divider";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import FilterStudent from "./FilterStudent";
import { PAGIANTION, getPermissionFromAll } from "../../common/HelperFunctions";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import Loaders from "../../Loaders";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../common/LocalVariable";
import jwtDecode from "jwt-decode";

const StudentListing = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(PAGIANTION);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortby, setSortby] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);
  let student = getPermissionFromAll("student", accessToken);

  const [filter, setFilter] = useState({
    areaOfStudy: [
      // { name: "Formação de Professores/Formadores e Ciências da Educação	",code:1, isActive: false },
      // { name: "Artes",code:2, isActive: false },
    ],
    degree: [
      // { name: "Ciências da Educação[Lic-1º cic",code:1, isActive: false },
      // { name: "Ciências da Educação - Educação Social[Lic-1º cic",code:2, isActive: false },
    ],
    profileVerification: [
      // { name: "verified",code:'verified', isActive: false },
      // { name: "non verified",code:'unverified', isActive: false },
    ],
    profileVisibility: [
      // { name: "public",code:'public', isActive: false },
      // { name: "private",code:'private', isActive: false },
    ],
  });

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  const navigate = useNavigate();
  const toast = useRef(null);

  const getAllData = async () => {
    // console.log(filter);
    setLoading(true);
    let areaOfStudy = [];
    let degree = [];
    let location = [];
    let profileVerification = [];
    let profileVisibility = [];
    if (filter.areaOfStudy)
      for (let item of filter.areaOfStudy)
        if (item?.isActive) areaOfStudy.push(item?.code);
    if (filter.degree)
      for (let item of filter.degree)
        if (item?.isActive) degree.push(item?.code);
    if (filter.location)
      for (let item of filter.location)
        if (item?.isActive) location.push(item?.code);
    if (filter.profileVerification)
      for (let item of filter.profileVerification)
        if (item?.isActive) profileVerification.push(item?.code);
    if (filter.degree)
      for (let item of filter.profileVisibility)
        if (item?.isActive) profileVisibility.push(item?.code);

    let sortBy = "id";
    let orderBy = "desc";
    if (sortby != "") sortBy = sortby;
    if (sortOrder != "") orderBy = sortOrder;

    let params = {
      page: page,
      limit: PAGIANTION,
      search: search,
      sort_by: sortBy,
      order_by: orderBy,
      areaOfStudy: areaOfStudy,
      degree: degree,
      location: location,
      profileVerification: profileVerification,
      profileVisibility: profileVisibility,
    };
    await globalRequest(
      API_ROUTES?.GETSTUDENTDATA,
      "get",
      {},
      { params: params },
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setListData(res.data?.rows || []);
          setTotalCount(res.data?.count || 0);
          setFilterOpen(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const handleStatusChange = async (item) => {
    await globalRequest(
      API_ROUTES?.CHANGEOFSTATUSSTUDENTDATA + "/" + item?.id,
      "put",
      { status: item?.user.status === "active" ? "inactive" : "active" },
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          getAllData();
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

  const deleteData = async () => {
    await globalRequest(
      API_ROUTES?.DELETESTUDENTDATA + "/" + itemData.id,
      "delete",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setDeleteModalShow(false);
          getAllData();
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    getAllData();
  }, [page, search, sortby, sortOrder]);

  useEffect(() => {
    getAllFilterData();
  }, []);

  const getAllFilterData = async () => {
    await globalRequest(
      API_ROUTES?.GETALLSTUDENTFILTERDATA,
      "get",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          let areaOfStudy = [];
          let degree = [];
          let location = [];
          for (let item of res.data.area_of_study)
            areaOfStudy.push({
              name: item?.area_of_study_en,
              code: item?.id,
              isActive: false,
            });
          for (let item of res.data.degree)
            degree.push({
              name: item?.degree_en,
              code: item?.id,
              isActive: false,
            });
          for (let item of res.data.location)
            location.push({
              name: item?.district_en,
              code: item?.id,
              isActive: false,
            });
          let dataSet = {
            areaOfStudy: areaOfStudy,
            degree: degree,
            location: location,
            profileVerification: [
              { name: "verified", code: "verified", isActive: false },
              { name: "non verified", code: "unverified", isActive: false },
            ],
            profileVisibility: [
              { name: "public", code: "public", isActive: false },
              { name: "private", code: "private", isActive: false },
            ],
          };
          // console.log(dataSet);
          setFilter(dataSet);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

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
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <h4 className="h4 mb-0">Students</h4>
              <div className="tableFilterRow ml-auto">
                <div className="tableSearchCol ml-1 mr-1">
                  <div className="p-inputgroup searchFilter searchFilterStudent">
                    <span className="p-input-icon-left w-full small-input">
                      <i className="pi pi-search" />
                      <InputText
                        placeholder="Search by name, email address, faculty"
                        className="w-full"
                        onKeyUp={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                    </span>
                  </div>
                </div>
                <div className="tableSearchCol ml-1 mr-1">
                  <Button
                    className="btn btn-light"
                    onClick={toggleFilter}
                    aria-controls="popup_menu_right"
                    aria-haspopup
                  >
                    <i className="pi pi-filter mr-2"></i> Filter
                  </Button>
                </div>
                <div className="tableFilterCol ml-1" style={{ width: "auto" }}>
                  <Button
                    className="btn btn-orange"
                    onClick={() => {
                      navigate("/view-strike");
                    }}
                  >
                    <i className="pi pi-eye mr-2"></i> View Strike
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent">
            <div className="tableContent">
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      Unique ID{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("id")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Name{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("name")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Email Address{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("email")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Mobile number{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("mobile")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Unilinkr score{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("unilinkr_score")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Faculty{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("faculty")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>Verification</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="9">
                        <Loaders />{" "}
                        {/* Replace with your actual Loader component */}
                      </td>
                    </tr>
                  ) : listData && listData.length > 0 ? (
                    listData?.map((item, index) => (
                      <tr key={index}>
                        <td
                          onClick={() => {
                            navigate("/view-student/" + item?.id);
                          }}
                          className="cursor-pointer"
                        >
                          #{item?.id}
                        </td>
                        <td
                          onClick={() => {
                            navigate("/view-student/" + item?.id);
                          }}
                          className="cursor-pointer"
                        >
                          {item?.user?.first_name ? item?.user?.first_name : ""}{" "}
                          {item?.user?.last_name ? item?.user?.last_name : ""}
                        </td>
                        <td
                          onClick={() => {
                            navigate("/view-student/" + item?.id);
                          }}
                          className="cursor-pointer"
                        >
                          {item?.user?.email ? item?.user?.email : ""}{" "}
                        </td>
                        <td
                          onClick={() => {
                            navigate("/view-student/" + item?.id);
                          }}
                          className="cursor-pointer"
                        >
                          {item?.user?.mobile}
                        </td>
                        <td
                          onClick={() => {
                            navigate("/view-student/" + item?.id);
                          }}
                          className="cursor-pointer"
                        >
                          {item?.user?.unilinkr_score}
                        </td>
                        <td
                          onClick={() => {
                            navigate("/view-student/" + item?.id);
                          }}
                          className="cursor-pointer"
                        >
                          {item?.faculty?.name_en}
                        </td>
                        <td
                          onClick={() => {
                            navigate("/view-student/" + item?.id);
                          }}
                          className="cursor-pointer"
                        >
                          {" "}
                          {item?.university_email_isverified
                            ? "verified"
                            : "unverified"}{" "}
                        </td>
                        <td>
                         
                            <Form.Check
                              type="switch"
                              checked={
                                item?.user?.status === "active" ? true : false
                              }
                              onChange={() => {
                                handleStatusChange(item);
                              }}
                              disabled={ student.update_status ? false : true }
                            />
                         
                        </td>
                        <td className="text-center">
                        {student.edit ? (
                          <CustomTooltip tooltipText={"Edit"}>
                          <i
                            className="fa fa-pencil"
                            onClick={() => {
                              setItemData(item);
                              navigate("/edit-student/" + item?.id);
                            }}
                          />
                        </CustomTooltip>
                        ) : '-' }                          
                          {/* <CustomTooltip tooltipText={"Delete"}>
                            <i
                              className="fa fa-trash"
                              onClick={() => {
                                setDeleteModalShow(true);
                                setItemData(item);
                              }}
                            />
                          </CustomTooltip> */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9">
                        <EmptyComponent noDataMessage="No Data Found" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <div className="Pagination-content mb-3">
                <span className="ml-3 ">Total Count : {totalCount}</span>
                {totalCount && totalCount > PAGIANTION ? (
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
          </div>
        </div>
      </section>
      <DeleteModal
        show={DeleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        deleteFunction={() => {
          deleteData();
        }}
      />
      <Toast ref={toast} />
      {filterOpen && (
        <FilterStudent
          open={filterOpen}
          onClose={toggleFilter}
          filter={filter}
          setFilter={setFilter}
          callApi={() => {
            getAllData();
          }}
        />
      )}
    </>
  );
};

export default StudentListing;
