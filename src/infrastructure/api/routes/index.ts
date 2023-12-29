import { Router } from "express";
import customerRouterApp from "./customer/Customer.index";
import employeeRouterApp from "./employee/Employee.index";

const result: Router[] = [
    customerRouterApp,
    employeeRouterApp
];

export const router: Router[] = result;