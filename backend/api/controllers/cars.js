// Controller files imports services from the services section which handles the DB queries

import Joi from "joi";

import { addcar, findCar , getAllCarsWithPaging , updateCar , delCar} from "../services/car.js";


// this controller helps to add the cars in the system
export let Add_Car = async (req, res, next) => {
  let validation_schema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    color: Joi.string().required(),
    reg_no: Joi.string().required(),
    category: Joi.string().required(),
  });

  let { error, value } = validation_schema.validate(req.body, {
    allowUnknown: false,
  });
  if (error) {
    return res.status(400).json({ error: true, info: error.message });
  }
  try {
    let car = await findCar(req.body.reg_no);
    if (car &&  car.reg_no === req.body.reg_no) {
      return res.json({ error: false, info: "Car Already exists" });
    }
else{
     let newcar = await addcar({make:req.body.make, model:req.body.model, color:req.body.color, reg_no:req.body.reg_no, category:req.body.category})
    return res.json({
      error: false,
      info: "Car Added",
      data: newcar,
    });
}
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: true, info: "Could not add car" });
  }
};




// this controller gets all the cars list in the system 
export let Get_ALL_Cars_Paginated = async (req, res, next) => {
    let validation_schema = Joi.object({
      page: Joi.number(),
      perPage: Joi.number(),
      sort_order: Joi.number(),
  
  
    });
  
    let { error, value } = validation_schema.validate(req.body, {
      allowUnknown: false,
    });
    if (error) {
      return res.status(400).json({ error: true, info: error.message });
    }
    try {
      let page = 0;
      let ppage = 0;
      let perPage = 20;
      let total = 0;
      let sort_order = "-1";
  
      if (req.body) {
        if (req.body.page) {
          page = req.body.page - 1;
          ppage = req.body.page;
        }
        if (req.body.count) {
          perPage = req.body.count;
        }
        if (req.body.sort_order) {
          sort_order = req.body.sort_order;
        }
      }
  
      let all_car = await  getAllCarsWithPaging({page:page , perPage:perPage, sort_order:sort_order})
  
      if(all_car){
      let data ={
        pagination:{
          count: perPage,
          page: ppage,
          pages:Math.ceil(all_car.total/ perPage),
          size:all_car.total
        },
        all_vehicles:all_car.data
      }
      return res.json({ error: false, info: "All Cars" , data:data});
    }
  
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: true, info: "Could not find  all cars" });
    }
  };
  
// this controller updates the cars  
  export let Update_Car = async (req, res, next) => {
    let validation_schema = Joi.object({
        old_reg_no: Joi.string().required(),
        new_make: Joi.string().required(),
        new_model: Joi.string().required(),
        new_color: Joi.string().required(),
        new_reg_no: Joi.string().required(),
        new_category: Joi.string().required(),
    });
  
    let { error, value } = validation_schema.validate(req.body, {
      allowUnknown: false,
    });
    if (error) {
      return res.status(400).json({ error: true, info: error.message });
    }
    try {
      let car = await findCar(req.body.old_reg_no);
      
      console.log(car)
     if(car){
      let upd_car = await updateCar(car._id,{make:req.body.new_make, model:req.body.new_model, color:req.body.new_color, reg_no:req.body.new_reg_no, category:req.body.new_category})
      return res.json({ error: false, info: "Car Updated"});
    }else{
      return res.json({ error: false, info: "Car not found"});

    }
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: true, info: "Could not update car" });
    }
  };
  
// this controller deletes the cars 
  export let Del_Car = async (req, res, next) => {
    let validation_schema = Joi.object({
      reg_no: Joi.string().required(),
    });
    https://regexr.com/3c53v
    if (error) {
      return res.status(400).json({ error: true, info: error.message });
    }
    try {
      let car = await delCar(req.body.reg_no);
      return res.json({ error: false, info: "Car Deleted"});
      
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: true, info: "Could not delete car" });
    }
  };
  