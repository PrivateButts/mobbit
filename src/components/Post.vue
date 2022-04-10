<script setup lang="ts">
import { ref, computed } from 'vue'
import { PostDataInterface } from '../reddit';

const props = defineProps<{ post: PostDataInterface }>()
const embedUrl = computed(() => {
  let url = "https://www.redditmedia.com" + props.post.permalink + "?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark"
  return url
})

const dateDisplay = computed(() => {
  let date = new Date(props.post.created * 1000)
  return date.toLocaleString()
})

</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title"><a :href="post.url" target="_blank" class="text-reset text-decoration-none">{{ post.title }}</a></h5>
      <h6 class="card-subtitle mb-1">
        <span :class="{'text-danger': post.score > 0, 'text-info': post.score < 0}">{{post.score}} pts</span> |
        {{dateDisplay}} |
        {{post.post_hint}}
      </h6>
      <h6 class="card-subtitle mb-3">
        <a href="https://reddit.com/u/{{post.author}}" target="_blank">u/{{post.author}}</a> |
        <a href="https://reddit.com/r/{{post.subreddit}}" target="_blank">r/{{post.subreddit}}</a>
      </h6>
      <div>
        <iframe v-if="post.post_hint == 'link'" :src="post.url" />
        <!-- <iframe v-if="post.post_hint == 'hosted:video'" :src="post.secure_media.reddit_video.fallback_url" /> -->
        <video v-if="post.post_hint == 'hosted:video'" controls class="post-video">
          <source :src="post.secure_media.reddit_video.fallback_url" type="video/mp4">
        </video>
        <iframe v-if="post.is_self" :src="embedUrl" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" height="400" scrolling="no"></iframe>
        <img v-if="post.post_hint == 'image'" :src="post.url" :alt="post.title" class="post-img" />
        <a :href="'https://reddit.com' + post.permalink" class="btn btn-primary mt-1" target="_blank">View Comments</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
  iframe {
    width: 100%;
    height: 400px;
  }

  .post-img {
    /* max-height: 400px; */
    object-fit: contain;
    width: 100%;
  }

  .post-video {
    width: 100%;
  }
</style>
