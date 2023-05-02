import React, { useState } from "react";
import { Button, Form, Input, Row, Card, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../makeRequest";
import { useDispatch } from "react-redux";

import { ShoppingTwoTone, UserOutlined, LockOutlined } from "@ant-design/icons";
import background from "../assets/background.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const onFinish = async (values) => {
    const loginData = await handleLogin(values);
    if (loginData !== null) {
      console.log("handleLogin Success:", loginData);
      await dispatch({ type: "addAuth", payload: loginData });
      navigate("/");
    } else {
      console.log("handleLogin Failed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleLogin = (values) => {
    return makeRequest
      .post("/auth/local", {
        identifier: values.username,
        password: values.password,
      })
      .then((response) => {
        console.log("Login success:", response.data);
        setError();
        return response.data;
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        setError("ข้อมูลไม่ถูกต้อง");
        return null;
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        height: "100%",
        right: 0,
        left: 0,
      }}
    >
      <Image width={"100%"} preview={false} src={background} />
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Card
          style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
          bordered={false}
        >
          <Row justify={"center"} align={"middle"}>
            <ShoppingTwoTone type="primary" style={{ fontSize: 60 }} />
            <p style={{ lineHeight: 0, fontSize: 60, color: "#1890ff" }}>
              WOLA
            </p>
          </Row>

          <Form
            name="login"
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input addonBefore={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password addonBefore={<LockOutlined />} />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              {error ? (
                <span style={{ color: "#ff4d4f", marginBottom: 2 }}>
                  {error}
                </span>
              ) : null}
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
          <span>
            ยังไม่มีบัญชี?<Link to={"/register"}> สมัครสมาชิก</Link>
          </span>
        </Card>
      </div>
    </div>
  );
};

export default Login;
