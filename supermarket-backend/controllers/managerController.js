const Sales = require("../models/sales");
const Item = require("../models/item");

module.exports.showStats = async (req, res) => {
  const allsales = await Sales.find({});
  const allDetails = await Item.find({});
  const allsalesforpie = await Sales.aggregate([
    { $group: { _id: "$item_name", total: { $sum: { $multiply: ["$quantity", "$unit_price"] } } }},
    { $addFields: { item_name: "$_id" } }
  ]);
  res.json({ allsales, allDetails, allsalesforpie, filter: 0 });
};

module.exports.filterStats = async (req, res) => {
  const filter = req.body.filter;
  const allsales = await Sales.find({});
  const allDetails = await Item.find({});
  const allsalesforpie = await Sales.aggregate([
    { $group: { _id: "$item_name", total: { $sum: { $multiply: ["$quantity", "$unit_price"] } } }},
    { $addFields: { item_name: "$_id" } }
  ]);
  res.json({ allsales, allDetails, allsalesforpie, filter });
};

module.exports.showInventory = async (req, res) => {
  const details = await Item.find({});
  res.json({ details });
};

module.exports.addItem = async (req, res) => {
  const data = req.body;
  const item = new Item({
    item_name: data.i1,
    item_code: await Item.countDocuments() + 1,
    quantity: data.i4,
    unit_price: data.i3,
    description: data.i2,
  });
  await item.save();
  res.status(201).json({ message: "Item added", item });
};

module.exports.updateItem = async (req, res) => {
  const data = req.body;
  const updatedItem = await Item.findOneAndUpdate(
    { item_code: parseInt(data.i1) },
    { unit_price: data.i3, quantity: data.i4 },
    { new: true }
  );
  res.json({ message: "Item updated", item: updatedItem });
};
