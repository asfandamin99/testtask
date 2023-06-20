import { User } from "../models/user.js";

export function registerUser(user_data) {
    return new Promise(async (resolve, reject) => {
        try {
            let customer = new User(user_data)
            await customer.save()
            resolve("User registered successfully")
        } catch (err) {
            console.error(err)
            reject("User could not be registered")
        }

    })

}

export function findUserByContact(contact) {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({ contact})
            resolve(user)
        } catch (err) {
            console.error(err)
            reject("Error retreiving user")
        }

    })

}

export function findUserByID(user_id) {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({ _id: user_id })
            resolve(user)
        } catch (err) {
            console.error(err)
            reject("Invalid User ID")
        }

    })

}







