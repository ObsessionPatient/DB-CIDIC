import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FirstMenu from '../component/firstMenu'
import MySider from '../component/sider'
import { Layout, Menu, Button, Table } from 'antd';
import * as echarts from 'echarts';
import Ecoclimate from './ecoclimate/ecoclimate'
import axios from 'axios'
import DataTable from './dataTable'

const { Content } = Layout;
const { Sider } = Layout;
const { SubMenu } = Menu;

export default class Theme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            menuData: [],
            dataOne: [],
            dataTwo: [],
            count: 0,
            indicator: '',
            name: ''
        }
    }

    //获取当前目录树
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

    //动态渲染目录（暂时无效，没使用）
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

    //只有单种数据
    showOne(indicator) {
        var token = JSON.parse(localStorage.getItem('token')).token
        axios.get(`/api/v1/indicator/${indicator}`, {
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
                    dataOne: res.data.series[0].datas,
                    count: res.data.count
                })
                console.log(this.state.dataOne)
                console.log(this.state.count)

                //把拿到的series数据处理成echarts接受的二维数组形式
                var tArray = new Array();  //先声明一维
                for (var k = 0; k < this.state.count; k++) {    //一维长度

                    tArray[k] = new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；

                    for (var j = 0; j < 2; j++) {   //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
                        if (j === 0)
                            tArray[k][j] = this.state.dataOne[k].date
                        else if (j === 1)
                            tArray[k][j] = this.state.dataOne[k].value
                    }
                }
                console.log(tArray)

                var chartDom = document.getElementById('ecoclimate');
                if (chartDom != null) {
                    echarts.dispose(chartDom)
                }
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
                        end: 10
                    }, {
                        start: 0,
                        end: 10
                    }],
                    series: [
                        {
                            name: this.state.name,
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

    //有两种数据
    showTwo(indicator) {
        var token = JSON.parse(localStorage.getItem('token')).token
        axios.get(`/api/v1/indicator/${indicator}`, {
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
                    dataOne: res.data.series[0].datas,
                    dataTwo: res.data.series[1].datas,
                    count: res.data.count
                })
                console.log(this.state.dataOne)
                console.log(this.state.count)

                //把拿到的series数据处理成echarts接受的二维数组形式
                var tArray = new Array();  //先声明一维
                for (var k = 0; k < this.state.count; k++) {    //一维长度

                    tArray[k] = new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；

                    for (var j = 0; j < 2; j++) {   //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
                        if (j === 0)
                            tArray[k][j] = this.state.dataOne[k].date
                        else if (j === 1)
                            tArray[k][j] = this.state.dataOne[k].value
                    }
                }
                var sArray = new Array();  //先声明一维
                for (var k = 0; k < this.state.count; k++) {    //一维长度

                    sArray[k] = new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；

                    for (var j = 0; j < 2; j++) {   //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
                        if (j === 0)
                            sArray[k][j] = this.state.dataTwo[k].date
                        else if (j === 1)
                            sArray[k][j] = this.state.dataTwo[k].value
                    }
                }
                // console.log(tArray)

                var chartDom = document.getElementById('ecoclimate');
                if (chartDom != null) {
                    echarts.dispose(chartDom)
                }
                var myChart = echarts.init(chartDom);
                var option;
                console.log('test')

                option = {
                    tooltip: {
                        trigger: 'axis'
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
                        nameLocation: 'middle',
                    },
                    yAxis: {
                        type: 'value'
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 7
                    }, {
                        start: 0,
                        end: 7
                    }],
                    series: [
                        {
                            // name: this.state.name,
                            type: 'line',
                            showSymbol: false,
                            encode: {
                                x: 'date',
                                y: 'value',
                                itemName: 'Year',
                                tooltip: ['value'],
                            },
                            data: tArray
                        },
                        {
                            type: 'line',
                            showSymbol: false,
                            encode: {
                                x: 'date',
                                y: 'value',
                                itemName: 'Year',
                                tooltip: ['value'],
                            },
                            data: sArray
                        }]
                };

                option && myChart.setOption(option);
            })
            .catch((res) => {
                console.log(res)
            })
    }

    //试图把图表当做一个单独的组件进行运用，渲染更新问题还未解决，故暂时没用
    showEcoclimate() {
        return (
            <Ecoclimate indicator={this.state.indicator} />
        )
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
                                    <Menu.Item key="10">
                                        <a onClick={() => {
                                            this.showOne('temperature')
                                            this.setState({
                                                name: '地表气温'
                                            })
                                        }}>
                                            地表气温
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item key="11">
                                        <a onClick={() => {
                                            this.showTwo('evaporation')
                                            this.setState({
                                                name: '蒸发'
                                            })
                                        }}>
                                            蒸发
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item key="12">
                                        <a onClick={() => {
                                            this.showTwo('humidity')
                                            this.setState({
                                                name: '相对湿度'
                                            })
                                        }}>
                                            相对湿度
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item key="6">
                                        <a onClick={() => {
                                            this.showOne('sunshine')
                                            this.setState({
                                                name: '日照时数'
                                            })
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
                        <div id='ecoclimate' style={{ width: 1070, height: 630, margin: 'auto', marginTop: '20px' }}>
                        </div>
                        {/* <DataTable /> */}
                        {/* {this.showEcoclimate()} */}
                    </Layout>
                </Layout>
            </div>
        )
    }
}