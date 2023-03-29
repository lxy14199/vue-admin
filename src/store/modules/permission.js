import { constantRoutes } from '@/router'
import store from '@/store'
import Layout from '@/layout'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // console.log(roles)
      // console.log(11111)
      let accessedRoutes
      const asyncRoutes = []

      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      // let isSuper = store.state.user.isSuper
      // console.info('当前登录用户是否为超级管理员', isSuper)
      // let userRoutes = []
      // if (isSuper === false) {
      //   // 不是超级管理员
      //   userRoutes = filterAsyncRouter(store.state.user.menu)
      //   commit('SET_ROUTES', userRoutes)
      //   resolve(userRoutes)
      // }else{
      //   // 超级管理员，全部权限
      //   userRoutes = accessedRoutes
      //   commit('SET_ROUTES', userRoutes)
      //   resolve(userRoutes)
      // }
      const userRoutes = filterAsyncRouter(store.state.user.menu)
      // console.log(userRoutes)
      commit('SET_ROUTES', userRoutes)
      resolve(userRoutes)
      // console.log('asdas')
      // commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

function filterAsyncRouter(t) {
  t.filter(index => {
    if (index.component === 'layout/Layout') {
      index.component = Layout
    } else {
      // 不是路由菜单，转换对应 vue组件
      // @/views/sn-manage/dict/index
      const component = index.component
      console.info(component)
      //
      /**
       * 截取 示例 @/views/sn-manage/dict/index 截取出 @/viesw/ 以外的字符，因为 拼接会异常
       * 新逻辑： 创建页面的时候去掉 @/viesw/
       * @type {*|string}
       * let test = component.substr(find(component, '/', 1) + 1)
       */

      index.component = require(`@/${component}.vue`).default
    }
    // 递归子菜单
    if (index.children && index.children.length) {
      index.children = filterAsyncRouter(index.children)
    }
    return true
  })
  return t
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
