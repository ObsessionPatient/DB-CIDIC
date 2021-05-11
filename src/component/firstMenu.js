import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Divider, Layout, Button, Menu, Dropdown } from 'antd';
import './firstMenu.less'
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const menu = (
  <div className='explore'>
    <Menu theme='dark'>
      <SubMenu title="主题">
        <Menu.Item><a href='#/theme'>基础空间</a></Menu.Item>
        <Menu.Item><a href='#/theme'>卫星遥感</a></Menu.Item>
        <Menu.Item><a href='#/theme'>生态气候</a></Menu.Item>
        <Menu.Item><a href='#/theme'>卫星影像</a></Menu.Item>
        <Menu.Item><a href='#/theme'>统计指标</a></Menu.Item>
        <Menu.Item><a href='#/theme'>公共服务</a></Menu.Item>
        <Menu.Item><a href='#/theme'>交通监测</a></Menu.Item>
      </SubMenu>
      <SubMenu title="地域">
      </SubMenu>
    </Menu>
  </div>
);

function FirstMenu() {
  return (
    
    <div>
      <Row className="firstbar" align="middle" justify="end">
        <Col span={20} style={{color: "#ffffff", fontSize: "20px"}}>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;CIDIC
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
            {/* <Dropdown trigger='click'> */}
              <div className="title">
                <a href='#/monitor'>
                  数据洞察
                </a>
              </ div>
            {/* </Dropdown> */}
        </Col>
      </Row>
    </div>
    
  )
}

export default FirstMenu;