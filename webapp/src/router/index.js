import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ResultsPage from '../views/ResultsPage.vue';
import MovieDetails from '../views/MovieDetails.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/results',
    name: 'ResultsPage',
    component: ResultsPage
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
    props: true
  }
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
