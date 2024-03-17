const colorCode = require("../Model/color.model")

const saveColor = async(req,res)=>{
    try {
        const {colorValue} = req.body
        const newColor = await colorCode.create({colorValue})
        if(!newColor){
            return res.json({status:0, message:"Color value not insert"})
        }
        res.json({status:1, message:"Color stored successfully",data:newColor})
    } catch (error) {
        console.log(error)
    }
}

const getColor = async(req,res)=>{
    try {
        const colors = await colorCode.findOne().sort({ createdAt: -1 })
        if(!colors){
            return res.json({status:0, message:"Color value not found"})
        }
        res.json({status:1, data:colors})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {saveColor,getColor}