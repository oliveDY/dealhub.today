<template>
    <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
            <v-card ref="form">
                <v-card-title primary-title><strong>New comment:</strong></v-card-title>
                <v-card-text>
                    <v-textarea
                            placeholder="Your comment..."
                            outline
                            name="input-7-4"
                            v-model="text"
                            :rules="textRules"
                            label="NewComment"
                            required
                    ></v-textarea>

                </v-card-text>
                <!--<v-divider></v-divider>-->
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
    import auth from '../mixins/auth';
    import commentapi from '../mixins/commentapi';

    export default {
        name: "new_comment",
        props:['deal_id'],
        data() {
            return {
                text : '',
                textRules: [
                    v => !!v || 'Text is required',
                    v => v.length <= 500 || 'Text must be valid'
                ]
            }
        },
        created() {
            this.deal_id = this.$route.params.id;
            let vm = this;
            auth.token_check(function (token) {
                if(token == null) {
                    vm.$router.push({name: 'SigninPage'});
                }
                else {
                    vm.token = token;
                    vm.$router.push({name: 'NewCommentPage'});
                }
            })
        },
        methods: {
            submit: function(event) {
                let vm = this;
                commentapi.new_comment(
                    {
                        'text' : vm.text,
                        'deal_id' : vm.deal_id,
                        'token' : vm.token
                    },
                    function (err, httpResponse, body) {
                        console.log(body);
                        if(body.success === true) {
                            vm.$router.push({ name: 'DealDetailPage', params: { id: vm.deal_id }});
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