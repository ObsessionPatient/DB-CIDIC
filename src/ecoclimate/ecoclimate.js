// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import FirstMenu from '../component/firstMenu'
// import MySider from '../component/sider'
// import { Layout, Menu, List, Button, Table } from 'antd';
// import * as echarts from 'echarts';
// import axios from 'axios'

// const { Content } = Layout;

// export default class Resource extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             data: [],
//             gResource: {
//                 proportion: 0.0,
//                 use: 0.0,
//                 renewable: 0.0,
//                 gdp: 0.0
//             },
//             rResource: {
//                 proportion: 0.0,
//                 use: 0.0,
//                 renewable: 0.0,
//                 gdp: 0.0
//             }
//         }
//         this.getList()
//         this.showResource(1)
//     }

//     columns = [
//         {
//             title: '序号',
//             dataIndex: 'order',
//             key: 'order',
//             width: '30%',
//             align: 'center',
//             render: text => <a>{text}</a>,
//         },
//         {
//             title: '新区名称',
//             dataIndex: 'name',
//             key: 'name',
//             render: (_, record) => (
//                 <Button type="text" onClick={() => this.showResource(record.key)} style={{ padding: '0' }}>
//                     {record.name}
//                 </Button>
//             )
//         }
//     ]

//     getList() {
//         axios.get('http://localhost:8080/api/v1/districts')
//             .then((res) => {
//                 console.log("成功")
//                 this.setState({
//                     data: res.data
//                 })
//             })
//             .catch((res) => {
//                 console.log(res)
//             })
//     }

//     getGoal(id) {
//         axios.get('http://localhost:8080/api/v1/goal', {
//             params: {
//                 id: id,
//                 type: 2
//             }
//         })
//             .then((res) => {
//                 console.log("成功")
//                 this.setState({
//                     gResource: res.data
//                 })
//             })
//             .catch((res) => {
//                 console.log(res)
//             })
//     }

//     getReal(id) {
//         axios.get('http://localhost:8080/api/v1/real', {
//             params: {
//                 id: id,
//                 type: 2
//             }
//         })
//             .then((res) => {
//                 console.log("成功")
//                 this.setState({
//                     rResource: res.data
//                 })
//             })
//             .catch((res) => {
//                 console.log(res)
//             })
//     }

//     showResource(id) {
//         this.getGoal(id)
//         this.getReal(id)

//         if (id === 1) {
//             this.state.gResource = {
//                 proportion: 0.4,
//                 use: 0.22,
//                 renewable: 0.78,
//                 gdp: 0.89
//             }
//             this.state.rResource = {
//                 proportion: 0.3,
//                 use: 0.32,
//                 renewable: 0.65,
//                 gdp: 0.8
//             }
//         }
//         else if (id === 2) {
//             this.state.gResource = {
//                 proportion: 0.54,
//                 use: 0.32,
//                 renewable: 0.7,
//                 gdp: 0.6
//             }
//             this.state.rResource = {
//                 proportion: 0.35,
//                 use: 0.3,
//                 renewable: 0.65,
//                 gdp: 0.7
//             }
//         }

//         var chartDom = document.getElementById('main');
//         var myChart = echarts.init(chartDom);
//         var option;

//         option = {
//             tooltip: {
//                 trigger: 'axis',
//                 axisPointer: {
//                     type: 'cross',
//                     crossStyle: {
//                         color: '#999'
//                     }
//                 }
//             },
//             toolbox: {
//                 feature: {
//                     dataView: { show: true, readOnly: true },
//                     magicType: { show: true, type: ['line', 'bar'] },
//                     restore: { show: true },
//                     saveAsImage: { show: true }
//                 }
//             },
//             legend: {
//                 data: ['基础指标', '实际数据']
//             },
//             xAxis: [
//                 {
//                     type: 'category',
//                     data: ['绿色建筑比例', '再生水利用率', '非化石能源占一次能源消费比重', '单位GDP消耗'],
//                     axisPointer: {
//                         type: 'shadow'
//                     }
//                 }
//             ],
//             yAxis: [
//                 {
//                     type: 'value',
//                     name: '数值',
//                     min: 0,
//                     max: 1,
//                     interval: 0.1,
//                     axisLabel: {
//                         formatter: '{value}'
//                     }
//                 }
//             ],
//             series: [
//                 {
//                     name: '实际数据',
//                     type: 'bar',
//                     data: [this.state.rResource.proportion, this.state.rResource.use, this.state.rResource.renewable, this.state.rResource.gdp]
//                 },
//                 {
//                     name: '基础指标',
//                     type: 'line',
//                     data: [this.state.gResource.proportion, this.state.gResource.use, this.state.gResource.renewable, this.state.gResource.gdp]
//                 }
//             ]
//         };
//         option && myChart.setOption(option);
//         console.log(id)
//     }

//     render() {
//         return (
//             <div>
//                 <Layout>
//                     <Content
//                         style={{
//                             padding: 24,
//                             margin: 0,
//                             minHeight: 280
//                         }}
//                     >
//                         <Table columns={this.columns} dataSource={data} size='middle' />
//                         {/* <Table columns={this.columns} dataSource={this.state.data} /> */}
//                     </Content>
//                 </Layout>
//                 <Layout>
//                     <div id='main' style={{ width: 1050, height: 650, marginTop: '35px' }}>
//                     </div>
//                 </Layout>
//             </div>
//         )
//     }
// }