import mongoose, { Schema, model, models } from "mongoose";

console.log(process.env.MONGODB_USER_URI)

await mongoose.connect(process.env.MONGODB_USER_URI);
// mongoose.createConnection(process.env.MONGODB_CATEGORY_URI)

mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    avatar : String,
    email : String,
    username : String,
    password : String
  },
  {
    timestamps: true
  }
)

// const categorySchema = new Schema(
//   {
//     name : String
//   },
//   {
//     timestamps: true
//   }
// )


const User = models.User || model("User", userSchema);
export default User;