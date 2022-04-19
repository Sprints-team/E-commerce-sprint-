const BadRequest = require("../errors/bad-request");
const NotFound = require("../errors/not-found");

exports.deleteHandlerCreator = (Model, modelName, cb) => {
	return async (req, res, next) => {
		const id = req.params.id;
    try {
      
			const doc = await Model.findOne({_id:id});

			// so that mongoose middleware would work
			await doc.remove()
			if (!doc) {
        throw new NotFound(`there is no ${modelName} with that id`);
			}
			res.status(200).json({ msg: `${modelName} deleted successfully` });
      return cb(doc)
		} catch (err) {
			next(err, req, res, next);
		}
	};
};

exports.psotHandlerCreator = (Model, modelName, cb) => {
	return async (req, res, next) => {
		image = `uploudes/${req.file.filename}`;

		const doc = cb(Model);

		try {
			await doc.save();
			res.status(200).json({
				msg: `${modelName} added successfully`,
				id: doc._id,
			});
		} catch (err) {
			if (err.code && err.code === 11000) {
				return next(
					new BadRequest(
						`there is a ${modelName} with that title already exists  `
					),
					req,
					res,
					next
				);
			}
			next(err, req, res, next);
		}
	};
};
