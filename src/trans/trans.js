import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FirstMenu from '../component/firstMenu'
import MySider from '../component/sider'
import './trans.less'
import { Layout, Menu, List, Button, Table } from 'antd';
import * as echarts from 'echarts';
import axios from 'axios'

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

export default class Trans extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            gTrans: {
                intensity: 0.0,
                density: 0.0,
                coverage: 0.0
            },
            rTrans: {
                intensity: 0.0,
                density: 0.0,
                coverage: 0.0
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
                <Button type="text" onClick={() => this.showTrans(record.key)} style={{ padding: '0' }}>
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
                type: 1
            }
        })
            .then((res) => {
                console.log("成功")
                this.setState({
                    gTrans: res.data
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
                type: 1
            }
        })
            .then((res) => {
                console.log("成功")
                this.setState({
                    rTrans: res.data
                })
            })
            .catch((res) => {
                console.log(res)
            })
    }

    showTrans(id) {
        this.getGoal(id)
        this.getReal(id)

        this.state.gTrans = {
            intensity: 0.2,
            density: 0.4,
            coverage: 0.9
        }
        this.state.rTrans = {
            intensity: 0.25,
            density: 0.44,
            coverage: 0.87
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
                    data: ['场地建设强度分析', '道路网密度', '独立非机动车道覆盖率'],
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
                    data: [this.state.rTrans.intensity, this.state.rTrans.density, this.state.rTrans.coverage]
                },
                {
                    name: '基础指标',
                    type: 'line',
                    data: [this.state.gTrans.intensity, this.state.gTrans.density, this.state.gTrans.coverage]
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