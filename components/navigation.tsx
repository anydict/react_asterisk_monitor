import React from "react"
import { Breadcrumb, Layout, Menu, theme } from "antd"
import ToolFilled from "@ant-design/icons/lib/icons/ToolFilled"
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined"
import FileTextFilled from "@ant-design/icons/lib/icons/FileTextFilled"

const { Header, Content, Footer } = Layout

const menuItems = [
  {
    key: "center",
    icon: <ToolFilled />,
    label: <a href="/">Главная</a>,
  },
  // {
  //   key: "settings",
  //   icon: <SettingOutlined />,
  //   label: "Настройки",
  // },
  // {
  //   key: "logout",
  //   icon: <FileTextFilled />,
  //   label: "Логи",
  // },
]

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

function Navigation({ children }: Props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={menuItems}
        ></Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>ДРОК ©2023</Footer>
    </Layout>
  )
}

export default Navigation
