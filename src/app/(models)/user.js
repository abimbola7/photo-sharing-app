import mongoose, { Schema, model, models  } from "mongoose";

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

const postSchema = new Schema(
  {
    author: {
      username: String,
      avatar: String
    },
    title : String,   
    content : String,
    category : [String],
    tags : [String],
    image : String,
    comments : [String],
    likes : [String]
  },
  {
    timestamps: true
  }
)

const categorySchema = new Schema(
  {
    name : String
  },
  {
    timestamps : true
  }
)

const Category = models.Category || model("Category", categorySchema, "categories");
const User = models.User || model("User", userSchema, "users");
const Post = models.Post || model("Post", postSchema, "posts");

export { User, Category, Post };