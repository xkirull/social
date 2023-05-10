import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi } from 'entities/session'
import { LoginFormSchema } from './LoginFormShema'
import { isFetchBaseQueryError } from 'shared/api/isFetchBaseQueryError'

// @ts-ignore
export const loginThunk = createAsyncThunk<void, LoginFormSchema, { state: RootState }>(
  'authentication/login',
  async (body: LoginFormSchema, { dispatch }) => {
    try {
      await dispatch(sessionApi.endpoints.login.initiate(body)).unwrap()
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if (typeof error.data === 'string') {
          throw new Error(error.data)
        }
      }

      throw new Error('Unknown error')
    }
  }
)
