import React from "react"
import { Outlet, Link } from "react-router-dom"
import { Layout as LayoutAntd, Menu } from "antd"

const { Header, Content, Footer } = LayoutAntd

const Layout = ({ user }) => {
    return (
        <LayoutAntd>
            <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
                <div
                    style={{
                        float: "right",
                        color: "rgba(54, 76, 255, 0.95)",
                    }}
                >
                    {user.isAuthenticated ? (
                        <strong>{user.userName}</strong>
                    ) : (
                        <strong>Гость</strong>
                    )}
                </div>
                <Menu theme="dark" mode="horizontal" items={[
                    {
                        label: <Link to={"/"}>Главная</Link>,
                        key: "1",
                    },
                    {
                        label: <Link to={"/categories"}>Категории</Link>,
                        key: "2",
                    },
                    user.isAuthenticated ?
                        {
                            label: <Link to={"/logoff"}>Выход</Link>,
                            key: "5",
                        } :
                        {
                            label: <Link to={"/login"}>Вход</Link>,
                            key: "3",
                        },
                    user.isAuthenticated ?
                        null :
                        {
                            label: <Link to={"/register"}>Регистрация</Link>,
                            key: "4",
                        },
                ]} className="menu" />
            </Header>
            <Content className="site-layout" style={{ padding: "0 50px" }}>
                <Outlet />
            </Content>
            <Footer style={{ textAlign: "center" }}>Motorbike Store ©2024</Footer>
        </LayoutAntd>
    )
}

export default Layout