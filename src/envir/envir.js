import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FirstMenu from '../component/firstMenu'
import MySider from '../component/sider'
import './envir.less'
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

export default class Envir extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            gEnvir: {
                ventilation: 0.0,
                waste: 0.0
            },
            rEnvir: {
                ventilation: 0.0,
                waste: 0.0
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
                <Button type="text" onClick={() => this.showEnvir(record.key)} style={{ padding: '0' }}>
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
                type: 3
            }
        })
            .then((res) => {
                console.log("成功")
                this.setState({
                    gEnvir: res.data
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
                type: 3
            }
        })
            .then((res) => {
                console.log("成功")
                this.setState({
                    rEnvir: res.data
                })
            })
            .catch((res) => {
                console.log(res)
            })
    }

    showEnvir(id) {
        this.getGoal(id)
        this.getReal(id)

        this.state.gEnvir = {
            ventilation: 0.89,
            waste: 0.2
        }
        this.state.rEnvir = {
            ventilation: 0.65,
            waste: 0.3
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
                    data: ['通风潜力指数', '固体废物综合利用率'],
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
                    data: [this.state.rEnvir.ventilation, this.state.rEnvir.waste]
                },
                {
                    name: '基础指标',
                    type: 'line',
                    data: [this.state.gEnvir.ventilation, this.state.gEnvir.waste]
                }
            ]
        };
        option && myChart.setOption(option);
        console.log(id)
    }

    change() {
        this.state.visible = true
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