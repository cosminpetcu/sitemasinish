import mongoose, {model, models, Schema} from "mongoose";

const CarSchema = new Schema({
    title: {type:String, required:true},
    description: String,
    price: {type: Number, required: true},
    mileage: {type: Number, required: true},
    year: {type: Number, required: true},
    images: [{type: String}],
    category: {type:mongoose.Types.ObjectId, ref:'Category'},
});

export const Car = models.Car || model('Car', CarSchema);