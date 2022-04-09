<script setup lang="ts">
  import { ref } from '@vue/reactivity'
  import { useRoute, useRouter } from 'vue-router'
  import { VaButton, VaButtonGroup } from 'vuestic-ui'
  import Post from './Post.vue'

  const route = useRoute()
  const router = useRouter()
  const sort = ref(route.query.sort || 'hot')

  function setSort(s: string) {
    router.push({ query: { s } })
    sort.value = s
  }

  const next_page = ref(null)
  function buildURL() {
    let url = `https://www.reddit.com/r/${route.params.subreddit}/${sort.value}.json?limit=2`
    if (next_page.value) {
      url += `&after=${next_page.value}`
    }
    return url
  }

  const posts = ref([])
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
  <div class="flex offset--md4 md4">
    <va-button-group style="width:100%">
      <va-button @click="setSort('hot')" :disabled="sort == 'hot'">hot</va-button>
      <va-button @click="setSort('best')" :disabled="sort == 'best'">best</va-button>
      <va-button @click="setSort('top')" :disabled="sort == 'top'">top</va-button>
      <va-button @click="setSort('new')" :disabled="sort == 'new'">new</va-button>
    </va-button-group>

    <div v-if="posts">
      <post v-for="post in posts" :key="post.data.id" :post="post.data" class="post-margin"></post>
    </div>

    <va-button @click="loadPosts()">Next Page</va-button>
  </div>
</template>

<style>
  .post-margin {
    margin: 1rem;
  }
</style>
