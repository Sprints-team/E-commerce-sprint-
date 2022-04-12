const mongoose = require("mongoose")


const schema = new mongoose.Schema({
  index: {
    type: Number,
    default:1
  },
  ref: {
    type: String,
    default:"sku"
  }
})



//statics

schema.statics.autoIncrement = async function () {
 try{ let inc = await this.findOne({ref:"sku"})
  if (!inc) {
    inc = new this()
    await inc.save()
  }
  inc.index = inc.index + 1
  await inc.save()
   return inc.index
 } catch (err) {
   return err
  }
}




const Index = mongoose.model("index", schema)


module.exports=Index