import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeRequest } from "../makeRequest";

import { Button, Card, Col, Result } from "antd";

const PaySuccess = () => {
  const auth = useSelector((state) => state.auth[0]);
  const navigate = useNavigate();
  const [stripeId, setStripeId] = useState("133");

  useEffect(() => {
    const updateStatus = async () => {
      const maxOrder = await makeRequest
        .get(`/users/${auth?.user.id}?populate=*`)
        .then((res) => {
          const maxOrder = res.data.orders.reduce((prev, current) => {
            return prev.y > current.y ? prev : current;
          });
          setStripeId(maxOrder.stripe_id);

          return maxOrder;
        })
        .catch((err) => {
          console.log("get orderId err:", err);
        });

      await makeRequest
        .put(`/orders/${maxOrder.id}`, { data: { status: "delivery" } })
        .then((res) => {
          console.log("pass:", res);
        })
        .catch((err) => {
          console.log("updateStatus err:", err);
        });
    };

    updateStatus();
  }, []);

  return (
    <Col span={20}>
      <h1>สำเร็จ</h1>
      <Card>
        <Result
          status="success"
          title="สั่งซื้อสำเร็จ!"
          subTitle={`หมายเลขการสั่งซื้อ: ${stripeId} กำลังเตรียมการจัดส่ง`}
          extra={[
            <Button
              key={"delivery"}
              onClick={() => navigate("/delivery")}
              type="primary"
            >
              ตรวจสอบสินค้า
            </Button>,
          ]}
        />
      </Card>
    </Col>
  );
};

export default PaySuccess;
