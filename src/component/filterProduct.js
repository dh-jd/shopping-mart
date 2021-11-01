import React from 'react';
import {Drawer, Button, Radio, Space, Card, Col, Row,Dropdown,Menu} from 'antd';
import _ from "lodash";
import { DownOutlined } from '@ant-design/icons';

export default class FilterProduct extends React.Component {
    state = {visible: false, placement: 'left'};

    onChange = e => {
        this.setState({
            placement: e.target.value,
        });
    };
    menu = (items, fCode) => {
       return <Menu>
            {items.map(i => {
                return <Menu.Item onClick={() => this.props.filterProducts(fCode,i)}>
                    <span>
                      {i.label}
                    </span>
                </Menu.Item>
            })}
        </Menu>


    };

    render() {

       let colorFilter= _.find(this.props.filters,(f=>{
            return f.name==='color';
        }));
       let sizeFilter= _.find(this.props.filters,(f=>{
            return f.name==='size';
        }));
        return (
            <>
                <Drawer
                    title="Filter Options"
                    placement={"right"}
                    closable={false}
                    onClose={()=>this.props.onClose()}
                    visible={this.props.visible}
                    key={"right"}
                    width={500}
                >
                    {this.props.filterApplied &&<Row><Col span={19}/> <Col span={5} style={{color:"red",textDecoration:'Underline',cursor:'pointer',fontWeight:500}} onClick={()=>this.props.resetFilters()}>Reset Filters</Col></Row>}
                    {colorFilter && <Card size="small" title="Color Filters" style={{
                        width: 450,
                        borderRadius: 10,
                        boxShadow: '1px 1px 2px #888888',
                        marginBottom: 20
                    }}>
                        <div className={"fil-color-box"}>
                            <Row>
                                {_.map(colorFilter.filterValues, (c) => {
                                    return <Col span={6}>
                                    <span style={{
                                        paddingRight: '10px',
                                        cursor: "pointer",
                                        color: c.label === "White" ? "black" : c.label ? c.label : ''
                                    }} onClick={() => this.props.filterProducts('color', c)}>{c.label}
                                        <br/>
                                                               <span id={`colorBox_${c.value}`} style={{
                                                                   height: '25px',
                                                                   width: '25px',
                                                                   borderRadius: '50%',
                                                                   display: 'inline-block',
                                                                   border: '1px solid #BADA55',
                                                                   backgroundColor: c.label ? c.label : '',
                                                                   cursor: "pointer"
                                                               }} onClick={() => this.props.filterProducts('color', c)}
                                                               />
                                                            </span>
                                    </Col>
                                })}
                            </Row>
                        </div>
                    </Card>
                    }
                    {sizeFilter && <Card size="small" title="Size Filters" style={{
                        width: 450,
                        borderRadius: 10,
                        boxShadow: '1px 1px 2px #888888',
                        marginBottom: 20
                    }}>
                        <div className={"fil-color-box"}>
                            <Row>
                                {sizeFilter && _.map(sizeFilter.filterValues, (s) => {
                                    return <Col span={4}>
                                   <span style={{paddingRight: '10px'}}>
                                                               <span id={`colorBox_${s.value}`} style={{
                                                                   height: '25px',
                                                                   width: '25px',
                                                                   borderRadius: '50%',
                                                                   display: 'inline-block',
                                                                   border: '1px solid #BADA55',
                                                                   backgroundColor: 'lavender',
                                                                   cursor: "pointer"
                                                               }}
                                                                     onClick={() => this.props.filterProducts('size', s)}><span>{s.label}</span></span>
                                                            </span>
                                    </Col>
                                })}
                            </Row>
                        </div>
                    </Card>
                    }
                    {this.props.filters.length>0 && <Card size="small" title="Other Filters"
                          style={{width: 450,borderRadius: 10, boxShadow: '1px 1px 2px #888888'}}>
                        <Row>
                            <Col span={24} style={{marginTop:20,marginLeft:20,marginBottom:20}}>
                        {this.props.filters.map(f => {
                            return  f.name !== 'size' && f.name !== 'color' &&
                                <><Dropdown overlay={()=>this.menu(f.filterValues,f.code)} placement="bottomCenter" arrow >
                                        <Button style={{backgroundColor:'green',color:'white'}}>{f.name.toUpperCase()}<DownOutlined /></Button>
                                    </Dropdown>
                                </>


                        })}
                            </Col>

                        </Row>
                    </Card>}


                </Drawer>
            </>
        );
    }
}
