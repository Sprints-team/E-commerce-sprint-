

const checkIfAdmin = (req, res, next) => {
    const user = req.user
    
    if (user.role !== 'ADMIN') return res.status(403).json({ error: "403", msg: "user is not authorized to make such an action" })
    next()
}


module.exports=checkIfAdmin