import SalesOrderCreateInDto from "../../../../../../use-case/checkout/salesOrder/create/SalesOrderCreateInDto";
import { MessagesQueue } from "../../../../../queue/@shared/MessagesQueue";

export interface SalesOrderRouterCreateInDto extends MessagesQueue,SalesOrderCreateInDto{}