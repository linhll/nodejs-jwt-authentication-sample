const quotes = require("./quotes.json");

exports.getRandomOne = function () {
  const totalAmount = quotes.length;
  const rand = Math.floor(Math.random() * totalAmount);
  return { id: rand, quote: quotes[rand] };
};

exports.getMany = function ({ page = 1, limit = 10 }) {
  const totalAmount = quotes.length;
  const skip = Math.max(0, page - 1) * limit;
  return {
    page,
    limit,
    total: totalAmount,
    totalPage: Math.ceil(totalAmount / limit),
    data: quotes.slice(skip, skip + limit),
  };
};
