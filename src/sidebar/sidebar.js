import React from 'react';
import {Layout, Menu} from 'antd';
import apiRoutes from "../utils/rest/apiRoutes";
import _ from 'lodash';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import categoryContext from "../categoryContext";
const {Sider} = Layout;
const {SubMenu} = Menu;
const basePath ="shoppingCart";

class SideBar extends React.Component {
    static contextType =categoryContext;
    constructor() {
        super();
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        const categories = this.context;
        this.setState({categories});
    }

    subMenu(data) {
        return <SubMenu key={data.id} icon={""} title={data.name}>
            {_.map(data.children_data, (s, i) => {
                if (s.children_data.length > 0) {
                    return <>
                        {<Menu.Item key={s.id}>{s.name}</Menu.Item>
                        && this.subMenu(s)}
                    </>

                } else {
                    return <Menu.Item key={s.id} className={"menu"}><Link to={ `/${basePath}/category/products?id=${s.id}`}>{s.name}</Link></Menu.Item>
                }

            })
            }
        </SubMenu>

    }

    menuItem(data) {
        return <Menu.Item key={`${data.id}`} ><Link to={ `/${basePath}/category/products?id=${data.id}`}>{data.name}</Link></Menu.Item>
    }

    menu() {
        return _.map(this.state.categories, (c, i) => {
            return <>{c.children_data.length > 0 ? this.subMenu(c) : this.menuItem(c)}</>
        })
    }

    render() {
        return (
            <Sider width={200} style={{marginTop: 75,boxShadow:" 1px 1px 2px #888888"}} height={'60%'}>
                <Menu
                    mode="vertical"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{height: '100%', borderRight: 0}}
                >
                    {this.menu()}
                </Menu>
            </Sider>
        )
    }
}
export  default withRouter(SideBar)
