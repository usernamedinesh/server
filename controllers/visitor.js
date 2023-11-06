const Visitor = require('../model/visitor'); // Import your Visitor model

exports.addVisitor = async (req, res) => {
  try {
    const { count } = req.body;
    const newVisitor = new Visitor({ count });
    await newVisitor.save();
    res.status(201).json({ message: 'Visitor data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getVisitors = async (req, res) => {
    try {
      const visitors = await Visitor.find().sort('-timestamp').limit(5);
      
      if (visitors.length === 0) {
        return res.status(404).json({ message: 'No visitors found' });
      }
      
      res.json(visitors);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };