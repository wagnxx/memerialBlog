import React from "react";

import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./logic.css";
import { message } from "antd";
import { connect } from "dva";
import { saveLocalUserInfo } from "../../utils/logic";
const LoginPage = (props) => {





  const onFinish = async (values) => {
    console.log(values);
    console.log("Received values of form: ", values);
    // login fetch
    const data = await props.dispatch({
      type: "logic/login",
      payload: values,
    });


    if (data.errno !== 0) {
      message.error(data.message);
    } else {
      saveLocalUserInfo(data);
      message.success({
        title: "温馨提示",
        content: "登录成功",
        onClose: function () {
          props.history.push("/app/blogs");
        },
      });
    }
  };

  return (
    <div id="components-form-demo-normal-login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(null, mapDispatch)(LoginPage);
