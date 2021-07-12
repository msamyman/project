import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Film from '../views/Film.vue'
import DetailFilm from '../views/DetailFilm.vue'
import ChangePassword from '../views/ChangePassword.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/film',
    name: 'Film',
    component: Film
  },
  {
    path: '/film/:idx',
    name: 'DetailFilm',
    component: DetailFilm
  },
  {
    path: '/changepassword',
    name: 'ChangePassword',
    component: ChangePassword
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
