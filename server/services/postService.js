const postModel = require("../models/postModel");
const mongoose = require("mongoose");

class Service {
  static async getAll() {
    return await postModel.find();
  }
}

module.exports = Service;
