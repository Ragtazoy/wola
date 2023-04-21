import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Anchor, Button, Popover } from "antd";
import {
  ShoppingTwoTone,
  ShoppingCartOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import Cart from "./Cart";

const account = () => {
  if (true) {
    return (
      <Button
        href="/Login"
        type="primary"
        icon={<LoginOutlined />}
        size={"large"}
      >
        เข้าสู่ระบบ
      </Button>
    );
  } else {
    return (
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    );
  }
};

const Navbar = () => {
  return (
    <Row
      className="navbar"
      justify={"center"}
      align={"middle"}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        paddingInline: 40,
        height: 70,
        backgroundColor: "white",
        boxShadow: "0 1px 6px grey",
      }}
    >
      <Col flex={"auto"}>
        <Row align={"middle"}>
          <Link
            to="/customer/home"
            style={{ fontSize: 30, color: "#1890ff", marginRight: 10 }}
          >
            <ShoppingTwoTone type="primary" style={{ fontSize: 30 }} />
            WOLA
          </Link>

          <Anchor
            direction="horizontal"
            items={[
              {
                key: "product",
                href: "/customer/home#product",
                title: "Product",
              },
              { key: "order", href: "/customer/order", title: "Order" },
              { key: "review", href: "#review", title: "Review" },
            ]}
          />
        </Row>
      </Col>

      <Col flex={"auto"}>
        <Row justify={"end"}>
          <Popover content={<Cart />} placement="bottomLeft" title="ตะกร้าสินค้า">
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size={"large"}
              style={{ marginRight: 6 }}
            />
          </Popover>

          <Popover content={account} placement="bottomLeft" title="บัญชี">
            <Button type="primary" icon={<UserOutlined />} size={"large"} />
          </Popover>
        </Row>
      </Col>
    </Row>
  );
};

export default Navbar;
