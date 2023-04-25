import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { List, Button, Row } from "antd";
import { DeleteOutlined, LoginOutlined } from "@ant-design/icons";

const Cart = () => {
  const auth = useSelector((state) => state.auth[0]);
  const selectedProducts = useSelector((state) => state.cart);
  console.log("selectedProducts:", selectedProducts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    selectedProducts.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toString();
  };

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
                name="delete"
                type="primary"
                danger
                icon={<DeleteOutlined />}
                size={"small"}
                onClick={() => {
                  dispatch({ type: "removeItem", payload: item.id });
                }}
              />
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
              title={
                item.quantity
                  ? `${item.product_name} x${item.quantity}`
                  : item.product_name
              }
              description={item.price * item.quantity + " บาท"}
            />
          </List.Item>
        )}
        footer={
          <>
            <Row justify={"space-between"} style={{ padding: 10 }}>
              <span>ราคารวม</span>
              <span>{totalPrice()} บาท</span>
            </Row>
            {!auth ? (
              <Button
                onClick={() => navigate("/login")}
                type="primary"
                block
                icon={<LoginOutlined />}
                size={"middle"}
              >
                เข้าสู่ระบบ
              </Button>
            ) : selectedProducts.length > 0 ? (
              <Button
                onClick={() => navigate("/order")}
                type="primary"
                block
                size={"middle"}
              >
                สั่งซื้อ
              </Button>
            ) : (
              <Button type="primary" disabled block size={"middle"}>
                สั่งซื้อ
              </Button>
            )}
          </>
        }
      />
    </>
  );
};

export default Cart;
