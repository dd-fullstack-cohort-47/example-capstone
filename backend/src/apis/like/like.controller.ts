import { Request, Response } from 'express'
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


        const {likeThreadId} = request.params


        const data = await selectLikesByLikeThreadId(likeThreadId)


        return response.json({status: 200, message: null, data})
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function toggleLikeController(request: Request, response: Response): Promise<Response<string>> {
    try {


        const {likeThreadId} = request.body


        const profile = request.session.profile

        // @ts-ignore
        const likeProfileId = profile.profileId


        const like: Like = {
            likeProfileId,
            likeThreadId,
            likeDatetime: null
        }


        const status: Status = {
            status: 200,
            message: '',
            data: null
        }


        const selectedLike: Like | null = await selectLikeByLikeId(like)


        if (selectedLike === null) {
            status.message = await insertLike(like)
        } else {
            status.message = await deleteLike(like)
        }


        return response.json(status)


    } catch (error: any) {
        return (response.json({status: 500, data: null, message: error.message}))
    }
}

export async function postLikeController (request: Request, response: Response): Promise<Response<string>> {
    try {


        const {likeThreadId} = request.body


        const profile = request.session.profile as Profile


        const likeProfileId = profile.profileId as string


        const like: Like = {
            likeProfileId,
            likeThreadId,
            likeDatetime: null
        }


        const status: Status = {
            status: 200,
            message: '',
            data: null
        }


            status.message = await insertLike(like)


        return response.json(status)


    } catch (error: any) {
        return (response.json({ status: 500, data: null, message: error.message }))
    }
}

export async function deleteLikeController (request: Request, response: Response): Promise<Response<string>> {
    try {


        const {likeThreadId} = request.params


        const profile = request.session.profile as Profile


        const likeProfileId = profile.profileId as string


        const like: Like = {
            likeProfileId,
            likeThreadId,
            likeDatetime: null
        }


        const status: Status = {
            status: 200,
            message: '',
            data: null
        }


        status.message = await deleteLike(like)


        return response.json(status)


    } catch (error: any) {
        return (response.json({ status: 500, data: null, message: error.message }))
    }
}