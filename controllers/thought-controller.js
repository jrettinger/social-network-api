const { Thought, User } = require("../models");

// Get all thoughts
const thoughtController = {
  getThoughts(req, res) {
    Thought.find({})
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Get a single thought by ID
  getThoughtByID({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Add a thought
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Incorrect thought data!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
  // Update a thought
  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.thoughtId }, body, {
      runValidators: true,
      new: true,
    })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
  // Delete a thought
  deleteThought({ params }, res) {
    Thought.findByIdAndDelete(
      { _id: params.thoughtId },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
  // Add reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Incorrect reaction data!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
  // Delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Incorrect reaction data!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
