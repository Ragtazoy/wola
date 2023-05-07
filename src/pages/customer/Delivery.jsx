import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeRequest } from "../../makeRequest";

import { Card, Col, List, Row, Space, Tabs } from "antd";
import moment from "moment";

const Delivery = () => {
  const auth = useSelector((state) => state.auth[0]);
  const [order, setOrder] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [success, setSuccess] = useState([]);
  const [cancel, setCancel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("1");

  useEffect(() => {
    async function fetchData() {
      await makeRequest
        .get(`/users/${auth?.user.id}?populate=*`)
        .then((res) => setOrder(res.data.orders))
        .catch((err) => console.log("fetchData err:", err));
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const sortOrder = order.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrder(sortOrder);

      const statusDelivery = await order.filter(
        (order) => order.status === "delivery"
      );
      const statusSuccess = await order.filter(
        (order) => order.status === "success"
      );
      const statusCancel = await order.filter(
        (order) => order.status === "cancel"
      );

      setDelivery(statusDelivery);
      setSuccess(statusSuccess);
      setCancel(statusCancel);
    }

    if (order !== undefined) {
      fetchData();
    }
  }, [order]);

  const onDelivery = () => {
    return (
      <Card>
        {(selectedTab === "1"
          ? delivery
          : selectedTab === "2"
          ? success
          : cancel
        ).map((item, index) => (
          <div key={index}>
            <h3>
              {moment(item.createdAt).format(
                "สั่งซื้อวันที่ DD/MM/YYYY เวลา HH:MM น."
              )}
            </h3>
            <List
              style={{ width: "100%" }}
              itemLayout="vertical"
              size="large"
              key={item.id}
              dataSource={item.products}
              renderItem={(product, index) => (
                <List.Item
                  extra={
                    <Space direction="vertical" size="middle">
                      <Row justify={"end"}>
                        <span style={{ fontSize: 16 }}>
                          {`${product.price * product.quantity} บาท`}
                        </span>
                      </Row>
                      <Row justify={"end"}>
                        {selectedTab === "1" ? (
                          <span style={{ color: "#FF9017" }}>กำลังจัดส่ง</span>
                        ) : selectedTab === "2" ? (
                          <span style={{ color: "#52c41a" }}>จัดส่งสำเร็จ</span>
                        ) : (
                          <span style={{ color: "#ff4d4f" }}>ยกเลิก</span>
                        )}
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
                        src={process.env.REACT_APP_UPLOAD_URL + product.image}
                      />
                    }
                    title={product.product_name}
                    description={"จำนวน " + product.quantity}
                  />
                </List.Item>
              )}
            />
          </div>
        ))}
      </Card>
    );
  };

  const items = [
    { key: "1", label: "กำลังจัดส่ง", children: onDelivery() },
    { key: "2", label: "จัดส่งสำเร็จ", children: onDelivery("green") },
    { key: "3", label: "ยกเลิก", children: onDelivery("blue") },
  ];

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
            onChange={(key) => setSelectedTab(key)}
          />
        </Card>
      </Col>
    </div>
  );
};

export default Delivery;
