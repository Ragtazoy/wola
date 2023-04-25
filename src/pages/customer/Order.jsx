import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, List, Button, Space, Card, Form, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const Order = () => {
  const selectedProducts = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("selectedProducts:", selectedProducts);

  const totalPrice = () => {
    let total = 0;
    selectedProducts.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toString();
  };

  const handleOrder = () => {
    navigate("/delivery");
  };

  return (
    <Row
      gutter={20}
      justify={"center"}
      style={{
        backgroundColor: "#f7fafc",
        padding: 20,
        margin: 0,
        minHeight: 780,
      }}
    >
      <Col span={16}>
        <h1>รายการสินค้า</h1>
        <Card>
          <List
            style={{ width: "100%" }}
            itemLayout="vertical"
            size="large"
            dataSource={selectedProducts}
            renderItem={(item, index) => (
              <List.Item
                extra={
                  <Space direction="vertical" size="middle">
                    <Row justify={"end"}>
                      <span style={{ fontSize: 16 }}>
                        {item.price * item.quantity + " บาท"}
                      </span>
                    </Row>
                    <Row justify={"end"}>
                      <Button
                        onClick={() => {
                          dispatch({ type: "removeItem", payload: item.id });
                        }}
                        name="delete"
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        size={"small"}
                      />
                    </Row>
                  </Space>
                }
              >
                <List.Item.Meta
                  avatar={
                    <img
                      width={80}
                      height={70}
                      alt="cart"
                      src={process.env.REACT_APP_UPLOAD_URL + item.image}
                    />
                  }
                  title={item.product_name}
                  description={"จำนวน " + item.quantity}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>

      <Col span={6}>
        <h1>รายละเอียด</h1>
        <Card style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 20 }}>ที่อยู่การจัดส่ง</span>
          <Form.Item style={{ margin: "10px 0 10px 0" }}>
            <TextArea
              disabled
              rows={4}
              defaultValue={"12/24 555 5555"}
              style={{ color: "rgba(0, 0, 0, 0.8)" }}
            />
          </Form.Item>
          <span style={{ fontSize: 20 }}>เบอร์ติดต่อ</span>
          <Form.Item style={{ margin: "10px 0 0 0" }}>
            <Input
              disabled
              rows={4}
              defaultValue={"055 555 5555"}
              style={{ color: "rgba(0, 0, 0, 0.8)" }}
            />
          </Form.Item>
        </Card>
        <Card>
          <Row justify={"space-between"} style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 20 }}>ราคารวม</span>
            <span style={{ fontSize: 20 }}>{totalPrice()} บาท</span>
          </Row>
          <Button
            onClick={() => {
              handleOrder();
            }}
            type="primary"
            block
            size={"large"}
          >
            สั่งซื้อ
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Order;
