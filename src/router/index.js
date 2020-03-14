import Vue from 'vue'
import Router from 'vue-router'
import { uc } from 'src/api/auth'
import { clearAuthCookie } from 'src/service/auth/index'

Vue.use(Router)

const homeGroups = [
  {
    name: 'ClassManagement',
    title: '班级管理',
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
          path: 'schoolyear',
          name: 'SchoolYear',
          component: () => import('src/views/school_year/Index.vue'),
          meta: {
            group: 'ClassManagement',
            title: '学年',
            showInSide: true
          }
        },
        {
          path: 'class',
          name: 'Class',
          component: () => import('src/views/class/Index.vue'),
          meta: {
            group: 'ClassManagement',
            title: '班级',
            showInSide: true
          }
        },
        {
          path: '/class/curriculum/:id',
          name: 'ClassCurriculumEdit',
          component: () => import('src/views/class/Edit.vue'),
          meta: {
            title: '编辑',
            showInSide: false,
            breadcrumbItems: [
              {
                text: '班级',
                to: { name: 'Class' }
              },
              {
                text: '编辑'
              }
            ]
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
        },
        {
          path: '/student/create',
          name: 'StudentCreate',
          component: () => import('src/views/student/Create.vue'),
          meta: {
            title: '新增',
            showInSide: false,
            breadcrumbItems: [
              {
                text: '学生管理',
                to: { name: 'Student' }
              },
              {
                text: '新增'
              }
            ]
          }
        },
        {
          path: '/student/edit/:id',
          name: 'StudentEdit',
          component: () => import('src/views/student/Edit.vue'),
          meta: {
            title: '编辑',
            showInSide: false,
            breadcrumbItems: [
              {
                text: '学生管理',
                to: { name: 'Student' }
              },
              {
                text: '编辑'
              }
            ]
          }
        },
        {
          path: '/examination',
          name: 'Examination',
          component: () => import('src/views/examination/Index.vue'),
          meta: {
            title: '考试管理',
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
