/** @format */
import { React, useEffect } from 'react';
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { Paginator } from "primereact/paginator";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Divider } from "primereact/divider";
import { PAGIANTION, formatDateFunction } from '../../common/HelperFunctions';
import globalRequest from '../../prototype/globalRequest';
import { API_ROUTES } from '../../common/Enum';
import EmptyComponent from '../EmptyComponent/EmptyComponent';
import Loaders from '../../Loaders';

const EmployeesList = () => {
  const navigate = useNavigate();

  let { id } = useParams();
  console.log(id);

  const toast = useRef(null);
  const [listData, setListData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  // const [search, setSearch] = useState("");
  const [sortby, setSortby] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [loading, setLoading] = useState(false);
  // useEffect(()=>{
  //   setFirst(1);
  //   setRows(0);
  // },[])

  const getAllData = async () => { 
    setLoading(true);
    let sortBy = "id";
    let orderBy = "desc";
    if (sortby != "") sortBy = sortby;
    if (sortOrder != "") orderBy = sortOrder;

    let params = {
      sort_by: sortBy,
      order_by: orderBy,
      page: page,
      limit: PAGIANTION,
      // search: search,
      company_institute_id:id
    };
    
    await globalRequest(
      API_ROUTES?.GETALLEMPLOYEE,
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
          // setFilterOpen(false);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    getAllData();
  }, [page, sortby, sortOrder]); 

  const onPageChange = (event) => {
    setPage(event.page + 1);
    setFirst(event.first);
    setRows(event.rows);
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

  // const showSuccess = () => {
  //   toast.current.show({
  //     severity: "success",
  //     summary: "Success",
  //     detail: "Message Content",
  //     life: 3000,
  //   });
  // };

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader p-4">
          <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate("/manage-company");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0"> Employees List</h4>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent">
            <div className="tableContent">
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                    Employee name <span className="sort-arrow-table" onClick={() => sortFunction("name")} >{" "}<ImportExportIcon />{" "}</span>
                    </th>
                    <th>
                      Email Address <span className="sort-arrow-table" onClick={() => sortFunction("email")} >{" "}<ImportExportIcon />{" "}</span>
                    </th>
                    <th>phone number <span className="sort-arrow-table" onClick={() => sortFunction("mobile")} >{" "}<ImportExportIcon />{" "}</span></th>
                    <th>Role <span className="sort-arrow-table" onClick={() => sortFunction("role")} >{" "}<ImportExportIcon />{" "}</span> </th>
                    <th>Branch <span className="sort-arrow-table" onClick={() => sortFunction("branch")} >{" "}<ImportExportIcon />{" "}</span></th>
                    <th>Account Create Date <span className="sort-arrow-table" onClick={() => sortFunction("created_at")} >{" "}<ImportExportIcon />{" "}</span></th>
                    <th>Status <span className="sort-arrow-table" onClick={() => sortFunction("status")} >{" "}<ImportExportIcon />{" "}</span></th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr>
                      <td colSpan="6">
                        <Loaders />{" "}
                        {/* Replace with your actual Loader component */}
                      </td>
                    </tr>
                  ) : listData && listData.length > 0 ? (
                    listData.map((item, index) => (
                      <tr key={index}>
                        <td
                          onClick={() => {
                            navigate("/view-sub-admin");
                          }}
                        >
                          { item?.user?.first_name } { item?.user?.last_name }
                        </td>
                        <td>{ item?.user?.email } </td>
                        <td>+{ item?.user?.country_code } { item?.user?.mobile }</td>
                        <td>{ item?.role?.role_name }</td>
                        <td>{ item?.branch?.branch_name }</td>
                        <td>{ formatDateFunction(item?.createdAt,'dd/mm/yyyy') }</td>
                        <td><span className="btn btn-light">{ item.status }</span></td>
                        {/* <td className="reset-passwordline" onClick={showSuccess}>
                          Resend Password Link
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">
                        <EmptyComponent noDataMessage="No Data Found"/>
                      </td>
                    </tr>
                  )}                                    
                </tbody>
              </Table>
              {totalCount && totalCount > PAGIANTION ? (
                <div className="Pagination-content mb-3">
                  <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={totalCount}
                    className="mt-2"
                    onPageChange={onPageChange}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <Toast ref={toast} />
    </>
  );
};

export default EmployeesList;
