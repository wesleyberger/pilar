<template>
    <div class="mx-auto">
      <div v-if="movie">
        <div class="relative">
          <div :style="{ 'background-image': 'url(https://image.tmdb.org/t/p/w1280' + movie.backdrop_path + ')' }"
            class="w-full h-vh-70 border-b border-primary bg-left bg-cover bg-no-repeat">
            <div class="absolute inset-0 bg-opacity-80 bg-black"></div>
            <section class="container m-auto relative z-10 flex items-center justify-center h-full w-3/4 text-justify">
              <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Poster"
                class="poster mr-4 h-4/5 rounded-lg shadow-lg" />
              <div class="text-white grid content-between h-4/5">
                <h1 class="text-3xl font-bold text-justify">{{ movie.title }}</h1>
                <div class="w-full px-1 mb-6">
                  <p class="text-sm"><strong>Release Date:</strong> {{ movie.release_date }}</p>
                  <p class="text-sm">{{ movie.genres.map(genre => genre.name).join(', ') }}</p>
                </div>
                <div class="w-full">
                  <p class="text-sm text-justify italic font-bold text-orange-400">{{ movie.tagline }}</p>
                </div>
                <div class="grid w-full">
                  <strong>Synopsis</strong>
                  <p class="text-lg text-justify">{{ movie.overview }}</p>
                </div>
                <div class="grid grid-cols-3 gap-1 mb-4 mt-6">
                  <div class="w-full">
                    <p class="text-sm"><strong>Budget:</strong> ${{ movie.budget.toLocaleString() }}</p>
                  </div>
                  <div class="w-full">
                    <p class="text-sm"><strong>Revenue:</strong> ${{ movie.revenue.toLocaleString() }}</p>
                  </div>
                  <div class="w-full">
                    <p class="text-sm"><strong>Runtime:</strong> {{ movie.runtime }} minutes</p>
                  </div>
                  <div class="w-full">
                    <p class="text-sm"><strong>Original Language:</strong> {{ movie.original_language }}</p>
                  </div>
                  <div class="w-full">
                    <p class="text-sm"><strong>Status:</strong> {{ movie.status }}</p>
                  </div>
                  <div class="w-full">
                    <p class="text-sm"><strong>Popularity:</strong> {{ movie.popularity }}</p>
                  </div>
                  <div class="w-full">
                    <p class="text-sm"><strong>Vote Average:</strong> {{ movie.vote_average }}</p>
                  </div>
                  <div class="w-full">
                    <p class="text-sm"><strong>Vote Count:</strong> {{ movie.vote_count }}</p>
                  </div>
                </div>
                <div class="w-full grid gap-1">
                  <p class="text-sm"><strong>Production Companies:</strong> {{ movie.production_companies.map(company =>
                    company.name).join(', ') }}</p>
                  <p class="text-sm"><strong>Production Countries:</strong> {{ movie.production_countries.map(country =>
                    country.name).join(', ') }}</p>
                </div>
                <div class="w-full">
                    <p class="text-sm"><strong>Homepage:</strong> <a :href="movie.homepage"
                        class="text-blue-500 underline" target="_blank">{{ movie.homepage }}</a></p>
                  </div>
              </div>
            </section>
          </div>
        </div>
        <section class="pb-12">
          <div class="mt-8 p-4" v-if="cast">
            <h2 class="text-2xl font-bold mb-4">CAST</h2>
            <div class="flex overflow-x-auto pb-8">
              <div v-for="actor in cast" :key="actor.cast_id" class="flex-shrink-0 bg-white shadow-md rounded-lg overflow-hidden mr-4">
                <div class="w-56 h-96">
                  <img v-if="actor.profile_path" :src="'https://image.tmdb.org/t/p/w200' + actor.profile_path"
                    alt="Foto do Elenco" class="w-56 h-auto">
                  <img v-else
                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                    alt="Foto do Elenco" class="w-56 h-auto">
                </div>
                <div class="p-4 w-56">
                  <h3 class="text-lg font-semibold mb-2">{{ actor.name }}</h3>
                  <p class="text-sm text-gray-600">{{ actor.character }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div v-else>
        <p class="text-center">Carregando...</p>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        movie: null,
        cast: []
      };
    },
    async created() {
      try {
        const movieResponse = await api.get(`/movie/${this.id}`);
        this.movie = movieResponse.data;
        const creditsResponse = await api.get(`/movie/${this.id}/credits`);
        this.cast = creditsResponse.data.cast;
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme ou elenco:', error);
      }
    }
  };
  </script>