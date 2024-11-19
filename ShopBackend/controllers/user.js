const User= require("../model/usermodel")
const FeedBack = require("../model/feedBack")
const bcrypt = require("bcrypt")
const ShopOrder = require("../model/shoporder")
const fs = require('fs')
const path = require('path')
const shoporder = require("../model/shoporder")
const Order = require("../model/orderModel")
const cloudinary = require('cloudinary').v2;
require("dotenv").config();
// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Your Cloudinary Cloud Name
  api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API Key
  api_secret: process.env.CLOUDINARY_API_SECRET  // Your Cloudinary API Secret
});
// const upload = multer({ dest: 'uploads/' }); 
module.exports.signup =async (req, res, next) => {
    
    try{
        const {name,email,password,confirmPassword} = req.body;
        const emailCheck =await  User.findOne({email})
        if(emailCheck){
            return res.json({
                message:"User already exist",
                status:false
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password and confirm password do not match",
                status: false
            });
        }
        const hashPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,email,password:hashPassword
        })
        delete user.password;
        const userObj = user.toObject();
        return res.json({
            message:"User Created Successfully",
            stats:true,
            user
        })
    }catch(error){
        console.log("Error during signup",error.message)
        next(error)
           
        
    }
}

module.exports.login = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                message:"User doesn't exists",
                stats:false
            })
        }

        const isPassword = await bcrypt.compare(password, user.password)
         if(!isPassword){
            return res.json({
                message:"Email or Password is incorrect",
                stats:false
            })
        }

        delete user.password;

        return res.json({
            message:"User login successfully",
            status:true,

        })

    }catch(error){
        return res.json({
            message:"Error while login ",
            status:false
        })       
    }
}

module.exports.feedback = async (req , res , next) => {
    try{
        const {name , email, subject , message} = req.body;
        console.log("feedback values from backend",req.body)
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                message:"User does't exist",
                status:false
            })
        }
        
        const feedback = await FeedBack.create({
            name,email,subject,message
        })
       

        return res.json({
            message:"Feedback submitted successfully",
            status:true,
            feedback
        })

    }catch(error){
        console.log("Error in feedback",error)
        return res.json({
            message:"Error while login ",
            status:false,
            error:error.message
        })  
    }
}


// const MAX_IMAGE_SIZE = 5 * 1024 * 1024
// module.exports.shopNow = async (req , res , next) => {

//     console.log("Incoming data in order",req.body)
//     const {name, description, discount , price, image} = req.body 
//     try{

        
//         if(!name ){
//             return res.json({
//                 message:"name fields are required",
//                 status:false
//             })
//         }
//         if( !description ){
//             return res.json({
//                 message:"description fields are required",
//                 status:false
//             })
//         }
//         if( !discount  ){
//             return res.json({
//                 message:"discount fields are required",
//                 status:false
//             })
//         }
//         if( !price  ){
//             return res.json({
//                 message:"price fields are required",
//                 status:false
//             })
//         }
//         if( !image ){
//             return res.json({
//                 message:"image fields are required",
//                 status:false
//             })
//         }

//         const imageSize = (image.length * 3) / 4;

//         if(imageSize > MAX_IMAGE_SIZE){
//             return res.json({
//                 message:"Image size exceed of 5mb",
//                 status:false
//             })
//         }


//         const buffer = Buffer.from(image,'base64')
//         const imagePath = path.join(__dirname,'upload',`${Date.now()}.png`)


//         if (!fs.existsSync(path.join(__dirname, 'upload'))) {
//             fs.mkdirSync(path.join(__dirname, 'upload'));
//         }
//         fs.writeFileSync(imagePath,buffer)
//         const imageUrl =`upload/${path.basename(imagePath

//         )}`
//         const shop = await ShopOrder.create({
//             name , description,discount,price,
//             image:imageUrl
//         })
       
//         return res.json({
//             message:"Data created successfully",
//             status:true,
//             shop:{
//                 ...shop.toObject(),
//                 image:imageUrl
//             }
//         })
//     }
//     catch(error){
//         console.log("Error while shopping ", error)
//         return res.json({
//             message:"Error while shopnow",
//             status:false,
//             error:error.message
//         })
//     }
// }




module.exports.shopNow = async (req, res, next) => {
    const { name, description, discount, price, image } = req.body;
    try {
      if (!name || !description || !discount || !price || !image) {
        return res.json({ message: "All fields are required", status: false });
      }
  
      // Upload to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(`data:image/png;base64,${image}`, {
        folder: 'ShopEssential'
      });
  
      const shop = await ShopOrder.create({
        name,
        description,
        discount,
        price,
        image: cloudinaryResponse.secure_url
      });
  
      return res.json({
        message: "Product created successfully",
        status: true,
        shop
      });
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res.json({ message: "Error while creating product", status: false });
    }
  };
  



module.exports.getProduct = async (req, res, next) => {
    try{
        const products =await shoporder.find()
        res.json(products)
    }catch(error){
        res.status(500).json({
            message:"Error in fetching"
        })
    }
}

module.exports.deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Check if the product exists
      const product = await ShopOrder.findById(id);
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
          status: false,
        });
      }
  
      // Delete the product
      await ShopOrder.findByIdAndDelete(id);
      res.json({
        message: "Product deleted successfully",
        status: true,
      });
    } catch (error) {
      console.log("Error while deleting", error);
      res.status(500).json({
        message: "Error while deleting the product",
        status: false,
      });
    }
  };
  

  // for placing the order

module.exports.orderPlaced =async (req , res, next) => {
    const {email,name,address,pincode , number} = req.body;
    try{
        if(!email || !name || !address || !pincode || !number){
           return res.json({
                message:"All fields are required",
                status:false
            })
        }

        const user =await  Order.create({
            email,
            name,
            address,
            pincode,
            number
        })

       return res.json({
            message:"Order Placed Successfully",
            status:true,
            user
        })

    }catch(error){
        console.log("Error while placing order",error);
        return res.json({
            error:error.message,
            message:"Error while placing order",
            status:false
        })
    }
}


