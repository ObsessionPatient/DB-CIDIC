import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FirstMenu from '../component/firstMenu'
import { Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import axios from 'axios'

export default class Monitor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            goal: {},
            real: {}
        }
        this.getList()
        
        // this.show()
    }

    getList() {
        var token = JSON.parse(localStorage.getItem('token')).token
        axios.get('http://58.33.91.86:18080/api/v1/monitor/districts', {
            headers: {
                'token': token
            },
        })
            .then((res) => {
                console.log(token)
                this.setState({
                    list: res.data
                })
            })
            .catch((res) => {
                console.log(res)
            })
    }

    getGoal(id) {
        var token = JSON.parse(localStorage.getItem('token')).token
        axios.get('http://58.33.91.86:18080/api/v1/monitor/standard/1', {
            headers: {
                'token': token
            }
        })
            .then((res) => {
                console.log(token)
                this.setState({
                    goal: res.data
                })
            })
            .catch((res) => {
                console.log(res)
            })
    }

    getReal(id) {
        var token = JSON.parse(localStorage.getItem('token')).token
        axios.get('http://58.33.91.86:18080/api/v1/monitor/value/1', {
            headers: {
                'token': token
            }
        })
            .then((res) => {
                console.log("成功")
                this.setState({
                    real: res.data
                })
            })
            .catch((res) => {
                console.log(res)
            })
    }

    show() {
        var chartDom = document.getElementById('main');
        if (chartDom != null) {
            echarts.dispose(chartDom)
        }
        var myChart = echarts.init(chartDom);
        var option;

        // Schema:
        // date,AQIindex,PM2.5,PM10,CO,NO2,SO2

        var dataPD = [
            [0.362540045954058, 0.396, 18070.34475, 0.927557879014189, 6.82, 0.412417, 0.39, 0.15, 0.5311, 0.053, 0.26, 0.790698, 0.52195532, 0.2939, 60440, 0.9054678, 522.3373, 0.941114374256784, 0.0410191063295115, 4.81052756177897]
        ];

        var dataBH = [
            [0.394486061199744, 0.376, 71959.5298454768, 0.720048899755501, 3.23, 0.7254, 0.38, 0.28, 0, 0.048, 0.42, 0.96996736, 0.58096378, 0.2213, 105, 0.135063192, 684.369, 2.28229507103315, 0.117006154898273, 8.10937604718182]
        ];

        var lineStyle = {
            normal: {
                width: 1,
                opacity: 0.5
            }
        };

        option = {
            backgroundColor: '#161627',
            title: {
                text: '动态监测图',
                left: 'center',
                textStyle: {
                    color: '#eee'
                }
            },
            legend: {
                bottom: 5,
                data: ['浦东新区', '滨海新区'],
                itemGap: 20,
                textStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                selectedMode: 'single'
            },
            // visualMap: {
            //     show: true,
            //     min: 0,
            //     max: 20,
            //     dimension: 6,
            //     inRange: {
            //         colorLightness: [0.5, 0.8]
            //     }
            // },
            radar: {
                indicator: [
                    { name: '外部轮廓', max: 1 },
                    { name: '城市建成区绿地覆盖率', max: 0.35 },
                    { name: '生态系统服务功能总价值', max: 80000 },
                    { name: '家园功能复合度', max: 1.5 },
                    { name: '道路网密度', max: 12 },
                    { name: '绿色建筑比例', max: 1 },
                    { name: '基尼系数', max: 0.5 },
                    { name: '再生水利用率', max: 0.3 },
                    { name: '独立非机动车道覆盖率', max: 0.6 },
                    { name: '非化石能源占一次能源消费比重', max: 0.1 },
                    { name: '单位GDP能耗', max: 0.5 },
                    { name: '固体废物利用率', max: 1 },
                    { name: '社会治安满意度', max: 1 },
                    { name: '水面率', max: 0.3 },
                    { name: '生活用水', max: 100000 },
                    { name: '水网密度', max: 1 },
                    { name: '碳排放/万吨', max: 800 },
                    { name: '人均碳排放/吨每人', max: 3 },
                    { name: '产均碳排放/吨每元', max: 0.2 },
                    { name: '人均能耗', max: 10 }
                ],
                shape: 'circle',
                splitNumber: 5,
                name: {
                    textStyle: {
                        color: 'rgb(238, 197, 102)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: [
                            'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                            'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                            'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                        ].reverse()
                    }
                },
                splitArea: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(238, 197, 102, 0.5)'
                    }
                }
            },
            series: [
                {
                    name: '浦东新区',
                    type: 'radar',
                    lineStyle: lineStyle,
                    data: dataPD,
                    symbol: 'none',
                    itemStyle: {
                        color: '#B3E4A1'
                    },
                    areaStyle: {
                        opacity: 0.05
                    }
                },
                {
                    name: '滨海新区',
                    type: 'radar',
                    lineStyle: lineStyle,
                    data: dataBH,
                    symbol: 'none',
                    itemStyle: {
                        color: 'rgb(238, 197, 102)'
                    },
                    areaStyle: {
                        opacity: 0.05
                    }
                }
            ]
        };

        option && myChart.setOption(option);
    }

    render() {
        return (
            <div backgroundColor='black'>
                <FirstMenu />
                <Button type='primary' onClick={() => this.show()}>显示图表</Button>
                <div id='main' style={{ width: 1520, height: 680, margin: 'auto' }}>
                </div>
            </div>
        )
    }
}