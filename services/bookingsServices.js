const boom = require('@hapi/boom');
const moment = require('moment');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const SpecialistsService = require('./specialistsServices');
const CustomersService = require('./customersServices');

const specialistsService = new SpecialistsService();
const customersService = new CustomersService();
class BookingsService {
  constructor() { }

  async create(data) {
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
      // include: [
      //   'customer',
      //   'specialist',
      //   'services',
      //   {
      //     association: 'promos',
      //     include: ['services'],
      //   },
      // ],
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

  async findByDate(date) {
    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(`${date}T23:59:59.999Z`);
    const booking = await models.Booking.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
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

  async findByDateAndSpecialist(date,specialistId) {
    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(`${date}T23:59:59.999Z`);
    const booking = await models.Booking.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
        specialistId: specialistId,
      },
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

  async findSalesByDate(date) {
    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(`${date}T23:59:59.999Z`);
    const bookings = await models.Booking.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
        done: true,
      },
      include: [
        'services',
        'promos',
      ],
    });
    const sales = this.generateSalesFromBookings(bookings);
    if (!sales) {
      throw boom.notFound('Sales not found');
    }
    return sales;
  }

  async findSalesByDateAndSpecialist(date,specialistId) {
    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(`${date}T23:59:59.999Z`);
    const bookings = await models.Booking.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
        specialistId: specialistId,
        done: true,
      },
      include: [
        'services',
        'promos',
      ],
    });
    const sales = this.generateSalesFromBookings(bookings);
    if (!sales) {
      throw boom.notFound('Sales not found');
    }
    return sales;
  }

  async findTotalSalesOnInterval(start,end) {
    const startDate = new Date(`${start}T00:00:00.000Z`);
    const endDate = new Date(`${end}T23:59:59.999Z`);
    const sales = await models.Booking.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
        done: true,
      },
    });
    const total = sales.reduce((sum,current) => sum + current.cost,0);
    if (!sales) {
      throw boom.notFound('Sales not found');
    }
    const totalSales = {
      total: total,
      count: sales.length,
      average: sales.length === 0 ? 0 : total / sales.length,
    }
    return totalSales;
  }

  async findTotalSalesOnIntervalBySpecialist(start,end,specialistId) {
    const startDate = new Date(`${start}T00:00:00.000Z`);
    const endDate = new Date(`${end}T23:59:59.999Z`);
    const sales = await models.Booking.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
        specialistId: specialistId,
        done: true,
      },
    });
    const total = sales.reduce((sum,current) => sum + current.cost,0);
    if (!sales) {
      throw boom.notFound('Sales not found');
    }
    const totalSales = {
      total: total,
      count: sales.length,
      average: sales.length === 0 ? 0 : total / sales.length,
    }
    return totalSales;
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

  async scheduleAvailability(date, id) {
    const hoursArray = this.generateHoursArray(date, 15);
    const bookings = await this.findByDateAndSpecialist(moment(date).format('YYYY-MM-DD'), id);
    bookings.forEach((booking) => {
      let r = 0;
      hoursArray.forEach((block) => {
        if (moment(booking.date).format('HH:mm') === block.time) {
          if (booking.minutes < block.min) {
            block.min = block.min - booking.minutes;
          } else {
            r = booking.minutes - block.min;
            block.min = 0;
          }
        }
        else if (r != 0) {
          if (block.min >= r) {
            block.min = block.min - r;
            r = 0;
          } else {
            r = r - block.min;
            block.min = 0;
          }
        }
      });
    });
    return hoursArray;
  };

  generateHoursArray(date, step) {
    const start = [];
    const end = [];
    for (let i = 0; i <= 6; i++) {
      if (i === 0) {
        start.push('10:00');
        end.push('10:00');
      } else if (i === 6) {
        start.push('10:00');
        end.push('17:00');
      } else {
        start.push('10:00');
        end.push('20:00');
      }
    }
    const day = moment(date).format('YYYY-MM-DD');
    const initial = Date.parse(`${day}T${start[moment(date).format('d')]}`);
    const final = Date.parse(`${day}T${end[moment(date).format('d')]}`);
    const msPerMin = 60000;
    const n = Math.trunc((final - initial) / (step * msPerMin));
    const hoursArray = [];
    if (n < 0) {
      return hoursArray;
    }
    for (let i = 0; i < n; i++) {
      hoursArray.push({
        time: moment(initial).add(step * i, 'minutes').format('HH:mm'),
        min: step,
      });
    }
    return hoursArray;
  }  

  generateSalesFromBookings(bookings) {
    bookings.forEach((booking) => {
      delete booking.dataValues.notes;
      delete booking.dataValues.createdAt;
      delete booking.dataValues.minutes;
      delete booking.dataValues.done;
      delete booking.dataValues.customerId;
      booking.services.forEach((service) => {
        delete service.dataValues.createdAt;
        delete service.dataValues.price;
        delete service.dataValues.minutes;
        delete service.dataValues.description;
        delete service.dataValues.active;
        delete service.dataValues.categoryId;
        delete service.dataValues.BookingService;
        delete service.dataValues.image;
      })
      booking.promos.forEach((promo) => {
        delete promo.dataValues.createdAt;
        delete promo.dataValues.price;
        delete promo.dataValues.minutes;
        delete promo.dataValues.description;
        delete promo.dataValues.active;
        delete promo.dataValues.BookingPromo;
        delete promo.dataValues.image;
      })
    })
    return bookings;
  }

  async checkDeposit(bookingId, paymentsTotal, bookingsTotal ) {
    const booking = await this.findOne(bookingId);
    const depositCheck = paymentsTotal >= bookingsTotal * 2;
    await booking.update({depositCheck:depositCheck});    
  }
  
}

module.exports = BookingsService;
