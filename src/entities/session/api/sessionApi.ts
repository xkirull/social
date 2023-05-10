import { baseApi, SESSION_TAG, WISHLIST_TAG } from 'shared/api'
import { mapSession, mapUser } from '../lib'
import { type User, type Session } from '../model/types'
import { type UserDto, type RequestLoginBody, type SessionDto } from './types'

export const sessionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<Session, RequestLoginBody>({
            query: (body) => ({
                url: `/api/login`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [SESSION_TAG, WISHLIST_TAG],
            transformResponse: (response: SessionDto) => mapSession(response),
        }),

        me: build.query<User, void>({
            query: () => ({
                url: `/me`,
            }),
            providesTags: [SESSION_TAG],
            transformResponse: (response: UserDto) => mapUser(response),
        }),
    }),
})

export const { useLoginMutation, useMeQuery } = sessionApi
