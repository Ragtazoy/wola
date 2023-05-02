import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Row, Col, List, Space, Button, Form, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const Ordering = ({ onSubmit }) => {
  const auth = useSelector((state) => state.auth[0]);
  const selectedProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    selectedProducts.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toString();
  };

  const handleOrder = () => {
    onSubmit(1);
  };

  return (
    <>
      <Col span={15}>
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

      <Col span={5}>
        <h1>รายละเอียด</h1>
        <Card style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 20 }}>ที่อยู่การจัดส่ง</span>
          <Form.Item style={{ margin: "10px 0 10px 0" }}>
            <TextArea
              defaultValue={`${auth?.user.address} ${auth?.user.postcode}`}
              disabled
              style={{ color: "rgba(0, 0, 0, 0.8)" }}
            />
          </Form.Item>
          <span style={{ fontSize: 20 }}>เบอร์ติดต่อ</span>
          <Form.Item style={{ margin: "10px 0 0 0" }}>
            <Input
              defaultValue={auth?.user.phone}
              disabled
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
            onClick={() => handleOrder()}
            type="primary"
            block
            size={"large"}
          >
            ชำระเงิน
          </Button>
        </Card>
      </Col>
    </>
  );
};

export default Ordering;
