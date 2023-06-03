import express from "express";
import { getAllUsers, getToken, loginUser, sendResetLink, verifyResetLink, resetPassword } from "../Controller/users/users-controller.js";
import auth from "../Middleware/auth.js";
import path from "path";
import { getAllOrders, getOrderDetails } from "../Controller/orders/orders-controller.js";
import { addOrder } from "../Controller/orders/add-order.js";
import { updateOrder } from "../Controller/orders/update-order.js";
import { updateUser } from "../Controller/users/users-manipulation.js";
import { approveOrder, approveOrderFromDashboard } from "../Controller/orders/approve-order.js";
import { getAllOrdersForUser } from "../Controller/orders/getAllOrders.js";
import { getOrderCountsForUser } from "../Controller/orders/counters/order-counts.js";
import { getOrderCountsForAdmin } from "../Controller/orders/counters/admin-order-counts.js";
import { getOrderCountsForSuper } from "../Controller/orders/counters/super-order-counts.js";
import { getOrderCountsForMaster } from "../Controller/orders/counters/master-order-counts.js";
import { getPoRecipt } from "../Controller/orders/releasePo.js";
import { generateInvoiceRecipt } from "../Controller/orders/generate-Invoice.js";
import { completeOrder } from "../Controller/orders/complete-order.js";
import { getInvoices } from "../Controller/Invoice/get-invoices.js";
import { countInvoices } from "../Controller/Invoice/count-invoices.js";
import { createAccounts } from "../Controller/accounts/createAccounts.js";
import { getAllAccounts } from "../Controller/accounts/getAllAccoutns.js";
import { updateAccount } from "../Controller/accounts/updateAccounts.js";
import { getAccountCounts } from "../Controller/accounts/countAccounts.js";
import { getAllVendors } from "../Controller/vendors/getAllVendors.js";
import { getVendorCounts } from "../Controller/vendors/countVendors.js";
import { blockAccounts } from "../Controller/accounts/blockAccounts.js";
import { getAllAssociates } from "../Controller/associates/getAllAssociates.js";
import { countAssociates } from "../Controller/associates/countAssociates.js";
import { checkUsername } from "../Controller/validations/checkUsername.js";
import { getOrderCountsForAssociate } from "../Controller/orders/counters/associate-order-coutns.js";
import { cancelOrder } from "../Controller/orders/cancel-order.js";
import { addProduct } from "../Controller/products/add-products.js";
import { getAllProducts } from "../Controller/products/get-all-products.js";
import { searchProducts } from "../operations/DataConvert/Products/searchProducts.js";
import { getDashboardCounts } from "../Controller/dashboard/getDashboardCounts.js";
import { getSales } from "../Controller/dashboard/getSales.js";
import { getOrdersAnalytics } from "../Controller/dashboard/getOrdersAnalytics.js";
import { getProductOptions } from "../Controller/PurchaseOrder/getProductOptions.js";
import { getOrderSummary } from "../Controller/orders/getOrderSummary.js";
import { getProductsCounts } from "../Controller/products/get-products-counts.js";
import { editProductData } from "../Controller/products/editProductData.js";
import { addOptions } from "../Controller/products/add-options.js";


const __dirname = path.resolve();

const Router = express.Router();

Router.get("/", (req, res) => { res.sendFile(path.join(__dirname, "build", "index.html")) })
// Router.post("/",[auth],getAllUsers);
Router.get("/my-token", getToken);

// login api
Router.post("/login", loginUser)


// forgot-password
Router.post("/forgot-password", sendResetLink);
Router.get("/forgot-password/:id/:token", verifyResetLink);
Router.put("/reset-password", [auth], resetPassword)

// Users API

// updateOrderAPI

Router.put("/updateUser", [auth], updateUser)

// orders API

// Get All Orders
Router.get("/orders", [auth], getAllOrders);

// Get Unique Order Details
Router.get("/orders/:id", [auth], getOrderDetails);

// Create A Order
Router.post("/orders", [auth], addOrder);

// Update A Order
Router.put("/order/:id", [auth], updateOrder);

// Add Order
Router.post("/u/add-order", [auth], addOrder);

// Get All Order
Router.post("/:user/getAllOrders/p/:page", [auth], getAllOrdersForUser);

Router.post("/stringJson", (req, res) => {
    console.log(JSON.stringify(req.body))
    res.send(JSON.stringify(req.body));
})

Router.get("/approve-order/:id/:orderId/:token", approveOrder);

//Order Summary
Router.post("/getOrderSummary/", [auth], getOrderSummary);

Router.get("/approved-order/:adminId/:orderId", [auth], approveOrderFromDashboard);

// order counters api
Router.post("/u/getOrderCounts", [auth], getOrderCountsForUser);
Router.post("/a/getOrderCounts", [auth], getOrderCountsForAdmin);
Router.post("/s/getOrderCounts", [auth], getOrderCountsForSuper);
Router.post("/m/getOrderCounts", [auth], getOrderCountsForMaster);
Router.post("/t/getOrderCounts", [auth], getOrderCountsForAssociate);

Router.post("/po-recipt", [auth], getPoRecipt);
Router.post("/gen-invoice", [auth], generateInvoiceRecipt);

Router.post("/complete-order", [auth], completeOrder);

Router.put("/cancelOrder/:orderId/by/:user", [auth], cancelOrder);

// billings API
Router.get("/get-invoices/:userId/p/:page", [auth], getInvoices);

// invoices counter
Router.get("/invoices/counts/:userId", [auth], countInvoices);

// Accounts
Router.post("/:user/create-account", [auth], createAccounts)

// Check Username
Router.post("/check-username/:name", [auth], checkUsername);

// Account List
Router.get("/:userType/:userId/p/:page", [auth], getAllAccounts);

// Account Update
Router.put("/:userType/update-account", [auth], updateAccount);

// Account Count
Router.get("/getAccountCounts/:userType/:userId", [auth], getAccountCounts);

// Block Account
Router.put("/block-account", [auth], blockAccounts);

// Vendors 
Router.get("/:userType/:userId/vendors", [auth], getAllVendors);

Router.get("/getVendorsCounts/:userType/:userId", [auth], getVendorCounts);

// Assocates
Router.get("/:userType/:userId/associates", [auth], getAllAssociates);

// count Associate
Router.get("/count-associates", [auth], countAssociates);

Router.post("/checkUsername/:word", checkUsername);


// Products
Router.post("/:user/add-product", [auth], addProduct);

Router.get("/getAllProducts/:userType/:userId/p/:page", [auth], getAllProducts);

Router.get("/search-product/:para/:val", [auth], searchProducts);

// Edit Products
Router.put("/editProductData", [auth], editProductData);

// Add Categories & Brands
Router.put("/addOptions", [auth],addOptions);

// Dashboard
Router.get("/getDashboardCounts/:id", [auth], getDashboardCounts);

// Sales Amount
Router.get("/getSales/:id", [auth], getSales);

// Orders Amount
Router.get("/getOrdersAnalytics/:id", [auth], getOrdersAnalytics);

// Popular Clients
Router.get(`/getPopularClients/:id`, [auth], editProductData);

Router.get(`/getProductOptions`, [auth], getProductOptions);

Router.get(`/getProductsCounts/:id`, [auth], getProductsCounts);

export default Router;