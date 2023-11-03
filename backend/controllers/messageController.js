const Message = require('../models/message');

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content: content,
    });

    await message.save();

    res.status(200).json({ message: 'Message sent successfully', message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const checkForNewMessages = async (req, res) => {
  try {
    const { senderId, receiverId, lastTimestamp } = req.query;

    // Convert lastTimestamp to a Date object
    const lastDate = new Date(lastTimestamp);

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
      timestamp: { $gt: lastDate } // Find messages with a timestamp greater than lastDate
    }).sort({ timestamp: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  sendMessage,
  getMessages,
  checkForNewMessages
};
