const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  movies: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Movie",
  },
  ownerId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Theatre", theatreSchema);
