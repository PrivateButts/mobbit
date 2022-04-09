<script setup lang="ts">
import { ref, computed } from 'vue'
import { VaCard, VaCardTitle, VaCardContent, VaImage } from 'vuestic-ui'



type PostInterface = {
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

const props = defineProps<{ post: PostInterface }>()
const embedUrl = computed(() => {
  let url = "https://www.redditmedia.com" + props.post.permalink + "?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark"
  return url
})

</script>

<template>
  <va-card>
    <va-card-title><a :href="post.url" target="_blank">{{ post.title }}</a></va-card-title>
    <va-card-content>
      <iframe v-if="post.post_hint == 'link'" :src="post.url" />
      <iframe v-if="post.post_hint == 'hosted:video'" :src="post.secure_media.reddit_video.fallback_url" />
      <iframe v-if="post.is_self" :src="embedUrl" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" height="126" width="640" scrolling="no"></iframe>
    </va-card-content>
    <va-image v-if="post.post_hint == 'image'" :src="post.url" :alt="post.title" contain></va-image>
  </va-card>
</template>

<style scoped>
  iframe {
    width: 100%;
    height: 400px;
  }

  img {
    max-height: 400px;
  }
</style>
