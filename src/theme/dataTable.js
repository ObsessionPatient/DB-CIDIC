import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, List, Button, Table } from 'antd';
import axios from 'axios'

const { Content } = Layout;

export default class DataTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
        }
        this.getList()
    }

    getList() {
        var token = JSON.parse(localStorage.getItem('token')).token
        axios.get('/api/v1/data_tree', {
            headers: {
                'token': token
            }
        })
            .then(res => {
                this.setState({
                    data: res.data.生态气候.地表气温
                })
                console.log(res.data.生态气候.地表气温)
            })
    }

    columns = [
        {
            title: '大类',
            dataIndex: 'order',
            key: 'order',
            width: '20%',
            align: 'center',
            render: text => <a>{text}</a>,
        },
        {
            title: '数据项',
            dataIndex: 'order',
            key: 'order',
            width: '60%',
            align: 'center',
            render: text => <a>{text}</a>,
        },
        {
            title: '数据总量',
            dataIndex: 'order',
            key: 'order',
            width: '20%',
            align: 'center',
            render: text => <a>{text}</a>,
        }
    ]

    render() {
        return (
            <div>
                {/* <Table columns={this.columns} dataSource={data} size='middle' /> */}
                {/* <Table columns={this.columns} dataSource={this.state.data} /> */}
            </div>
        )
    }
}