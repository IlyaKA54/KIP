import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, Input } from "antd"

const Register = ({ user, setUser }) => {
    const [errorMessages, setErrorMessages] = useState([])
    const navigate = useNavigate()

    const registration = async (formValues) => {
        console.log("Success:", formValues)

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: formValues.username,
                password: formValues.password,
                passwordConfirm: formValues.passwordConfirm
            }),
        }
        return await fetch("api/account/register", requestOptions)
            .then((response) => {
                // console.log(response.status)
                response.status === 200 &&
                    setUser({ isAuthenticated: true, userName: "",userRole: "" })
                return response.json()
            })
            .then(
                (data) => {
                    console.log("Data:", data)
                    if (
                        typeof data !== "undefined" &&
                        typeof data.userName !== "undefined"
                    ) {
                        setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole })
                        navigate("/")
                    }
                    typeof data !== "undefined" &&
                        typeof data.error !== "undefined" &&
                        setErrorMessages(data.error)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    const renderErrorMessage = () =>
        errorMessages.map((error, index) => <div key={index}>{error}</div>)

    return (
        <>
            {user.isAuthenticated ? (
                <h3>Пользователь {user.userName} имеет аккаунт</h3>
            ) : (
                <>
                    <h3>Регистрация</h3>
                    <Form
                        onFinish={registration}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinishFailed={renderErrorMessage}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                { required: true, message: "Please input your username!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: "Please input your password!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="PasswordConfirm"
                            name="passwordConfirm"
                            rules={[
                                { required: true, message: "Please repeate your password!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </>
    )
}

export default Register