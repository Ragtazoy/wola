import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Button, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { removeItem } from "../redux/cartReducer";

const Cart = () => {
  const selectedProducts = useSelector((state) => state.cart.products);

  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    selectedProducts.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toString();
  };

  const order = () => {
    if (selectedProducts.length > 0) {
      console.log(selectedProducts);
    }
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
                  dispatch(removeItem(item.id));
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
            {selectedProducts.length > 0 ? (
              <Button
                onClick={() => order()}
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
