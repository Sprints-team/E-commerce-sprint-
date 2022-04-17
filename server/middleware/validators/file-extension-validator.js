const fileExtensionValidator = (req, res, next) => {
    if (!req.files && !req.file) {
        console.log(req.file)
		console.log(req.files, req.file, !req.files && !req.file);
		return res.status(400).json({ error: "400", msg: "no files were sent" });
	}

	if (
		req.file &&
		req.file.mimetype !== "image/png" &&
		req.file.mimetype !== "image/jpeg"
	) {
		return res
			.status(400)
			.json({ error: "400", msg: "only allow image file formats" });
	}
	if (req.files) {
		for (let file of req.files) {
			if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg")
				return res
					.status(400)
					.json({ error: "400", msg: "only allow image file formats" });
		}
	}
	next();
};

module.exports = fileExtensionValidator;
