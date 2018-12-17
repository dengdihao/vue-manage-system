import Vue from 'vue';
import Router from 'vue-router';
import {
    resolve
} from 'uri-js';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {
                title: '自述文件'
            },
            children: [{
                    path: 'dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: {
                        title: '系统首页'
                    }
                },
                {
                    path: '/vue',
                    name: 'vue',
                    component: resolve => require(['../components/page/vue.vue'], resolve),
                    meta: {
                        title: 'vue'
                    }
                },
                {
                    path: '/casedetail',
                    name: 'casedetail',
                    component: resolve => require(['../components/page/CaseDetail.vue'], resolve),
                    meta: {
                        title: '案件详情信息'
                    }
                },
                {
                    path: '/detailpages',
                    name: 'detailpages',
                    component: resolve => require(['../components/page/Detailpages.vue'], resolve),
                    meta: {
                        title: '详情信息'
                    }
                },
                {
                    path: '/editdetailpages',
                    name: 'editdetailpages',
                    component: resolve => require(['../components/page/editDetailpages.vue'], resolve),
                    meta: {
                        title: '编辑详情信息'
                    }
                },
                {
                    path: '/powersearch',
                    name: 'powersearch',
                    component: resolve => require(['../components/page/Powersearch.vue'], resolve),
                    meta: {
                        title: '高级搜索'
                    }
                },
                {
                    path: '/fileskeeping',
                    name: 'fileskeeping',
                    component: resolve => require(['../components/page/Fileskeeping.vue'], resolve),
                    meta: {
                        title: '文档管理'
                    }
                },
                {
                    path: '/filecontent',
                    name: 'filecontent',
                    component: resolve => require(['../components/page/Filecontent.vue'], resolve),
                    meta: {
                        title: '文档内容'
                    }
                },
                {
                    path: '/fileredact',
                    name: 'fileredact',
                    component: resolve => require(['../components/page/Fileredact.vue'], resolve),
                    meta: {
                        title: '文档内容'
                    }
                },
                {
                    path: '/hchat',
                    name: 'hchat',
                    component: resolve => require(['../components/page/message/hchat.vue'], resolve),
                    meta: {
                        title: '聊天室'
                    }
                },
                // {
                //     path: '/table',
                //     component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                //     meta: { title: '基础表格' }
                // },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: {
                        title: 'tab选项卡'
                    }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: {
                        title: '基本表单'
                    }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: {
                        title: '富文本编辑器'
                    }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: {
                        title: 'markdown编辑器'
                    }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: {
                        title: '文件上传'
                    }
                },
                {
                    // 拖拽列表组件
                    path: '/yuread',
                    name: 'yuread',
                    component: resolve => require(['../components/page/Yuread.vue'], resolve),
                    meta: {
                        title: '预览'
                    }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: {
                        title: '拖拽列表'
                    }
                },
                {
                    /* 个人信息页面 */
                    path: '/person',
                    name: 'person',
                    component: resolve => require(['../components/page/Person.vue'], resolve),
                    meta: {
                        title: '个人信息'
                    },
                    children: [{
                            path: '/user',
                            name: 'user',
                            component: resolve => require(['../components/page/User.vue'], resolve),
                            meta: {
                                title: '个人简介'
                            }
                        },
                        {
                            path: '/edituser',
                            name: 'edituser',
                            component: resolve => require(['../components/page/Edituser.vue'], resolve),
                            meta: {
                                title: '编辑页面'
                            }
                        }
                    ]
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: {
                        title: '权限测试',
                        permission: true
                    }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: {
                        title: '404'
                    }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: {
                        title: '403'
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            // 注册
            path: '/register',
            name: 'register',
            component: resolve => require(['../components/page/Register.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
