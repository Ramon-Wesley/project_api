import { Router } from "express";
import customerRouterApp from "./customer/Customer.index";
import employeeRouterApp from "./employee/Employee.index";
import supplierRouterApp from "./supplier/Supplier.index";
import categoryRouterApp from "./category/Category.index";
import productRouterApp from "./product/Product.index";

export const router: Router[] =  [
    customerRouterApp,
    employeeRouterApp,
    supplierRouterApp,
    categoryRouterApp,
    productRouterApp
];;