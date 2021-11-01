import React from 'react';
import categoryContext from "../categoryContext";
import apiRoutes from "../utils/rest/apiRoutes";
import { Breadcrumb } from 'antd';
import _ from 'lodash';
import {withRouter} from "react-router";



class BreadCrumb extends React.Component{
    static contextType =categoryContext;
    constructor(props) {
        super(props);
        this.state={
            breadCrumbArray:[]
        }
    }
    async componentDidMount() {
        let paths = await apiRoutes.getCategoryProductsPath(this.props.categoryId);
        this.pathResolve(paths);
    }
    async componentDidUpdate(prevProps) {
        if(prevProps.categoryId !== this.props.categoryId)
        {
            let paths = await apiRoutes.getCategoryProductsPath(this.props.categoryId);
            this.pathResolve(paths);
        }
    }

    pathResolve(paths){
        let pathIds = paths.path.split('/').splice(2);
        const breadCrumbArray=[{label:'Home',url:'/shoppingCart/dashboard'}];
        this.setState({breadCrumbArray:this.subCategory(pathIds,this.context,breadCrumbArray)})
    }
    subCategory(pathIds,contextCategory,breadCrumbArray){

        _.map(pathIds,(path,i)=>{
            let pathCategory =_.find(contextCategory,(category)=>{
                return category.id === Number(path);
            });
            if(pathCategory && pathCategory.children_data.length>0){
                let bread = {label: pathCategory.name};
                breadCrumbArray.push(bread);
                let ids =pathIds.slice(1)
                this.subCategory(ids,pathCategory.children_data,breadCrumbArray);

            }
            else if(pathCategory){
                let bread = {label: pathCategory.name};
                if(pathIds.length===i){
                    bread.url=`/shoppingCart/category/products?id=${pathCategory.id}`;
                }
                breadCrumbArray.push(bread);
            }
        })
        return breadCrumbArray;
    }
    // pathResolve(paths){
    //     let pathIds = paths.path.split('/');
    //     let breadCrumbArray = [{label:'Home',url:'/shoppingCart/dashboard'}];
    //     _.map(pathIds,(path,i)=>{
    //         let pathCategory =_.find(this.context,(category)=>{
    //             return !_.includes(["1","2"],path) && category.id === Number(path);
    //         });
    //         if(pathCategory && pathCategory.children_data.length>0){
    //             let bread = {label: pathCategory.name};
    //             breadCrumbArray.push(bread);
    //             let pathSubCategory =_.find(pathCategory.children_data,(s)=>{
    //                 return  s.id === Number(pathIds[i+1]);
    //             });
    //
    //             if(pathSubCategory){
    //                 let subBread = {label: pathSubCategory.name};
    //                 subBread.url=`/shoppingCart/category/products?id=${pathSubCategory.id}`;
    //                 breadCrumbArray.push(subBread);
    //             }
    //
    //         }
    //         else if(pathCategory){
    //             let bread = {label: pathCategory.name};
    //             if(pathIds.length===i){
    //                 bread.url=`/shoppingCart/category/products?id=${pathCategory.id}`;
    //             }
    //             breadCrumbArray.push(bread);
    //         }
    //
    //     })
    //     this.setState({breadCrumbArray})
    // }
    navigateToURL(url){
        if(url){
            this.props.history.push(url);
        }
    }
    render() {
        return<>
            <div className="bread-crumb-div">
                <Breadcrumb separator=">">
                    {this.state.breadCrumbArray.map((b,i)=>{
                        return <Breadcrumb.Item className={"bread-crumb-navigate"} onClick={()=>this.navigateToURL(b.url)}>{b.label}</Breadcrumb.Item>
                    })}
                </Breadcrumb>
            </div>
        </>
    }
}
export default withRouter(BreadCrumb)
