import React from 'react';
import {Button, Layout} from 'antd';
import logo from "../assets/shop.png"
import {ShoppingCartOutlined} from '@ant-design/icons';

const {Header} = Layout;
export default class HeaderBar extends React.Component {
    render() {
        return (
            <Header style={{position: 'fixed', zIndex: 1, width: '100%', boxShadow: "1px 1px 2px #888888"}}>
                <span className="logo_container">
                    <img className="logo" src={logo} alt={""}/>

                </span>
                <span style={{color: "black"}} className={"subtitle"}>
                    Don’t worry, we have it...
                </span>
                <div style={{float: "right", display: "flex", marginRight: 45}}>
                    <span style={{color: "#575d6c", marginRight: 10}}>
                            Welcome Guest
                    </span>
                    <span>
                        <ShoppingCartOutlined style={{color: "#575d6c", marginRight: 10, fontSize: 24, marginTop: 20}}/>
                    </span>
                    <div>
                        <Button className="primary_btn">SignUp</Button>
                        <Button className="primary_btn">Login</Button>
                    </div>
                </div>
            </Header>
        );
    }
}
