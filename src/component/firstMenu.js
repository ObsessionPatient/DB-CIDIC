import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Divider, Layout, Button, Menu, Dropdown } from 'antd';
import './firstMenu.less'
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const menu = (
  <div className='explore'>
    <Menu theme='dark'>
      <SubMenu title="关于我们的数据">
      </SubMenu>
      <SubMenu title="主题">
        <Menu.Item><a href='#/data/land'>土地利用</a></Menu.Item>
        <Menu.Item><a href='#/data/trans'>交通体系</a></Menu.Item>
        <Menu.Item><a href='#/data/resource'>资源利用</a></Menu.Item>
        <Menu.Item><a href='#/data/envir'>生态环境</a></Menu.Item>
        <Menu.Item><a href='#/data/economy'>经济持续</a></Menu.Item>
      </SubMenu>
      <SubMenu title="地域">
      </SubMenu>
      <SubMenu title="类型">
      </SubMenu>
    </Menu>
  </div>
);

function FirstMenu() {
  return (
    
    <div>
      <Row className="firstbar" align="middle" justify="end">
        <Col span={14} style={{color: "#ffffff", fontSize: "20px"}}>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;CIDIC
        </Col>
        <Col span={2}>
            <Dropdown trigger='click'>
              <div className="title">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  &emsp;&emsp;新闻
                </a>
              </div>
              
            </Dropdown>
        </Col>
        <Col span={2}>
            <Dropdown overlay={menu}>
              <div className="title">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  数据探索
                </a>
              </div>
            </Dropdown>
        </Col>
        <Col span={2}>
            <Dropdown trigger='click'>
              <div className="title">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  数据洞察
                </a>
              </ div>
            </Dropdown>
        </Col>
        <Col span={2}>
            <Dropdown trigger='click'>
              <div className="title">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  数据地图
                </a>
              </ div>
            </Dropdown>
        </Col>
        <Col span={2}>
            <Dropdown trigger='click'>
              <div className="title">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  数据众包
                </a>
              </ div>
            </Dropdown>
        </Col>
      </Row>
    </div>
    
  )
}

export default FirstMenu;