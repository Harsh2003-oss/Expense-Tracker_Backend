var express = require('express');
var router = express.Router();
const expenseModel = require("../models/expense.model")
const autheticateToken = require('../middlewares/auth.middleware')

router.post('/expenses',autheticateToken ,async function(req,res,next){
try {
  const{expenseName,description,amount,category,expenseDate} = req.body;

  let list =  await expenseModel.create({
    expenseName,description,amount,category,expenseDate,
   userId:req.user.userId 
// When a user logs in and gets a JWT token, that token contains their userId. When they make requests, your authenticateToken middleware:
// Reads the JWT token from the request
// Decodes it to get the user info
// Attaches the user info to req.user
  })

  res.json({
    message:"expense created successfully",
    list
  })
} catch (error) {
return  res.status(500).json({error:"Server error"})
}
  
})


router.get('/user',autheticateToken ,async function(req,res,next){

try {
  
  const userId=req.user.userId;

  if(!userId){
 return res.status(400).json({error:"User not found"})
  }

let userExpenses = await expenseModel.find({userId});


        res.json({
            message: "Expenses retrieved successfully",
            expenses: userExpenses,
            count: userExpenses.length
        });

} catch (error) {
  
 return res.status(500).json({error:"Server error"})
}
})






// Flow:
// Get expense ID from URL parameter ✅
// Get update data from request body ✅
// Get current user from JWT token ✅
// Find the expense in database ✅
// Security check - verify ownership ✅
// Update expense with new data ✅
// Return success response ✅

router.put('/user/:id',autheticateToken ,async function(req,res,next){
try {
  
const {id} =req.params;
const{expenseName,category,amount,description} = req.body;

const userId = req.user.userId;

if(!userId){
   return res.status(400).json({error:"invalid Id"})
}

let expense = await expenseModel.findById(id);
if(expense.userId!==userId){
  return res.status(400).json({error:"User not authorized"})
}

let updatedExpense = await expenseModel.findByIdAndUpdate(id,
{  expenseName,category,amount,description}
)

res.json({
  message:"updated successfully",
  updatedExpense
})
} catch (error) {
   return res.status(500).json({error:"Server error"})
}

})
module.exports = router;
