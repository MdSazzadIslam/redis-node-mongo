const postModel = require("../models/postModel");

class Service {
  static async getAll() {
    return await postModel.find();
  }
}

module.exports = Service;
