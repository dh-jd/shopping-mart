import React from 'react';
import {Button, Col, Row} from "antd";
import BreadCrumb from './breadCrumb'
import _ from "lodash";

const imageURL = "http://localhost/magento2/pub/media";

export default class ProductGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    changeImageByColor(product, selectedColor) {
        let sku = product.sku;
        let skuProducts = _.find(this.props.allProducts, {'sku': sku});
        if (selectedColor.value) {
            let item = _.find(skuProducts.items, {'color': selectedColor.value});
            if (item) {
                product.image = item.image;
            }
            _.each(product.colors, (color) => {
                if (color.value === selectedColor.value) {
                    debugger
                    document.getElementById("colorBox_" + color.value + product.sku).className = "selected-color";
                } else {
                    document.getElementById("colorBox_" + color.value + product.sku).className = "unselected-color";
                }
            });
            this.props.updateSelected(this.props.products);
        }
    }

    changeImageBySize(product, selectedSize) {
        if (selectedSize.value) {
            _.each(product.sizes, (size) => {
                if (size.value === selectedSize.value) {
                    document.getElementById("colorBox_" + size.value + product.sku).className = "selected-size";
                } else {
                    document.getElementById("colorBox_" + size.value + product.sku).className = "unselected-size";
                }
            });
            this.props.updateSelected(this.props.products);
        }
    }

    render() {
        return <div>
            {this.props.categoryId && <BreadCrumb categoryId={this.props.categoryId}/>}
            <Row gutter={20} style={{marginBottom: "75px", marginTop: "20px"}}>
                {_.map(this.props.products, (p) => {
                    return <>
                        <Col span={6} style={{marginTop: "40px"}}>
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src={`${imageURL}/catalog/product${p.image}`} alt="Avatar"
                                             style={{width: 300, height: 400, borderRadius: 10}}/>
                                    </div>
                                    <div className="flip-card-back">
                                        <div style={{marginTop: 10}}>
                                            <h1 style={{color: "#1890ff", fontWeight: 500}}>{p.name}</h1>
                                            <img src={`${imageURL}/catalog/product${p.image}`} alt="Avatar"
                                                 style={{width: 150, height: 150, borderRadius: 10}}/>
                                        </div>
                                        <div>
                                            <Row>
                                                <Col span={12}>
                                                    <p style={{
                                                        color: "black",
                                                        fontWeight: 750,
                                                        marginTop: 10
                                                    }}><>Price: &#8377; {p.price * 70}</>
                                                    </p>
                                                </Col>
                                                <Col span={12}>
                                                    <p style={{color: "black", marginTop: 10}}>SKU: {p.sku}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <div className={"color-box"}>
                                                        {_.map(p.colors, (c) => {
                                                            return <>
                                                            <span style={{
                                                                paddingRight: '10px',
                                                                cursor: "pointer",
                                                                color: c.label === "White" ? "black" : c.label ? c.label : ''
                                                            }} onClick={() => this.changeImageByColor(p, c)}>{c.label}
                                                                <br/>
                                                               <span id={`colorBox_${c.value}${p.sku}`} style={{
                                                                   height: '25px',
                                                                   width: '25px',
                                                                   borderRadius: '50%',
                                                                   display: 'inline-block',
                                                                   border: '1px solid #BADA55',
                                                                   backgroundColor: c.label ? c.label : '',
                                                                   cursor: "pointer"
                                                               }} onClick={() => this.changeImageByColor(p, c)}
                                                               />
                                                            </span>
                                                            </>
                                                        })}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <div className={"color-box"}>
                                                        {_.map(p.sizes, (s) => {
                                                            return <>
                                                            <span style={{paddingRight: '10px'}}>
                                                               <span id={`colorBox_${s.value}${p.sku}`} style={{
                                                                   height: '25px',
                                                                   width: '25px',
                                                                   borderRadius: '50%',
                                                                   display: 'inline-block',
                                                                   border: '1px solid #BADA55',
                                                                   backgroundColor: 'lavender',
                                                                   cursor: "pointer"
                                                               }}
                                                                     onClick={() => this.changeImageBySize(p, s)}>{s.label}</span>
                                                            </span>
                                                            </>
                                                        })}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Button type="primary" style={{marginTop: 20}}>Add to Cart</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </>
                })}
            </Row>

        </div>
    }
}
