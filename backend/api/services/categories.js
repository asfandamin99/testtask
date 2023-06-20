import { Category } from "../models/categories.js";

export function addcategory(category_data) {
    return new Promise(async (resolve, reject) => {
        try {
            category_data = Object.assign(category_data, { created_at: Date.now() })
            const category = new Category(category_data)
            await category.save()
            resolve(category)
        } catch (err) {
            console.error(err)
            reject("Category could not be added")
        }

    })

}


export function findCategory(cat_data) {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await Category.findOne({name:cat_data})
            resolve(category)
        } catch (err) {
            console.error(err)
            reject("Error retreiving category")
        }

    })

}

export function updateCategory(cat_id, cat_data) {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await Category.updateOne({ _id: cat_id }, { $set: cat_data })
            resolve(category)
        } catch (err) {
            console.error(err)
            reject("Error updating category")
        }

    })

}


export function delCategory(cat_data) {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await Category.deleteOne({name:cat_data})
            resolve("Success")
        } catch (err) {
            console.error(err)
            reject("Error deleting category")
        }

    })

}


export function getAllCategoryWithPaging(cat_data) {
    return new Promise(async (resolve, reject) => {
        try {
            let cat_count = await Category.count()
            let cat_all = await Category.find().limit(cat_data.perPage).skip(cat_data.perPage * cat_data.page).sort({_id:cat_data.sort_order})

            let data  = {
                data:cat_all,
                total:cat_count
            }
            // console.log(data)
            resolve(data)

        } catch (err) {
            console.error(err)
            reject("Error retreiving category")
        }

    })

}






