import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FirstMenu from '../component/firstMenu'
import MySider from '../component/sider'
import { Layout, Menu, Button, Table } from 'antd';
import * as echarts from 'echarts';
import './theme.less'
import axios from 'axios'

const { Content } = Layout;
const { Sider } = Layout;
const { SubMenu } = Menu;

export default class Theme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            gResource: {
                proportion: 0.0,
                use: 0.0,
                renewable: 0.0,
                gdp: 0.0
            },
            rResource: {
                proportion: 0.0,
                use: 0.0,
                renewable: 0.0,
                gdp: 0.0
            },
            menuData: [],
            series: [],
            count: 0
        }
        //this.getList()
        //this.showResource(1)
        // this.getMenu()
    }

    getMenu() {
        var token = JSON.parse(localStorage.getItem('token')).token
        axios.get('/api/v1/data_tree', {
            headers: {
                'token': token
            },
        })
            .then((res) => {
                console.log(res)
                this.setState({
                    // menuData: Array.from(res.data)
                    menuData: res.data
                })
            })
            .catch((res) => {
                console.log(res)
            })
    }

    recursion() {
        //var dataSource = Array.from(this.state.menuData)
        return (
            this.state.menuData.map((menu, index) => {
                if (menu.children) {
                    return (
                        <SubMenu key={menu.key} title={menu.title}>
                            {this.recursion(menu.children)}
                        </SubMenu>
                    )
                } else {
                    return (<Menu.Item key={menu.key}>{menu.title}</Menu.Item>)
                }
            })
        )
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'order',
            key: 'order',
            width: '30%',
            align: 'center',
            render: text => <a>{text}</a>,
        },
        {
            title: '新区名称',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <Button type="text" onClick={() => this.showResource(record.key)} style={{ padding: '0' }}>
                    {record.name}
                </Button>
            )
        }
    ]

    getList() {
        axios.get('/api/v1/districts')
            .then((res) => {
                console.log("成功")
                this.setState({
                    data: res.data
                })
            })
            .catch((res) => {
                console.log(res)
            })
    }

    showSunshine() {
        var tArray = new Array();  //先声明一维
        var token = JSON.parse(localStorage.getItem('token')).token
        axios.get('/api/v1/indicator/sunshine', {
            headers: {
                'token': token
            },
            params: {
                'area': '漠河'
            }
        })
            .then((res) => {
                this.setState({
                    data: res.data,
                    series: res.data.series[0].datas,
                    count: res.data.count
                })
                console.log(this.state.series)
                console.log(this.state.count)

                for (var k = 0; k < this.state.count; k++) {    //一维长度

                    tArray[k] = new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；

                    for (var j = 0; j < 2; j++) {   //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
                        if (j === 0)
                            tArray[k][j] = this.state.series[k].date
                        else if (j === 1)
                            tArray[k][j] = this.state.series[k].value
                    }
                }
                console.log(tArray)

                var chartDom = document.getElementById('sunshine');
                var myChart = echarts.init(chartDom);
                var option;

                option = {
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        }
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'time',
                        // boundaryGap: false
                    },
                    yAxis: {
                        type: 'value',
                        // boundaryGap: [0, '100%']
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 20
                    }, {
                        start: 0,
                        end: 20
                    }],
                    series: [
                        {
                            name: '日照时数',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            areaStyle: {},
                            data: tArray
                        }
                    ]
                };

                option && myChart.setOption(option);
            })
            .catch((res) => {
                console.log(res)
            })
    }

    render() {
        return (
            // <Menu
            //     mode="inline"
            //     style={{ width: 240 }}
            // >
            //     {this.recursion()}
            // </Menu>
            <div className='theme'>
                <FirstMenu />
                <Layout>
                    <Sider width={230}>
                        <Menu
                            theme='dark'
                            mode="inline"
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub2" title="主题">
                                <Menu.Item style={{ margin: '0px' }} key="1"><a href='##'>基础空间</a></Menu.Item>
                                <Menu.Item style={{ margin: '0px' }} key="2"><a href='##'>卫星遥感</a></Menu.Item>
                                <SubMenu key="3" title="生态气候">
                                    <Menu.Item style={{ margin: '0px' }} key="7"><a href='##'>数据总览</a></Menu.Item>
                                    <Menu.Item key="6">
                                        <a onClick={() => {
                                            this.showSunshine()
                                        }}>
                                            日照时数
                                        </a>
                                    </Menu.Item>
                                </SubMenu>
                                <Menu.Item style={{ margin: '0px' }} key="4"><a href='##'>卫星影像</a></Menu.Item>
                                <Menu.Item style={{ margin: '0px' }} key="5"><a href='##'>统计指标</a></Menu.Item>
                                <Menu.Item style={{ margin: '0px' }} key="8"><a href='##'>公共服务</a></Menu.Item>
                                <Menu.Item style={{ margin: '0px' }} key="9"><a href='##'>交通监测</a></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <div id='sunshine' style={{ width: 1070, height: 630, margin: 'auto', marginTop: '20px' }}>
                        </div>
                    </Layout>
                </Layout>
            </div>
        )
    }
}