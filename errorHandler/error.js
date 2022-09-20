

export function ErrorHandler(req, res){
    res.status(400).json({msg: "Bad Request"})
}