import { Router } from "express";
import customerRouterApp from "./customer/Customer.index";
import employeeRouterApp from "./employee/Employee.index";
import categoryRouterApp from "./checkout/product/category/Category.index";
import productRouterApp from "./checkout/product/Product.index";
import supplierRouterApp from "./supplier/Supplier.index";
import userRouterApp from "./users/UserRouterApp";



export const router: Router[] = [
    customerRouterApp,
    employeeRouterApp,
    categoryRouterApp,
    productRouterApp,
    supplierRouterApp,
    userRouterApp
]