/** @format */
import { React, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { Paginator } from "primereact/paginator";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import RejectStudentUnionModal from "../../Modals/RejectStudentUnionModal/RejectStudentUnionModal";
import { Divider } from "primereact/divider";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import FilterCompany from "./FilterCompany";
import { PAGIANTION, formatDateFunction, getPermissionFromAll } from "../../common/HelperFunctions";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import Loaders from "../../Loaders";
import { STORAGE } from "../../common/LocalVariable";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import jwtDecode from "jwt-decode";

const ManageCompanyList = () => {
  const navigate = useNavigate();
  const toast = useRef(null);

  const [filterOpen, setFilterOpen] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  // const [itemData, setItemData] = useState([]);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(PAGIANTION);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortby, setSortby] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    no_of_strikes: [
      { name: 2, isActive: false },
      { name: 3, isActive: false },
      { name: 4, isActive: false },
    ],
    status: [
      { name: "active", isActive: false },
      { name: "inactive", isActive: false },
    ],
    type: [
      { name: "company", isActive: false },
      { name: "institution", isActive: false },
    ],
  });

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);
  let manageUnicompanies = getPermissionFromAll("manage unicompanies", accessToken);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const getAllData = async () => {
    // console.log(filter);
    setLoading(true);
    let no_of_strikes = [];
    let status = [];
    let type = [];
    for (let item of filter.no_of_strikes)
      if (item?.isActive) no_of_strikes.push(item?.name);
    for (let item of filter.status) if (item?.isActive) status.push(item?.name);
    for (let item of filter.type) {
      if (item?.isActive) type.push(item?.name);
    }

    let sortBy = 'id'; let orderBy = 'desc'; 
    if ( sortby!="" )  sortBy = sortby;
    if ( sortOrder!="" )  orderBy = sortOrder;

    let params = {
      page: page,
      limit: PAGIANTION,
      search: search,
      sort_by:sortBy,
      order_by:orderBy,
      no_of_strikes: no_of_strikes,
      status: status,
      type: type,
    };
    await globalRequest(
      API_ROUTES?.GETCOMPANYDATA,
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
      API_ROUTES?.CHANGEOFSTATUSCOMPANYDATA + "/" + item?.addedBy,
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

  useEffect(() => {
    getAllData();
  }, [page, search,sortby,sortOrder]);

  const onPageChange = (event) => {
    setPage(event.page + 1);
    setFirst(event.first);
    setRows(event.rows);
  };

  const [rejectStudentUnionModal, setRejectStudentUnionModal] = useState(false);

  
  //sort function
  const sortFunction = (sortType) => {
    // console.log('sssssssssss');
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
              <h4 className="h4 mb-0">Manage Unicompany</h4>
              <div className="tableFilterRow ml-auto">
                <div className="tableSearchCol">
                  <div className="p-inputgroup searchFilterAcademic">
                    <span className="p-input-icon-left w-full small-input">
                      <i className="pi pi-search" />
                      <InputText
                        placeholder="Search by company name, email address, contact person name "
                        className="w-full"
                        onKeyUp={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                    </span>
                  </div>
                </div>
                <div className="tableSearchCol">
                  <div className="tableFilterRow ml-2 mr-1">
                    <div className="FilterCol" style={{ width: "auto" }}>
                      <Button
                        className="btn btn-light"
                        onClick={toggleFilter}
                        aria-controls="popup_menu_right"
                        aria-haspopup
                      >
                        <i className="pi pi-filter mr-2"></i> Filter
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="tableFilterCol ml-1" style={{ width: "auto" }}>
                  <Button
                    className="btn btn-orange"
                    onClick={() => {
                      navigate("/company-view-strike");
                    }}
                  >
                    <i className="pi pi-eye mr-2"></i> View Strike Request
                  </Button>
                </div>
                <div className="tableFilterCol ml-2" style={{ width: "auto" }}>
                  {
                    manageUnicompanies.create ? (
                      <Button
                    className="btn btn-orange"
                    onClick={() => {
                      navigate("/create-company");
                    }}
                  >
                    <i className="pi pi-plus mr-2"></i> Create Company
                  </Button>
                    ) :null
                  }                  
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
                      company/academic institution <span className="sort-arrow-table" onClick={() => {sortFunction("company_institute_name")}}> <ImportExportIcon /> </span>
                    </th>
                    <th>
                      Contact person Full name <span className="sort-arrow-table" onClick={() => sortFunction("first_name")}> <ImportExportIcon /> </span>
                    </th>
                    <th>
                      Contact person email <span className="sort-arrow-table" onClick={() => sortFunction("email")}> <ImportExportIcon /> </span>
                    </th>
                    <th>
                      Account creation date <span className="sort-arrow-table" onClick={() => sortFunction("createdAt")}> <ImportExportIcon /> </span>
                    </th>
                    <th>Status</th>
                    <th className="text-center">Strikes</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr>
                      <td colSpan="7">
                        <Loaders />{" "}
                        {/* Replace with your actual Loader component */}
                      </td>
                    </tr>
                  ) : listData && listData.length > 0 ? (
                    listData?.map((item, index) => (
                      <tr key={index}>
                        <td className="cursor-pointer"
                          onClick={() => {
                            navigate("/company-detail/" + item.id);
                          }}
                        >
                          {item?.company_institute_name}
                        </td>
                        <td className="cursor-pointer" onClick={() => {
                            navigate("/company-detail/" + item.id);
                          }} >
                          {item?.user?.first_name} {item?.user?.last_name}
                        </td>
                        <td className="cursor-pointer"
                        onClick={() => {
                            navigate("/company-detail/" + item.id);
                          }} >{item?.user?.email}</td>
                        <td>{formatDateFunction(item?.createdAt)}</td>
                        <td>
                          <Form.Check
                            type="switch"
                            checked={
                              item?.user?.status === "active" ? true : false
                            }
                            onChange={() => {
                              handleStatusChange(item);
                            }}
                            disabled={manageUnicompanies.update_status?false:true}
                          />
                        </td>
                        <td className="text-center cursor-pointer" onClick={() => {
                            navigate("/company-detail/" + item.id);
                          }} >
                          {item?.user?.no_of_strikes}{" "}
                        </td>
                        <td className="text-center">
                          {
                            manageUnicompanies.edit ? (
                              <CustomTooltip tooltipText={"Edit"}>
                            <i
                              className="fa fa-pencil"
                              // onClick={() => {
                              //   navigate("/create-company");
                              // }}
                              onClick={() => {
                                // setItemData(item);
                                navigate("/edit-company/" + item?.id);
                              }}
                            />
                          </CustomTooltip>
                            ) : '-'
                          }                          
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">
                        <EmptyComponent noDataMessage="No Data Found"/>
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
                    className="mt-2"
                    onPageChange={onPageChange}
                  />
                  ) : null}
                </div>              
            </div>
          </div>
        </div>
      </section>
      <Toast ref={toast} />
      <RejectStudentUnionModal
        show={rejectStudentUnionModal}
        onHide={() => setRejectStudentUnionModal(false)}
      />
      {/* <FilterCompany open={filterOpen} onClose={toggleFilter} /> */}
      {filterOpen && (
        <FilterCompany
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

export default ManageCompanyList;
