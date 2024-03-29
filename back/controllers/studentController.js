const { use } = require("express/lib/application");
const uuid= require("uuid");
const path = require("path")
const {Student}= require('../models/model')//запрос девайса из базы данных в этот раз мавра
const {Family} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { json } = require("express/lib/response");

class StudentController {
    async create(req,res,next)  // создание студентишка
    {
        try{
            let {name, fullname, class_ID, birthday, group_of_risk,family_id,PFDO,sex} = req.body// берем с тела реквеста  значения полей
            //const {img} = req.files
           // let fileName = uuid.v4() + ".jpg"// если было значение файла, то мы кидаем в статику файл, и прикрепляем название картинки в базу данных
           // img.mv(path.resolve(__dirname, '..', 'static', fileName))

            /*if(info){
                info= JSON.parse(info)
                info.forEach(i=>
                    studentInfo.create({
                        title: i.title,
                        description: i.description,
                        studentId: student.id
                    })
                    )
            }*/



            const student = await Student.create({name, fullname, class_ID, birthday, group_of_risk,family_id,PFDO,sex});
            return res.json(student)
        }
        catch(e)
        {
            next(ApiError.badRequest(e.message))
        }
    }
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------




//-------------------------------------------------------------------------------------------------------------------------------
    async getALL(req,res) 
    { let {class_ID, family_id, limit, page}= req.query
        page = page || 1
        limit = limit || 30
        let ofset =(page-1)*limit


        let classes;
        if(!class_ID && !family_id){
            classes= await Student.findAndCountAll({limit,ofset})//FindAll Находит всех, а финдэндкаунт еще и  выдает фронту количевство
        }
            else if(class_ID && !family_id){
                classes= await Student.findAndCountAll({where: {class_ID},limit,ofset})

            }
                else if(!class_ID && family_id){
                    classes= await Student.findAndCountAll({where: {family_id},limit,ofset})

                }
                    else if(class_ID && family_id){
                        classes= await Student.findAndCountAll({where: {family_id, class_ID},limit,ofset})

                    }
                    return res.json(classes)
    }
    //------------------------------------------------------------------------------------------





    //------------------------------------------------------------------------------------------
    async getCLASS(req,res) 
    { let {class_ID, /*limit, page*/}= req.query


        let classes;
       if(class_ID ){
                classes= await Student.findAll({where: {class_ID}/*,limit,ofset*/})

            }
                
                    else {
                        return next(ApiError.badrequest('поле класса пустое'))

                    }
                    return res.json(classes)
    }
    //------------------------------------------------------------------------------------------
    

    async studred2(req,res,next)
    {let {id,class_ID,name,fullname,birthday,group_of_risk,family_id,PFDO,sex }= req.body
    if(!id){
        return next(ApiError.badrequest('отсутствует айди'))
    }
    let candidate = await Student.findOne({where:{id}})
    class_ID=class_ID ||candidate.class_ID
    name=name||   candidate.name
    fullname=fullname|| candidate.fullname
    birthday=birthday|| candidate.birthday
    group_of_risk=group_of_risk||candidate.group_of_risk
    family_id=family_id||candidate.family_id
    PFDO=PFDO||candidate.PFDO
    sex=sex||candidate.sex
    
    if(!candidate) return next(ApiError.badrequest('событие не найдено'))
    await Student.update({ class_ID,name,fullname,birthday,group_of_risk,family_id,PFDO,sex},
      {
        where: {id}
      });
        let candidate1 = await Student.findOne({where:{id}})     
        return res.json(candidate1)
    }



    //------------------------------------------------------------------------------------------
    async getFAMILY(req,res) 
    { let {family_id, /*limit, page*/}= req.body


        let classes;
       if(family_id ){
                classes= await Student.findAll({where: {family_id}/*,limit,ofset*/})

            }
                
                    else {
                        return next(ApiError.badrequest('поле семьи пустое'))

                    }
                    return res.json(classes)
    }
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    async getSOME(req, res) {
    let { class_ID, family_id, limit = 9999, page = 1 } = req.body;
    let offset = (page - 1) * limit;

    // Объект для хранения условий запроса
    let condition = {};

    // Если указан class_ID, добавляем его в условие
    if (class_ID) {
        condition.class_ID = class_ID;
    }

    // Если указан family_id, добавляем его в условие
    if (family_id) {
        condition.family_id = family_id;
    }

    // Если не указаны оба поля, возвращаем ошибку
    if (!class_ID && !family_id) {
        return next(ApiError.badrequest('поля пусты'));
    }

    // Выполняем запрос с сформированными условиями
    let classes = await Student.findAll({ where: condition, limit, offset });

    return res.json(classes);
}

//------------------------------------------------------------------------------------------
async getONE(req,res) 
{let {id}= req.body
if(id){
    let stud=Student.findAll({where: {id} })
    return res.json(stud)
} else return next(ApiError.badrequest('поля пусты'))     
}



async getBRO(req,res) 
{let {id}= req.body
if(id){
let stud=Student.findAll({where: {id} })
id=stud.family_id;
let fam=Family.findAll({where: {id} })
let info= JSON.stringify(JSON.parse(fam).concat(JSON.parse(stud)));
return res.json(info)
} else return next(ApiError.badrequest('поля пусты'))     
}




//------------------------------------------------------------------------------------------   
    async delete(req,res) 
    {let {id}= req.body
    if(id){
    let stud =Student.findOne({where: {id} })
     if (stud){
    Student.destroy({where: {id} })
    if (stud.family_id)
    {
        family_id=stud.family_id;
        stud=Student.findAll({where: {family_id} })
        if(!stud)
        {id=family_id
            Family.destroy({where: {id} })


        }
    }
    return res.json({message: "удаление успешно"})}
    return next(ApiError.badrequest('ученик не найден')) 
    } else return next(ApiError.badrequest('поля пусты'))     
    }
   
    async getADDEDUC(req,res,next) 
    {try{
        const {id } = req.body
        Student.findOne({where: {id}})
        .then(event=>{
            if(!event) return next(ApiError.badrequest('некорректный айди'));
            event.getAdditional_educations().then(courses=>{
                return res.json(courses)
               
                /*for(course of courses){
                    console.log(course.name);
                }*/
            });
        });
    }
    catch(e)
    {
        return ApiError.badRequest(e.message)
    }}
    





}
module.exports= new StudentController()
