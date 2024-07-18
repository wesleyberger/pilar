<template>
  <div>
    <section>
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-4">
          <label class="flex items-center cursor-pointer">
            <strong class="mr-2">Trending </strong>
            <div class="relative mx-2">
              <input type="checkbox" v-model="isTrendingWeekly" class="sr-only" />
              <div class=" bg-cyan-700 w-32 px-2 h-6 rounded-full flex justify-between"><span
                  class="text-white">today</span><span class="text-white">week</span> </div>
              <div class="dot absolute left-0 top-0 bg-slate-300 opacity-40 w-16 h-6 rounded-full transition-transform"
                :class="isTrendingWeekly ? 'transform translate-x-full bg-blue-500' : ''"></div>
            </div>
          </label>
        </div>
        <div v-if="movies.length" class="flex overflow-x-auto space-x-4 pb-4">
          <div v-for="item in movies" :key="item.id" class="bg-white shadow-md rounded p-4 flex-shrink-0 cursor-pointer"
            @click="goToMovieDetails(item.id)" style="width: 200px">
            <div class="h-64">
              <img :src="'https://image.tmdb.org/t/p/w200' + item.poster_path" alt="Poster"
                class="w-full h-auto rounded mb-4" />
            </div>
            <p class="text-sm font-semibold h-20">{{ item.title ? item.title : item.name }}</p>
            <span class="text-yellow-500 mr-2 relative">★ <span class="text-sm text-black">{{ item.vote_average
                }}</span></span>
          </div>
        </div>
      </div>
    </section>
    <section class="mt-16">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-4">
          <label class="flex items-center cursor-pointer">
            <strong class="mr-2">Most Popular</strong>
            <div class="relative mx-2">
              <input type="checkbox" v-model="isMostPopular" class="sr-only" />
              <div class=" bg-cyan-700 w-32 px-2 h-6 rounded-full flex justify-between"><span class="text-white">on
                  tv</span><span class="text-white">movie</span> </div>
              <div class="dot absolute left-0 top-0 bg-slate-300 opacity-40 w-16 h-6 rounded-full transition-transform"
                :class="isMostPopular ? 'transform translate-x-full bg-blue-500' : ''"></div>
            </div>
          </label>
        </div>
        <div v-if="movies.length" class="flex overflow-x-auto space-x-4 pb-4">
          <div v-for="item in mostPopular" :key="item.id"
            class="bg-white shadow-md rounded p-4 flex-shrink-0 cursor-pointer" @click="goToMovieDetails(item.id)"
            style="width: 200px">
            <div class="h-64">
              <img :src="'https://image.tmdb.org/t/p/w200' + item.poster_path" alt="Poster"
                class="w-full h-auto rounded mb-4" />
            </div>
            <p class="text-sm font-semibold h-24">{{ item.title ? item.title : item.name }}</p>
            <span class="text-yellow-500 mr-2">★ <span class="text-sm text-black">{{ item.vote_average }}</span></span>
            <div class="mt-4">
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      movies: [],
      mostPopular: [],
      isTrendingWeekly: false,
      isMostPopular: false,
    };
  },
  async created() {
    await this.fetchMovies();
    await this.fetchMoviesMostPopular();
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await api.get(
          this.isTrendingWeekly ? '/trending/movie/week' : '/trending/movie/day'
        );
        this.movies = response.data.results;
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    },
    async fetchMoviesMostPopular() {
      try {
        let endpoint = this.isMostPopular ? '/movie/popular' : '/tv/popular';
        const response = await api.get(endpoint);
        this.mostPopular = response.data.results;
      } catch (error) {
        console.error('Erro ao buscar filmes mais populares:', error);
      }
    },
    goToMovieDetails(id) {
      this.$router.push({ name: 'MovieDetails', params: { id } });
    }
  },
  watch: {
    isTrendingWeekly: {
      immediate: true,
      handler() {
        this.fetchMovies();
      },
    },
    isMostPopular: {
      immediate: true,
      handler() {
        this.fetchMoviesMostPopular();
      },
    },
  },
};
</script>