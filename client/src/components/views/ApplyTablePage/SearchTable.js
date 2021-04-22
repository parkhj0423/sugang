import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { searchContainer, searchTh, searchTd } from "../Table/TableStyle";
import { Select, Input, Button, Icon } from "antd";
const { Option } = Select;
function SearchTable(props) {
  const [professorName, setProfessorName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [department, setDepartment] = useState("");
  const [grade, setGrade] = useState("");
  const [subjectType, setSubjectType] = useState("");
  const [subjectPoint, setSubjectPoint] = useState("");
  const [date, setDate] = useState("");

  let searchedProps = [];

  const onProfessorNameChange = (event) => {
    setProfessorName(event.currentTarget.value);
  };

  const onSubjectNameChange = (event) => {
    setSubjectName(event.currentTarget.value);
  };

  const onSubjectCodeChange = (event) => {
    setSubjectCode(event.currentTarget.value);
  };

  const onDepartmentChange = (value) => {
    setDepartment(value);
  };

  const onGradeChange = (value) => {
    setGrade(value);
  };

  const onSubjectTypeChange = (value) => {
    setSubjectType(value);
  };

  const onSubjectPointChange = (value) => {
    setSubjectPoint(value);
  };

  const onDateChange = (value) => {
    setDate(value);
  };

  const checkArr = (value, arr) => {
    let check = true;
    //check 값이 true여야 searchedProps 에 값을 삽입
    for (let i = 0; i < arr.length; i++) {
      if (value === arr[i]) {
        check = false;
      }
    }

    return check;
  };

  const onClick = () => {
    if (department !== "" && checkArr(department, searchedProps)) {
      searchedProps.push({ department });
    }
    if (grade !== "" && checkArr(grade, searchedProps)) {
      searchedProps.push({ grade });
    }
    if (subjectName !== "" && checkArr(subjectName, searchedProps)) {
      searchedProps.push({ subjectName });
    }
    if (subjectCode !== "" && checkArr(subjectCode, searchedProps)) {
      searchedProps.push({ subjectCode });
    }
    if (subjectPoint !== "" && checkArr(subjectPoint, searchedProps)) {
      searchedProps.push({ subjectPoint });
    }
    if (subjectType !== "" && checkArr(subjectType, searchedProps)) {
      searchedProps.push({ subjectType });
    }
    if (professorName !== "" && checkArr(professorName, searchedProps)) {
      searchedProps.push({ professorName });
    }
    if (date !== "" && checkArr(date, searchedProps)) {
      searchedProps.push({ date });
    }

    return props.onSearch(searchedProps);
  };

  return (
    <div css={searchContainer}>
      <table>
        <tbody>
          <tr>
            <th css={searchTh}>학과</th>
            <td css={searchTd}>
              <Select
                style={{ width: 200 }}
                allowClear
                onChange={onDepartmentChange}
              >
                <Option value="신학부">신학부</Option>
                <Option value="신학과">신학과</Option>
                <Option value="기독교교육상담학과">기독교교육상담학과</Option>
                <Option value="영어영문학과">영어영문학과</Option>
                <Option value="중어중문학과">중어중문학과</Option>
                <Option value="국어국문학과">국어국문학과</Option>
                <Option value="사회복지학과">사회복지학과</Option>
                <Option value="국제개발협력학과">국제개발협력학과</Option>
                <Option value="행정학과">행정학과</Option>
                <Option value="유아교육과">유아교육과</Option>
                <Option value="체육교육과">체육교육과</Option>
                <Option value="교직부">교직부</Option>
                <Option value="음악학부">음악학부</Option>
                <Option value="연극영화학부">연극영화학부</Option>
                <Option value="뷰티디자인학과">뷰티디자인학과</Option>
                <Option value="공연예술음악학부">공연예술음악학부</Option>
                <Option value="파이데이아학부">파이데이아학부</Option>
                <Option value="융합학부">융합학부</Option>
                <Option value="관광개발학과">관광개발학과</Option>
                <Option value="경영학과">경영학과</Option>
                <Option value="동아시아물류학부">동아시아물류학부</Option>
                <Option value="산업경영공학과">산업경영공학과</Option>
                <Option value="컴퓨터공학과">컴퓨터공학과</Option>
                <Option value="정보통신공학과">정보통신공학과</Option>
                <Option value="미디어소프트웨어학과">
                  미디어소프트웨어학과
                </Option>
                <Option value="도시디자인정보공학과">
                  도시디자인정보공학과
                </Option>
              </Select>
            </td>
            <th css={searchTh}>학년</th>
            <td css={searchTd}>
              <Select
                style={{ width: 200 }}
                allowClear
                onChange={onGradeChange}
              >
                <Option value="1">1 학년</Option>
                <Option value="2">2 학년</Option>
                <Option value="3">3 학년</Option>
                <Option value="4">4 학년</Option>
              </Select>
            </td>
            <th css={searchTh}>강의명</th>
            <td css={searchTd}>
              <Input
                style={{ width: 200 }}
                placeholder="검색어 (search word)"
                onChange={onSubjectNameChange}
              />
            </td>
            <th css={searchTh}>교수명</th>
            <td css={searchTd}>
              <Input
                style={{ width: 200 }}
                placeholder="검색어 (search word)"
                onChange={onProfessorNameChange}
              />
            </td>
          </tr>

          <tr>
            <th css={searchTh}>구분</th>
            <td css={searchTd}>
              <Select
                style={{ width: 200 }}
                allowClear
                onChange={onSubjectTypeChange}
              >
                <Option value="전필">전필</Option>
                <Option value="전선">전선</Option>
                <Option value="교필">교필</Option>
                <Option value="교선">교선</Option>
                <Option value="교직">교직</Option>
              </Select>
            </td>
            <th css={searchTh}>학점</th>
            <td css={searchTd}>
              <Select
                style={{ width: 200 }}
                allowClear
                onChange={onSubjectPointChange}
              >
                <Option value="3">3 학점</Option>
                <Option value="2">2 학점</Option>
                <Option value="1">1 학점</Option>
                <Option value="0">0 학점</Option>
              </Select>
            </td>
            <th css={searchTh}>요일</th>
            <td css={searchTd}>
              <Select style={{ width: 200 }} allowClear onChange={onDateChange}>
                <Option value="월">월</Option>
                <Option value="화">화</Option>
                <Option value="수">수</Option>
                <Option value="목">목</Option>
                <Option value="금">금</Option>
              </Select>
            </td>
            <th css={searchTh}>강의 코드</th>
            <td css={searchTd}>
              <Input
                style={{ width: 200 }}
                placeholder="검색어 (search word)"
                onChange={onSubjectCodeChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Button type="primary" style={{ margin: "2.2rem" }} onClick={onClick}>
        <Icon type="search" />
        검색
      </Button>
    </div>
  );
}

export default SearchTable;
