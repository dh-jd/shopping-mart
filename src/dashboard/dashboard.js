import React from 'react';
import {Carousel, Row, Col, Card, Layout,Button} from 'antd';
import apiRoutes from "../utils/rest/apiRoutes";
import {withRouter} from "react-router";
import _ from 'lodash';
import ProductGrid from "../component/productGrid"

const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#575d6c',
};
const imageURL = "http://localhost/magento2/pub/media";
class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.getProducts();
    }

    async getProducts() {
        let products = await apiRoutes.getHomeProducts();
        products = _.map(products.items, function (homePageProduct) {
            let image = _.find(homePageProduct.custom_attributes, {attribute_code: "small_image"});
            if (image) {
                homePageProduct.image = image.value;
            }
            return homePageProduct;
        });
        this.setState({products});
        console.log(products);
    }

    render() {
        return (
            <Layout>
                <Carousel autoplay effect="fade" >
                    <div style={contentStyle}>
                        <img style={{height: "500px", width: "100%", cursor: 'pointer'}}
                             src={`${imageURL}/wysiwyg/home/home-main.jpg`} alt=""/>
                        <span className="content bg-white">
                           <span className="info">New Luma Yoga Collection</span>
                           <span><strong className="title">Get fit and look fab in new seasonal styles </strong></span>
                           <span className="label label-primary">Shop New Yoga</span>
                        </span>
                    </div>
                    <div style={contentStyle}>
                        <Row>
                            <Col span={18}>
                                <img style={{height: "500px", width: "100%", cursor: 'pointer'}}
                                     src={`${imageURL}/wysiwyg/home/home-t-shirts.png`} alt=""/>
                                <span className="content bg-transparent">
                                    <strong className="title">Even more ways to mix and match</strong>
                                    <span className="info">Buy 3 Luma tees get a 4th free</span>
                                    <span className="label label-primary">Shop Tees</span>
                                </span>
                            </Col>
                            <Col span={6}>
                                <img style={{height: "500px", width: "100%", cursor: 'pointer'}}
                                     src={`${imageURL}/wysiwyg/home/home-pants.jpg`} alt=""/>
                                <span className="content bg-transparent">
                                    <strong className="title">20% OFF</strong>
                                    <span className="info">Luma pants when you shop today*</span>
                                    <span className="label label-primary">Shop Pants</span>
                                </span>
                            </Col>
                        </Row>
                    </div>
                    <div style={contentStyle}>
                        <Row>
                            <Col span={12} style={{backgroundColor: "antiquewhite"}}>
                                <img className="home-erin-image-square"
                                     style={{height: "250px", width: "250px", cursor: 'pointer'}}
                                     src="http://localhost/magento2/pub/media/wysiwyg/home/home-erin.jpg" alt=""/>
                                <span className="content bg-transparent-square">
                                       <strong className="title">Take it from Erin</strong>
                                       <span className="info">Luma founder Erin Renny shares her favorites!</span>
                                       <span className="label label-primary">Shop Erin Recommends</span>
                                    </span>
                            </Col>
                            <Col span={12} style={{backgroundColor: "#51cbce"}}>
                                <img className="home-erin-image-vRectangle"
                                     style={{height: "250px", width: "200px", cursor: 'pointer'}}
                                     src={`${imageURL}/wysiwyg/home/home-performance.jpg`} alt=""/>
                                <span className="content bg-transparent-square">
                                       <strong className="title">Science meets performance</strong>
                                       <span className="info">Wicking to raingear, Luma covers&nbsp;you</span>
                                       <span className="label label-primary">Shop Performance</span>
                                    </span>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={12}>
                                        <img className="home-erin-image-Rectangle"
                                             style={{height: "250px", cursor: 'pointer'}}
                                             src={`${imageURL}/wysiwyg/home/home-eco.jpg`} alt=""/>
                                    </Col>
                                    <Col span={12}>
                                           <span className="content bg-transparent-Rectangle" style={{height: "250px", cursor: 'pointer'}}>
                                            <strong className="title">Twice around, twice as nice</strong>
                                            <span className="info">Find conscientious, comfy clothing in our eco-friendly collection</span>
                                            <span className="label label-primary">Shop Eco-Friendly</span>
                                        </span>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    </div>
                </Carousel>
                <div className="content-heading">
                    <h2 className="title">Hot Sellers</h2>
                    <p className="info">Here is what`s trending on Luma right now</p>
                </div>
               <ProductGrid products={this.state.products}/>
            </Layout>
        )
    }
}

export  default withRouter(Dashboard)
