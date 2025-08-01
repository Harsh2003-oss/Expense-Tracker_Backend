const mongoose = require("mongoose");

const expenseModel = mongoose.Schema({

expenseName:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,
    minlength:4,
    maxlength:120
},
amount:{
    type:Number,
    required:true,
      min: 0.01  // Can't have negative or zero expenses
},
  category: {  // NEW: Expense categories
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Other']
  },
  expenseDate: {  // NEW: When expense actually occurred
    type: Date,
    required: true,
    default: Date.now
  },
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
     required: true
}

},{timestamps:true}
)

module.exports = mongoose.model("Expense",expenseModel)