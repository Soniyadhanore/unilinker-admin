import React, { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
// import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { Dialog } from "primereact/dialog";
import logoTop from "../../../assets/images/logo/Logo.svg";
// import profileIcon from "../../../assets/images/structure/Ellipse.png";
import userIcon from "../../../assets/images/structure/user.png";
import "./header.scss";
import globalRequest from "../../../prototype/globalRequest";
import { API_ROUTES } from "../../../common/Enum";
import jwt_decode from "jwt-decode";
import addDeleteGetLocalStorage from "../../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../../common/LocalVariable";
import { SHOW_IMG } from "../../../common/HelperFunctions";

// const Database = [
//   {
//     label: "Lorem Ipsum is simply dummy text of the printing",
//     describe: "jkdfj",
//   },
//   {
//     label: "Lorem Ipsum is simply dummy text of the printing",
//   },
// ];

const Header = () => {
  const navigate = useNavigate();
  const [logOutDialog, setLogOutDialog] = useState(false);
  const [userData, setUserData] = useState([]);
  // const menuDatabase = useRef(null);

  useEffect(() => {
    const data = addDeleteGetLocalStorage(STORAGE.USER_TOKEN, {}, "get");
    let decode = jwt_decode(data);
    setUserData(decode);
  }, []); 

  const logout = async () => {
    const data = addDeleteGetLocalStorage(STORAGE.USER_TOKEN, {}, "get");
    let decode = jwt_decode(data);
    await globalRequest(API_ROUTES?.LOGOUT, "post", { userId:decode?.id }, {},true)
      .then((res) => {
        // console.log("res", res);
        if (res.ack === 1) {
          localStorage.clear();
           navigate("/");
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  return (
    <>
      <div className="header-wrapper">
        <div className="header">
          <div className="container">
            <div className="header-flex">
              <div className="header-left">
                <div className="header__logo">
                  <Link to="/">
                    <img src={logoTop} alt="logo" width="120px" />
                  </Link>
                </div>
              </div>
              <div className="header-right">
                <div className="top-toolbar-right-item pl-3">
                  {/* <Menu
                    model={Database}
                    onClick={() => {
                      // debugger;
                    }}
                    popup
                    ref={menuDatabase}
                    className="notification-list"
                  /> */}
                  <div
                    className="currency-drop mt-2"
                    // onClick={(e) => menuDatabase.current.toggle(e)}
                  >
                    <Link to="/notification">
                    <i
                      className="pi pi-bell"
                      style={{ fontSize: "1.5rem", color: "#000" }}
                    />
                    
                    <Badge value="4" />
                    </Link>
                  </div>
                </div>
                <div className="header__user">
                  <span>
                    <img
                      src={ userData.profile_pic ? SHOW_IMG(`profile_pic/${userData?.profile_pic}`) : userIcon }
                      alt="user"
                      className="icon24"
                      style={{ margin: "0 10px 0 0",borderRadius: "50%" }}
                    />
                    { userData.first_name }
                  </span>
                </div>
                <div className="header__user">
                  <span>
                    <i
                      className="fa fa-sign-out"
                      aria-hidden="true"
                      style={{ fontSize: "1.5rem", color: "#000" }}
                      onClick={() => setLogOutDialog(true)}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        header="Logout"
        className="dialogWidth400 headetPadding"
        visible={logOutDialog}
        style={{ width: "400px" }}
        onHide={() => setLogOutDialog(false)}
        draggable={false}
        footer={() => (
          <div className="dialogFooter-2 p2 dilogbtns w-100">
            <Button
              className="btn btn-gray w-100"
              onClick={() => {
                setLogOutDialog(false);
              }}
            >
              No
            </Button>
            <Button
              className="btn btn-orange w-100"
              onClick={() => {
                setLogOutDialog(false);
                logout();
              }}
            >
              Yes
            </Button>
          </div>
        )}
      >
        <div className="addformDialog pt-0">
          <p className="p1 mb-0 mt-0">Are you sure want to Logout?</p>
        </div>
      </Dialog>
      <Outlet />
    </>
  );
};

export default Header;
