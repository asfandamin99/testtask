import { Car } from "../models/cars.js";


export function addcar(car_data) {
    return new Promise(async (resolve, reject) => {
        try {
            car_data = Object.assign(car_data, { created_at: Date.now() })
            const car = new Car(car_data)
            await car.save()
            resolve(car)
        } catch (err) {
            console.error(err)
            reject("Car could not be added")
        }

    })

}


export function findCar(car_data) {
    return new Promise(async (resolve, reject) => {
        try {
            let car = await Car.findOne({reg_no:car_data})
            resolve(car)
        } catch (err) {
            console.error(err)
            reject("Error retreiving car")
        }

    })

}


export function getAllCarsWithPaging(car_data) {
    return new Promise(async (resolve, reject) => {
        try {
            let car_count = await Car.count()
            let car_all = await Car.find().limit(car_data.perPage).skip(car_data.perPage * car_data.page).sort({_id:car_data.sort_order}).populate({path:"category", select:"name"})

            let data  = {
                data:car_all,
                total:car_count
            }
            // console.log(data)
            resolve(data)

        } catch (err) {
            console.error(err)
            reject("Error retreiving car")
        }

    })

}


export function updateCar(car_id, car_data) {
    return new Promise(async (resolve, reject) => {
        try {
            let car = await Car.updateOne({ _id: car_id }, { $set: car_data })
            resolve(car)
        } catch (err) {
            console.error(err)
            reject("Error updating category")
        }

    })

}


export function delCar(car_data) {
    return new Promise(async (resolve, reject) => {
        try {
            let car = await Car.deleteOne({reg_no:car_data})
            resolve("Success")
        } catch (err) {
            console.error(err)
            reject("Error deleting car")
        }

    })

}