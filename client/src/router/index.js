
import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/HelloWorld';
import Posts from '@/components/Posts';
import NewPost from '@/components/NewPost';
import EditPost from '@/components/EditPost';
import Search from '@/components/Search';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts,
    },
    {
      path: '/posts/new',
      name: 'NewPost',
      component: NewPost,
    },
    {
      path: '/posts/:id',
      name: 'EditPost',
      component: EditPost,
    },
  ],
});
