export interface IThreadCard {
    id: number
    author_picture: string
    author_fullname: string
    author_username: string
    posted_at: string
    content: string
    image: string
    // likes_count: number
    // replies_count: number
    // is_like: number
    // is_reply: number
}

export type IThreadPost = {
    content: string
    image: Blob | MediaSource | string
    user: number
  }