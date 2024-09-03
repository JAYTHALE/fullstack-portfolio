const multer = require("multer")
const path = require("path")

const poststorage = multer.diskStorage({
    filename: (req, file, cd) => {
        const fn = Date.now() + path.extname(file.originalname)
        cb(null, fn)
    }
})

const upload = multer({ storage: poststorage }).array("images", 5)

module.exports = upload