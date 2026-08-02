import express from "express";
import dotenv from "dotenv";
import { initDatabase } from "./database/initDatabase";

import cors from "cors";

import customerRoutes from "./modules/customer/routes";
import carRoutes from "./modules/car/routes";
import partRoutes from "./modules/part/routes";
import serviceRoutes from "./modules/service/routes";
import quotationRoutes from "./modules/quotation/routes";
import quotationLineRoutes from "./modules/quotationLine/routes";
import employeeRoutes from "./modules/employee/routes";
import invoiceRoutes from "./modules/invoice/routes";
import { errorHandler } from "./common/middleware/errorHandler";
import companyRoutes from "./common/company/routes";






dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  await initDatabase();


app.use("/api/customers", customerRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/parts", partRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/quotation-lines", quotationLineRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/company", companyRoutes);


app.use(errorHandler)


  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

startServer();