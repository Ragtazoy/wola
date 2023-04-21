import React from "react";
import { Col, Row, Button } from "antd";
import { ShoppingTwoTone, FacebookOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <div className="footer">
      <Row
        justify={"center"}
        align={"middle"}
        style={{ backgroundColor: "white", textAlign: "center" }}
      >
        <Col span={6}>
          <p style={{ fontSize: 30, color: "#1890ff" }}>
            <ShoppingTwoTone type="primary" style={{ fontSize: 30 }} />
            WOLA
          </p>
        </Col>
        <Col span={12}>สดใหม่ และ ออแกนิค สินค้าเพื่อคุณ</Col>
        <Col span={6}>
          <Button
            type="primary"
            shape="circle"
            icon={<FacebookOutlined />}
            size={"large"}
          />
        </Col>
      </Row>
      <Row
        justify={"center"}
        style={{ backgroundColor: "#EFF2F4", padding: 10 }}
      >
        © 2023 WOLA Ecommerce.
      </Row>
    </div>
  );
};

export default Footer;
