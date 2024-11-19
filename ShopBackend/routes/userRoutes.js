const {signup, login,feedback,shopNow,getProduct, deleteProduct, orderPlaced} = require("../controllers/user")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = require("express").Router()
const path = require("path");

router.post('/signup',signup)
router.post('/login',login)
router.post('/feedback',feedback)
router.get('/products',getProduct)


router.post('/createproduct', upload.single('image'), shopNow)
router.delete('/delete/:id',deleteProduct)
router.post('/order',orderPlaced)
module.exports = router;