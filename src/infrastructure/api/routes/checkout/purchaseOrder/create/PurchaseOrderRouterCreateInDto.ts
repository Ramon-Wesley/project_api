import purchaseOrderCreateInDto from "../../../../../../use-case/checkout/purchaseOrder/create/PurchaseOrderCreateInDto";
import { MessagesQueue } from "../../../../../queue/@shared/MessagesQueue";

export interface purchaseOrderRouterCreateInDto extends MessagesQueue,purchaseOrderCreateInDto{}