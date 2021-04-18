import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, List } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class MySider extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
                <Sider width={200}>
                    <Menu
                        theme='dark'
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" title="关于我们的数据">
                            <Menu.Item style={{ margin: '0px' }} key="6">option1</Menu.Item>
                            <Menu.Item style={{ margin: '0px' }} key="7">option2</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title="主题">
                            <Menu.Item style={{ margin: '0px' }} key="1"><a href='#/data/land'>土地利用</a></Menu.Item>
                            <Menu.Item style={{ margin: '0px' }} key="2"><a href='#/data/trans'>交通体系</a></Menu.Item>
                            <Menu.Item style={{ margin: '0px' }} key="3"><a href='#/data/resource'>资源利用</a></Menu.Item>
                            <Menu.Item style={{ margin: '0px' }} key="4"><a href='#/data/envir'>生态环境</a></Menu.Item>
                            <Menu.Item style={{ margin: '0px' }} key="5"><a href='#/data/economy'>经济持续</a></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title="地域">
                            <Menu.Item style={{ margin: '0px' }} key="10">option10</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
        )
    }
}