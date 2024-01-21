import mongoose, { Schema, model, models } from "mongoose";

console.log(process.env.MONGODB_CATEGORY_URI)
await mongoose.createConnection(process.env.MONGODB_CATEGORY_URI);
mongoose.Promise = global.Promise


const categorySchema = new Schema(
  {
    name : String
  },
  {
    timestamps : true
  }
)

const Category = models.Category || model("Category", categorySchema);
// console.log(Ticket, "dcsjvbdknbdjbn")
export default Category;