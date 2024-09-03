import { createRouter, createWebHistory } from 'vue-router'
import ViewEmployees from '../views/ViewEmployees.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ViewEmployees
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../views/AddEmployees.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/UpdateEmployees.vue')
    },
    {
      path: '/insurance',
      name: 'insurance',
      component: () => import('../views/Insurance.vue')
    },
    {
      path: '/edit/insurance/:id',
      name: 'editInsurance',
      component: () => import('../views/UpdateInsurance.vue')
    },
    {
      path: '/multisport',
      name: 'multisport',
      component: () => import('../views/MultiSport.vue')
    },
    {
      path: '/edit/multisport/:id',
      name: 'editMultisport',
      component: () => import('../views/UpdateMultiSport.vue')
    }
  ]
})

export default router
