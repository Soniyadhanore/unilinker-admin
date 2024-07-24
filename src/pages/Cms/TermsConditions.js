/** @format */
import { useState, useEffect, React } from "react";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { Divider } from "primereact/divider";
import { Editor } from "primereact/editor";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TermsConditions = () => {
  const [text, setText] = useState("");
  const [text_ar, setText_ar] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getTermsCondition = async () => {};
  const addTermsCondition = async () => {};

  const getTermsConditionsData = async () => {
    try {
      const res = await getTermsCondition();
      setText(res?.data?.data?.text);
      setText_ar(res?.data?.data?.text_ar);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await addTermsCondition({ text, text_ar });
      setLoading(false);
      toast.success(res?.data?.message);
    } catch (err) {
      setLoading(false);
      toast.error(err?.response?.data?.message);
      console.log(err);
    }
  };

  useEffect(() => {
    getTermsConditionsData();
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
              /><h4 className="h4 mb-0">Terms & Conditions</h4>
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
                          Terms & Conditions (English)
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
                        Terms & Conditions (Portuguese)
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

export default TermsConditions;
