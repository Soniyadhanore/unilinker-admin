import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const CustomTooltip = ({ children, tooltipText }) => (
  <OverlayTrigger
    overlay={<Tooltip id="tooltip">{tooltipText}</Tooltip>}
    placement="top"
    delay={{ show: 0, hide: 0 }}
    style={{ display: 'inline-block' }} 
  >
    {children}
  </OverlayTrigger>
);

export default CustomTooltip;