import { Session } from "../models/sessions.js";

export function addSession(session_data) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = new Session(Object.assign(session_data, { created_at: Date.now() }))
            await session.save()
            resolve("Session added")
        } catch (err) {
            console.error(err)
            reject("Session could not be added")
        }

    })

}

export function getSession(user_id) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await Session.findOne({ user_id: user_id })
            resolve(session)
        } catch (err) {
            console.error(err)
            reject("Error retreiving sessions")
        }

    })
}

export function token_exists(user_id, token) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await Session.findOne({ user_id, token })
            resolve(session)
        } catch (err) {
            console.error(err)
            reject("Error retreiving sessions")
        }

    })
}

export function removeAllSessions(user_id) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await Session.updateMany({ user_id: user_id })
            resolve(session)
        } catch (err) {
            console.error(err)
            reject("Error removing sessions")
        }

    })
}

export function removeSession(user_id, device_id) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await Session.deleteOne({ user_id})
            resolve(session)
        } catch (err) {
            console.error(err)
            reject("Error removing sessions")
        }

    })
}