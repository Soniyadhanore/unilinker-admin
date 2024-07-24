/* eslint-disable react/prop-types */
import React from "react";
import { Table } from "react-bootstrap";
import { Paginator } from "primereact/paginator";
import EmptyComponent from "../../Modals/EmptyComponent/EmptyComponent";

const MasterTableComponent = ({
  thFirst,
  thSecond,
  thAreaOfStudy,
  thThird,
  tdFirst,
  tdSecond,
  tdAreaOfStudy,
  headButton,
  tdEditIcon,
  tdDeleteIcon,
  dataList,
}) => {
  console.log("data", tdFirst, tdSecond, tdAreaOfStudy, dataList);
  return (
    <>
      <div className="tableContent">
        <div className="text-right pb-3">{headButton}</div>
        <Table responsive>
          <thead>
            <tr>
              <th>{thFirst}</th>
              <th style={{ width: "300px" }}>{thAreaOfStudy}</th>
              <th style={{ width: "200px" }}>{thSecond}</th>
              <th style={{ width: "200px", textAlign: "center" }}>{thThird}</th>
            </tr>
          </thead>
          <tbody>
            {dataList && dataList.length > 0 ? (
              dataList?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.name_en}</td>
                  <td style={{ width: "300px" }}>
                    {item?.location?.district_en}
                  </td>
                  <td style={{ width: "200px" }}>{tdSecond}</td>
                  <td style={{ width: "200px", textAlign: "center" }}>
                    {tdEditIcon}
                    {tdDeleteIcon}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  <EmptyComponent noDataMessage="No Data Found"/>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="Pagination-content mb-3">
          <Paginator
            first={"2"}
            rows={"1"}
            totalRecords={25}
            className="mt-2"
          />
        </div>
      </div>
    </>
  );
};

export default MasterTableComponent;
