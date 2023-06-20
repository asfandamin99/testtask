// Controller files imports services from the services section which handles the DB queries

import Joi from "joi";

import { addcategory, findCategory, getAllCategoryWithPaging, delCategory, updateCategory} from "../services/categories.js";

// Adding category 
export let Add_Category = async (req, res, next) => {
  let validation_schema = Joi.object({
    name: Joi.string().required(),
  });

  let { error, value } = validation_schema.validate(req.body, {
    allowUnknown: false,
  });
  if (error) {
    return res.status(400).json({ error: true, info: error.message });
  }
  try {
    let category = await findCategory(req.body.name);
    if (category && category.name === req.body.name) {
      return res.json({ error: false, info: "Category Already exists" });
    }
    if (!category) {
      let newcat = await addcategory(req.body);
      return res.json({
        error: false,
        info: "Successfully category Added",
        data: newcat,
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: true, info: "Could not add category" });
  }
};

// deleting category
export let Del_Category = async (req, res, next) => {
  let validation_schema = Joi.object({
    name: Joi.string().required(),
  });

  let { error, value } = validation_schema.validate(req.body, {
    allowUnknown: false,
  });
  if (error) {
    return res.status(400).json({ error: true, info: error.message });
  }
  try {
    let category = await delCategory(req.body.name);
    return res.json({ error: false, info: "Category Deleted"});
    
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: true, info: "Could not delete category" });
  }
};

// updating category
export let Update_Category = async (req, res, next) => {
  let validation_schema = Joi.object({
    name: Joi.string().required(),
    newname:Joi.string().required(),
  });

  let { error, value } = validation_schema.validate(req.body, {
    allowUnknown: false,
  });
  if (error) {
    return res.status(400).json({ error: true, info: error.message });
  }
  try {
    let cat = await findCategory(req.body.name);
    
    console.log(cat)
    if(cat){
    let upd_cat = await updateCategory(cat._id,{name:req.body.newname})
    return res.json({ error: false, info: "Category Update"});
  }else{
    return res.json({ error: false, info: "Category not found"});
  }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: true, info: "Could not update category" });
  }
};

// getting all the categories 
export let Get_ALL_Category_Paginated = async (req, res, next) => {
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

    let all_cat = await  getAllCategoryWithPaging({page:page , perPage:perPage, sort_order:sort_order})

    if(all_cat){
    let data ={
      pagination:{
        count: perPage,
        page: ppage,
        pages:Math.ceil(all_cat.total/ perPage),
        size:all_cat.total
      },
      categories:all_cat.data
    }
    return res.json({ error: false, info: "All Categories" , data:data});
  }

  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: true, info: "Could not find all categories" });
  }
};
