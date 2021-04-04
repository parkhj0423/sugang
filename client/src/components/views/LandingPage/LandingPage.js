import React from "react";
import ApplyTablePage from "../Table/ApplyTablePage";

/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

const landingPageContainer = css`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 5rem auto;
`;

function LandingPage() {
  return (
    <>
      <div css={landingPageContainer}>
        <ApplyTablePage />
      </div>
    </>
  );
}

export default LandingPage;
