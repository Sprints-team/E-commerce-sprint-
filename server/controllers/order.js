const Order = require("../model/orders");

// products-->[{sku,size,qty}]
exports.order = async (req, res, next) => {
	const { products, country, governerate, city, zipCode, adress } = req.body;
  const userId = req.user.userId;
  console.log(products)
	const order = new Order({
		userId,
		products,
		shippingAdress: {
			country,
			governerate,
			city,
			zipCode,
			adress,
		},
	});
  const skues = await order.checkInventoryAndOrder()
  res.send(skues)
};
