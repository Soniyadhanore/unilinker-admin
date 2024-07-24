/** @format */
import { useState, useEffect,React } from "react";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { Divider } from "primereact/divider";
import { Editor } from "primereact/editor";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

  const PrivacyPolicy = () => {
  const [text, setText] = useState("");
  const [text_ar, setText_ar] = useState("");
  const [loading, setLoading] = useState(false);
  const getPrivacyPolicy= async () =>{};
  const navigate = useNavigate();


  const addPrivacyPolicy= async () =>{};
  
  const getPrivacyPolicyData = async () => {
    try {
      const res = await getPrivacyPolicy();
      setText(res?.data?.data?.text);
      setText_ar(res?.data?.data?.text_ar);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await addPrivacyPolicy({ text, text_ar });
      setLoading(false);
      toast.success(res?.data?.message);
    } catch (err) {
      setLoading(false);
      toast.error(err?.response?.data?.message);
      console.log(err);
    }
  };

  useEffect(() => {
    getPrivacyPolicyData();
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
              <h4 className="h4 mb-0">Privacy Policy</h4>
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
                          Privacy Policy (English)
                        </label>
                        <Editor
                          value={text}
                          onTextChange={(e) => setText(e.htmlValue)}
                          style={{ height: "150px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-12 md:col-12 sm:col-12">
                    <div className="formField">
                      <div className="formField">
                        <label className="frmLabel">
                          Privacy Policy (Portuguese)
                        </label>
                        <Editor
                          value={text_ar}
                          onTextChange={(e) => setText_ar(e.htmlValue)}
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
              >
                Cancel
              </Button>
              <Button
                className="btn btn-orange"
                onClick={handleSubmit}
                disabled={loading}
                style={{ minWidth: "100px" }}
              >
                {loading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
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

export default PrivacyPolicy;
