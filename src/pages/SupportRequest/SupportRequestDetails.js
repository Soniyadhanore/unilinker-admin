/** @format */
import { Button } from "react-bootstrap";
import { Divider } from "primereact/divider";
import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import { capitalizeFirstLetter, formatDateFunction } from "../../common/HelperFunctions";

const SupportRequestDetails = () => {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState([]);
  const { id } = useParams();

  const getSpecificData = async () => {
    await globalRequest(
      API_ROUTES?.GETSPECIFICHELPANDSUPPORTDATA + "/" + id,
      "get",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setItemData(res.data || []);
          console.log(itemData);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const handleStatusChange = async (item) => {
    await globalRequest(
      API_ROUTES?.CHANGEOFSTATUSHELPANDSUPPORTDATA + "/" + item.id,
      "put",
      { status: item.status === "open" ? "resolved" : "open" },
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          getSpecificData();
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    getSpecificData();
  }, []);

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader p-4">
            <div className="tableHeader">
            <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate("/support-requestList");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0">
                {itemData?.help_n_support_type?.type_en}
              </h4>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent p-4">
            <div className="support-card">
              <div className="support-head">
                <div>
                  <h6>{itemData.title}</h6>
                </div>
                <div>
                  <h4>
                    {formatDateFunction(itemData.createdAt, "dd/mm/yyyy", true)}
                  </h4>
                </div>
              </div>
              <span>{`Received from '${itemData?.user?.first_name} ${itemData?.user?.last_name}'`} ({itemData?.user?.email})</span>
              <h5>{itemData.title}</h5>
              {/* <p>{itemData.description}</p> */}
              <div dangerouslySetInnerHTML={{ __html: itemData.description }} />
              <div className="text-right">
                <div className="btn btn-light">
                  <b>{ capitalizeFirstLetter(itemData.status)}</b>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="ml-auto">
                {itemData?.status === "open" && (
                  <>
                    <Button
                      className="btn btn-gray mr-1"
                      onClick={() => {
                        navigate("/support-requestList");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button className="btn btn-orange ml-1 mr-1" onClick={() => {
                          handleStatusChange(itemData);
                        }}>
                      Mark as Resolved
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SupportRequestDetails;
