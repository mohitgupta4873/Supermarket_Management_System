const Item = require("../models/item");
const Bill = require("../models/bill");
const Sales = require("../models/sales");

module.exports.showBillForm = async (req, res) => {
  const items = await Item.find({});
  res.render("bill", { items });
};

module.exports.generateBill = async (req, res) => {
  const billData = req.body;
  const date = new Date();
  const bill_items = [];

  for (let i = 0; i < billData.code.length; i++) {
    const item = await Item.findOne({ item_code: billData.code[i] });
    await Item.findOneAndUpdate(
      { item_code: billData.code[i] },
      { quantity: item.quantity - billData.qty[i] }
    );
    bill_items.push({
      item_code: billData.code[i],
      name: item.item_name,
      quantity: billData.qty[i],
      unit_price: billData.price[i],
    });

    await new Sales({
      item_code: billData.code[i],
      item_name: item.item_name,
      unit_price: billData.price[i],
      quantity: billData.qty[i],
      date
    }).save();
  }

  const newBill = new Bill({
    items: bill_items,
    total_cost: billData.sub_total,
    date
  });
  await newBill.save();

  billData.id = await Bill.countDocuments();
  billData.bill_items = bill_items;
  res.render("print_bill", { bill: billData });
};

module.exports.printBill = (req, res) => {
  res.render("print_bill");
};
