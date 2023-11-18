const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const SpecialistsService = require('./specialistsServices');
const CustomersService = require('./customersServices');

const specialistsService = new SpecialistsService();
const customersService = new CustomersService();
class BookingsService {
  constructor() { }

  async create(data) {
    console.log(data.customerId);
    await customersService.checkOne(data.customerId);
    await specialistsService.findOne(data.specialistId);
    const booking = await models.Booking.create(data, {
      include: ['order'],
    });
    await this.updateTotals(booking.id);
    return booking;
  }

  async find() {
    const bookings = await models.Booking.findAll({
      // include: ['customer'],
    });
    return bookings;
  }

  async findOne(id) {
    const booking = await models.Booking.findByPk(id, {
      include: [
        'order',
        'customer',
        'specialist',
        'services',
        {
          association: 'promos',
          include: ['services'],
        },
      ],
    });
    if (!booking) {
      throw boom.notFound('Booking not found');
    }
    return booking;
  }

  async addService(data) {
    await this.serviceRepeated(data.bookingId,data.serviceId);
    const bookingService = await models.BookingService.create(data);
    await this.updateTotals(data.bookingId);
    return bookingService;
  }

  async addPromo(data) {
    await this.promoRepeated(data.bookingId,data.promoId);
    const bookingPromo = await models.BookingPromo.create(data);
    await this.updateTotals(data.bookingId);
    return bookingPromo;
  }

  async update(id, changes) {
    changes.specialistId ? await specialistsService.findOne(changes.specialistId) : false;
    const booking = await this.findOne(id);
    await booking.update(changes);
    await this.updateTotals(booking.id);
    return {
      message: 'Booking successfully updated',
      id: booking.id,
      ...changes,
    };
  }

  async delete(id) {
    const booking = await this.findOne(id);
    await booking.destroy();
    return {
      message: 'Booking successfully deleted',
      id: id,
    };
  }

  async removeService(id) {
    const bookingService = await models.BookingService.findByPk(id);
    if (!bookingService) {
      throw boom.notFound('Service not found');
    }
    const bookingId = bookingService.bookingId
    await bookingService.destroy();
    await this.updateTotals(bookingId);
    return {
      message: 'Service successfully removed',
      id: id,
    };
  }

  async removePromo(id) {
    const bookingPromo = await models.BookingPromo.findByPk(id);
    if (!bookingPromo) {
      throw boom.notFound('Promo not found');
    }
    const bookingId = bookingPromo.bookingId
    await bookingPromo.destroy();
    await this.updateTotals(bookingId);
    return {
      message: 'Promo successfully removed',
      id: id,
    };
  }

  async updateTotals(id) {
    const booking = await this.findOne(id);
    const servicesPrices = booking.services.flatMap((service) => service.dataValues.price);
    const promosPrices = booking.promos.flatMap((promo) => promo.services.flatMap((service) => service.dataValues.price));
    const totalPrice = promosPrices.concat(servicesPrices).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const servicesTime = booking.services.flatMap((service) => service.dataValues.minutes);
    const promosTime = booking.promos.flatMap((promo) => promo.services.flatMap((service) => service.dataValues.minutes));
    const totalTime = promosTime.concat(servicesTime).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totals = { cost: totalPrice, minutes: totalTime };
    await booking.update(totals);
  }

  async serviceRepeated(bookingId, serviceId) {
    const booking = await this.findOne(bookingId);
    booking.services.map((service) => {
      if (service.dataValues.id === serviceId) {
        throw boom.conflict('Service is repeated');
      }
    }
    );
  }

  async promoRepeated(bookingId, promoId) {
    const booking = await this.findOne(bookingId);
    booking.promos.map((promo) => {
      if (promo.dataValues.id === promoId) {
        throw boom.conflict('Promotion is repeated');
      }
    }
    );
  }
}

module.exports = BookingsService;
