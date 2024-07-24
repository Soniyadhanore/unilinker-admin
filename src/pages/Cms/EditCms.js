/** @format */
import { useState, useEffect, React } from "react";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { Divider } from "primereact/divider";
import { Editor } from "primereact/editor";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { API_ROUTES } from "../../common/Enum";
import globalRequest from "../../prototype/globalRequest";

const EditCms = () => {
  const [loading, setLoading] = useState(false);
  const [cmsData, setCmsData] = useState({
    page_name: "",
    text1: "",
    text2: "",
  });
  const navigate = useNavigate();

  let { id } = useParams();
  // console.log(id);

  const getEditCmsData = async () => {
    await globalRequest(
      API_ROUTES?.GETSPECIFICCMSDATA + "/" + id,
      "get",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          console.log(res.data);
          setCmsData((prev) => ({
            ...prev,
            page_name: res?.data?.page_name,
            text1: res?.data?.content_en,
            text2: res?.data?.content_pt,
          }));
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = {
        page_name: cmsData.page_name,
        content_en: cmsData?.text1,
        content_pt: cmsData?.text2,
      };
      await globalRequest(
        API_ROUTES?.EDITCMSDATA + "/" + id,
        "put",
        data,
        {},
        true
      )
        .then((res) => {
          if (res.ack === 1) {
            setLoading(false);
            toast.success("Data successfully updated.");
          }
        })
        .catch((err) => {
          console.error("err", err);
        });
    } catch (err) {
      setLoading(false);
      toast.error(err?.response?.data?.message);
      console.log(err);
    }
  };

  useEffect(() => {
    getEditCmsData();
  }, []);

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate("/cms");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0">{cmsData.page_name}</h4>
            </div>
          </div>
          <Divider className="mt-0 mb-2" />
          <div className="contentBox-w">
            <div className="grid">
              <div className="lg:col-12 md:col-12 sm:col-12">
                <div className="grid">
                  <div className="lg:col-12 md:col-12 sm:col-12">
                    <div className="formField">
                      <div className="formField">
                        <label className="frmLabel">
                          {cmsData.page_name} (English)
                        </label>
                        <Editor
                          value={cmsData?.text1 ? cmsData?.text1 : ""}
                          onChange={(e) =>
                            setCmsData((prev) => ({
                              ...prev,
                              text1: e.htmlValue,
                            }))
                          }
                          style={{ height: "150px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-12 md:col-12 sm:col-12">
                    <div className="formField">
                      <div className="formField">
                        <label className="frmLabel">
                          {cmsData.page_name} (Portuguese)
                        </label>
                        <Editor
                          value={cmsData.text2 ? cmsData.text2 : ""}
                          onChange={(e) =>
                            setCmsData((prev) => ({
                              ...prev,
                              text2: e.htmlValue,
                            }))
                          }
                          style={{ height: "150px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div className="flex justify-content-end">
              <Button
                className="btn btn-gray mr-2"
                style={{ minWidth: "100px" }}
                onClick={() => {
                  navigate("/cms");
                }}
              >
                Cancel
              </Button>
              <Button
                className="btn btn-orange"
                onClick={handleSubmit}
                style={{ minWidth: "100px" }}
                disabled={loading}
              >
                {loading ? (
                  <Spinner>
                    <p>Loading...</p>
                  </Spinner>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditCms;
