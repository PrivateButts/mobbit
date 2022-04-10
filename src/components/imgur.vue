<template>
    <div class="overflow-auto">
        <blockquote class="imgur-embed-pub" lang="en" :data-id="'a/'+imgurId">
            <a :href="url"></a>
        </blockquote>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

const props = defineProps<{ url: string }>()

const imgurId = computed(() => {
    return props.url.split('/')[4]
})

nextTick(() => {
    window.imgurEmbed.createIframe()
})
</script>

<style>
.imgur-embed-pub {
    margin: 0 auto;
    max-width: 100%;
    width: 100%;
}
</style>