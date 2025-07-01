const Item = require("../models/item");
const Bill = require("../models/bill");
const Sales = require("../models/sales");

module.exports.showBillForm = async (req, res) => {
  const items = await Item.find({});
  res.json({ items });
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
      date,
    }).save();
  }

  const newBill = new Bill({
    items: bill_items,
    total_cost: billData.sub_total,
    date,
  });

  await newBill.save();

  const id = await Bill.countDocuments();

  // ✅ Return all bill data including date and total_cost
  res.status(201).json({
    message: "Bill generated",
    bill: {
      id,
      date,                              // 👈 Send date
      total_cost: billData.sub_total,    // 👈 Send total
      bill_items,                        // 👈 Send actual bill_items
    },
  });
};


module.exports.printBill = (req, res) => {
  res.json({ message: "Print Bill endpoint (not needed in React)" });
};
