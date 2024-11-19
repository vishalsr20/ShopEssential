const {signup, login,feedback,shopNow,getProduct, deleteProduct, orderPlaced} = require("../controllers/user")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = require("express").Router()
const path = require("path");

router.post('/signup',signup)
router.post('/login',login)
router.post('/feedback',feedback)
router.get('/products',getProduct)
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Store files in 'uploads' folder
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
//     }
// });

// Initialize multer with storage configuration

router.post('/createproduct', upload.single('image'), shopNow)
router.delete('/delete/:id',deleteProduct)
router.post('/order',orderPlaced)
module.exports = router;