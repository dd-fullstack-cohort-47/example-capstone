import {z} from 'zod'
import {LikeSchema} from "./like.validator";
import {sql} from "../../utils/database.utils";

// The shape of a like object
export type Like = z.infer<typeof LikeSchema>

/**
 * inserts a like into the like table and returns a message
 * @param like to be inserted
 * @returns 'Like successfully posted'
 */
export async function insertLike(like: Like): Promise<string> {


        const {likeProfileId, likeThreadId} = like

        // insert the like into the like table
        await sql`INSERT INTO "like" (like_profile_id, like_thread_id, like_datetime)
                VALUES (${likeProfileId}, ${likeThreadId}, NOW())`

        // return a message to the user indicating success
        return 'Like successfully posted'
}

/**
 * selects a like from the like table by likeId and returns the like
 * @param like to be selected by likeId
 * @returns the like that was selected
 * @returns null if no like was found
 */
export async function selectLikeByLikeId(like: Like): Promise<Like | null> {
        const {likeProfileId, likeThreadId} = like
        const rowList = <Like[]> await sql`SELECT like_profile_id, like_thread_id, like_datetime FROM "like" WHERE like_profile_id = ${likeProfileId} AND like_thread_id = ${likeThreadId}`
        const result = LikeSchema.array().max(1).parse(rowList)
        return result.length === 0 ? null : result[0]
}

export async function deleteLike(like: Like): Promise<string> {
        console.log(like)
        const {likeProfileId, likeThreadId} = like
        await sql`DELETE FROM "like" WHERE like_profile_id = ${likeProfileId} AND like_thread_id = ${likeThreadId}`
        return 'Like successfully deleted'
}

export async function selectLikesByLikeThreadId(likeThreadId: string): Promise<Like[]> {
        const rowList = <Like[]> await sql`SELECT like_profile_id, like_thread_id, like_datetime FROM "like" WHERE like_thread_id = ${likeThreadId}`
        return LikeSchema.array().parse(rowList)
}