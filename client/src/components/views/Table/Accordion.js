import React from "react";

import { Collapse } from "antd";

const { Panel } = Collapse;

export function Accordion() {
  const text = `
  신청 가능한 강의 목록에 뜨는 강의들은 현재 사용자가 가지고 있지 않은 즉 교환하고자 하는 강의를 뜻합니다. 이점 유의 바랍니다.
`;
  return (
    <div style={{ margin: "2rem" }}>
      <Collapse accordion>
        <Panel header={<b>강의 교환 시 유의 사항</b>} key="1">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </div>
  );
}

export default Accordion;
