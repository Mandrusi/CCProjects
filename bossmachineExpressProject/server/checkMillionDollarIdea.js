function checkMillionDollarIdea(req, res, next) {
    const { numWeeks, weeklyRevenue } = req.body;
    const totalValue = Number(numWeeks) * Number(weeklyRevenue);
  
    if (!numWeeks || !weeklyRevenue || isNaN(totalValue) || totalValue < 1000000) {
      res.status(400).send('Idea must have at least a million dollar value.');
    } else {
      next();
    }
  }
  
  module.exports = checkMillionDollarIdea;
  