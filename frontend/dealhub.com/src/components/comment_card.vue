<template>
        <v-layout>
            <v-flex xs12>
                <v-card class="commentcard">
                    <v-card-text align="left"><v-icon>people</v-icon>
                        <strong> {{comment_detail.author.username}}</strong>
                        <v-btn flat v-if="comment_ownership" class="button">
                            <v-icon medium left v-on:click="comment_delete">delete_outline</v-icon>
                        </v-btn>
                    </v-card-text>
                    <v-card-text align="left">{{comment_detail.text}}</v-card-text>
                    <!--<v-card-text class="px-0" align="justify">By: {{comment_detail.author.username}}</v-card-text>-->
                </v-card>
            </v-flex>
        </v-layout>
</template>

<script>
    import commentapi from '../mixins/commentapi';
    import * as Cookies from "js-cookie";
    import auth from '../mixins/auth';
    export default {
        props: [
            'comment_id',
            'deal_id'
        ],

        data () {
            return {
                comment_detail : {},
                comment_ownership : false,
                token: ''
            };
        },
        created() {
            this.get_comment_detail();
            this.get_token();
        },
        methods: {
            get_comment_detail: function () {
                let vm = this;
                // console.log(this.comment_detail.author.username);
                commentapi.comment_detail(this.comment_id, function (err, httpResponse, body) {
                    if(err) {
                        // TODO
                    }
                    if(httpResponse.statusCode == 200) {
                        vm.comment_detail = body;
                        vm.check_comment_ownership();
                    }
                });
            },
            check_comment_ownership: function() {
                let user_id = Cookies.get('dealhub.today.id');
                let comment_creator_id = this.comment_detail.author.id;
                if(user_id === comment_creator_id) {
                    this.comment_ownership = true;
                }
            },
            comment_delete: function() {
                let vm = this;
                commentapi.comment_delete(this.comment_id, vm.token, function(err, httpResponse, body) {
                    if(body.success === true) {
                        vm.$router.go({
                            path: '/deal/' + vm.deal_id,
                            force: true
                        });
                    }
                });
            },
            get_token: function () {
                let vm = this;
                auth.token_check(function(token) {
                    vm.token = token;
                });
            }

        }
    }
</script>

<style scoped>
.commentcard {
    /*border: 1px solid darkgrey;*/
    /*border-radius: 5px;*/
    border-style: none;
}
    .button {
        float: right;
    }
    .link {
        text-decoration: none;
    }
</style>