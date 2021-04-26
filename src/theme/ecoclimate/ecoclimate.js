import React, { Component } from 'react';
import { Layout, Menu, Button, Table } from 'antd';
import * as echarts from 'echarts';
import axios from 'axios'

const { Content } = Layout;
const { Sider } = Layout;
const { SubMenu } = Menu;

export default class Ecoclimate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            series: [],
            count: 0
        }
        this.show()
    }

    show() {
        console.log(this.props.indicator)
        var token = JSON.parse(localStorage.getItem('token')).token
        axios.get(`/api/v1/indicator/${this.props.indicator}`, {
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

                //把拿到的series数据处理成echarts接受的二维数组形式
                var tArray = new Array();  //先声明一维
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
            <div id='sunshine' style={{ width: 1070, height: 630, margin: 'auto', marginTop: '20px' }}>
            </div>
        )
    }
}