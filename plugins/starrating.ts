import VueStarRating from 'vue-star-rating'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('StarRating', VueStarRating);
});