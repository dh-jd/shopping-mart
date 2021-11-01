import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,Redirect
}from "react-router-dom";
import { Card,Layout, Carousel  } from 'antd';
import SideBar from "../sidebar/sidebar"
import Dashboard from "../dashboard/dashboard";
import Products from "../component/products";
import HeaderBar from "../shared/header"
import Footer from "../shared/footer"
import categoryContext from "../categoryContext";
const { Content } = Layout;
const basePath ="/shoppingCart";

export default class AppRouter extends React.Component{
    static contextType =categoryContext;
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Router>
                <Layout>
                    <HeaderBar/>
                    <Layout>
                        <SideBar/>
                        <Content  className="site-layout"  style={{ padding: '0px 50px 0px 0px', marginTop: 64 }}>
                            <div className="site-layout-background">
                                <Card bordered={false} style={{marginLeft: 5,marginRight: 5}} >
                                    <Switch>
                                        <Route exact path={`${basePath}/dashboard`}>
                                            <Dashboard/>
                                        </Route>
                                        <Route exact path={`${basePath}/category/products`}>
                                            <Products/>
                                        </Route>
                                        <Route  path={``}>
                                            <Dashboard/>
                                        </Route>
                                    </Switch>
                                </Card>
                            </div>
                        </Content>
                    </Layout>
                    <Footer/>
                </Layout>
            </Router>
        )
    }
}
