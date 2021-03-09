import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import "./home.css";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 26,
  },
};

interface ILoginResult {
  pageNum: number;
}

const Home: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const history = useHistory()
  useEffect(() => {
    axios.get("/api/isLogin").then((res) => {
      setIsLogin(res.data?.data);
    });
  }, []);
  const onFinish = (result: ILoginResult) => {
    axios
      .post(
        "/api/getData",
        qs.stringify({
          pageNum: result.pageNum,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        message.success('爬取成功')
      });
  };

  const onFinishFailed = (e: any) => {
    console.log("Failed:", e);
  };

  return isLogin ? (
    <div className="home-page">
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="pageNum"
          name="pageNum"
          rules={[
            {
              required: true,
              message: "Please input your pageNum!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item  style={{width: '100%'}}>
          <Button type="primary" htmlType="submit">
            爬取
          </Button>
          <Button type="primary" onClick={()=>{
            history.push('/show')
          }}>展示</Button>
          <Button
            type="primary"
            onClick={() => {
              axios.get("/api/logout").then((res) => {
                setIsLogin(!res.data?.data);
              });
            }}
          >
            退出
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Home;
