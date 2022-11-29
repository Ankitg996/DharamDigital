import campaignModel from "../Models/campaignModel.js";
import { isValidBody, isValidRatioPercentage, isValidSToken, isValidUrl } from "../Utilities/validation.js";

const createCampaign =async function (req, res) {
    try {
        let data = req.body;
        const {short_token,name,offers} = data

        // if nothing incoming data
        if(Object.keys(data).length===0) return res.status(400).send({status: false, message:'please provide mandatory fields ! '})

        // validations
        if (!isValidBody(short_token) || !isValidSToken(short_token)) return res.status(400).send({status: false, message:'please provide mandatory and valid SortToken ! '})

        if (!isValidBody(name)) return res.status(400).send({status: false, message:'please provide a mandatory campaign name ! '})

        for (let i = 0; i < offers.length; i++) {

            if(!isValidUrl(offers[i].offer_url)|| !isValidBody(offers[i].offer_url)) return res.status(400).send({status: false, message:'please provide a mandatory offerUrl ! '})
            if(!isValidBody(offers[i].ratio_percentage) || !isValidRatioPercentage(offers[i].ratio_percentage)) return res.status(400).send({status: false, message:'please provide a mandatory and valid ratio_percentage along offerUrl ! '})

        }
            
            // DB check for existing short_token and Name
            const existCheck = await campaignModel.findOne({$or:[{short_token:short_token},{name:name}]})
            if(existCheck) return res.status(403).send({status: false, message:'given short_token or name already exists, try different input'})
            
            const createCamp = await campaignModel.create(data)

        return res.status(201).send({status:true, message:'campaign has been created ! ', data: createCamp})

        
    } 
    catch (error) {
        res.status(500).send({status: false, message:error.message})
    }
}

const redirectCampaign = async function (req, res) {
    try {
        let short_token = req.query.short_token;
        if(!isValidBody(short_token)|| !isValidSToken(short_token)) return res.status(401).send({status:false, message:'please enter a valid and mandatory short_token'})

        // ---- check token in DB ------
        const campaignCheck =  await campaignModel.findOne({short_token:short_token})
        if(!campaignCheck) return res.status(404).send({status:false, message:'campaign with given short token does not exist'})
        let redirectedUrl = campaignCheck.offers[1].offer_url

        return res.status(302).redirect(302, `${redirectedUrl}`)

        
    } 
    catch (error) {
        res.status(500).send({status: false, message:error.message})
    }
}

const enableDisableCampaign = async function (req, res) {
    try {
        let campaignId = req.params.id
        
        //----- check campaign existance ------
        const campaignExist = await campaignModel.findOne({_id:campaignId})
        if(!campaignExist) return res.status(404).send({status: false, message: 'the campaign with given ID does not exists ! '})

        if(campaignExist.enabled){
            const updateCampaign = await campaignModel.findByIdAndUpdate({_id: campaignId},{enabled: false},{new:true})
            return res.status(200).send({status: false, message:'toggle done, campaign disabled', data : updateCampaign})
        }
        else{
            const updateCampaign = await campaignModel.findByIdAndUpdate({_id:campaignId},{enabled: true},{new:true})
            return res.status(200).send({status: false, message:'toggle done, campaign enabled', data : updateCampaign})
        }
    } 
    catch (error) {
        res.status(500).send({status: false, message:error.message})
    }
}
export {createCampaign, redirectCampaign ,enableDisableCampaign}