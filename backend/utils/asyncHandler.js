const asyncHandler = (fn)=>async(req , res)=>{
    try {
        await fn(req,res)
    } catch (error) {
        console.log(error)
        return res.status(error.code || 500).json({
            code:error.code,
            message: error.message || "something went wrong"
        })
    }
}

export default asyncHandler