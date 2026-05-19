

const errorHandler = (err, req, res , next) =>{
    const statusCode = res.statusCode != 200 ? res.status : 500

    res.status(statusCode).json({
        msg : err.message ?? 'Server pe kuch gadbaad ho gaya hai'
    })
}

export default errorHandler