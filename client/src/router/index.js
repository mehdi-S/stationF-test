
import Vue from 'vue';
import Router from 'vue-router';
import NewPost from '@/components/NewPost';
import Edit from '@/components/Edit';
import Search from '@/components/Search';
import List from '@/components/List';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search,
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/list',
      name: 'List',
      component: List,
    },
    {
      path: '/posts/new',
      name: 'NewPost',
      component: NewPost,
    },
    {
      path: '/posts/:id',
      name: 'Edit',
      component: Edit,
    },
  ],
});
