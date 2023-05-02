import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "../../makeRequest";

import { Button, Card, Col, Form, Input, Row, message } from "antd";

const Profile = () => {
  const auth = useSelector((state) => state.auth[0]);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [error, setError] = useState(false);
  const [isChange, setIsChange] = useState(false);
  console.log("auth:", auth);

  const onFinish = (values) => {
    if (isChange) {
      if (values.newPassword === values.confirmPassword) {
        handleUpdateProfile(values);
        handleChangePassword(values);
      } else {
        messageApi.open({
          type: "warning",
          content: `"รหัสผ่านใหม่" และ "ยืนยันรหัสผ่านใหม่" ไม่ตรงกัน`,
        });
      }
    } else {
      handleUpdateProfile(values);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleUpdateProfile = async (values) => {
    console.log("handleUpdateProfile");
    await makeRequest
      .put(`/users/${auth?.user.id}`, {
        username: values.username,
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        phone: values.phone,
        address: values.address,
        postcode: values.postcode,
      })
      .then((res) => {
        console.log("UpdateProfile success", res.data);
        dispatch({ type: "updateAuth", payload: res.data });
        messageApi.open({
          type: "success",
          content: "บันทึกข้อมูลส่วนตัวสำเร็จ",
        });
      })
      .catch((err) => {
        console.log("err UpdateProfile:", err);
        messageApi.open({
          type: "error",
          content: "บันทึกข้อมูลส่วนตัวไม่สำเร็จ",
        });
      });
  };

  const handleChangePassword = async (values) => {
    console.log("handleChangePassword");
    await makeRequest
      .post(
        "/auth/change-password",
        {
          currentPassword: values.password,
          password: values.newPassword,
          passwordConfirmation: values.confirmPassword,
        },
        {
          headers: { Authorization: `Bearer ${auth?.jwt}` },
        }
      )
      .then((res) => {
        console.log("ChangePassword success", res.data);
      })
      .catch((err) => {
        console.log("err ChangePassword:", err);
        messageApi.open({
          type: "error",
          content: "รหัสผ่านไม่ถูกต้อง",
        });
      });
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
      {contextHolder}
      <h1 style={{ alignSelf: "start" }}>ข้อมูลส่วนตัว</h1>
      <Card style={{ width: "100%", paddingInline: 50 }} bordered={false}>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={50} justify={"center"} align={"top"}>
            <Col flex={0.5}>
              <Form.Item
                label="ชื่อผู้ใช้"
                name="username"
                initialValue={auth?.user.username}
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="อีเมล"
                name="email"
                initialValue={auth?.user.email}
              >
                <Input
                  type="email"
                  disabled
                  style={{ color: "rgba(0,0,0,0.8)" }}
                />
              </Form.Item>

              {!isChange ? null : (
                <>
                  <Form.Item
                    label="รหัสผ่าน"
                    name="password"
                    rules={[
                      {
                        required: isChange,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="รหัสผ่านใหม่"
                    name="newPassword"
                    rules={[
                      {
                        required: isChange,
                        message: "Please input your new password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="ยืนยันรหัสผ่านใหม่"
                    name="confirmPassword"
                    rules={[
                      {
                        required: isChange,
                        message: "Please input your confirm new password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </>
              )}
            </Col>

            <Col flex={0.5}>
              <Form.Item
                label="ชื่อจริง"
                name="fname"
                initialValue={auth?.user.fname}
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="นามสกุล"
                name="lname"
                initialValue={auth?.user.lname}
                rules={[
                  {
                    required: true,
                    message: "Please input your lastname!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="เบอร์โทรศัพท์"
                name="phone"
                initialValue={auth?.user.phone}
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
                initialValue={auth?.user.address}
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item
                label="รหัสไปรษณีย์"
                name="postcode"
                initialValue={auth?.user.postcode}
                rules={[
                  { required: true, message: "Please input your postcode!" },
                ]}
              >
                <Input type="number" minLength={5} />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"}>
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
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
