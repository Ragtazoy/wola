import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../makeRequest";

import { Card, Row, Col, Button, Space } from "antd";
import creditCard from "../assets/credit-card.png";
import promtPay from "../assets/promt-pay.jpg";

const Payment = ({ onSubmit }) => {
  const auth = useSelector((state) => state.auth[0]);
  const selectedProducts = useSelector((state) => state.cart);
  const [slipImage, setSlipImage] = useState();
  const [error, setError] = useState();
  const [defaultFileList, setDefaultFileList] = useState([]);

  const totalPrice = () => {
    let total = 0;
    selectedProducts.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toString();
  };

  const validate = () => {
    if (!slipImage) {
      setError("กรุณาอัปโหลดรูปหลักฐานการโอนเงิน");
      return false;
    } else if (slipImage?.size > 2000000) {
      setError("ไฟล์มีขนาใหญ่เกิน");
      return false;
    } else {
      setError();
      return true;
    }
  };

  const onFinish = async (value) => {
    console.log("value:", value.slip[0]);
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    //  await formData.append("files", value.slip[0].thumbUrl);
    //  await formData.append("ref", "tranfer_image"); //name of content type
    //  await formData.append("refId", value.slip[0].uid); //id of content type
    //  await formData.append("field", "image");
    await formData.append("image", value.slip[0]);

    console.log("formData:", value.slip[0]);
    await makeRequest
      .post("/upload", formData)
      .then((res) => {
        console.log("res: ", res);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  const handlePayment = async () => {
    const stripePromise = await loadStripe(
      "pk_test_51MzbC4CGexKuzOylqhtmu3GJjOgLEBB6jheKhvX0oolbk1OzhnyHsSgBluJq4TN0UUKIl2bXUH4psGt5MTrVWtwr00g96LvdHJ"
    );
    try {
      const res = await makeRequest.post("/orders", { selectedProducts, auth });

      await stripePromise.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log("handlePayment err:", err);
    }
  };

  return (
    <Col span={20}>
      <h1>ชำระเงิน</h1>
      <Card>
        {/* <Row style={{ flexDirection: "column", alignItems: "center" }}> */}
        <Space direction="vertical" size="middle" style={{ display: 'flex',flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 20 }}>ชำระเงินด้วยบัตรเครดิตหรือพร้อมเพย์เท่านั้น</span>
          <Row>
            <img width={200} height={80} alt="creditCard" src={creditCard}  />
            <img width={200} height={80} alt="promtPay" src={promtPay} style={{marginLeft:10}} />
          </Row>
          <Button onClick={() => handlePayment()} type="primary" size={"large"}>
            ชำระเงิน
          </Button>
          </Space>
        {/* </Row> */}
      </Card>
    </Col>
  );
};

export default Payment;

{
  /* <Form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "center",
              }}
              onFinish={onFinish}
            >
              <QRCode value={"https://ant.design/" || "-"} />
              <h2>สแกน QR Code เพื่อชำระเงิน</h2>
              <span>หลังจากนั้นอัปโหลดรูปหลักฐานการโอนด้านล่าง</span>
              <span>อัปโหลดไฟล์รูปภาพเท่านั้น</span>
              <>
                <Form.Item
                  name={"slip"}
                  valuePropName="fileList"
                  getValueFromEvent={(event) => event.fileList}
                >
                  <Upload
                    listType="picture-card"
                    accept=".png,.jpg"
                    maxCount={1}
                     //  headers={{ Authorization: `Bearer ${auth?.jwt}` }}
                     //  action={"http://localhost:1337/api/upload"}
                     customRequest={uploadImage}
                    //  onChange={handleOnChange}
                    defaultFileList={defaultFileList}
                    className="image-upload-grid"
                  >
                    {defaultFileList.length >= 1 ? null : (
                      <div>Upload Button</div>
                    )}
                  </Upload>
                </Form.Item>
              </>

              {error ? <span style={{ color: "#ff4d4f" }}>{error}</span> : null}
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: 10 }}
              >
                บันทึกการชำระ
              </Button>
            </Form> */
}
