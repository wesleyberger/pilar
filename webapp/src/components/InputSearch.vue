<template>
  <div class="container mx-auto py-4">
    <div class="flex items-center justify-center mb-8">
      <div class="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-lg flex items-center">
        <input
          v-model="searchTerm"
          @keydown.enter="performSearch"
          type="text"
          placeholder="Search for a movie..."
          class="border rounded-l py-2 px-4 w-full focus:outline-none"
        />
        <button @click="performSearch" class="bg-blue-500 text-white py-2 px-4 rounded-r">
          search
        </button>
      </div>
    </div>
    <div class="bg-gray-200 p-4 rounded-lg shadow-md text-center">
      <p class="text-gray-700 text-sm">
        If you prefer, you can also <span class="text-blue-500">explore popular movies.</span>.
      </p>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      searchTerm: '',
      searchResults: [],
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('query');
    if (queryParam) {
      this.searchTerm = queryParam;
      this.searchMovies();
    }
  },
  methods: {
    performSearch() {
      if (this.searchTerm) {
        this.$router.push({ path: '/results', query: { query: this.searchTerm } });
      }
    },
    async searchMovies() {
      try {
        const response = await api.get('/search/movie', {
          params: {
            query: this.searchTerm,
          },
        });
        this.searchResults = response.data.results;

        const queryParams = new URLSearchParams({ query: this.searchTerm });
        window.history.pushState({}, '', `/results?${queryParams}`);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    },
  },
};
</script>


