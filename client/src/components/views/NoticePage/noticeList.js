/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Icon } from "antd";

const Img = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 1rem;
`;

const HighlightIcon = styled(Icon)`
  width: 10px;
  height: 10px;
  margin-right: 1rem;
`;

const Text = styled.b`
  color: red;
`;

export const noticeList = [
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: (
      <span>
        <a href="http://sugang.sungkyul.ac.kr">
          <b>http://sugang.sungkyul.ac.kr</b>
        </a>
        에 접속하여 로그인 후, 수강신청을 하여야한다
      </span>
    ),
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: "로그인 : 이메일, 비밀번호(포털비밀번호)를 입력한다. 통합아이디를 반드시 발급 받으셔야만 수강신청이 가능.",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: "수강신청 시 모든 웹브라우저 종료 후 새창 하나만 띄워서 접속해야 한다.",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: "수강신청 장바구니란에서 대상과목 수강신청을 클릭한 후 과목조회를 클릭한다.",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: "본인이 신청하고자 하는 과목의 수강신청 란을 선택 및 클릭하여야 수강신청 자료가 저장된다.",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: " 대상과목 수강신청에서 조회가 안 되는 과목은 기타과목 수강신청을 클릭한 후, 과목조회를 클릭한다.",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: " 반드시 이수구분을 확인하고 정정 후, 저장",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: "본 수강신청기간에 장바구니에 담아 놓은 수강과목의 신청을 반드시 클릭해야 한다.",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: "모든 수강신청이 끝난 후에는 반드시 LOGOUT 하여야 한다.",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: "LOGOUT을 하지 않은 상태에서 타 학생이 수강신청을 할 경우 본인의 수강신청사항이 변경되는 사례가 많음.",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: "한 대의 PC에서 수강신청 화면을 2개 이상 실행하면 비정상 처리될 수 있음.(복구불가)",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: "반드시 한개의 브라우저만 열어 로그인을 시도해야 하며 2개 이상의 브라우저를 열어 로그인을 시도 할 경우 로그인 중복 체크로 인하여 비정상 처리될 수 있음.(한 개의 탭도 한 개의 브라우저로 간주)",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: "한 대의 PC에서 수강신청 화면을 2개 이상 실행하면 비정상 처리될 수 있음.(복구불가)",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: "여러 대의 PC에서 한 학번으로 동시 로그인하면 비정상 처리될 수 있음.(복구불가)",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: "동일한 세션으로 중복로그인을 할 경우 로그인된 세션은 모두 로그아웃 처리될 수 있음.(복구불가)",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: "다른 세션으로 중복로그인을 할 경우 먼저 로그인된 세션은 로그아웃 처리될 수 있음.(복구불가)",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: "비정상 브라우저 종료 시 로그인 중복이 될 수 있으므로 반드시 ''로그아웃'' 버튼을 클릭하여 종료하여야 한다. (접속장애시 : 모든 웹브라우저 종료 후 재접속 또는 PC 재부팅)",
  },
  {
    icon: (
      <Img
        src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-list2.png"
        alt="icon"
      />
    ),
    text: (
      <span>
        통합비밀번호 분실 시 포털(
        <a href="http://portal.sungkyul.ac.kr">
          <b>http://portal.sungkyul.ac.kr</b>
        </a>
        ) 로그인 화면의 비밀번호 찾기에서 비밀번호를 재발급 받아야 한다.
      </span>
    ),
  },
];

export const seasonList = [
  {
    icon: <HighlightIcon type="highlight" />,
    text: (
      <Text>
        ※ 계절학기 수요조사 : 2021.05.17.(월) 10:00 ~ 2021.05.21.(금) 24:00
      </Text>
    ),
  },
  {
    icon: <HighlightIcon type="highlight" />,
    text: (
      <Text>
        ※ 계절학기 수강신청 : 2021.06.07.(월) 10:00 ~ 2021.06.09.(수) 24:00
      </Text>
    ),
  },
  {
    icon: <HighlightIcon type="highlight" />,
    text: (
      <Text>
        ※ 계절학기 수업료 납부기간 : 2021.06.10.(목) 09:00 ~ 2021.06.16.(수)
        17:00
      </Text>
    ),
  },
  {
    icon: <HighlightIcon type="highlight" />,
    text: (
      <Text>
        ※ 계절학기 수강포기기간 : 2021.06.17.(목) 10:00 ~ 2021.06.18.(금) 17:00
      </Text>
    ),
  },
  {
    icon: <HighlightIcon type="highlight" />,
    text: (
      <Text>
        ** 홈페이지의 수강신청안내 공지사항의 첨부파일로 올라와 있는
        최저이수요구학점표를 활용하여 수강신청을 하시길 바랍니다.
      </Text>
    ),
  },
  {
    icon: <HighlightIcon type="highlight" />,
    text: (
      <Text>
        ** 휴,복학생들은 각 학부(과)별로 수강 신청 안내를 철저히 받아서 졸업에
        문제가 없도록 수강신청하여 주시기 바랍니다.
      </Text>
    ),
  },
];

export default noticeList;
