const mongoose =require('mongoose')
const { type } = require('os')

const FormSchema = new mongoose.Schema({
    cName:String,
    cAddress:String,
    pName: String,
    address:String,
    tName: String,
    pId:String,
    gConcrete: String,
    DateOfReceipt: Date,
    member: String,
    dateCasting: Date,
    Building: String,
    TestingD: Date,
    Level: String,
    Age: String,
    WitnessBy: String,
    SizeLength1: String,
    SizeLength2: String,
    SizeLength3: String,
    SizeWidth1: String,
    SizeWidth2: String,
    SizeWidth3: String,
    SizeHeight1: String,
    SizeHeight2: String,
    SizeHeight3: String,
    Weight1: String,
    Weight2: String,
    Weight3: String,
    Load1: String,
    Load2: String,
    Load3: String,
    CrossArea1: String,
    CrossArea2: String,
    CrossArea3: String,
    Density1: String,
    Density2: String,
    Density3: String,
    CompressiveStrength1: String,
    CompressiveStrength2: String,
    CompressiveStrength3: String,
    Remark1: String,
    Remark2: String,
    Remark3: String,
    Siteeng: String,
    CompressiveAvgStrength: String,
    status: {type: Boolean, default:false}
    
})

const FormModel = mongoose.model("form", FormSchema)
module.exports = FormModel