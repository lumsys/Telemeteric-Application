const Telemetric = require('../model/telemetric');
const express = require('express');
const router = express.Router();

router.post(`/create`, (req, res) =>{
    const telemetric = new Telemetric({
        engine_temperature: req.body.engine_temperature,
        car_speed: req.body.car_speed,
        car_longitude: req.body.car_longitude,
        car_latitude: req.body.car_latitude,
        fuel_consumption_rate: req.body.fuel_consumption_rate
    })

    telemetric.save().then((createdValue=>{res.status(201).json(createdValue)

    })).catch((err)=>{res.status(500).json({
        error: err,
        success:false

    })
    })
})

router.get(`/view`, async (req, res) =>{
   const telemetricList =await Telemetric.find();

   if(!telemetricList) {
       res.status(500).json({success: false})
   }
    res.send(telemetricList);
})


router.put('/:id', async (req, res)=>{
    const telemetric = await Telemetric.findByIdAndUpdate(req.params.id,
        {
            engine_temperature: req.body.engine_temperature,
            car_speed: req.body.car_speed,
            car_longitude: req.body.car_longitude,
            car_latitude: req.body.car_latitude,
            fuel_consumption_rate: req.body.fuel_consumption_rate
        }
        )
        
   if(!telemetric) 
    return res.status(400).send('Telemetric data cannot be updated')

    res.send(telemetric);


})


router.delete('/:id', (req, res)=>{
    Telemetric.findByIdAndRemove(req.params.id).then(telemetric => {
        if(telemetric) {
            return res.status(200).json({success: true, message: 'The data with the id has been deleted'})
        }else{
            return res.status(404).json({success: false, message: 'id not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
})


module.exports =router;
