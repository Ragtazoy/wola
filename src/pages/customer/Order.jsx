import React from "react";
import { Row, Col, List, Button, Space, Card, Form, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const Order = () => {
  return (
    <Row
      gutter={40}
      justify={"center"}
      style={{ backgroundColor: "#f7fafc", padding: 20 }}
    >
      <Col span={16}>
        <h1>รายการสินค้า</h1>
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
                      <span style={{ fontSize: 16 }}>10 บาท</span>
                    </Row>
                    <Row justify={"end"}>
                      <Button
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
                      src={"process.env.REACT_APP_UPLOAD_URL + item.image"}
                    />
                  }
                  title={"awdawd"}
                  description={" บาท"}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>

      <Col span={6} style={{ backgroundColor: "blue" }}>
        <h1>รายละเอียด</h1>
        <Card>
          <span style={{ fontSize: 20 }}>ที่อยู่การจัดส่ง</span>
          <Form.Item style={{ margin: "10px 0 0 0" }}>
            <TextArea disabled rows={4} defaultValue={"12/24 555 5555"} />
          </Form.Item>
        </Card>
        <Card>
          <h3>ราคารวม</h3>
          <Button type="primary" block size={"large"}>
            สั่งซื้อ
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Order;
