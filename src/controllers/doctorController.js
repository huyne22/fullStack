
import doctorService from '../services/doctorService'

let getTopDoctorHome = async(req, res) => {
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try{
        let doctors = await doctorService.topDoctorService(+limit)
        console.log(doctors)
        return res.status(200).json(doctors)

    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode : -1,
            errMessage : "Error user service..."
        })
    }

}
let getAllDoctor = async(req, res) => {
    try{
        let allDoctors = await doctorService.getAllDoctor()
        return res.status(200).json(allDoctors)
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode : -1,
            errMessage : "Error user service..."
        })
    }

}

let postInfoDoctor = async(req, res) => {
    try{
        let response = await doctorService.saveDetailInforDoctor(req.body)
        return res.status(200).json(response)
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode : -1,
            errMessage : "Error from the service..."
        })
    }

}

let getDetailDoctorById = async(req, res) => {
    try{
        let response = await doctorService.getDetailDoctorById(req.query.id)
        return res.status(200).json(response)
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode : -1,
            errMessage : "Error from the service..."
        })
    }

}

module.exports = {
    getTopDoctorHome : getTopDoctorHome,
    getAllDoctor : getAllDoctor,
    postInfoDoctor : postInfoDoctor,
    getDetailDoctorById : getDetailDoctorById,
}