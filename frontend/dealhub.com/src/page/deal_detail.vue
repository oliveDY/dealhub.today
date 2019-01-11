<template>

    <div>
        <v-container>
        <v-layout row justify-space-between>

            <v-flex xs8 lg10>
                <Minicard v-if="rank_id_list.length > 0" v-bind:rank_id_list="rank_id_list" ></Minicard>
            </v-flex>
            
            <v-flex xs8 lg8>
                <v-card>
                    <img v-bind:src="deal_detail.image" class="white--text" height="500px" width="750px">
                    <v-card-title class="text-xs-left">
                        <div>
                            <span>
                                <h2>{{deal_detail.title}}</h2>
                            </span><br>
                            <ul>
                                <li>{{deal_detail.discount}}</li>
                            </ul>
                            <ul>
                                <li>
                                    <router-link :to="{name: 'ImageUploadPage', params: {id : deal_id}} " class="link">
                                        Upload Image
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <!--TODO: share to Facebook etc-->
                        <v-btn flat color="orange">Share</v-btn>
                        <v-btn flat color="orange" v-on:click="jump_to_link">Checkout the deal</v-btn>
                        <v-btn v-if="save_button_enable" id="save" flat color="orange" primary sm v-on:click="create_save">Save</v-btn>
                        <v-btn v-if="!save_button_enable" flat color="gray" primary sm>Saved</v-btn>
                        <v-btn v-if="deal_ownership" flat color="orange" v-on:click="delete_deal">Delete</v-btn>
                        <v-btn v-if="deal_ownership" flat color="orange" v-on:click="go_dealedit">Edit</v-btn>
                    </v-card-actions>
                    <v-divider></v-divider>
                    <router-link :to="{name: 'NewCommentPage', params: {id : deal_id}} " class="link">
                        <v-btn color="primary" flat id="commentButton">Add your comment</v-btn>
                    </router-link>
                    <v-divider></v-divider>
                    <v-flex v-for="comment_id in comment_list" :key="comment_id" xs12>
                        <CommentCard v-bind:comment_id="comment_id" v-bind:deal_id="deal_id"></CommentCard>
                    </v-flex>
                </v-card>
            </v-flex>
        </v-layout>
        </v-container>
    </div>

</template>

<script>
    import dealapi from '../mixins/dealapi';
    import CommentCard from '../components/comment_card';
    import auth from '../mixins/auth';
    import * as Cookies from "js-cookie";
    import saveapi from '../mixins/saveapi';
    import Minicard from '../components/deal_minicard';
    import likeapi from "../mixins/likeapi";

    export default {
        props: [
            'deal_id',
            'comment_id'
        ],
        components: {
            CommentCard,
            Minicard
        },
        data () {
            return {
                deal_detail : '',
                comment_list : '',
                token: '',
                cur_user_id: '',
                deal_ownership: false,
                save_button_enable: false,
                image: '',
                id_list: [],
                rank_id_list: []
            };
        },
        created() {
            this.deal_id = this.$route.params.id;
            this.get_deal_info();
            this.get_comment_list();
            this.get_token();
            this.check_save();
        },
        mounted () {
            this.get_idlist();
            this.flag = true;
        },
        methods: {
            get_deal_info : function () {
                let vm = this;
                dealapi.deal_detail(this.$route.params.id, function (err, httpResponse, body) {
                    if(err) {
                        // TODO
                    }
                    if(httpResponse.statusCode === 200) {
                        vm.deal_detail = body;
                        vm.check_deal_ownership();
                    }
                });
            },
            check_deal_ownership: function() {
                let user_id = Cookies.get('dealhub.today.id');
                let deal_creater_id = this.deal_detail.author.id;
                if(user_id === deal_creater_id) {
                    // SHOW THE DELETE BUTTON
                    this.deal_ownership = true;
                }
            },
            delete_deal : function() {
                let vm = this;
                dealapi.delete_deal(this.$route.params.id, vm.token, function (err, httpResponse, body) {
                    if(body.success === true) {
                        vm.$router.push({ name: 'HomePage'});
                    }
                });
            },
            jump_to_link: function () {
                window.location.href = 'http://' + this.deal_detail.link;
            },
            get_comment_list : function () {
                let vm = this;
                dealapi.deal_comment(this.$route.params.id, function (err, httpResponse, body) {
                    if(err) {
                        //TODO
                    }
                    if(httpResponse.statusCode == 200) {
                        vm.comment_list = body.comment_list;
                    }
                    else {
                        //TODO
                    }
                });
            },
            get_token: function () {
                let vm = this;
                auth.token_check(function(token) {
                   vm.token = token;
                });
            },
            go_dealedit: function(event) {
                this.$router.push({name: 'DealEditPage', params: {deal_id : this.deal_id}});
            },
            create_save: function(event) {
                // document.getElementById('save').setAttribute("class", "my_save");
                let vm = this;
                saveapi.new_save({
                    'deal_id' : vm.deal_id,
                    'user_id' : vm.user_id
                }, vm.token, function(err, httpResponse, body) {
                    if(err) {
                        console.log("we meet some error in creating save");
                    }
                    if(body.success === true) {
                        console.log("successfully save a deal!");
                        vm.$router.go({
                            path: '/deal/' + vm.deal_id,
                            force: true
                        });
                    }
                });
            },
            check_save: function(event) {
                let vm = this;
                saveapi.check_save(vm.deal_id, vm.token, function(err, httpResponse, body) {
                    if(err) {
                        console.log("we meet some error in check_save");
                    }
                    if(body.success === true) {
                        console.log("I am here success!");
                        vm.save_button_enable = false;
                    }
                    if(body.success === false) {
                        console.log("I am here no save!!!!!!!!!!!!!!!!!!!!");
                        vm.save_button_enable = true;
                    }
                });
            },
            get_idlist: function () {
                let vm = this;
                let rank_id_list = [];
                likeapi.get_topdeal(function (err, httpResponse, body) {
                    if(err) {
                        //TODO
                    }
                    if(httpResponse.statusCode == 200) {
                        vm.ranking_list = body.final_list;
                        console.log("Mylist:" + vm.ranking_list);
                        for(var i = 0; i < vm.ranking_list.length; i++) {
                            console.log("one of pair :" + vm.ranking_list[i]);
                            console.log("one of pair :" + vm.ranking_list[i]._id);
                            vm.rank_id_list.push(vm.ranking_list[i]._id);
                            console.log("one of pair :" + vm.ranking_list[i].count);
                        }
                        console.log("rank_id_list = " + vm.rank_id_list);
                    }
                    else {
                        //TODO
                    }
                });
            }

            // ,
            // get_id_list : function() {
            //     let vm = this;
            //     dealapi.recent_deal(function (err, httpResponse, body) {
            //         if(err) {
            //             //TODO
            //         }
            //         if(httpResponse.statusCode == 200) {
            //             vm.id_list = body.id_list;
            //             console.log("list:" + body.id_list);
            //         }
            //         else {
            //             //TODO
            //         }
            //     });
            // }


        }
    }
</script>

<style scoped>
    #inputArea {
        margin-top: 50px;
        margin-bottom: 5px;
    }
    #commentButton {
        padding-top: 0;
    }
    .link {
        text-decoration: none;
    }
    .my_save {
        opacity: 0.6;
        text: "saved"
    }
</style>