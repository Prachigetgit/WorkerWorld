import servicesModel from '../models/servicesModel.js';
import categoryModel from "./../models/categoryModel.js";
import slugify from 'slugify';
import fs from 'fs';
import braintree from 'braintree';
import  dotenv from "dotenv";
import OrderModel from '../models/orderModel.js';

dotenv.config();

//payment getaway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
  

export const createServiceController = async (req, res) => {
    try {
        const {name, slug, description,price,category,day,Serviceloc} = req.fields;
        const {photo} = req.files;
        //validation
        switch(true){
            case !name: 
                return res.status(500).send({error: 'Name is required'})
            case !description: 
                return res.status(500).send({error: 'Description is required'})
            case !price: 
                return res.status(500).send({error: 'price is required'})
            case !category: 
                return res.status(500).send({error: 'category is required'})
            case !day: 
                return res.status(500).send({error: 'day is required'})
            case !photo && photo.size > 1000000 : 
                return res.status(500).send({error: ' photo  is required and should be less then 1mb'})


        }
        
       const services =new servicesModel({...req.fields, slug: slugify(name)});
  
        if(photo){
            services.photo.data = fs.readFileSync(photo.path);
            services.photo.contentType = photo.type;
        }
        await services.save();
        res.status(201).send({
           success: true,
           message: "Updated Created Successfully",
           services, 
        });
   
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'error in creating service',
        });
    }
};


//get all services

export const getServiceController = async (req, res) => {
    try {
        const services = await servicesModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt: -1})
        res.status(200).send({
            success: true,
            CountTotal: services.length,
            message: "All Services",
            services,
            
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in getting services',
            error: error.message
        })
        
    }
};

// get single service

export const getSingleServiceController = async (req, res) => {
  try {
     const service = await servicesModel.findOne({slug:req.params.slug}).select("-photo").populate("category"); 
     res.status(200).send({
        success: true,
        message: "Single Service Fetched",
        service,
     });
  } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while getting single service",
            error,

        });
  }
};

// get  photo 

export const servicePhotoController = async (req, res) => {
    try {
        const service = await servicesModel.findById(req.params.sid).select("photo");
        if(service.photo.data){
            res.set('content-type', service.photo.contentType);
            return res.status(200).send(service.photo.data);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while getting photo',
            error,
        })
        
    }
};


// delete controller

export const deleteServiceController = async (req, res) => {
   try {
      await servicesModel.findByIdAndDelete(req.params.sid).select("-photo")
      res.status(200).send({
        success: true,
        message: 'Service Deleted successfully'
      })
   } catch (error) {
        
    console.log(error)
    res.status(500).send({
        success: true,
        messsage: "Error while deleting",
        error,
    })
    
   }
};

//update service 

export const updateServiceController = async  (req, res) =>{
    try {
        const { name, description, price, category, day, Serviceloc} = req.fields;
        const { photo } = req.files;
        //validation
        switch(true){
            case !name: 
                return res.status(500).send({error: 'Name is required'})
            case !description: 
                return res.status(500).send({error: 'Description is required'})
            case !price: 
                return res.status(500).send({error: 'price is required'})
            case !category: 
                return res.status(500).send({error: 'category is required'})
            case !day: 
                return res.status(500).send({error: 'day is required'});
            case photo && photo.size > 1000000 : 
                return res.status(500).send({error: ' photo  is required and should be less then 1mb'})


        }
        
       const services =  await servicesModel.findByIdAndUpdate(
              req.params.sid,
               { ...req.fields, slug: slugify(name)}, 
               { new: true },
           );
       
        if(photo){
            services.photo.data = fs.readFileSync(photo.path);
            services.photo.contentType = photo.type;
        }
        await services.save();
        res.status(201).send({
           success: true,
           message: "Service updated Successfully",
           services, 
        });
   
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'error in updating service',
        });
    
}
};

//filter
export const serviceFilterController = async (req,res) => {
    try {
        const {checked} = req.body
        let args = {}
        if(checked.length > 0) args.category = checked
        const services = await servicesModel.find(args)
        res.status(200).send({
            success: true,
            services,
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:false,
            message:'Error while Filtering Services',
            error
        })
    }
};

//service count

export const serviceCountController = async (req,res) => {
    try {
       const total = await servicesModel.find({}).estimatedDocumentCount();
       res.status(200).send({
        success:true,
        total,
       }); 
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:'Error in service count',
            error,
            success:false,
        });
    }
};

//service per page controller

export const serviceListController = async (req,res) => {{
    try {
       const perPage  = 4
       const page = req.params.page ? req.params.page : 1
       const services = await servicesModel
       .find({}).
       select("-photo").
       skip((page-1) * perPage)
       .limit(perPage)
       .sort({ createdAt: -1});
       res.status(200).send({
        success:true,
        services,
       })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:'Error in accessing service per page',
            error,
            success:false
        })
        
    }
}
};

export const searchServiceController = async (req,res) => {
  try {
    const {keyword} = req.params;
    const results = await servicesModel.find({
        $or: [
            {name:{ $regex: keyword, $options: "i"}},
            {description:{ $regex: keyword, $options: "i"}},
        ],
    }).select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
        success:false,
        message:'Error in Search service',
        error,
    });
  }
};

//related service controller
export const relatedServiceController = async (req,res) => {
    try {
        const {sid,cid} = req.params;
        const services = await servicesModel.find({
           category:cid,
           _id: {$ne:sid}

        }).select("-photo").limit(3).populate("category");
        res.status(200).send({
            success:true,
            services,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message: "Error in getting similar services",
            error,
        })
    }
};


//get service by category

export const serviceCategoryController = async  (req,res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug});
        const services = await servicesModel.find({category}).populate('category');
        res.status(200).send({
            success:true,
            category,
            services,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            error,
            message:"Error while Getting services"
        })
    }
}

//payment getway api
//token
export const braintreeTokenController = async  (req,res) => {
    try {
        gateway.clientToken.generate({}, function(err,response){
            if(err){
                res.status(500).send(err);
            }
            else{
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
        
    }
};


//payments
export const braintreePaymentController  = async (req,res) =>{
    try {
        const {cart, nonce} = req.body
         let total  = 0
         cart.map((i) =>{
          total += i.price
        });
       let newTransaction = gateway.transaction.sale({
        amount:total,
        paymentMethodNonce: nonce,
        options:{
            submitForSettlement:true
        }
       },
        function(error,result){
         if(result)
         {
            const order = new OrderModel({
                services: cart,
                payment: result,
                buyer: req.user._id
            }).save()
            res.json({ok:true})
         }else{
            res.status(500).send(error)
         }
        }
       )
    } catch (error) {
        console.log(error);
    }
};
