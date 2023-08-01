import React, { Suspense, useEffect, useState } from "react";
import Vue from "vue/dist/vue.min.js"; // 引入完整版，否则不能解析vue的组件对象语法
const RemoteApp = React.lazy(() => import("app4/home"));
import vue2 from "vue1/vue-home";
// base menu icon.
import {
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
const App = () => {
  const [currentMode, setCurrentMode] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // Add or remove vue app.
  useEffect(() => {
    if (currentMode === "vue") {
      new Vue({
        render: (h) => h(vue2),
      }).$mount("#vueApp");
    } else {
      document.getElementById("vueApp").innerText = "";
    }
  }, [currentMode]);

  function setCurrentKey({ key }) {
    if (key == 1) {
      setCurrentMode("base");
    } else if (key == 2) {
      setCurrentMode("react");
    } else if (key == 3) {
      setCurrentMode("vue");
    }
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          onSelect={setCurrentKey}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "home",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "app-react",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "app-vue",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "86vh",
            background: colorBgContainer,
          }}
        >
          <div id="vueApp" />
          {currentMode === "base" && <div>This is base home.</div>}
          {currentMode === "react" && (
            <Suspense fallback={"loading..."}>
              <RemoteApp />
            </Suspense>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
