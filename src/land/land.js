import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FirstMenu from '../component/firstMenu'
import MySider from '../component/sider'
import './land.less'
import { Layout, Menu, List, Button, Table } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import axios from 'axios'
import { Link } from 'react-router'

const { Content } = Layout;

const data = [
    {
        key: 1,
        order: 1,
        name: '天府新区'
    },
    {
        key: 2,
        order: 2,
        name: '浦东新区'
    }
]

export default class Land extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            gLand: {
                shape: 0.0,
                func: 0.0,
                greenland: 0.0
            },
            rLand: {
                shape: 0.0,
                func: 0.0,
                greenland: 0.0
            }
        }
        this.getList()
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
                <Button type="text" onClick={() => this.showLand(record.key)} style={{ padding: '0' }}>
                    {record.name}
                </Button>
            )
        }
    ]

    getList() {
        axios.get('http://localhost:8080/api/v1/districts')
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

    getGoal(id) {
        axios.get('http://localhost:8080/api/v1/goal', {
            params: {
                id: id,
                type: 0
            }
        })
            .then((res) => {
                console.log("成功")
                this.setState({
                    gLand: res.data
                })
            })
            .catch((res) => {
                console.log(res)
            })
    }

    getReal(id) {
        axios.get('http://localhost:8080/api/v1/real', {
            params: {
                id: id,
                type: 0
            }
        })
            .then((res) => {
                console.log("成功")
                this.setState({
                    rLand: res.data
                })
            })
            .catch((res) => {
                console.log(res)
            })
    }

    showLand(id) {
        this.getGoal(id)
        this.getReal(id)

        this.state.gLand = {
            shape: 0.7,
            func: 0.95,
            greenland: 0.5
        }
        this.state.rLand = {
            shape: 0.9,
            func: 0.65,
            greenland: 0.58
        }

        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: true },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            legend: {
                data: ['基础指标', '实际数据']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['外部轮廓', '家园功能复合度', '城市建成区绿地覆盖率'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '数值',
                    min: 0,
                    max: 1,
                    interval: 0.1,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: '实际数据',
                    type: 'bar',
                    data: [this.state.rLand.shape, this.state.rLand.func, this.state.rLand.greenland]
                },
                {
                    name: '基础指标',
                    type: 'line',
                    data: [this.state.gLand.shape, this.state.gLand.func, this.state.gLand.greenland]
                }
            ]
        };
        option && myChart.setOption(option);
        console.log(id)
    }

    render() {
        return (
            <div>
                <FirstMenu />
                <Layout>
                    <MySider />
                    <div className='try'>
                        <Layout width='200px'>
                            <Content
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280
                                }}
                            >
                                <Table columns={this.columns} dataSource={data} size='middle' />
                                {/* <Table columns={this.columns} dataSource={this.state.data} /> */}
                            </Content>
                        </Layout>
                    </div>
                    <Layout>
                        <div id='main' style={{ width: 1050, height: 650, marginTop: '35px' }}>
                        </div>
                    </Layout>
                </Layout>
            </div>
        )
    }
}