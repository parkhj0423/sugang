import React, { useState } from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Form, Select } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

const container = css`
  text-align: center;
  width: 350px;
  height: 100vh;
  margin: 5rem auto;
`;

const line = css`
  margin: 20px 0;
  border-bottom: 3px solid #003956;
`;

const form = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const input = css`
  width: 100%;
  height: 2.5rem;
  margin-bottom: 0.25rem;
  padding: 0;
  box-sizing: border-box;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
`;

const submitButton = css`
  width: 100%;
  height: 3rem;
  background-color: #003956;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const registerButton = css`
  width: 100%;
  background-color: #e8e8e8;
  border: #e8e8e8;
  border-radius: 30px;
  height: 3.5rem;
  margin: 1rem 0;
`;

const link = css`
  text-decoration: none;
  color: black;
  &:hover {
    color: #fff;
  }
`;

function RegisterPage(props) {
  const [grade, setGrade] = useState("");
  const [department, setDepartment] = useState("");
  const dispatch = useDispatch();

  const onGradeChange = (value) => {
    setGrade(value);
  };

  const onDepartmentChange = (value) => {
    setDepartment(value);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        lastName: "",
        name: "",
        password: "",
        confirmPassword: "",
        studentId: "",
        grade: "",
        department: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("이름을 입력하세요"),
        lastName: Yup.string().required("성을 입력하세요"),
        email: Yup.string()
          .email("올바른 이메일이 아닙니다")
          .required("이메일을 입력하세요"),
        password: Yup.string()
          .min(6, "6자 이상의 비밀번호를 입력하세요")
          .required("비밀번호를 입력하세요"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "비밀번호가 다릅니다")
          .required("비밀번호를 다시한번 확인해주세요"),
        studentId: Yup.string()
          .min(8, "8자 이상의 학번을 입력하세요")
          .required("학번을 입력하세요"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
            studentId: values.studentId,
            grade,
            department,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              props.history.push("/");
            } else {
              alert(response.payload.err.errmsg);
            }
          });

          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div css={container}>
            <h1>간편회원가입</h1>
            <div css={line} />
            <form css={form} onSubmit={handleSubmit}>
              <Form.Item required label="Name">
                <input
                  css={input}
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item required label="Last Name">
                <input
                  css={input}
                  id="lastName"
                  placeholder="Enter your Last Name"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastName && touched.lastName
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback">{errors.lastName}</div>
                )}
              </Form.Item>
              <Form.Item required label="Student Id">
                <input
                  css={input}
                  id="studentId"
                  placeholder="Enter your Student Id"
                  type="text"
                  value={values.studentId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.studentId && touched.studentId
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.studentId && touched.studentId && (
                  <div className="input-feedback">{errors.studentId}</div>
                )}
              </Form.Item>
              <Form.Item required label="Grade">
                <Select
                  id="grade"
                  placeholder="Select your Grade"
                  type="text"
                  value={grade}
                  onChange={onGradeChange}
                  onBlur={handleBlur}
                  className={
                    errors.grade && touched.grade
                      ? "text-input error"
                      : "text-input"
                  }
                >
                  <Option value="1">1학년</Option>
                  <Option value="2">2학년</Option>
                  <Option value="3">3학년</Option>
                  <Option value="4">4학년</Option>
                </Select>
                {errors.grade && touched.grade && (
                  <div className="input-feedback">{errors.grade}</div>
                )}
              </Form.Item>

              <Form.Item required label="Department">
                <Select
                  id="department"
                  placeholder="Select your Department"
                  type="text"
                  value={department}
                  onChange={onDepartmentChange}
                  onBlur={handleBlur}
                  className={
                    errors.department && touched.department
                      ? "text-input error"
                      : "text-input"
                  }
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
                {errors.department && touched.department && (
                  <div className="input-feedback">{errors.department}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="Email"
                hasFeedback
                validateStatus={
                  errors.email && touched.email ? "error" : "success"
                }
              >
                <input
                  css={input}
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="Password"
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? "error" : "success"
                }
              >
                <input
                  css={input}
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="Confirm" hasFeedback>
                <input
                  css={input}
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item>
                <button
                  css={submitButton}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  회원가입
                </button>
              </Form.Item>
            </form>
            <button css={registerButton}>
              <Link to="/" css={link}>
                로그인하러 가기
              </Link>
            </button>
          </div>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
