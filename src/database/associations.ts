import Customer from "../modules/customer/model";
import Car from "../modules/car/model";

Customer.hasMany(Car, {
    foreignKey: "customerId",
    as: "cars",
});

Car.belongsTo(Customer, {
    foreignKey: "customerId",
    as: "customer",
});