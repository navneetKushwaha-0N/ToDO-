

const authMiddleware =(req, res,  next) =>{
    const token = req.headers.authorization
console.log('Token mila:', token) 
    if(!token){
        return res.status(401).json({msg: 'Pahle login karo'})
    }

    next()
}
export default authMiddleware