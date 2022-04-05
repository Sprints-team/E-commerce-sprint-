const fileExtensionValidator= (req, res, next) => {
    if (!req.files)
        return res.status(400).json({ error: "400", msg: "no files were sent" });
    console.log(req.files);
    for (let file of req.files) {
        if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg")
            return res
                .status(400)
                .json({ error: "400", msg: "only allow image file formats" });
    }
    console.log("here");
    next();
}

module.exports=fileExtensionValidator