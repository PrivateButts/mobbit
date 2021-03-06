<script setup lang="ts">
import { ref, computed } from 'vue'
import { PostDataInterface } from '../reddit';
import gallery from './gallery.vue';
import imgur from './imgur.vue';
import Tweet from "vue-tweet";
import {decode} from 'html-entities';


const props = defineProps<{ post: PostDataInterface }>()
const embedUrl = computed(() => {
  let url = "https://www.redditmedia.com" + props.post.permalink + "?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark"
  return url
})

const dateDisplay = computed(() => {
  let date = new Date(props.post.created * 1000)
  return date.toLocaleString()
})

function extractTweetId(url: string) {
  let regex = /https:\/\/twitter\.com\/[^\/]+\/status\/([\d^\/]+)/
  let match = url.match(regex)
  if (match) {
    return match[1]
  }
  return null
}

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
      <div class="d-flex justify-content-center post-content">
        <imgur v-if="post.url.includes('imgur.com/a/')" :url="post.url" />
        <div v-else-if="post.url.includes('twitter.com')" class="overflow-auto">
          <tweet :tweet-id="extractTweetId(post.url)" :dnt="true"/>
        </div>
        <img v-else-if="post.post_hint == 'link' && post.url.includes('imgur.com')" :src="post.url + '.jpeg'" :alt="post.title" class="post-img" />
        <iframe v-else-if="post.post_hint == 'link'" :src="post.url" />
        <div v-if="post.post_hint == 'rich:video'" v-html="decode(post.media.oembed.html)" class="rich-video-embed"></div>
        <video v-if="post.post_hint == 'hosted:video'" controls class="post-video">
          <source :src="post.secure_media.reddit_video.fallback_url" type="video/mp4">
        </video>
        <iframe v-if="post.is_self" :src="embedUrl" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" height="400" scrolling="no"></iframe>
        <img v-if="post.post_hint == 'image'" :src="post.url" :alt="post.title" class="post-img" />
        <gallery v-if="post.is_gallery && post.media_metadata" :post_id="post.id" :media="post.media_metadata" />
      </div>
      <a :href="'https://reddit.com' + post.permalink" class="btn btn-primary mt-1" target="_blank">View Comments</a>
    </div>
  </div>
</template>

<style>
  div.rich-video-embed iframe {
    width: 100%;
    height: 100%;
    position: inherit !important;
  }
</style>

<style scoped>
  iframe {
    width: 100%;
    /* height: 80vh; */
  }

  .rich-video-embed {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 768px) {
    .post-content {
      height: 60vh;
    }
  }
  

  .post-img {
    /* max-height: 400px; */
    object-fit: contain;
    max-width: 100%;
    height: 100%;
  }

  .post-video {
    width: 100%;
  }
</style>
