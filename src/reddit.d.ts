export type PostDataInterface = {
    id: string
    title: string
    subreddit: string
    url: string
    permalink: string
    post_hint: "image" | "link" | "hosted:video"
    is_self: boolean
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