import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FirstMenu from '../component/firstMenu'
import MySider from '../component/sider'
import './economy.less'
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

export default class Economy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            gEconomy: {
                gini: 0.0,
                security: 0.0
            },
            rEconomy: {
                gini: 0.0,
                security: 0.0
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
                <Button type="text" onClick={() => this.showEconomy(record.key)} style={{ padding: '0' }}>
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
                type: 4
            }
        })
            .then((res) => {
                console.log("成功")
                this.setState({
                    gEconomy: res.data
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
                type: 4
            }
        })
            .then((res) => {
                console.log("成功")
                this.setState({
                    rEconomy: res.data
                })
            })
            .catch((res) => {
                console.log(res)
            })
    }

    showEconomy(id) {
        this.getGoal(id)
        this.getReal(id)

        this.state.gEconomy = {
            gini: 0.6,
            security: 0.77
        }
        this.state.rEconomy = {
            gini: 0.66,
            security: 0.7
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
                    data: ['基尼系数', '社会治安满意度'],
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
                    data: [this.state.rEconomy.gini, this.state.rEconomy.security]
                },
                {
                    name: '基础指标',
                    type: 'line',
                    data: [this.state.gEconomy.gini, this.state.gEconomy.security]
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
                                <Table columns={this.columns} dataSource={data} size='middle'/>
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