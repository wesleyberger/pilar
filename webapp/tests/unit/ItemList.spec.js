import { shallowMount } from '@vue/test-utils';
import api from '@/services/api'; 
import ItemList from '@/components/ItemList.vue'; 

jest.mock('@/services/api', () => ({
  get: jest.fn(),
}));

describe('ItemList.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemList, {
      mocks: {
        $router: {
          push: jest.fn(),
        },
      },
    });
  });

  it('deve renderizar o componente corretamente', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('deve exibir filmes quando a lista de filmes é fornecida', async () => {
    api.get.mockResolvedValue({
      data: {
        results: [
          {
            id: 1,
            title: 'Movie Title',
            poster_path: '/path/to/poster.jpg',
            vote_average: 8.5,
          },
        ],
      },
    });

    await wrapper.vm.fetchMovies();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('p').text()).toContain('Movie Title');
  });

  it('deve alterar o estado de trending weekly ao clicar no checkbox', async () => {
    api.get.mockResolvedValue({
      data: {
        results: [],
      },
    });

    await wrapper.find('input[type="checkbox"]').setChecked(true);

    await wrapper.vm.$nextTick();

    expect(api.get).toHaveBeenCalledWith('/trending/movie/week');
  });

  it('deve alterar o estado de most popular ao clicar no checkbox', async () => {
    api.get.mockResolvedValue({
      data: {
        results: [],
      },
    });

    await wrapper.findAll('input[type="checkbox"]').at(1).setChecked(true);

    await wrapper.vm.$nextTick();

    expect(api.get).toHaveBeenCalledWith('/movie/popular');
  });
});
