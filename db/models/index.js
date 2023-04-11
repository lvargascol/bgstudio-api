const { BookingSchema, Booking } = require('./bookingModel');
const { CategorySchema, Category } = require('./categoryModel');
const { ConsumableSchema, Consumable } = require('./consumableModel');
const { CustomerSchema, Customer } = require('./customerModel');
const { OrderSchema, Order } = require('./orderModel');
const { PaymentSchema, Payment } = require('./paymentModel');
const { ProductSchema, Product } = require('./productModel');
const { PromoSchema, Promo } = require('./promoModel');
const { ServiceSchema, Service } = require('./serviceModel');
const { SpecialistSchema, Specialist } = require('./specialistModel');
const { StockSchema, Stock } = require('./stockModel');
const { UserSchema, User } = require('./userModel');

const { BookingPromoSchema, BookingPromo } = require('./booking-promoModel');
const { BookingServiceSchema, BookingService } = require('./booking-serviceModel');
const { ConsumableStockSchema, ConsumableStock } = require('./consumable-stockModel');
const { OrderProductSchema, OrderProduct } = require('./order-productModel');
const { ProductStockSchema, ProductStock } = require('./product-stockModel');
const { PromoServiceSchema, PromoService } = require('./promo-serviceModel');
const { SpecialistServiceSchema, SpecialistService } = require('./specialist-serviceModel');


function setupModels(sequelize) {
  Booking.init(BookingSchema, Booking.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Consumable.init(ConsumableSchema, Consumable.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Payment.init(PaymentSchema, Payment.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Promo.init(PromoSchema, Promo.config(sequelize));
  Service.init(ServiceSchema, Service.config(sequelize));
  Specialist.init(SpecialistSchema, Specialist.config(sequelize));
  Stock.init(StockSchema, Stock.config(sequelize));
  User.init(UserSchema, User.config(sequelize));

  BookingPromo.init(BookingPromoSchema, BookingPromo.config(sequelize));
  BookingService.init(BookingServiceSchema, BookingService.config(sequelize));
  ConsumableStock.init(ConsumableStockSchema, ConsumableStock.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
  ProductStock.init(ProductStockSchema, ProductStock.config(sequelize));
  PromoService.init(PromoServiceSchema, PromoService.config(sequelize));
  SpecialistService.init(SpecialistServiceSchema, SpecialistService.config(sequelize));


  Booking.associate(sequelize.models);
  Category.associate(sequelize.models);
  Consumable.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Order.associate(sequelize.models);
  Payment.associate(sequelize.models);
  Product.associate(sequelize.models);
  Promo.associate(sequelize.models);
  Service.associate(sequelize.models);
  Specialist.associate(sequelize.models);
  Stock.associate(sequelize.models);
  User.associate(sequelize.models);
}

module.exports = { setupModels };
