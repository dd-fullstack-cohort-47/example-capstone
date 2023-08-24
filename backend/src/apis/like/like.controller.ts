import {Request, Response} from 'express'
import {deleteLike, insertLike, Like, selectLikeByLikeId, selectLikesByLikeThreadId} from "./like.model";
import {Profile} from "../profile/profile.model";
import {Status} from "../../utils/interfaces/Status";

/**
 * Handles GET request for all likes associated with a thread
 * @param request object containing the like thread id
 * @param response object containing the status of the request and the likes associated with the thread
 */
export async function getLikesByLikeThreadIdController(request: Request, response: Response): Promise<Response> {
    try {

        // deconstruct the like thread id from the request parameters
        const {likeThreadId} = request.params

        // select the likes by like thread id
        const data = await selectLikesByLikeThreadId(likeThreadId)

        // return the status and the likes associated with the thread
        return response.json({status: 200, message: null, data})

        // if an error occurs, return the error to the user
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

/**
 * Handles POST request to toggle a like on a thread by inserting or deleting a like from the like table
 * @param request object containing the like thread id
 * @param response object containing the status of the request
 * @returns status object indicating whether the like was inserted or deleted
 */
export async function toggleLikeController(request: Request, response: Response): Promise<Response<string>> {
    try {

        // deconstruct the like thread id from the request body
        const {likeThreadId} = request.body

        // deconstruct the profile from the session
        const profile = request.session.profile

        // @ts-ignore
        // deconstruct the profile id from the profile
        const likeProfileId = profile.profileId

        // create a like object
        const like: Like = {
            likeProfileId,
            likeThreadId,
            likeDatetime: null
        }

        // create a status object
        const status: Status = {
            status: 200,
            message: '',
            data: null
        }

        // select the like by like id to determine if the like should be inserted or deleted
        const selectedLike: Like | null = await selectLikeByLikeId(like)

        // if the like is null, insert the like into the like table
        if (selectedLike === null) {
            status.message = await insertLike(like)
            // if the like is not null, delete the like from the like table
        } else {
            status.message = await deleteLike(like)
        }

        // return the status to the user
        return response.json(status)

        // if an error occurs, return the error to the user
    } catch (error: any) {
        return (response.json({status: 500, data: null, message: error.message}))
    }
}

/**
 * Handles POST request to insert a like into the like table
 * @param request object containing the like thread id and the profile id
 * @param response object containing the status of the request
 * @returns status object indicating if the like was inserted
 */
export async function postLikeController(request: Request, response: Response): Promise<Response<string>> {
    try {

        // deconstruct the like thread id from the request body
        const {likeThreadId} = request.body

        // deconstruct the profile from the session
        const profile = request.session.profile as Profile

        // deconstruct the profile id from the profile
        const likeProfileId = profile.profileId as string

        // create a like object
        const like: Like = {
            likeProfileId,
            likeThreadId,
            likeDatetime: null
        }

        // create a status object
        const status: Status = {
            status: 200,
            message: '',
            data: null
        }

        // insert the like into the like table
        status.message = await insertLike(like)

        // return the status to the user
        return response.json(status)

        // if an error occurs, return the error to the user
    } catch (error: any) {
        return (response.json({status: 500, data: null, message: error.message}))
    }
}

/**
 * Handles DELETE request to delete a like from the like table
 * @param request object containing the like thread id
 * @param response object containing the status of the request
 * @returns status object indicating if the like was deleted
 */
export async function deleteLikeController(request: Request, response: Response): Promise<Response<string>> {
    try {

        // deconstruct the like thread id from the request parameters
        const {likeThreadId} = request.params

        // deconstruct the profile from the session
        const profile = request.session.profile as Profile

        // deconstruct the profile id from the profile
        const likeProfileId = profile.profileId as string

        // create a like object
        const like: Like = {
            likeProfileId,
            likeThreadId,
            likeDatetime: null
        }

        // create a status object
        const status: Status = {
            status: 200,
            message: '',
            data: null
        }

        // delete the like from the like table
        status.message = await deleteLike(like)

        // return the status to the user
        return response.json(status)

        // if an error occurs, return the error to the user
    } catch (error: any) {
        return (response.json({status: 500, data: null, message: error.message}))
    }
}