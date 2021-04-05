/** @jsx jsx */
import { jsx, css } from "@emotion/react";

export const container = css`
  width: 90%;
  height: 600px;
  margin: 2rem auto;
`;

export const tableHeader = css`
  display: flex;
  justify-content: space-between;
`;

export const tableHeaderTitle = css`
  letter-spacing: -2px;
  color: rgb(51, 51, 51);
  font-weight: 800;
  font-size: 1.5rem;
`;

export const tableHeaderRightMenu = css`
  width: 500px;
  display: flex;
  justify-content: space-around;

  letter-spacing: -2px;
  color: rgb(51, 51, 51);
  font-weight: 600;
  font-size: 1rem;
`;