import React, { useState } from "react";
import { connect } from "dva";
import "./IndexPage.css";
// import styles from "./IndexPage.css";
import { Route, Link } from "dva/router";
import { Button, Layout, Menu } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import BlogsPage from "@routes/blogs/Blog";

import withHocPrivateRoute from "../components/withHocPrivateRoute";
import { getCurrentUserName } from "../utils/logic";
const PriateRoute = withHocPrivateRoute(Route);

const { Header, Content, Footer } = Layout;

const B = () => <div>b component</div>;
function IndexPage(props) {
  const { location } = props;
  const isBlogsPath =
    location &&
    location.pathname &&
    location.pathname.indexOf("/app/blogs") > -1;

  const username = getCurrentUserName();

   

  return (
    <Layout>
      <Header style={{ padding: 0, background: "#fff" }}>
        <div className="header_container">
          <Menu mode="inline" style={{ width: 130 }}>
            <Menu.SubMenu title={username}>
              <Menu.Item>
                <Link to="/login">登录</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/app/blogs">帮助</Link>
              </Menu.Item>

              <Menu.Item><Link to="/setting">设置</Link></Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </Header>
      <Content
        style={{ border: "1px solid #ddd", height: "calc(100vh - 140px)" }}
      >
        {!isBlogsPath ? (
          <div className="welcome">
            <Link to="/app/blogs">
              <Button icon={<ArrowRightOutlined />} ghost size="large"></Button>
            </Link>
            <PriateRoute path="/app/b" component={B} />
          </div>
        ) : (
          <div className="content">
            <PriateRoute path="/app/blogs" component={BlogsPage} />
          </div>
        )}
      </Content>
      <Footer>
        <p style={{ textAlign: "center" }}>Made with ❤ by wagnxx</p>
      </Footer>
    </Layout>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
