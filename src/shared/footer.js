import React from 'react';
import {Layout} from 'antd';
const FooterNav = Layout.Footer;
export default class Footer extends React.Component{
    render() {
        return (
            <FooterNav className={"footer"}>Ant Design ©2018 Created by Ant UED</FooterNav>
        );
    }
}
