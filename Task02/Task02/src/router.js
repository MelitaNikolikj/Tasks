import { createRouter, createWebHistory } from 'vue-router';
import PostList from './components/PostList.vue';
import PostDetails from './components/PostDetails.vue';
import Comments from './components/Comments.vue';

const routes = [
  { path: '/', component: PostList },
  { path: '/post/:id', component: PostDetails },
  { path: '/post/:id/comments', component: Comments }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
