import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { Row, Col, Steps } from "antd";
import Ordering from "../../components/Ordering";
import Payment from "../../components/Payment";
import PaySuccess from "../../components/PaySuccess";

const Order = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProducts = useSelector((state) => state.cart);
  const [current, setCurrent] = useState(0);
//   const [stripeId, setStripeId] = useState();

  useEffect(() => {
    const success = searchParams.get("success");
    if (success === "true") {
      // const stripeId = searchParams.get("stripe_id");
      // setStripeId(stripeId);
      setCurrent(2);
    }
  }, [searchParams]);

  const onSubmit = (data) => {
    setCurrent(current + data);
  };

  const steps = [
    { key: 1, title: "สั่งซื้อ", content: <Ordering onSubmit={onSubmit} /> },
    { key: 2, title: "ชำระเงิน", content: <Payment onSubmit={onSubmit} /> },
    {
      key: 3,
      title: "สำเร็จ",
      content: <PaySuccess />,
      disabled: true,
    },
  ];

  const totalPrice = () => {
    let total = 0;
    selectedProducts.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toString();
  };

  return (
    <Col
      style={{
        backgroundColor: "#f7fafc",
        padding: 20,
        margin: 0,
        minHeight: 798,
      }}
    >
      <Row style={{ padding: "20px 100px" }}>
        <Steps
          items={steps}
          current={current}
          onChange={(value) => setCurrent(value)}
        />
      </Row>

      <Row gutter={20} justify={"center"}>
        {steps[current].content}
      </Row>
    </Col>
  );
};

export default Order;
