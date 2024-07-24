/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import { Paginator } from "primereact/paginator";
import { PAGIANTION, getPermissionFromAll } from "../../common/HelperFunctions";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Loaders from "../../Loaders";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../common/LocalVariable";
import jwtDecode from "jwt-decode";

const LocationsTable = () => {
  const [locationList, setLocationList] = useState([]);
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

  const getLocationsData = async () => {
    setLoading(true);
    let sortBy = "id";
    let orderBy = "desc";
    if (sortby != "") sortBy = sortby;
    if (sortOrder != "") orderBy = sortOrder;
    let params = { page: page, limit: PAGIANTION, sort_by: sortBy,order_by: orderBy };
    await globalRequest(
      API_ROUTES?.GETLOCATIONDATA,
      "get",
      {},
      { params: params },
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setLocationList(res.data?.rows || []);
          setTotalCount(res.data?.count || 0);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const handleStatusChange = async (item) => {
    await globalRequest(
      API_ROUTES?.CHANGESTATUSLOCATIONDATA + "/" + item.id,
      "put",
      { status: item.status === "active" ? "inactive" : "active" },
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          getLocationsData();
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
    getLocationsData();
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
              master.create ? (<button className="btn btn-orange ml-1 mr-3">Sync</button>) : null
            }            
          </div>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>{"LOCATION NAME	"} <span className="sort-arrow-table" onClick={() => sortFunction("location")} >{" "}<ImportExportIcon />{" "}</span></th>
              <th style={{ width: "200px" }}>{"Status"}</th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
          <tr>
            <td colSpan="2">
              <Loaders /> {/* Replace with your actual Loader component */}
            </td>
          </tr>
          ) : locationList && locationList.length > 0 ? (
              locationList?.map((item, index) => (
                <tr key={index}>
                  <td>{item.district_en}</td>
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">
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
    </>
  );
};

export default LocationsTable;
