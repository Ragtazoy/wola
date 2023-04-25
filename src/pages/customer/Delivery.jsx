import React from "react";
import { Card, Col, List, Row, Space, Tabs } from "antd";

const onDelivery = () => {
  return (
    <Card>
      <List
        style={{ width: "100%" }}
        itemLayout="vertical"
        size="large"
        dataSource={[1, 2, 3]}
        renderItem={(item, index) => (
          <List.Item
            extra={
              <Space direction="vertical" size="middle">
                <Row justify={"end"}>
                  <span style={{ fontSize: 16 }}>{" บาท"}</span>
                </Row>
                <Row justify={"end"}>
                  <span style={{ color: "#FF9017" }}>กำลังจัดส่ง</span>
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
              title={"item.product_name"}
              description={"จำนวน item.quantity"}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "กำลังจัดส่ง",
    children: onDelivery(),
  },
  {
    key: "2",
    label: "จัดส่งสำเร็จ",
    children: onDelivery(),
  },
  {
    key: "3",
    label: "ยกเลิก",
    children: onDelivery(),
  },
];

const Delivery = () => {
  return (
    <div
      style={{
        backgroundColor: "#f7fafc",
        padding: "40px 20px",
        margin: 0,
        minHeight: 710,
      }}
    >
      <Col offset={4} span={16}>
        <Card>
          <Tabs
            centered
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        </Card>
      </Col>
    </div>
  );
};

export default Delivery;
