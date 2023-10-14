const express = require('express');
const passport = require('passport');
const UsersService = require('../services/usersServices');
const OrdersService = require('../services/ordersServices');
const { checkRoles } = require('../middlewares/authHandler');

const router = express.Router();
const userService = new UsersService();
const orderService = new OrdersService();


router.get(
    '/orders',
    passport.authenticate('jwt', { session: false }),
    checkRoles(
      'admin',
    ),
    async (req, res, next) => {
        try {
            const user = req.user;
            const orders = await orderService.findByUser(user.sub);
            res.json(orders);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);

router.post(
    '/orders',
    passport.authenticate('jwt', { session: false }),
    checkRoles(
      'admin',
    ),
    async (req, res, next) => {
        try {
            const body = { userId: req.user.sub };
            const newOrder = await orderService.create(body);
            res.json(newOrder);
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;
