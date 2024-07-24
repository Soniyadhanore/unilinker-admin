/** @format */
import { useState, React, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { TabView, TabPanel } from "primereact/tabview";
import { useNavigate } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import { Divider } from "primereact/divider";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import globalRequest from "../../prototype/globalRequest";
import {
  PAGIANTION,
  formatDateFunction,
  getPermissionFromAll,
} from "../../common/HelperFunctions";
import { API_ROUTES } from "../../common/Enum";
import { Paginator } from "primereact/paginator";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import Loaders from "../../Loaders";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../common/LocalVariable";
import jwtDecode from "jwt-decode";

const CmsList = () => {
  const navigate = useNavigate();

  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const [listData, setListData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(PAGIANTION);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const getAllData = async () => {
    setLoading(true);
    let seletedTab = tabIndex === 0 ? "student" : "company_institution";
    let params = {
      page: page,
      limit: PAGIANTION,
      type: seletedTab,
      search: search,
    };
    await globalRequest(
      API_ROUTES?.GETCMSDATA,
      "get",
      {},
      { params: params },
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setListData(res.data?.rows || []);
          setTotalCount(res.data?.count || 0);
          setLoading(false);
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

  const handleStatusChange = async (item) => {
    await globalRequest(
      API_ROUTES?.CHANGEOFSTATUSCMSDATA + "/" + item.id,
      "put",
      { status: item.status === "active" ? "inactive" : "active" },
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
    // console.log(search);
    getAllData();
  }, [page, tabIndex, search]);

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);
  let cms = getPermissionFromAll("cms", accessToken);

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <h4 className="h4 mb-0">CMS ({totalCount})</h4>
              <div className="tableFilterRow">
                <div className="tableFilterCol cms-search">
                  <div className="p-inputgroup affiliateFilter">
                    <span className="p-input-icon-left w-full small-input pr-2">
                      <i className="pi pi-search" />
                      <InputText
                        placeholder="Search by Name"
                        className="w-full"
                        onKeyUp={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent">
            <TabView
              activeIndex={tabIndex}
              onTabChange={(e) => {
                setTabIndex(e.index);
              }}
            >
              <TabPanel header="Student">
                <div className="tableContent">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Page name</th>
                        <th>Updated on</th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="4">
                            <Loaders />{" "}
                            {/* Replace with your actual Loader component */}
                          </td>
                        </tr>
                      ) : listData && listData.length > 0 ? (
                        listData?.map((item, index) => (
                          <tr key={index}>
                            <td>{item.page_name}</td>
                            <td>
                              {formatDateFunction(item.updatedAt, "dd-mm-yyyy")}
                            </td>
                            <td>
                              {" "}
                              <Form.Check
                                type="switch"
                                id="custom-switch"
                                checked={
                                  item?.status === "active" ? true : false
                                }
                                onChange={() => {
                                  handleStatusChange(item);
                                }}
                                disabled={cms.update_status ? false : true}
                              />
                            </td>
                            <td className="text-center">
                              {cms.edit ? (
                                <CustomTooltip tooltipText={"Edit"}>
                                  <i
                                    className="fa fa-pencil"
                                    onClick={() => {
                                      navigate("/cms/edit/" + item.id);
                                    }}
                                  />
                                </CustomTooltip>
                              ) : null}
                              {/* <i
                                  className="fa fa-trash"
                                  onClick={() => setDeleteModalShow(true)}
                                /> */}
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
                    {totalCount && (
                      <Paginator
                        first={first}
                        rows={rows}
                        totalRecords={totalCount}
                        className="mt-2"
                        onPageChange={onPageChange}
                      />
                    )}
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Company Admin">
                <div className="tableContent">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Page name</th>
                        <th>Added on</th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="4">
                            <Loaders />{" "}
                            {/* Replace with your actual Loader component */}
                          </td>
                        </tr>
                      ) : listData && listData.length > 0 ? (
                        listData?.map((item, index) => (
                          <tr key={index}>
                            <td>{item.page_name}</td>
                            <td>
                              {formatDateFunction(item.updatedAt, "dd-mm-yyyy")}
                            </td>
                            <td>
                              {" "}
                              <Form.Check
                                type="switch"
                                id="custom-switch"
                                checked={
                                  item?.status === "active" ? true : false
                                }
                                onChange={() => {
                                  handleStatusChange(item);
                                }}
                                disabled={cms.update_status ? false : true}
                              />
                            </td>
                            <td className="text-center">
                              {cms.edit ? (
                                <CustomTooltip tooltipText={"Edit"}>
                                  <i
                                    className="fa fa-pencil"
                                    onClick={() => {
                                      navigate("/cms/edit/" + item.id);
                                    }}
                                  />
                                </CustomTooltip>
                              ) : null}

                              {/* <i
                                  className="fa fa-trash"
                                  onClick={() => setDeleteModalShow(true)}
                                /> */}
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
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
      <DeleteModal
        show={DeleteModalShow}
        onHide={() => setDeleteModalShow(false)}
      />
    </>
  );
};

export default CmsList;
