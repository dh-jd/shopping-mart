import {get, post, put, remove} from "./index";

const baseUri = "/magento2/rest/V1";

export default {
    getCategories: (params) => {
        return get(`${baseUri}/categories`, params)
    },
    getHomeProducts: (params) => {
        return get(`${baseUri}/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=38&searchCriteria[filter_groups][0][filters][0][condition_type]=in&&fields=items[name,sku,price,attribute_set_id,custom_attributes]`, params)
    },
    getProductsByCategory: (id,params) => {
        return get(`${baseUri}/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${id}&searchCriteria[filter_groups][0][filters][0][condition_type]=in&&fields=items[name,sku,price,attribute_set_id,custom_attributes]`, params)
    } ,
    getProductsAttributes: (id,params) => {
        return get(`${baseUri}/products/attribute-sets/${id}/attributes`, params)
    },
    getCategoryProductsPath: (categoryId,params) => {
        return get(`${baseUri}/categories/${categoryId}?fields=path,name`, params)
    }
}
