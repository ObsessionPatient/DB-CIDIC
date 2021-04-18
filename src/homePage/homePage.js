import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.less';
import { Input } from 'antd';
import FirstMenu from '../component/firstMenu'
import './homePage.less'

const { Search } = Input;
const onSearch = value => console.log(value);

function HomePage() {
    return (
        <div className="homepage">
            <FirstMenu />,
            <div className="panel">
                <h1>数据科技 赋能大众</h1>
                <h2>Urban Intelligent Data Innovation Center</h2>
                <div className="search">
                    <Search 
                        style={{width: "30%", borderBlockColor:"black"}} 
                        placeholder="请输入搜索内容" 
                        onSearch={onSearch} 
                        enterButton 
                        maxLength="20"
                        bordered={true}/>
                </div>
                
            </div>
        </div>
    )
}

export default HomePage;