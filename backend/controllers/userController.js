const User = require('../models/user');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateCredentials = async (req, res) => {
    try {
      const { userId } = req.params;
      const { email, password } = req.body;
  
      // Find the user
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update email and password
      user.email = email || user.email;
      user.password = password || user.password;
  
      await user.save();
  
      res.status(200).json({ message: 'Email and password updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = {
    getProfile,
    updateCredentials,
};
