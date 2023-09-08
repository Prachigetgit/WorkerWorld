import express from 'express';
import { isAdmin, requireSignIn} from '../middleware/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController, createServiceController,
     deleteServiceController,
      getServiceController,
     getSingleServiceController,
      relatedServiceController,
      searchServiceController,
      serviceCategoryController,
      serviceCountController,
       serviceFilterController,
        serviceListController,
        servicePhotoController,
         updateServiceController } from '../controllers/ServiceController.js';
import formidable from 'express-formidable'
const router = express.Router()
//routes
router.post('/create-service', 
 requireSignIn,
  isAdmin,
  formidable(),
 createServiceController
);

// update route

router.put('/update-service/:sid', 
 requireSignIn,
  isAdmin,
  formidable(),
 updateServiceController
);

// get services

router.get('/get-service', getServiceController );

//single service

router.get('/get-service/:slug', getSingleServiceController);

// get photo

router.get('/service-photo/:sid', servicePhotoController);

// delete service

router.delete('/delete-service/:sid', deleteServiceController);


//filter service 
router.post('/service-filters', serviceFilterController);

//service count 
router.get('/service-count', serviceCountController);

//service per page
router.get('/service-list/:page', serviceListController);

//service search
router.get('/search/:keyword', searchServiceController);

//similar service 
router.get('/related-service/:sid/:cid', relatedServiceController);

//category wise service
router.get('/service-category/:slug', serviceCategoryController);

//payment route
//token
router.get('/braintree/token', braintreeTokenController);


//payments
router.post('/braintree/payment', requireSignIn, braintreePaymentController);




export default router;