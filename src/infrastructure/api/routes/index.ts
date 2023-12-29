import { Router } from "express";
import customerRouterApp from "./customer/Customer.index";
import employeeRouterApp from "./employee/Employee.index";
import categoryRouterApp from "./checkout/product/category/Category.index";
import productRouterApp from "./checkout/product/Product.index";

const result: Router[] = [
    customerRouterApp,
    employeeRouterApp,
    categoryRouterApp,
    productRouterApp
];

export const router: Router[] = result;