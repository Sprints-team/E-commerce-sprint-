const BadRequest = require("../errors/bad-request")
const { deleteHandlerCreator } = require("../helpers/controller-creators")
const Copoun=require("../model/copoun")


exports.addCoupon =async (req, res, next) => {
  const { code,amount, percentile, expirationDate } = req.body
  

  const coupon =new Copoun({
    code,amount,percentile,expirationDate:new Date(expirationDate)
  }) 

  try {
    await coupon.save()

    res.status(200).json({msg:"copoun added successfully"})
  } catch (err) {
    if(err.code===11000) return next(new BadRequest("this code already exists"),req,res,next)
    next(err,req,res,next)
  }
} 


exports.deleteCopoun = deleteHandlerCreator(Copoun, "copoun", (doc) => {
  console.log(doc)
})


exports.getCopouns = async (req, res, next) => {
  try {
    const copouns = Copoun.find()
    
    res.status(200).json(copouns)
  } catch (err) {
    next(err,req,res,next)
  }
}