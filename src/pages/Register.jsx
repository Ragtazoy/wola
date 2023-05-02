import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../makeRequest";

import { Button, message, Form, Input, Row, Card, Image, Col } from "antd";
import { ShoppingTwoTone } from "@ant-design/icons";
import background from "../assets/background.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const isRegister = await handleRegister(values);
    if (isRegister) {
      console.log("Register Success:");
      await messageApi.open({
        type: "success",
        content: "สมัครสมาชิกสำเร็จ",
      });
      navigate("/login");
    } else {
      messageApi.open({
        type: "error",
        content: "สมัครสมาชิกไม่สำเร็จ",
      });
      console.log("Register Failed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleRegister = (values) => {
    return makeRequest
      .post("/auth/local/register", {
        fname: values.fname,
        lname: values.lname,
        username: values.username,
        email: values.email,
        password: values.password,
        phone: values.phone,
        address: values.address,
        postcode: values.postcode,
      })
      .then((response) => {
        console.log("Well done!", response.data);
        setError(false);
        return true;
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        setError(true);
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
      {contextHolder}

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
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row>
              <Col>
                <Form.Item
                  label="ชื่อจริง"
                  name="fname"
                  rules={[
                    { required: true, message: "Please input your firstname!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="ชื่อผู้ใช้"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="อีเมล"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input type="email" />
                </Form.Item>

                <Form.Item
                  label="รหัสผ่าน"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password minLength={6} />
                </Form.Item>
              </Col>

              <Col>
                <Form.Item
                  label="นามสกุล"
                  name="lname"
                  rules={[
                    { required: true, message: "Please input your lastname!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="เบอร์โทรศัพท์"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input type="number" minLength={9} maxLength={10} />
                </Form.Item>

                <Form.Item
                  label="ที่อยู่จัดส่ง"
                  name="address"
                  rules={[
                    { required: true, message: "Please input your address!" },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>

                <Form.Item
                  label="รหัสไปรษณีย์"
                  name="postcode"
                  rules={[
                    { required: true, message: "Please input your postcode!" },
                  ]}
                >
                  <Input type="number" minLength={5} />
                </Form.Item>
              </Col>
            </Row>

            <Row justify={"center"}>
              {error ? (
                <span style={{ color: "#ff4d4f", marginBottom: 2 }}>
                  {error}
                </span>
              ) : null}

              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Row>
          </Form>

          <span>
            มีบัญชีอยู่แล้ว?<Link to={"/login"}> เข้าสู่ระบบ</Link>
          </span>
        </Card>
      </div>
    </div>
  );
};

export default Register;
