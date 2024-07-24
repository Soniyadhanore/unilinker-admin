/** @format */
import { useRef, React, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Form, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import { setSnackbar } from "../../redux/reducers/snackbar";
import { useDispatch } from "react-redux";
import Loaders from "../../Loaders";
import { capitalizeFirstLetter } from "../../common/HelperFunctions";

const CreateRolesPermission = () => {

  let { id } = useParams();
  const navigate = useNavigate();
  const toast = useRef(null);
  const dispatch = useDispatch();

  const [roleName, setRoleName] = useState("");
  const [roleNameErr, setRoleNameErr] = useState("");
  const [loading, setLoading] = useState(false);

  const [permission, setPermission] = useState([
    {
      moduleName: "master",
      create: 0,
      edit: 0,
      delete: 0,
      view: 0,
      update_status: 0,      
    },
    {
      moduleName: "student",
      create: 0,
      edit: 0,
      delete: 0,
      view: 0,
      update_status: 0,      
    },
    {
      moduleName: "academic requests",
      edit: 0,
      approve: 0,
      reject: 0,
    },
    {
      moduleName: "manage unicompanies",
      create: 0,
      edit: 0,
      delete: 0,
      view: 0,
      update_status: 0,
    },
    {
      moduleName: "job requests",
      edit: 0,
      approve: 0,
      reject: 0,
    },
    {
      moduleName: "job management",
      create: 0,
      edit: 0,
      delete: 0,
      view: 0,
      update_status: 0,
    },
    {
      moduleName: "manage uniaffiliate",
      create: 0,
      edit: 0,
      delete: 0,
      view: 0,
      update_status: 0,
    },
    {
      moduleName: "support request",
      view: 0,
      update_status: 0
    },
    {
      moduleName: "cms",
      edit: 0,
      view: 0,
      update_status: 0
    },
    {
      moduleName: "faq",
      create: 0,
      edit: 0,
      delete: 0,
      view: 0,
      update_status: 0
    },
    {
      moduleName: "notification",
      create: 0,
      view: 0
    },
    {
      moduleName: "subadmin",
      create: 0,
      edit: 0,
      delete: 0,
      view: 0,
      update_status: 0
    },
    {
      moduleName: "roles",
      create: 0,
      edit: 0,
      delete: 0,
      view: 0,
      update_status: 0
    },
    {
      moduleName: "transactions",
      view: 0,
      export: 0,
      import: 0,
    },
    {
      moduleName: "payment",
      view:0,
      export: 0,
      import: 0,      
    }      
  ]);

  const submitHandler = async () => {
    if (roleName === "") {
      setRoleNameErr("Name is required");
      return false;
    }

    if (permission) {
      let tk = false;
      for(let item of permission){
        if(item.create==1)tk = true;
        if(item.delete==1)tk = true;
        if(item.edit==1)tk = true;
        if(item.update_status==1)tk = true;
        if(item.view==1)tk = true;
      }
      if(!tk){
        dispatch(
              setSnackbar({
                isOpen: true,
                message: 'Choose at least 1 permission.',
                state: "error",
              })
            );
        return false;
      }      
    }

    let data = {
      role_name: roleName,
      role_permissions: permission,
    };

    let url = API_ROUTES?.CREATEROLE;
    let method = "post";
    if(id){
      url = API_ROUTES?.EDITROLE+'/'+id;
      method = "put";
    }

    await globalRequest(url, method, data, {}, true)
      .then((res) => {
        if (res.ack === 1) {
          navigate("/roles-permission");
          if (res.message instanceof Array){
            for(let err of res.message){
              if ('role_name' in err)setRoleNameErr("Name is required");
            }
          }
          else{
            dispatch(
              setSnackbar({
                isOpen: true,
                message: res.message,
                state: "success",
              })
            );
          }
          
        } else {
          if (res.message instanceof Array){
            for(let err of res.message){
              console.log('err',err);
              if ('role_name' in err)setRoleNameErr(err.role_name);
            }
          }
          else{
            dispatch(
              setSnackbar({
                isOpen: true,
                message: res.message,
                state: "error",
              })
            );
          }          
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

    //Get role Data
  const getRoleData = async () => {
    setLoading(true);
    await globalRequest(
      API_ROUTES?.GETSPECIFICROLE + "/" + id,
      "get",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          let data = res.data;
          setRoleName(data.role_name);
          console.log('data.roleName',data.role_name);
          setPermission(JSON.parse(data.role_permissions));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  
  useEffect(() => {
    if(id)getRoleData();
  }, []);

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader justify-content-start">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate("/roles-permission");
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0">{ id ? 'Edit Role' : "Create Role" }</h4>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent">
            <div className="tableContent pt-3">
              <div className="formField w-320 pb-0 ml-4">
                <span className="p-float-label small-input">
                  <InputText
                    disabled={id==1?true:false}
                    id="tile"
                    value={roleName}
                    maxLength={50}
                    onChange={(e) => {
                      setRoleName(e.target.value.trimStart());
                      setRoleNameErr("");
                    }}
                  />
                  <label htmlFor="tile">Role Name</label>
                </span>
                {roleNameErr && (
                  <div
                    style={{ color: "#DC362E", textAlign: "initial",bottom: "-16px" }}
                    className="errorSize"
                  >
                    {roleNameErr}
                  </div>
                )}
              </div>
              <h5>Permissions</h5>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>Create</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Update Status</th>
                    <th>View</th>
                    <th>Approve</th>
                    <th>Reject</th>
                    <th>Export</th>
                    <th>Import</th>
                  </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr>
                      <td colSpan="10">
                        <Loaders />{" "}
                        {/* Replace with your actual Loader component */}
                      </td>
                    </tr>
                  ) : permission && permission.length > 0 ? (
                    permission?.map((item, index) => (
                      <tr key={index}>
                        <td>{ capitalizeFirstLetter(item.moduleName)}</td>
                        <td>
                          {
                            item?.create!=undefined ? (
                              <Form.Check
                                disabled={id==1?true:false}
                                className="cursor-pointer"
                                inline
                                type="checkbox"
                                checked={item.create}
                                onChange={() => {
                                  let prevData = [...permission];
                                  prevData[index].create = item.create ? 0 : 1;
                                  setPermission(prevData);
                                }}
                              />
                            ) : null
                          }                          
                        </td>
                        <td>
                          {
                            item?.edit!=undefined ? (
                              <Form.Check
                                inline
                                disabled={id==1?true:false}
                                type="checkbox"
                                checked={item.edit}
                                onChange={() => {
                                  let prevData = [...permission];
                                  prevData[index].edit = item.edit ? 0 : 1;
                                  setPermission(prevData);
                                }}
                              />
                            ) : null
                          }                          
                        </td>
                        <td>
                          {
                            item?.delete!=undefined ? (
                              <Form.Check
                                inline
                                disabled={id==1?true:false}
                                type="checkbox"
                                checked={item.delete}
                                onChange={() => {
                                  let prevData = [...permission];
                                  prevData[index].delete = item.delete ? 0 : 1;
                                  setPermission(prevData);
                                }}
                              />
                            ) : null
                          }                          
                        </td>
                        <td>
                          { item?.update_status!=undefined ? (
                            <Form.Check
                              inline
                              disabled={id==1?true:false}
                              type="checkbox"
                              checked={item.update_status}
                              onChange={() => {
                                let prevData = [...permission];
                                prevData[index].update_status = item.update_status ? 0 : 1;
                                setPermission(prevData);
                              }}
                            />
                          ) : null }                          
                        </td>
                        <td>
                        { item?.view!=undefined ? (
                          <Form.Check
                            inline
                            disabled={id==1?true:false}
                            type="checkbox"
                            checked={item.view}
                            onChange={() => {
                              let prevData = [...permission];
                              prevData[index].view = item.view ? 0 : 1;
                              setPermission(prevData);
                            }}
                          />
                        ) : null }
                        </td>
                        <td>
                        { item?.approve!=undefined ? (
                          <Form.Check
                            inline
                            disabled={id==1?true:false}
                            type="checkbox"
                            checked={item.approve}
                            onChange={() => {
                              let prevData = [...permission];
                              prevData[index].approve = item.approve ? 0 : 1;
                              setPermission(prevData);
                            }}
                          />
                        ) : null }
                        </td>
                        <td>
                        { item?.reject!=undefined ? (
                          <Form.Check
                            inline
                            disabled={id==1?true:false}
                            type="checkbox"
                            checked={item.reject}
                            onChange={() => {
                              let prevData = [...permission];
                              prevData[index].reject = item.reject ? 0 : 1;
                              setPermission(prevData);
                            }}
                          />
                        ) : null }                          
                        </td>
                        <td>
                        { item?.export!=undefined ? (
                          <Form.Check
                            inline
                            disabled={id==1?true:false}
                            type="checkbox"
                            checked={item.export}
                            onChange={() => {
                              let prevData = [...permission];
                              prevData[index].export = item.export ? 0 : 1;
                              setPermission(prevData);
                            }}
                          />
                        ) : null }                          
                        </td>
                        <td>
                        { item?.import!=undefined ? (
                          <Form.Check
                            inline
                            disabled={id==1?true:false}
                            type="checkbox"
                            checked={item.import}
                            onChange={() => {
                              let prevData = [...permission];
                              prevData[index].import = item.import ? 0 : 1;
                              setPermission(prevData);
                            }}
                          />
                        ) : null }                          
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10">
                        <EmptyComponent noDataMessage="No Data Found" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="grid text-right">
          <div className="lg:col-12 md:col-12 sm:col-12 mt-4 mb-4">
            <Button className="btn btn-gray mr-1" onClick={() => navigate(-1)}>Cancel</Button>
            <Button
              className="btn btn-orange ml-1 mr-1" disabled={id==1?true:false}
              onClick={() => submitHandler()}
            >
              { id ? 'Edit' : 'Create' } Account
            </Button>
          </div>
        </div>
      </section>
      <Toast ref={toast} />
    </>
  );
};

export default CreateRolesPermission;
