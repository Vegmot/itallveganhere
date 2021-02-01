import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// Create a new order
// POST /api/orders
// private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("There's no item ordered");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// Get order by id
// GET /api/orders/:orderId
// private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId).populate(
    'user',
    'firstName lastName email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// Update order status to paid
// PUT /api/orders/:orderId/pay
// private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// Update order status to out for delivery
// PUT /api/orders/:orderId/deliver
// private_admin
const updateOrderToOutForDelivery = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// Get logged in user's orders
// GET /api/orders/myorders
// private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// Get all orders
// GET /api/orders
// private_admin
const getAllOrders = asyncHandler(async (req, res) => {
  const itemsOnPage = 8;
  const orderPage = Number(req.query.pageNumber) || 1;
  const count = await Order.countDocuments({});

  const orders = await Order.find({})
    .limit(itemsOnPage)
    .skip(itemsOnPage * (orderPage - 1))
    .populate('user', 'firstName lastName email isPremium');

  res.json({ orders, orderPage, orderPages: Math.ceil(count / itemsOnPage) });
});

// Cancel / delete an order
// DELETE /api/orders/:orderId
// private_admin
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (order) {
    await order.remove();

    res.json({ message: 'Successfully deleted the order' });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToOutForDelivery,
  getMyOrders,
  getAllOrders,
  cancelOrder,
};
