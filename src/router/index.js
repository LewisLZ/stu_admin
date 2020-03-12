import Vue from 'vue'
import Router from 'vue-router'
import { uc } from 'src/api/auth'
import { clearAuthCookie } from 'src/service/auth/index'

Vue.use(Router)

const homeGroups = [
  {
    name: 'SupplierManagement',
    title: '供应商管理',
    path: '/'
  },
  {
    name: 'ProductManagement',
    title: '货品管理',
    path: '/'
  },
  {
    name: 'SystemSettings',
    title: '系统设置',
    path: '/'
  },
  {
    name: 'SystemDocking',
    title: '系统对接',
    path: '/'
  },
  {
    name: 'BusManagement',
    title: '商务条件管理',
    path: '/'
  },
  {
    name: 'DataAnalysis',
    title: '数据分析',
    path: '/'
  },
  {
    name: 'IncomeExpenditureAnalysis',
    title: '收支分析',
    path: '/'
  }
]

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('src/views/layout/Index.vue'),
      meta: {
        menu: true,
        groups: homeGroups
      },
      children: [
        {
          path: '/err',
          name: 'PageErr',
          component: () => import('src/views/err/Index.vue'),
          meta: {
            title: ' ',
            showInSide: false
          }
        },
        {
          path: '/',
          name: 'Curriculum',
          component: () => import('src/views/curriculum/Index.vue'),
          meta: {
            title: '课程管理',
            showInSide: true
          }
        },
        {
          path: '/class',
          name: 'Class',
          component: () => import('src/views/class/Index.vue'),
          meta: {
            title: '班级管理',
            showInSide: true
          }
        },
        {
          path: '/teacher',
          name: 'Teacher',
          component: () => import('src/views/teacher/Index.vue'),
          meta: {
            title: '教师管理',
            showInSide: true
          }
        },
        {
          path: '/teacher/create',
          name: 'TeacherCreate',
          component: () => import('src/views/teacher/Create.vue'),
          meta: {
            title: '新增',
            showInSide: false,
            breadcrumbItems: [
              {
                text: '教师管理',
                to: { name: 'Teacher' }
              },
              {
                text: '新增'
              }
            ]
          }
        },
        {
          path: '/teacher/edit/:id',
          name: 'TeacherEdit',
          component: () => import('src/views/teacher/Edit.vue'),
          meta: {
            title: '编辑',
            showInSide: false,
            breadcrumbItems: [
              {
                text: '教师管理',
                to: { name: 'Teacher' }
              },
              {
                text: '编辑'
              }
            ]
          }
        },
        {
          path: '/student',
          name: 'Student',
          component: () => import('src/views/student/Index.vue'),
          meta: {
            title: '学生管理',
            showInSide: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('src/views/login/Index.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!Vue.$store.getters.isLogin) {
    if (to.name !== 'Login') {
      try {
        await uc()
      } catch (err) {
        if (!err.response || err.response.status !== 401) {
          clearAuthCookie()
        }
        next({
          name: 'Login',
          replace: true
        })
        return
      }
    }
  }
  if (to.name === 'PageErr') {
    next()
    return
  }
  if (to.name === 'Login') {
    if (Vue.$store.getters.isLogin) {
      next({
        name: 'Curriculum',
        replace: true
      })
      return
    } else {
      next()
    }
    return
  }
  // 处理其它的路由
  if (Vue.$store.getters.isLogin) {
    next()
  } else {
    next({
      name: 'Login',
      replace: true
    })
  }
})

export default router
