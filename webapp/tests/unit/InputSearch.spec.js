import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import InputSearch from '@/components/InputSearch.vue';
import api from '@/services/api';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

jest.mock('@/services/api', () => ({
  get: jest.fn(() => Promise.resolve({ data: { results: [] } }))
}));

describe('InputSearch.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(InputSearch, {
      localVue,
      router,
    });
  });

  it('renders input and button correctly', () => {
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('search');
    expect(wrapper.find('input').attributes('placeholder')).toBe('Search for a movie...');
  });

  it('redirects to /results with query when performSearch is called', async () => {
    wrapper.setData({ searchTerm: 'example' });
    await wrapper.vm.performSearch();
    
    await localVue.nextTick();

    expect(wrapper.vm.$router.currentRoute.fullPath).toBe('/results?query=example');
  });

  it('updates searchResults when searchMovies is called', async () => {
    api.get.mockResolvedValue({ data: { results: [{ title: 'Movie 1' }] } });
    wrapper.setData({ searchTerm: 'example' });

    await wrapper.vm.searchMovies();
    
    await localVue.nextTick();

    expect(wrapper.vm.searchResults).toEqual([{ title: 'Movie 1' }]);
  });

  it('updates the URL when searchMovies is called', async () => {
    api.get.mockResolvedValue({ data: { results: [] } });
    wrapper.setData({ searchTerm: 'example' });

    await wrapper.vm.searchMovies();
  
    await localVue.nextTick();

    const urlParams = new URLSearchParams(window.location.search);
    expect(urlParams.get('query')).toBe('example');
  });
});
