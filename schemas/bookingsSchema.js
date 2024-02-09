const Joi = require('joi');

const id = Joi.number().integer();
const date = Joi.date();
const cost = Joi.number().integer();
const minutes = Joi.number().integer();
const depositCheck = Joi.boolean();
const done = Joi.boolean();
const notes = Joi.string().allow(null, '');
const day = Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/);
const customerId = Joi.number().integer();
const specialistId = Joi.number().integer();
const userId = Joi.number().integer();
// const paymentId = Joi.number().integer();
const serviceId = Joi.number().integer();
const promoId = Joi.number().integer();
const bookingId = Joi.number().integer();

const createBookingSchema = Joi.object({
  date: date.required(),
  cost: cost.required(),  //*
  minutes: minutes.required(),  //*
  depositCheck: depositCheck.required(),
  done: done.required(),
  customerId: customerId.required(),
  specialistId: specialistId.required(),
  order: Joi.object({
    userId: userId.required(),
  })
  // paymentId: paymentId.required(),
});

const addServiceSchema = Joi.object({
  bookingId: bookingId.required(),
  serviceId: serviceId.required(),
});

const addPromoSchema = Joi.object({
  bookingId: bookingId.required(),
  promoId: promoId.required(),
});

const updateBookingSchema = Joi.object({
  depositCheck: depositCheck,
  done: done,
  notes: notes,
});

const findOneBookingSchema = Joi.object({
  id: id.required(),
});

const findBookingsByDateSchema = Joi.object({
  date: day.required(),
});

const findBookingsByDateAndSpecialistSchema = Joi.object({
  date: day.required(),
  id: specialistId.required(),
});

const findBookingsOnIntervalSchema = Joi.object({
  start: day.required(),
  end: day.required(),
});

const findBookingsOnIntervalBySpecialistSchema = Joi.object({
  start: day.required(),
  end: day.required(),
  id: specialistId.required(),
});

module.exports = {
  createBookingSchema,
  updateBookingSchema,
  findOneBookingSchema,
  findBookingsByDateSchema,
  findBookingsByDateAndSpecialistSchema,
  findBookingsOnIntervalSchema,
  findBookingsOnIntervalBySpecialistSchema,
  addServiceSchema,
  addPromoSchema,
};

