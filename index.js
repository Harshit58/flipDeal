const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

function calculateTax(cartTotal) {
  return (cartTotal * taxRate) / 100;
}

function calculateEstimateTime(shippingMethod, distance) {
  let time;
  if (shippingMethod == 'express') {
    time = distance / 100;
  } else {
    time = distance / 50;
  }
  return time;
}

function calculateShippingCost(weight, distance) {
  return weight * distance * 0.1;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalAmount = cartTotal + newItemPrice;
  res.send(totalAmount.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true' ? true : false;
  let finalAmount = cartTotal;
  if (isMember) {
    finalAmount = cartTotal - cartTotal / discountPercentage;
  }
  res.send(finalAmount.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalAmount = calculateTax(cartTotal);
  res.send(finalAmount.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let shippingMethod = req.query.shippingMethod;
  let finalTime = calculateEstimateTime(shippingMethod, distance);
  res.send(finalTime.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let cost = calculateShippingCost(weight, distance);
  res.send(cost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
