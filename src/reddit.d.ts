export type PostDataInterface = {
    id: string
    title: string
    subreddit: string
    url: string
    permalink: string
    post_hint: "image" | "link" | "hosted:video"
    is_self: boolean
    score: number
    link_flair_text: string
    link_flair_background_color: string
    created: number
    author: string
    secure_media: {
        reddit_video: {
            fallback_url: string
        }
    }
}

export type PostInterface = {
    kind: string
    data: PostDataInterface
}

export type APIJSONInterface = {
    kind: "Listing"
    data: {
        after: string
        children: [PostInterface]
    }
}