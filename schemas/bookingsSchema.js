const Joi = require('joi');

const id = Joi.number().integer();
const date = Joi.date().timestamp();
const cost = Joi.number().integer();
const minutes = Joi.number().integer();
const depositCheck = Joi.boolean();
const done = Joi.boolean();
const customerId = Joi.number().integer();
const specialistId = Joi.number().integer();
const orderId = Joi.number().integer();

// const depositId = Joi.number().integer();
// const paymentId = Joi.number().integer();
// const serviceId = Joi.number().integer();
// const promoId = Joi.number().integer();
// const bookingId = Joi.number().integer();

const createBookingSchema = Joi.object({
  date: date.required(),
  cost: cost.required(),  //*
  minutes: minutes.required(),  //*
  depositCheck: depositCheck.required(),
  done: done.required(),
  customerId: customerId.required(),
  specialistId: specialistId.required(),
  orderId: orderId.required(),
  // depositId: depositId.required(),
  // paymentId: paymentId.required(),
});

// const addServiceSchema = Joi.object({
//   bookingId: bookingId.required(),
//   serviceId: serviceId.required(),
// });

// const addPromoSchema = Joi.object({
//   bookingId: bookingId.required(),
//   promoId: promoId.required(),
// });

const updateBookingSchema = Joi.object({
  date: date, //*
  depositCheck: depositCheck,
  done: done,
  specialistId: specialistId, //*
});

const findOneBookingSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createBookingSchema,
  updateBookingSchema,
  findOneBookingSchema,
  // addServiceSchema,
  // addPromoSchema,
};
