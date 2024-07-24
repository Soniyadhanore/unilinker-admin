// import PropTypes from "prop-types";
import React from "react";
import { Navigate, Outlet} from "react-router-dom"

import { STORAGE } from "../common/LocalVariable";
import addDeleteGetLocalStorage from "../prototype/addDeleteGetLocalStorage";

  export const AdminPrivateRoutes =()=>{    
        const AdminAccess = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
        return(
            <>
               {AdminAccess? <Outlet/>:<Navigate to="/"/>}
            </>
      )
    }