<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Mobbit</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" :class="{'active': props.sort == 'hot'}" href="#" @click="$emit('changeSort', 'hot')">Hot</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{'active': props.sort == 'best'}" href="#" @click="$emit('changeSort', 'best')">Best</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navTopRange" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Top
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navTopRange">
                            <a class="dropdown-item" href="#" @click="$emit('changeSort', 'top', 'all')">All</a>
                            <a class="dropdown-item" href="#" @click="$emit('changeSort', 'top', 'year')">Year</a>
                            <a class="dropdown-item" href="#" @click="$emit('changeSort', 'top', 'month')">Month</a>
                            <a class="dropdown-item" href="#" @click="$emit('changeSort', 'top', 'week')">Week</a>
                            <a class="dropdown-item" href="#" @click="$emit('changeSort', 'top', 'day')">Day</a>
                            <a class="dropdown-item" href="#" @click="$emit('changeSort', 'top', 'hour')">Hour</a>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{'active': props.sort == 'new'}" href="#" @click="$emit('changeSort', 'new')">New</a>
                    </li>
                </ul>
                <form class="d-flex">
                    <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    const props = defineProps<{ sort: string}>()


</script>
