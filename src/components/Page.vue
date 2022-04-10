<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import Post from './Post.vue'
import navbarVue from './navbar.vue';
import { APIJSONInterface, PostInterface, PostDataInterface } from '../reddit';

const route = useRoute()
const router = useRouter()
const sort = ref('hot')
const top_range = ref('all')
if (route.query.s) {
  console.log(route.query.s)
  sort.value = route.query.s as string
  if (route.query.s === 'top') {
    top_range.value = route.query.t as string
  }
}

function setSort(s: string, t: string = 'all') {
  if (s === 'top') {
    router.push({
      query: {
        s: s,
        t: t
      }
    })
    top_range.value = t
  } else {
    router.push({
      query: {
        s: s
      }
    })
  }
  sort.value = s
  after_flag.value = null
  posts.value = []
  loadPosts()
}

const after_flag = ref(null)
function buildURL() {
  let url = `https://www.reddit.com/r/${route.params.subreddit}/${sort.value}.json?limit=10`
  if (after_flag.value) {
    url += `&after=${after_flag.value}`
  }
  if(sort.value === 'top') {
    url += `&t=${top_range.value}`
  }
  return url
}

const posts = ref<PostInterface[]>([])
function loadPosts() {
  fetch(buildURL()).then(res => {
    res.json().then(data => {
      let newPosts = data.data.children
      newPosts = newPosts.map((post: { data: { crosspost_parent_list: string|any[]; }; }) => {
        if(post.data.crosspost_parent_list && post.data.crosspost_parent_list.length > 0) {
          return {...post, data: {...post.data.crosspost_parent_list[0]}, crosspost: true}
        } else {
          return post
        }
      })
      console.log ("asdfasdfasdf")
      posts.value.push(...newPosts)
      after_flag.value = data.data.after
    })
  })
}
loadPosts()
</script>

<template>
  <navbar-vue @changeSort="setSort" :sort="sort" />
  <div class="container mt-1 mb-5">
    <div v-if="posts">
      <post v-for="post in posts" :key="post.data.id" :post="post.data" class="post"></post>
    </div>

    <div class="d-grid">
      <button class="btn btn-primary" @click="loadPosts()">Next Page</button>
    </div>
  </div>
</template>

<style scoped>
.post {
  margin: 1rem 0;
}
</style>
