import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import { setToken } from "../../utils/auth"

const NormalLoginForm = () => {
    const onFinish = values => {
        console.log(values);
        axios.post('/login', {
            userName: values.userName,
            password: values.password,
        })
            .then(response => {
                console.log(response)
                setToken(response.data)
                window.alert("登录成功")
                window.location.href = '#/home'
            })
            .catch(function (error) {
                console.log(error)
                window.alert("登录失败")
            })
    };

    return (
        <Form
            name="sign_in_form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="userName"
                rules={[
                    {
                        required: true,
                        message: '请输入您的用户名！',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入您的密码！',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="请输入密码"
                />
            </Form.Item>
            <Form.Item style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NormalLoginForm;