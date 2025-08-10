import { useState } from "react";
import Form from "../components/common/Form";
import { signupApi } from "../utils/api/user.api";

const EMAIL_REGEX =
  /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[^\s]{8,16}$/;
// 강도 규칙: 8–64자, 대/소문자+숫자+특수문자 각 1개 이상, 공백 금지

const INPUT_FIELDS = {
  EMAIL: {
    LABEL: "이메일",
    PLACEHOLDER: "이메일을 입력해주세요",
    KEY: "email",
    ON_VALID: (email) => EMAIL_REGEX.test(email),
  },
  PASSWORD: {
    LABEL: "비밀번호",
    PLACEHOLDER: "비밀번호를 입력해주세요.",
    KEY: "password",
    ON_VALID: (password) => PASSWORD_REGEX.test(password),
  },
  NAME: {
    LABEL: "이름",
    PLACEHOLDER: "이름을 입력해주세요.",
    KEY: "name",
    ON_VALID: (name) => name.length >= 4,
  },
};
const { EMAIL, PASSWORD, NAME } = INPUT_FIELDS;

const SIGNUP_DEFAULT_INPUT = {
  email: "",
  password: "",
  name: "",
};
const SignupPage = () => {
  const handleSubmit = async (formInputs) => {
    // console.log(formInputs);
    const signupApiResult = await signupApi(formInputs);
    if (signupApiResult) {
      alert("회원가입 성공");
    } else {
      alert("회원가입 실패");
    }
  };
  const handleSubmitError = (errorFields) => {
    alert("submit error");
    console.log(errorFields);
  };

  // react-hook-form
  return (
    <>
      <Form
        defaultFormInputs={SIGNUP_DEFAULT_INPUT}
        onSubmit={handleSubmit}
        onSubmitError={handleSubmitError}
      >
        <Form.Input
          label={EMAIL.LABEL}
          name={EMAIL.KEY}
          placeholder={EMAIL.PLACEHOLDER}
          onValid={EMAIL.ON_VALID}
        />
        <Form.ErrorMessage name={EMAIL.KEY}>!!!이메일 오류남</Form.ErrorMessage>
        <Form.Input
          label={PASSWORD.LABEL}
          name={PASSWORD.KEY}
          type={"password"}
          placeholder={PASSWORD.PLACEHOLDER}
          onValid={PASSWORD.ON_VALID}
        />
        <Form.ErrorMessage name={PASSWORD.KEY}>
          8–16자, 대/소문자+숫자+특수문자 각 1개 이상, 공백 금지
        </Form.ErrorMessage>
        <Form.Input
          name={NAME.KEY}
          label={NAME.LABEL}
          placeholder={NAME.PLACEHOLDER}
          onValid={NAME.ON_VALID}
        />
        <Form.ErrorMessage name={NAME.KEY}>!!!이름 다시 확인</Form.ErrorMessage>
        <Form.Submit>회원가입 완료</Form.Submit>
      </Form>
    </>
  );
};
export default SignupPage;
