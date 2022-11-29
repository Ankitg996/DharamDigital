import express from "express";
const router = express.Router();
import { auth } from "../Middleware/auth.js";
//----- import controllers files/functions -----
import { createUser,login } from "../Controllers/userController.js";
import { createCampaign, enableDisableCampaign, redirectCampaign } from "../Controllers/campaignController.js";

// router.get('/',function (req, res) {
//     return res.status(200).send({status: true, message:'WORKING WELL'})
// });

//--------- user Apis -----------
router.post('/register', createUser);// for creating users
router.post('/login', login); // let you login for whole session
router.get('/admin', auth,(req, res)=>{
    return res.status(200).send({status: true, message:'you are authorized user!'})
}); //should be accessible to login users only

// -------- campaign Apis -----------
router.post('/createCampaign',auth, createCampaign); // for creating campaign

router.get('/redirect',auth, redirectCampaign);// short_token in params take you to offer page

router.put('/admin/campaigns/:id/toggle',auth, enableDisableCampaign); // to enable and disable the campaign with ID given


export default router;