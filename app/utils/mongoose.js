import mongoose from "mongoose";
// import config from "../../config";

// const connectionString = config.mongo.host
//   .split(",")
//   .map(
//     (host) => `mongodb://${host}:${config.mongo.port}/${config.mongo.dbname}`
//   )
//   .join(",");

// // todo workaround for HMR. It remove old model before added new ones

mongoose.connect(
  "mongodb+srv://yadbib:marocaine123@cluster0.jnqr9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",

  (error) => {
    if (!error) return console.info("Mongo connected");

    console.error(error);
  }
);
Object.keys(mongoose.connection.models).forEach((key) => {
  delete mongoose.connection.models[key];
});
mongoose.Promise = global.Promise;

export default mongoose;
