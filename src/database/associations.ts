import Customer from "../modules/customer/model";
import Car from "../modules/car/model";
import Inspection from "../modules/inspection/model";

Customer.hasMany(Car, {
    foreignKey: "customerId",
    as: "cars",
});

Car.belongsTo(Customer, {
    foreignKey: "customerId",
    as: "customer",
});
Inspection.belongsTo(Car, {
  foreignKey: "carId",
  as: "car",
});

