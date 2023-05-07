import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Col, Row, Anchor, Button, Popover } from "antd";
import {
  ShoppingTwoTone,
  ShoppingCartOutlined,
  UserOutlined,
  LoginOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import Cart from "./Cart";

const Navbar = () => {
  const auth = useSelector((state) => state.auth[0]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch({ type: "resetAuth" });
    await dispatch({ type: "resetCart" });
    navigate("/login");
  };

  console.log("===auth===");
  console.log(auth?.user.id);
  console.log(!auth);

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
        boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Col span={12}>
        <Row align={"middle"}>
          <Link
            to="/"
            style={{ fontSize: 30, color: "#1890ff", marginRight: 10 }}
          >
            <ShoppingTwoTone type="primary" style={{ fontSize: 30 }} />
            WOLA
          </Link>

          <Anchor
            direction="horizontal"
            items={[
              { key: "home", href: "/", title: "Home" },
              { key: "product", href: "/#product", title: "Product" },
              { key: "delivery", href: "/delivery", title: "Delivery"},
            ]}
          />
        </Row>
      </Col>

      <Col span={12}>
        <Row justify={"end"}>
          <Popover
            content={<Cart />}
            placement="bottomRight"
            title="ตะกร้าสินค้า"
          >
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size={"large"}
              style={{ marginRight: 6 }}
            />
          </Popover>

          <Popover
            content={
              !auth ? (
                <Button
                  onClick={() => navigate("/login")}
                  type="primary"
                  block
                  icon={<LoginOutlined />}
                  size={"middle"}
                >
                  เข้าสู่ระบบ
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("profile")}
                    type="link"
                    block
                    icon={<ProfileOutlined />}
                    size={"middle"}
                    style={{ textAlign: "start", padding: 0 }}
                  >
                    ข้อมูลส่วนตัว
                  </Button>
                  <Button
                    onClick={() => handleLogout()}
                    type="link"
                    block
                    icon={<LogoutOutlined />}
                    size={"middle"}
                    style={{ textAlign: "start", padding: 0 }}
                  >
                    ออกจากระบบ
                  </Button>
                </>
              )
            }
            placement="bottomRight"
            title={!auth ? "บัญชี" : "บัญชี " + auth?.user.username}
          >
            <Button type="primary" icon={<UserOutlined />} size={"large"} />
          </Popover>
        </Row>
      </Col>
    </Row>
  );
};

export default Navbar;
