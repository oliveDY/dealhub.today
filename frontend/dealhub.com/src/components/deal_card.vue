<template>
    <div>
        <v-card >
            <img v-bind:src="deal_detail.image" height="200px" width="268px">
            <v-card-title primary-title>
                <div>
                    <router-link :to="{name: 'DealDetailPage', params: {id : deal_id}} " class="link">
                        <div class="headline" align="left">{{deal_detail.title}}</div>
                    </router-link>
                    <div class="grey--text" align="left">
                        · {{deal_detail.discount}}
                    </div>
                </div>
            </v-card-title>
            <v-card-actions>
                <v-btn flat color="purple" v-on:click="go_dealdetail" >Detail</v-btn>
                <v-icon class="my_icon" color="pink" primary sm v-on:click="create_like">favorite</v-icon>{{likes_num}}
                <v-icon class="my_icon" color="primary" primary sm v-on:click="go_dealdetail">mode_comment</v-icon>{{comment_num}}
                <v-icon v-if="save_button_enable" id="save" class="my_icon" color="orange" primary sm v-on:click="create_save">star_rate</v-icon>
                <v-icon v-if="!save_button_enable" class="my_icon" color="grey" primary sm >star_rate</v-icon>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import dealapi from "../mixins/dealapi";
    import likeapi from "../mixins/likeapi";
    import saveapi from "../mixins/saveapi";
    import auth from "../mixins/auth";

    export default {
        name: "deal_card",
        props: ['deal_id'],
        data () {
            return {
                deal_detail : {},
                token: '',
                likes_num : 0,
                user_id: '',
                comment_num: 0,
                saves_num: 0,
                save_button_enable: false
            };
        },
        created () {
            this.get_deal_detail();
            this.get_token();
            this.get_user_id();
            this.get_likes_num();
            this.get_saves_num();
            this.get_comment_num();
            this.check_save();
        },
        methods: {
            get_deal_detail: function () {
                let vm = this;
                dealapi.deal_detail(this.deal_id, function (err, httpResponse, body) {
                    if(err) {
                        // TODO
                    }
                    if(httpResponse.statusCode == 200) {
                        vm.deal_detail = body;
                        console.log("body:" + body);
                    }
                });
            },
            go_dealdetail: function(event) {
                this.$router.push({name: 'DealDetailPage', params: {id : this.deal_id}});
            },
            get_token: function () {
                let vm = this;
                auth.token_check(function(token) {
                    if(token == null) {
                        // vm.$router.push({name: "SigninPage"});
                    }
                    else {
                        vm.token = token;
                    }
                });
            },
            get_user_id: function() {
                let vm = this;
                auth.user_id_get(function(user_id) {
                    if(user_id == null) {
                        // vm.$router.push({name: "SigninPage"});
                    }
                    else {
                        vm.user_id = user_id;
                    }
                });
            },
            create_like: function(event) {
                let vm = this;
                likeapi.new_like({
                    'deal_id' : vm.deal_id,
                    'user_id' : vm.user_id
                }, vm.token, function(err, httpResponse, body) {
                    if(err) {

                    }
                    // if create a like successfully we refreash the page using below means:
                    if(body.success === true) {
                        vm.$router.go({
                            path: '/',
                            force: true
                        });
                    }
                });
            },
            get_likes_num: function(event) {
                let vm = this;
                likeapi.get_likes_num(vm.deal_id, function(err, httpResponse, body) {
                    if(err) {

                    }
                    vm.likes_num = body.likes_num;
                    console.log("like nums " + body.likes_num);
                });
            },
            create_save: function(event) {
                let vm = this;
                saveapi.new_save({
                    'deal_id' : vm.deal_id,
                    'user_id' : vm.user_id
                }, vm.token, function(err, httpResponse, body) {
                    if(err) {
                        console.log("we meet some error in creating save");
                    }
                    if(body.success === true) {

                        // document.getElementById('save').setAttribute("class", "my_save");
                        vm.$router.go({
                            path: '/',
                            force: true
                        });
                    }
                });
            },
            get_saves_num: function(event) {
                let vm = this;
                saveapi.get_saves_num(vm.deal_id, function(err, httpResponse, body) {
                    if(err) {

                    }
                    vm.saves_num = body.saves_num;
                    console.log("save nums " + body.saves_num);
                });
            },
            get_comment_num: function(event) {
                let vm = this;
                dealapi.deal_commentnum(vm.deal_id, function (err, httpResponse, body) {
                    if(err) {
                        //TODO
                    }
                    if(httpResponse.statusCode == 200) {
                        vm.comment_num = body.comment_num;
                    }
                    else {
                        //TODO
                    }
                });
            },
            check_save: function(event) {
                let vm = this;
                saveapi.check_save(vm.deal_id, vm.token, function(err, httpResponse, body) {
                    if(err) {
                        console.log("we meet some error in check_save on deal_card");
                    }
                    if(body.success === true) {
                        console.log("I am here success on deal_card!");
                        vm.save_button_enable = false;
                    }
                    if(body.success === false) {
                        console.log("I am here no save on deal_card!!");
                        vm.save_button_enable = true;
                    }
                });
            }

        }
    }
</script>

<style scoped>
    .link {
        text-decoration: none;
    }
    #comment_num {
        color: royalblue;
    }
    .my_icon {
        padding-left: 10px;
        padding-right: 10px;
    }
    #saves_num {
        padding-left: 0;
        padding-right: 0;
    }

</style>