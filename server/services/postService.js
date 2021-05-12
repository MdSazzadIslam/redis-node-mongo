const postModel = require("../models/postModel");
const mongoose = require("mongoose");

class Service {
  static async createPost(data) {
    const post = new postModel({
      title: data.title,
      description: data.description,
      comments: data.comments,
      user: data.user,
      meta: data.meta,
      image: data.image,
    });

    return await postModel(post).save();
  }

  static async updatePost(id, data) {
    return await postModel.findOneAndUpdate({ _id: id }, { $set: data });
  }

  static async deletePost(id) {
    return await postModel.findOneAndDelete(id);
  }

  static async getAll() {
    return await postModel
      .find()
      .sort("_id")
      .populate("user", "firstName lastName email id");
  }

  static async getById(id) {
    return await postModel.findById(id);
  }

  static async checkUserPost(id) {
    return await postModel.findById(id);
  }

  static async updateLD(id, data) {
    return await postModel.findOneAndUpdate(
      { _id: id },
      { $push: { meta: data } }
    );
  }

  static async getUserLike(id, user) {
    console.log("id", id, "user", user);
    return await postModel
      .find({
        _id: id,
        meta: { $elemMatch: { user: user, likes: 1 } },
      })
      .limit(1);
  }

  static async getUserDisLike(id, user) {
    console.log("id", id, "user", user);
    return await postModel
      .find({
        _id: id,
        meta: { $elemMatch: { user: user, dislikes: 1 } },
      })
      .limit(1);
  }
}

module.exports = Service;
