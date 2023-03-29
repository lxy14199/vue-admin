
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    menu: [
      {
        path: '/user',
        component: 'layout/Layout',
        // redirect: '/user/index',
        meta: { title: '员工管理', icon: 'icon', noCache: true },
        children: [
          {
            path: 'manage',
            component: 'views/user/user-manage',
            name: 'UserManage',
            meta: { title: '添加员工' }
          },
          {
            path: 'list',
            component: 'views/user/user-list',
            name: 'UserList',
            meta: { title: '员工列表' }
          }
        ]
      },
      {
        path: '/permission',
        component: 'layout/Layout',
        redirect: '/permission/index',
        alwaysShow: true,
        meta: {
          title: '职位管理',
          icon: 'lock'
        },
        children: [
          {
            path: 'page',
            component: 'views/permission/page',
            name: 'PagePermission',
            meta: {
              title: 'pagePermission'
            }
          },
          {
            path: 'directive',
            component: 'views/permission/directive',
            name: 'DirectivePermission',
            meta: {
              title: 'directivePermission'
            }
          },
          {
            path: 'role',
            component: 'views/permission/role',
            name: 'RolePermission',
            meta: {
              title: '添加职位'
            }
          }
        ]
      },
      {
        path: '/department',
        component: 'layout/Layout',
        meta: {
          title: '部门管理',
          icon: 'component'
        },
        children: [
          {
            path: 'list',
            component: 'views/department/list',
            name: 'list',
            meta: {
              title: '部门列表'
            }
          }
        ]
      },
      {
        path: '/announcement',
        component: 'layout/Layout',
        meta: {
          title: '公告',
          icon: 'documentation'
        },
        children: [
          {
            path: 'list',
            component: 'views/announcement/list',
            name: 'list',
            meta: {
              title: '公告列表'
            }
          },
          {
            path: 'publish',
            component: 'views/announcement/publish',
            name: 'publish',
            meta: {
              title: '发布公告'
            }
          }
        ]
      },
      {
        path: '/attendance',
        component: 'layout/Layout',
        meta: {
          title: '考勤系统',
          icon: 'tab'
        },
        children: [
          {
            path: 'list',
            component: 'views/attendance/calendar',
            name: 'calendar',
            meta: {
              title: '考勤日历'
            }
          }
        ]
      }
    ]
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
