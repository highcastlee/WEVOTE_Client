import * as React from 'react';

import { css } from '@emotion/react';
import RingLoader from 'react-spinners/RingLoader';
import theme from '@styles/theme';

interface loaderType {
  margin?: number;
  size?: number;
}

const color = theme.Blue;
function Loader({ margin, size }: loaderType) {
  return (
    <div style={{ margin: margin + 'px' }}>
      <RingLoader color={color} css={override} size={size} />
    </div>
  );
}

Loader.defaultProps = {
  margin: 60,
  size: 50,
};

const override = css`
  display: block;
  margin: 50px auto;
  border-color: ${theme.Blue};
`;

export default Loader;
