import './App.css';
import AppRouter from "./router/router";
import React from "react";
import "antd/dist/antd.css";
import apiRoutes from "./utils/rest/apiRoutes";
import {CategoryContextProvider} from "./categoryContext"

class App extends React.Component{
    constructor() {
        super();
        this.state = {
            categories: []
        }
    }
    componentDidMount() {
        this.loadCategories();
    }

    async loadCategories() {
        let categories = await apiRoutes.getCategories();
        this.setState({categories: categories.children_data});
        console.log(categories);
    }
    render() {
    return (
        <div id="content">
            {this.state.categories.length>0 &&<CategoryContextProvider value={this.state.categories} >
        <div className="App">
            <AppRouter/>
        </div>
    </CategoryContextProvider>}
        </div>
  );
    }
}

export default App;
