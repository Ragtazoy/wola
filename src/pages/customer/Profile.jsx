import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeRequest } from "../../makeRequest";

import { Button, Card, Form, Input, Row } from "antd";
import { ShoppingTwoTone } from "@ant-design/icons";

const Profile = () => {
  const auth = useSelector((state) => state.auth[0]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isChange, setIsChange] = useState(false);
  console.log(auth?.jwt);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await makeRequest
        .get("/posts", {
          headers: {
            Authorization: `Bearer ${auth?.jwt}`,
          },
        })
        .then((res) => {
          console.log("setData", res.data);
        })
        .catch((err) => {
          console.log("err /products:", err);
          setError(true);
        });
      setLoading(true);
    }
    fetchData();
  }, [data]);

  const onFinish = (values) => {
    console.log("handleLogin", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "20px 100px 20px 100px",
        minHeight: 750,
        backgroundColor: "#f7fafc",
      }}
    >
      <h1 style={{ alignSelf: "start" }}>รายการสินค้า</h1>
      <Card
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
        bordered={false}
      >
        <Row justify={"center"} align={"middle"}>
          <ShoppingTwoTone type="primary" style={{ fontSize: 60 }} />
          <p style={{ lineHeight: 0, fontSize: 60, color: "#1890ff" }}>WOLA</p>
        </Row>

        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ minWidth: 400, maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="ชื่อผู้ใช้"
            name="username"
            initialValue={auth?.user.username}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="อีเมล"
            name="email"
            initialValue={auth?.user.email}
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" />
          </Form.Item>

          {!isChange ? null : (
            <>
              <Form.Item label="รหัสผ่าน" name="password">
                <Input.Password />
              </Form.Item>

              <Form.Item label="รหัสผ่านใหม่" name="newPassword">
                <Input.Password />
              </Form.Item>
              <Form.Item label="ยืนยันรหัสผ่านใหม่" name="confirmPassword">
                <Input.Password />
              </Form.Item>
            </>
          )}

          <Form.Item wrapperCol={{ span: 24 }}>
            {!isChange ? (
              <Button
                onClick={() => setIsChange(!isChange)}
                type="primary"
                style={{ marginRight: 5 }}
              >
                เปลี่ยนรหัสผ่าน
              </Button>
            ) : (
              <Button
                onClick={() => setIsChange(!isChange)}
                type="default"
                style={{ marginRight: 5 }}
              >
                เปลี่ยนรหัสผ่าน
              </Button>
            )}
            <Button type="primary" htmlType="submit">
              บันทึก
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
