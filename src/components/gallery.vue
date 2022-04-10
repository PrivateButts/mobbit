<template>
    <div class="d-flex flex-column">
        <div class="flex-grow-2" style="height:90%">
            <img
                class="gallery-img"
                :src="activeImg"
            />
        </div>
        <div class="btn-group flex-shrink-1">
            <button class="btn btn-secondary" @click="activeImgIndex--">Prev</button>
            <button class="btn btn-secondary" disabled>{{(activeImgIndex%imgArray.length)+1}}/{{imgArray.length}}</button>
            <button class="btn btn-secondary" @click="activeImgIndex++">Next</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { objectToString } from '@vue/shared';
import { computed, ref } from 'vue'
import { GalleryData } from '../reddit'
import {decode} from 'html-entities';

const props = defineProps<{ post_id: string, media: GalleryData }>()

const imgArray = computed(() => {
    return Object.entries(props.media).map(entry => {
        return entry[1]
    })
})
const activeImgIndex = ref(0)
const activeImg = computed(() => {
    let index = activeImgIndex.value % imgArray.value.length
    index = Math.abs(index)
    return decode(imgArray.value[index].s.u)
})
</script>

<style scoped>
.gallery-img {
    /* max-height: 400px; */
    object-fit: contain;
    /* max-width: 100%; */
    /* height: 100%; */
    height: 100%;
    max-width: 100%;
    min-width: 0%;
}
</style>