/** @jsx jsx */
import { jsx, css } from "@emotion/react";

export const container = css`
  width: 95%;
  height: auto;
  margin: 2rem;
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

export const tableHeaderMenu = css`
  display: flex;
  justify-content: flex-end;

  letter-spacing: -2px;
  color: rgb(51, 51, 51);
  font-weight: 600;
  font-size: 1rem;
`;

//! searchTable css style

export const searchContainer = css`
  width: 95%;
  height: 130px;
  margin: 1rem auto;
  padding: 11px 20px;
  border-radius: 6px;
  border: 1px solid #e5e5e5;
  display: flex;
`;

export const searchTh = css`
  padding: 1rem;
`;

export const searchTd = css`
  padding: 0 3rem 0 1.5rem;
`;

//! myInfo css style

export const infoContainer = css`
  width: 85%;

  margin: 2rem auto;
`;
