const BASE_URL = 'http://localhost:3000/api';
export const ProductUrls = {
  ADD_PRODUCT: BASE_URL + '/product/addproduct',
  DELETE_PRODUCT: BASE_URL + '/product/delete-product',
  FETCH_ALL_PRODUCT: BASE_URL + '/product/getallproduct',
  FETCH_ALL_PACKAGING_CATEGORY: BASE_URL + '/product/getallpackagingcategory',
  FETCH_ALL_PRODUCT_CATEGORY: BASE_URL + '/product/getallproductcategory',
  FETCH_ALL_UNIT_TYPE: BASE_URL + '/product/getallunittype',
  FETCH_ALL_PRODUCT_FOR_DROPDOWN:
    BASE_URL + '/product/getallproductfordropdown',
  FETCH_PRODUCT_BY_ID: BASE_URL + '/product/getproductbyid',
  FETCH_PRODUCT_BY_NAME: BASE_URL + '/product/getproductbyname',
  FETCH_PRODUCT_BY_CODE: BASE_URL + '/product/getproductbycode',
  FETCH_PRODUCT_BRAND_NAME: BASE_URL + '/product/getallbrandname',
  ADD_PRODUCT_CATEGORY: BASE_URL + '/product/addproductcategory',
  ADD_PACKAGING_CATEGORY: BASE_URL + '/product/addpackagingcategory',
  ADD_UNIT_TYPE: BASE_URL + '/product/addunittype',
  ADD_BRAND_NAME: BASE_URL + '/product/addbrandname',
  // Delete
  DELETE_UNIT_TYPE: BASE_URL + '/product/delete-unit-type',
  DELETE_PRODUCT_CATEGORY: BASE_URL + '/product/delete-product-category',
  DELETE_PACKAGING_CATEGORY: BASE_URL + '/product/delete-packaging-category',
  DELETE_BRAND_NAME: BASE_URL + '/product/deletebrandname',
  UPLOAD_PRODUCT_IMAGE: BASE_URL + '/product/upload'
};

export const OrderUrls = {
  placeOrder: BASE_URL + '/order/placeorder',
  updateStatus: BASE_URL + '/order/update-status'
};
export const InventoryUrls = {
  addStock: BASE_URL + '/stock/add',
  updateStock: BASE_URL + '/stock/update'
};