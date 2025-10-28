export const BASE_URL = 'http://localhost:3000/api';
// export const BASE_URL = 'https://azold.com/api';
export const DELIVERY_INSIDE_DHAKA = 80;
export const DELIVERY_OUTSIDE_DHAKA = 120;
export const AuthenticationUrls = {
  LOGIN: BASE_URL + '/auth/login',
  SIGN_OUT: BASE_URL + '/auth/signout',
  ADD_USER: BASE_URL + '/auth/adduser',
  GET_ALL_USER: BASE_URL + '/auth/getalluser',
  CHECK_EXISTING_USER: BASE_URL + '/auth/checkexistinguser',
  CHECK_IS_LOGGEDIN: BASE_URL + '/auth/islogedin',
};

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
  UPLOAD_PRODUCT_IMAGE: BASE_URL + '/product/upload',
};
export const TransactionUrls = {
  DO_PAYMENT_TRANSACTION : BASE_URL + "/transaction/dotransaction",
  ADD_TNX_REASON : BASE_URL + "/transaction/addreason",
  DELETE_TNX_REASON : BASE_URL + "/transaction/deletereason",
  FETCH_TRANSACTION_REASONS : BASE_URL + "/transaction/fetchtransactionreason",
  DO_EXPENSE_TRANSACTION : BASE_URL + "/transaction/doexpense",
  DO_DEPOSIT_TRANSACTION : BASE_URL + "/transaction/doexpense",
  DO_SALARY_TRANSACTION : BASE_URL + "/transaction/paysalary",
  DO_LOAN_INSTALLMENT_TRANSACTION : BASE_URL + "/transaction/payinstallment",
}
export const OrderUrls = {
  placeOrder: BASE_URL + '/sale/placeorder',
  updateStatus: BASE_URL + '/sale/update-status',
  getAllSaleOrder: BASE_URL + '/sale/get-all-orders'
};
export const InventoryUrls = {
  addStock: BASE_URL + '/stock/add',
  updateStock: BASE_URL + '/stock/update',
  getAllSupplyOrder: BASE_URL + '/stock/get-all-orders'
};

export const AccountUrls = {
  getGlSumamry: BASE_URL + '/account/getglsummary'
};

export const ReportUrls = {
  getTransactionReport: BASE_URL + '/report/get-transaction-report',
  getTrialBalanceReport: BASE_URL + '/report/get-account-balance',
  getIncomeExpenseReport: BASE_URL + '/report/get-income-expense-report',
};
