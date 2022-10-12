const { User } = require("../models");

const userController = {
  // Get all users
  getUsers(req, res) {
    User.find({})
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Add user
  addUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },
  // Get a single user by ID
  getUserByID({ params }, res) {
    User.findOne({ _id: params.id })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },
  // Update a user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }

        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // Delete a user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }

        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // Add a friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendID } },
      { runValidators: true, new: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // Delete friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendID } },
      { runValidators: true, new: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
