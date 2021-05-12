const postService = require("../services/postService");
require("dotenv").config({ path: "../.env" });

const redis = require("redis");
const client = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
); //By default redis-cli connects to the server at 127.0. 0.1 and port 6379

client.on("error", (err) => {
  console.log(err);
});

exports.getAll = async (req, res, next) => {
  try {
    client.get("posts", async (err, posts) => {
      if (err) {
        console.log(err);
      } else if (posts) {
        res.status(200).send({
          success: true,
          posts: JSON.parse(posts),
          msg: "data retrieved from the cache",
        });
      } else {
        const posts = await postService.getAll();
        client.setex("posts", 600, JSON.stringify(posts)); //I use setex instead of the regular set function
        //so that i can add expiration time to the stored key-value pair
        res.status(200).send({
          posts: posts,
          msg: "data retrieved from the MongoDB",
          success: true,
        });
      }
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server error" });
  }
};
