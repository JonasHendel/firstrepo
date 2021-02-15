const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async createUser(req, res) {
    try {
      const { firstName, lastName, password, email } = req.body;

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          firstName,
          lastName,
          password: hashedPassword,
          email,
        });
        return res.json(user);
      }
      return res.status(400).json({
        message: "E-Mail/user already exists! Do you want to login?",
      });
    } catch (error) {
      throw Error(`Error while registering a new user : ${error}`);
    }
  },

  async getUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        message: "User ID does not exist, do you want to register instead?",
      });
    }
  },
};
