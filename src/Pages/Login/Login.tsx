import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import qs from "qs";
import { Redirect } from "react-router-dom";
import "./login.css";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
interface ILoginResult {
  username: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const onFinish = (result: ILoginResult) => {
    axios
      .post(
        "/api/login",
        qs.stringify({
          password: result.password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        if (res.data?.data) {
          setIsLogin(true);
        } else {
          console.log("res is --", res);
          message.error(res.data?.errMsg);
        }
      });
  };

  const onFinishFailed = (e: any) => {
    console.log("Failed:", e);
  };

  return isLogin ? (
    <Redirect to="/" />
  ) : (
    <div className="login-page">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
