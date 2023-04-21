import React from "react";
import { Image, Row, Col, Space, Card, Button } from "antd";

import banner from "../../assets/banner.png";
import feature1 from "../../assets/featues1.jpg";
import feature2 from "../../assets/featues2.jpg";
import feature3 from "../../assets/featues3.jpg";
import banana from "../../assets/banana.jpg";
import watermelon from "../../assets/watermelon.jpg";
import noImage from "../../assets/no-image.png";

const { Meta } = Card;
const products = [
  { id: 1, name: "banana", price: 50, image: banana },
  { id: 2, name: "watermelon", price: 50, image: watermelon },
  { id: 3, name: "fruit", price: 50, image: banana },
  { id: 4, name: "fruit", price: 50, image: banana },
  { id: 5, name: "fruit", price: 50, image: banana },
];

const Home = () => {
  return (
    <div style={{ backgroundColor: "#f7fafc" }}>
      {/* Banner ================================= */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          width={"100%"}
          height={400}
          preview={false}
          src={banner}
          fallback={noImage}
        />
        <div
          style={{
            position: "absolute",
            top: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1>
            สดใหม่ และ <span style={{ color: "#1890ff" }}> ออร์แกนิค </span>
            สินค้าเพื่อคุณ
          </h1>

          <a href="#product" class="btn">
            ช็อปเลย
          </a>
        </div>
      </div>

      {/* Features ================================= */}
      <div style={{ padding: 40 }}>
        <h1 style={{ color: "#1890ff", textAlign: "center" }}>
          3 ขั้นตอนง่ายๆ
        </h1>
        <Row gutter={[20,20]} justify={'center'}>
          <Col>
            <Card
              bordered={false}
              cover={
                <img width={100} height={300} alt="feature" src={feature1} />
              }
            >
              <h3 style={{ textAlign: "center" }}>สินค้า สดใหม่ และ ออแกนิค</h3>
            </Card>
          </Col>

          <Col>
            <Card
              bordered={false}
              cover={
                <img width={100} height={300} alt="feature" src={feature2} />
              }
            >
              <h3 style={{ textAlign: "center" }}>มีบริการขนส่ง</h3>
            </Card>
          </Col>

          <Col>
            <Card
              bordered={false}
              cover={
                <img width={100} height={300} alt="feature" src={feature3} />
              }
            >
              <h3 style={{ textAlign: "center" }}>จ่ายเงินง่าย ๆ</h3>
            </Card>
          </Col>
        </Row>
      </div>

      {/* ผลไม้ ================================= */}
      <div style={{ padding: 40 }}>
        <h1 id="product" style={{ color: "#1890ff", textAlign: "center" }}>
          ผลไม้
        </h1>
        <Row justify={"center"}>
          <Space
            direction="horizontal"
            size={[14, 18]}
            wrap
            style={{ display: "flex", justifyContent: "center" }}
          >
            {products.map((item) => (
              <Card
                onClick={() => {
                  console.log("hello cards");
                }}
                hoverable
                bordered={false}
                style={{ width: 210, height: 300 }}
                cover={<img height={160} alt="product" src={item.image} />}
              >
                <Meta
                  style={{ textAlign: "center" }}
                  title={item.name}
                  description={item.price + " บาท"}
                />
                <Row justify={"center"} style={{ padding: 10 }}>
                  <Button type="primary" size={"middle"}>
                    เพิ่มในตะกร้า
                  </Button>
                </Row>
              </Card>
            ))}
          </Space>
        </Row>
      </div>

      {/* น้ำผลไม้ ================================= */}
      <div style={{ padding: 40 }}>
        <h1 style={{ color: "#1890ff", textAlign: "center" }}>น้ำผลไม้</h1>
        <Row justify={"center"}>
          <Space
            direction="horizontal"
            size={[14, 18]}
            wrap
            style={{ display: "flex", justifyContent: "center" }}
          >
            {products.map((item) => (
              <Card
                onClick={() => {
                  console.log("hello cards");
                }}
                hoverable
                bordered={false}
                style={{ width: 210, height: 300 }}
                cover={<img height={160} alt="product" src={item.image} />}
              >
                <Meta
                  style={{ textAlign: "center" }}
                  title={item.name}
                  description={item.price + " บาท"}
                />
                <Row justify={"center"} style={{ padding: 10 }}>
                  <Button type="primary" size={"middle"}>
                    เพิ่มในตะกร้า
                  </Button>
                </Row>
              </Card>
            ))}
          </Space>
        </Row>
      </div>
    </div>
  );
};

export default Home;
