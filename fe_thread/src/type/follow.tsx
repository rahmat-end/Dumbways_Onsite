export type IFollow = {
    id: number
    fullname: string
    username: string
    profile_picture: string
    profile_description: string
}

export type IFollowPost = {
    followerId: number
    followedId: number
}