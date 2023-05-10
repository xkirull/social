export type SessionUserId = number

export type Session = {
  accessToken: string
  userId: SessionUserId
}

export type User = {
  id: number
  email: string
}
