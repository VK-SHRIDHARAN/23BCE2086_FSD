const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');

const placeOrder = async (req, res) => {
  try {
    const newOrder = await orderModel.create({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const verifyOrder = async (req, res) => {
  console.log(req.body);
  const { orderId, success } = req.body;
  try {
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ message: 'Payment marked as successful' });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ message: 'Order deleted due to failed payment' });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.status(200).json({ data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ data: orders });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ message: 'Status updated' });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

module.exports = { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };

