var express = require('express');
var router = express.Router();
const expenseModel = require("../models/expense.model")

router.post('/', async function(req,res,next){
try {
  const{expenseName,description,amount,category,expenseDate} = req.body;

  let list =  await expenseModel.create({
    expenseName,description,amount,category,expenseDate
  })

  res.json({
    message:"expense created successfully",
    list
  })
} catch (error) {
  res.status(400).json({error:"Server error"})
}
  
})

module.exports = router;
