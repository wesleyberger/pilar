<template>
  <div class="container w-2/3 mx-auto">
    <InputSearch />
    <div v-if="movies.length" class="grid grid-cols-1 gap-4">
      <div v-for="item in movies" :key="item.id" class="flex items-center bg-white shadow-md rounded p-4 cursor-pointer"
        @click="goToMovieDetails(item.id)">
        <img v-if="item.poster_path" :src="'https://image.tmdb.org/t/p/w200' + item.poster_path" alt="Poster" class="h-auto rounded-lg mr-4" />
        <img v-else width="200" height="280"  src="https://media.istockphoto.com/id/1500807425/pt/vetorial/image-not-found-icon-vector-design.jpg?s=2048x2048&w=is&k=20&c=-jc_2s7EjyQMQ0O3wygo0qrrKs2Xqi9hu2czaReX2k0=" alt="Poster" class="h-auto rounded-lg mr-4" />
        <div class="w-3/4 h-full text-justify">
          <h2 class="text-lg font-semibold">{{ item.title }}</h2>
          <p class="text-gray-600">{{ item.release_date }}</p>
          <p class="mt-10">{{ item.overview }}</p>
          <div class="grid grid-cols-3 gap-3 w-96 mt-8">
            <p class="text-sm mt-1 text-gray-500">Language: {{ item.original_language }}</p>
            <p class="text-sm mt-1 text-gray-500">Rating: {{ item.vote_average }} / 10</p>
            <p class="text-sm mt-1 text-gray-500">Votes: {{ item.vote_count }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center">no results found.</p>
    </div>
  </div>
</template>

<script>
import api from '../services/api';
import InputSearch from '@/components/InputSearch.vue';
export default {
  components: {
    InputSearch
  },
  data() {
    return {
      movies: []
    };
  },
  async created() {
    const query = this.$route.query.query;
    console.log('query', query);
    if (query) {
      await this.searchMovies(query);
    }
  },
  methods: {
    async searchMovies(query) {
      try {
        const response = await api.get('/search/movie', {
          params: { query }
        });
        this.movies = response.data.results;
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    },
    goToMovieDetails(id) {
      this.$router.push({ name: 'MovieDetails', params: { id } });
    }
  },
  watch: {
    '$route.query.query': {
      immediate: true,
      handler(query) {
        if (query) {
          this.searchMovies(query);
        }
      }
    }
  }
};
</script>
