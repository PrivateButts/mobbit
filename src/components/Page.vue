<script setup lang="ts">
  import { ref } from '@vue/reactivity'
  import { useRoute, useRouter } from 'vue-router'
  import Post from './Post.vue'
  import navbarVue from './navbar.vue';
  import { APIJSONInterface, PostInterface } from '../reddit';

  const route = useRoute()
  const router = useRouter()
  const sort = ref(route.query.sort as string || 'hot')

  function setSort(s: string) {
    router.push({ query: { s } })
    sort.value = s
  }

  const next_page = ref(null)
  function buildURL() {
    let url = `https://www.reddit.com/r/${route.params.subreddit}/${sort.value}.json?limit=10`
    if (next_page.value) {
      url += `&after=${next_page.value}`
    }
    return url
  }

  const posts = ref<PostInterface[]>([])
  function loadPosts() {
    fetch(buildURL()).then(res => {
      res.json().then(data => {
        posts.value.push(...data.data.children)
        next_page.value = data.data.after
      })
    })
  }
  loadPosts()
</script>

<template>
  <navbar-vue @changeSort="setSort" :sort="sort"/>
  <div class="container mt-1 mb-5">

    <div v-if="posts">
      <post v-for="post in posts" :key="post.data.id" :post="post.data" class="post-margin"></post>
    </div>

    <div class="d-grid"><button class="btn btn-primary" @click="loadPosts()">Next Page</button></div>
  </div>
</template>

<style>
  .post-margin {
    margin: 1rem 0;
  }
</style>
