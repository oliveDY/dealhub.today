import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../page/home'
import DealDetail from '../page/deal_detail'
import NewDeal from '../page/new_deal'
import Signin from '../page/signin'
import Signup from '../page/signup'
import Register from '../page/register'
import NewComment from '../page/new_comment'
import DealEdit from '../page/deal_edit'
import UserAccountPage from '../page/user_account'
import ImageUploadPage from '../page/image_update'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HomePage',
            components: {
                'body': HomePage
            }
        },
        {
            path: '/deal/:id',
            name: 'DealDetailPage',
            components: {
                'body': DealDetail
            }
        },
        {
            path: '/deal/:id/edit',
            name: 'DealEditPage',
            components: {
                'body': DealEdit
            }
        },
        {
            path: '/deal_new',
            name: 'NewDealPage',
            components: {
                'body': NewDeal
            }
        },
        {
            path: '/new_comment/:id',
            name: 'NewCommentPage',
            components: {
                'body': NewComment
            }
        },
        {
            path: '/signin',
            name: 'SigninPage',
            components: {
                'body': Signin
            }
        },
        {
            path: '/register',
            name: 'RegisterPage',
            components: {
                'body': Register
            }
        },
        {
            path: '/signup',
            name: 'SignupPage',
            components: {
                'body': Signup
            }
        },
        {
            path: '/useraccount',
            name: 'UserAccountPage',
            components: {
                'body' : UserAccountPage
            }
        },
        {
            path: '/imageuplaod/:id',
            name: 'ImageUploadPage',
            components: {
                'body' : ImageUploadPage
            }
        }

    ]
})