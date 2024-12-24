// when we use connectdb its taking time,so we are using aync await 

const asyncHandler = (requestHandler) =>{
  return  (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=>next(err))
    }
}



export { asyncHandler }


// ^ we are using higher order function  = (fn) => {() => {}}
// const asyncHandler  = (fn) =>  async (req,res,next) => {
//     try{
//         await fn(req,res,next)
//     }
//  catch (err){
// res.status(err.code || 500).json({
//     success : false,
//     message : err.message
// })

// }
// }