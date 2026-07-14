import express from "express";
import dotenv from "dotenv";
import { initDatabase } from "./database/initDatabase";

import cors from "cors";

import customerRoutes from "./modules/customer/routes";
import carRoutes from "./modules/car/routes";
import partRoutes from "./modules/part/routes";
import serviceRoutes from "./modules/service/routes";



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

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

startServer();