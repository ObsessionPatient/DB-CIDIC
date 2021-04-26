import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import { setToken } from "../../utils/auth"

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
}

const NormalLoginForm = () => {
    const onFinish = values => {
        console.log('Received values of form: ', values);
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

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;没有账号？<a href="#/signUp">现在注册！</a>
            </Form.Item>
        </Form>
    );
};

export default NormalLoginForm;