<template>
    <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
            <v-card ref="form">
                <v-card-title primary-title><strong>Image Upload: </strong></v-card-title>
                <v-card-text>
                    <v-textarea
                            placeholder="Paste your image link here..."
                            outline
                            name="input-7-4"
                            v-model="image"
                            required
                    ></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <router-link :to="{name: 'DealDetailPage', params: {id : deal_id}} " class="link">
                        <v-btn flat class="link">Cancel</v-btn>
                    </router-link>
                    <v-spacer></v-spacer>
                    <v-slide-x-reverse-transition>
                        <v-tooltip
                                v-if="formHasErrors"
                                left
                        >
                            <v-btn
                                    slot="activator"
                                    icon
                                    class="my-0"
                                    @click="resetForm"
                            >
                                <v-icon>refresh</v-icon>
                            </v-btn>
                            <span>Refresh form</span>
                        </v-tooltip>
                    </v-slide-x-reverse-transition>
                    <v-btn color="primary" flat v-on:click="submit">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import deal_api from '../mixins/dealapi'
    import auth from '../mixins/auth'

    export default {
        props: [
            'deal_id'
        ],
        return: {
            image : '',
            token: ''
        },
        created () {
            this.check_signin();
            this.deal_id = this.$route.params.id;
        },
        methods: {
            submit: function (event) {
                let vm = this;
                deal_api.deal_image_upload(vm.deal_id, {
                    'image': this.image
                }, vm.token, function(err, httpResponse, body) {
                    console.log(body);
                    if(body.success === false) {
                        console.log("upload image failure!")
                    }
                    else {
                        console.log("hahahahhhere");
                        vm.$router.push({name: 'DealDetailPage', params: {id : vm.deal_id}});
                    }
                });
            },
            check_signin : function(event) {
                let vm = this;
                auth.token_check(function(token) {
                    if(token == null) {
                        vm.$router.push({name: "SigninPage"});
                    }
                    else {
                        vm.token = token;
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
</style>