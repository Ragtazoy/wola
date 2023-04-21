import React from "react";
import { List, Button, Col, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import banana from "../assets/banana.jpg";
import watermelon from "../assets/watermelon.jpg";

const selectedProducts = [
  { id: 1, name: "banana", price: 50, amount: 2, image: banana },
  { id: 2, name: "watermelon", price: 50, amount: 2, image: watermelon },
  { id: 3, name: "fruit", price: 50, amount: 2, image: banana },
  { id: 4, name: "fruit", price: 50, amount: 2, image: banana },
  { id: 5, name: "fruit", price: 50, amount: 2, image: banana },
];

const Cart = () => {
  return (
    <>
      <List
        style={{ width: 300 }}
        itemLayout="horizontal"
        size="large"
        dataSource={selectedProducts}
        renderItem={(item, index) => (
          <List.Item
            extra={
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                size={"small"}
              />
            }
          >
            <List.Item.Meta
              avatar={
                <img width={80} height={80} alt="cart" src={item.image} />
              }
              title={item.name}
              description={item.price + " บาท"}
            />
          </List.Item>
        )}
        footer={
          <>
            <Row justify={"space-between"} style={{ padding: 10 }}>
              <h3>ราคารวม</h3>
              <h3>100 บาท</h3>
            </Row>
            <Button type="primary" block size={"middle"}>
              สั่งซื้อ
            </Button>
          </>
        }
      />
    </>
  );
};

export default Cart;
