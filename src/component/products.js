import React from 'react';
import _ from "lodash";
import ProductGrid from "./productGrid";
import apiRoutes from "../utils/rest/apiRoutes";
import {withRouter} from "react-router";
import FilterProduct from '../component/filterProduct'
import { FilterOutlined  } from '@ant-design/icons';
import { Tooltip,Badge } from 'antd';
class Products extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            allProducts:[],
            categoryProducts:[],
            filters:[],
            id:'',
            visible:false,
            filterApplied:false
        }
    }
    componentDidMount() {
        // get id form params
        let id = new URLSearchParams(this.props.location.search).get("id");
        if(id){
            this.getProducts(id);
        }

    }

  componentDidUpdate(previousProps, previousState) {
        let id = new URLSearchParams(this.props.location.search).get("id");
        // get id form params
        if (this.state.id !== id) {
            this.getProducts(id);
        }
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };


    async getProducts(id) {
        let categoryProducts=[];
        let allProducts=[];
        let products = await apiRoutes.getProductsByCategory(id);
        _.each(products.items, function (item) {
            _.each(item.custom_attributes, function (attr) {
                let attribute = {};
                attribute[attr.attribute_code] = attr.value;
                _.extend(item, attribute);
            });
            delete item.custom_attributes;
        });
        products = _.chain(products.items)
            .map(function (item) {
                item.keyToGroup = item.sku.split("-")[0];
                let data = _.find(products.items, {sku: item.keyToGroup});
                if (data) {
                    return item;
                } else {
                    item.keyToGroup = item.sku;
                    return item;
                }
            })
            .groupBy('keyToGroup')
            .map(function (value, key) {
                return {sku: key, items: value};
            })
            .value();
        allProducts = [...products]
        products = allProducts;
        let filters=[];
        let keys = [];
        let attribute_setId = (products[0].items[0].attribute_set_id);
        _.each(products, function (product) {
            if (_.last(product.items).price === 0) {
                _.last(product.items).price = (product.items[0].price);
            }
            _.each(product.items, function (item) {
                keys = _.union(keys, _.keys(item));
            });
        });
        let filtersAttributes=await apiRoutes.getProductsAttributes(attribute_setId);
        let matchedFilters = _.filter(filtersAttributes, function (filtersAttribute) {
            return _.includes(["color", "size"], filtersAttribute.attribute_code) || filtersAttribute.frontend_input === "multiselect";
        });
        let filtersByAttributeId = [];
        let currentFilters = [];
        _.each(matchedFilters, function (matchedFilter) {
            if (_.includes(keys, matchedFilter.attribute_code)) {
                let currentFilter = {
                    'name': matchedFilter.attribute_code.split("_")[0],
                    'code': matchedFilter.attribute_code,
                    values: []
                };
                _.each(products, (product) => {
                    _.each(product.items, function (item) {
                        if (item[matchedFilter.attribute_code]) {
                            currentFilter.values = _.union(currentFilter.values, item[matchedFilter.attribute_code].split(','));
                        }
                    });
                });
                currentFilters.push(currentFilter);
                matchedFilter.options = _.uniq(matchedFilter.options, function (option) {
                    return option;
                });
                matchedFilter.attribute_name = matchedFilter.attribute_code;
                matchedFilter.attribute_code = matchedFilter.attribute_code.split("_")[0];
                filtersByAttributeId.push(matchedFilter);
            }
        });

        _.each(currentFilters, function (fil) {
            let filter = {'name': fil.name, 'code': fil.code, filterValues: []};
            let data = _.find(filtersByAttributeId, {'attribute_code': fil.name}).options;
            _.each(fil.values, function (value) {
                let matchedData = _.find(data, {'value': value});
                if (matchedData) {
                    filter.filterValues.push(matchedData);
                }
            });
            filters.push(filter);
        });
        let colorValues = _.find(filters, {'name': 'color'});
        if (colorValues) {
            colorValues = colorValues.filterValues;
        }
        let sizeValues = _.find(filters, {'name': 'size'});
        if (sizeValues) {
            sizeValues = sizeValues.filterValues;
        }
        _.each(products, function (product) {
            let colors = [];
            let sizes = [];
            _.each(product.items, function (item) {
                if (item.color) {
                    let color = _.find(colorValues, {'value': item.color});
                    if (color) {
                        colors.push(color);
                    }
                }
                if (item.size) {
                    let size = _.find(sizeValues, {'value': item.size});
                    if (size) {
                        sizes.push(size);
                    }
                }
            });
            let mainProduct=_.find(product.items,(item)=>{
                return item.sku === product.sku
            });
            if (mainProduct) {
                mainProduct.colors = _.uniq(colors);
                mainProduct.sizes = _.uniq(sizes);
                categoryProducts.push(mainProduct);
            }

        });
        allProducts = [...products]
        this.setState({categoryProducts,allProducts,id,filters,filterApplied:false});
    }

    filterProducts=(filterType,filter) =>{
        let filterItems = [];
        _.each(this.state.allProducts, function (product) {
            let defaultItem = "";
            _.each(product.items, function (item) {
                if (defaultItem) {
                    return;
                }
                if (_.has(item, filterType) && item[filterType].indexOf(filter.value) !== -1) {
                    defaultItem = _.find(product.items, {'sku': product.sku});
                    if (defaultItem) {
                        filterItems.push(defaultItem);
                    } else {
                        filterItems.push(item);
                    }
                }
            });
        });
        this.setState({categoryProducts:filterItems,visible:false,filterApplied:true});
    }
    resetFilters=() =>{
        let filterItems = [];
        _.each(this.state.allProducts, function (product) {
            let defaultItem = "";
            _.each(product.items, function (item) {
                if (defaultItem) {
                    return;
                }
                defaultItem = _.find(product.items, {'sku': product.sku});
                    if (defaultItem) {
                        filterItems.push(defaultItem);
                    } else {
                        filterItems.push(item);
                    }

            });
        });
        this.setState({categoryProducts:filterItems,visible:false,filterApplied:false});
    }

    updateSelected = (categoryProducts) => {
        this.setState({categoryProducts});
    }
    render() {
        return <div>

            <FilterProduct visible={this.state.visible} filters={this.state.filters} onClose={this.onClose} filterProducts={this.filterProducts}  filterApplied={this.state.filterApplied} resetFilters={this.resetFilters}/>
            <ProductGrid products={this.state.categoryProducts} allProducts={this.state.allProducts}
                         updateSelected={this.updateSelected} categoryId={this.state.id}/>


            {this.state.categoryProducts.length>0 && !this.state.visible && <div className="fixed-widgets" onClick={() => this.showDrawer()}>
                <Tooltip title="Filter">
                    <Badge dot={this.state.filterApplied}>
                        <span
                            className="ant-avatar ant-avatar-circle ant-avatar-icon ant-dropdown-trigger fixed-widgets-avatar"
                            style={{width: 60, height: 60}}

                        >
                        <span style={{color: "white", marginTop: 3, fontSize: 22}}>
                            <FilterOutlined/>
                        </span>
                    </span>
                    </Badge>

                </Tooltip>
            </div>}

        </div>
    }
}
export  default withRouter(Products)
