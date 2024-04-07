import express from 'express'
import pingRoute from './ping.js'
import userRoute from './userRoute.js'
const router = express.Router()

const defaultRoutes = [
  {
    path: '/ping',
    route: pingRoute
  },
  {
    path: '/user',
    route: userRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
