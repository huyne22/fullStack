import db from '../models/index';

let topDoctorService = (limitInput) => {
    return new Promise( async(resolve,reject) => {
        try{
            let users = await db.User.findAll({
                limit : limitInput,
                where : { roleId : 'R2'},
                order: [['createdAt', 'DESC']],
                attributes:{
                    //ko lấy ra password
                    exclude:["password"]
                },
                include: [
                    { model : db.Allcode, as: 'positionData', attributes:['valueEn','valueVi']},
                    { model : db.Allcode, as: 'genderData', attributes:['valueEn','valueVi']}
                ],
                raw : true,
                nest : true,
            })
            resolve({
                errCode : 0,
                data : users
            })
        }catch(e){
            reject(e)
        }
    })
}
let getAllDoctor = () => {
    return new Promise( async(resolve,reject) => {
        try{
            let allDoctors = await db.User.findAll({
                where : { roleId : 'R2'},
                attributes:{
                    //ko lấy ra password
                    exclude:["password","image"]
                },
            })
            resolve({
                errCode : 0,
                data : allDoctors
            })
        }catch(e){
            reject(e)
        }
    })
}
let saveDetailInforDoctor = (inputData) => {
    return new Promise( async(resolve,reject) => {
        try{
            console.log(inputData)
          if(!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown || !inputData.action){
            resolve({
                errCode : -1,
                errMessage : "Missing parameter.."
            })
          }else{
            if(inputData.action === 'CREATE'){
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description : inputData.description,
                    doctorId : inputData.doctorId
                })
            }else if(inputData.action === 'EDIT'){
                let doctorMarkdown = await db.Markdown.findOne({
                    where : { doctorId : inputData.doctorId},
                    raw : false
                })
                if(doctorMarkdown){
                    doctorMarkdown.contentHTML = inputData.contentHTML,
                    doctorMarkdown.contentMarkdown = inputData.contentMarkdown,
                    doctorMarkdown.description = inputData.description,
                    await doctorMarkdown.save();
                }
            }
            resolve({
                errCode : 0,
                errMessage : "Save info doctor success."
            })
          }
        }catch(e){
            reject(e)
        }
    })
}

let getDetailDoctorById = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing parameter..",
                });
            } else {
                let data = await db.User.findOne({
                    where: { id: inputData },
                    attributes: {
                        exclude: ['password'],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['contentHTML','contentMarkdown','description']
                        },
                        {
                            model: db.Allcode,
                            attributes:['valueEn','valueVi'],
                            as: 'positionData'
                        }
                    ],
                    raw: false,
                    nest: true,
                });
                if(data && data.image){
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if(!data) data = {};
                resolve({
                    errCode: 0,
                    data: data, // Trả về dữ liệu bác sĩ đã tìm thấy
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    topDoctorService : topDoctorService,
    getAllDoctor : getAllDoctor,
    saveDetailInforDoctor : saveDetailInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
}