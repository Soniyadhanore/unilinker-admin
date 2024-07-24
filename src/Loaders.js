/**
 * @file Loaders.js
 * @description This file contains the loader component.
 * @exports {Object} Loaders
 */

import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import { css } from '@emotion/react';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const Loaders = () => {
  return (
    <div className="sweet-loading">
      <BounceLoader css={override} size={50} color="#000000" loading={true} speedMultiplier={1.5} />
    </div>
  );
};

export default Loaders;