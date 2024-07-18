import { shallowMount } from '@vue/test-utils';
import DetailsContent from '@/components/DetailsContent.vue';
import api from '@/services/api';

jest.mock('@/services/api');

describe('DetailsContent.vue', () => {
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('deve renderizar o título do filme corretamente', async () => {
    api.get.mockImplementation((endpoint) => {
      if (endpoint === '/movie/1') {
        return Promise.resolve({
          data: {
            title: 'Movie Title',
            release_date: '2024-07-01',
            genres: [{ name: 'Action' }, { name: 'Adventure' }],
            tagline: 'An epic movie',
            overview: 'This is a great movie.',
            budget: 100000000,
            revenue: 200000000,
            runtime: 120,
            original_language: 'en',
            status: 'Released',
            popularity: 10.0,
            vote_average: 8.5,
            vote_count: 1000,
            production_companies: [{ name: 'Company One' }],
            production_countries: [{ name: 'Country One' }],
            homepage: 'https://example.com',
            poster_path: '/poster.jpg',
            backdrop_path: '/backdrop.jpg',
          }
        });
      } else if (endpoint === '/movie/1/credits') {
        return Promise.resolve({
          data: {
            cast: [
              { cast_id: 1, name: 'Actor One', character: 'Character One', profile_path: '/actor1.jpg' },
              { cast_id: 2, name: 'Actor Two', character: 'Character Two', profile_path: '/actor2.jpg' }
            ]
          }
        });
      }
      return Promise.reject(new Error('Not Found'));
    });

    wrapper = shallowMount(DetailsContent, {
      propsData: {
        id: '1',
      }
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('h1').text()).toBe('Movie Title');
    expect(wrapper.find('p').text()).toContain('Release Date: 2024-07-01');
  });
});
