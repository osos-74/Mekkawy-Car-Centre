import Customer from "../modules/customer/model";
import Car from "../modules/car/model";
import Inspection from "../modules/inspection/model";
import User from "../modules/user/model";
import RefreshToken from "../modules/authentication/model/RefreshToken";

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

User.hasMany(RefreshToken, {
    foreignKey: "userId",
    as: "refreshTokens",
});

RefreshToken.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});
