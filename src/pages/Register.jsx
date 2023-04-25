import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Row, Card, Image } from "antd";
import { Link } from "react-router-dom";
import { makeRequest } from "../makeRequest";

import { ShoppingTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import background from "../assets/background.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const onFinish = (values) => {
    if (handleLogin()) {
      console.log("handleLogin Success:", values);
      // navigate("/login", { state: { userId: 1, role: "customer" } });
    } else {
      console.log("handleLogin Failed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleLogin = async () => {
    await makeRequest
      .post("/auth/local", {
        identifier: "user1",
        password: "123456",
      })
      .then((response) => {
        // Handle success.
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        setError();
        return true;
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
        setError("ข้อมูลไม่ถูกต้อง");
        return false;
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
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              {error ? (
                <span style={{ color: "#ff4d4f", marginBottom: 2 }}>
                  {error}
                </span>
              ) : null}
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form.Item>
          </Form>
          <span>
            ยังไม่มีบัญชี?<Link to={"/login"}> สมัครสมาชิก</Link>
          </span>
        </Card>
      </div>
    </div>
  );
};

export default Register;
