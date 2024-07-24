/**
 * @file ScrollToTop.js
 * @description This component is used to scroll to top on page change.
 * @exports ScrollToTop component
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);
  return null;
}
