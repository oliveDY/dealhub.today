<template>
    <v-layout justify-center>
        <v-card class="signin_card">
            <h2 align="left" class="title">Post a New Deal</h2>
            <v-flex lg10 v-model="valid">
                <v-text-field
                        class="input"
                        v-model="title"
                        :rules="titleRules"
                        :counter="50"
                        label="Title"
                        required
                        outline
                ></v-text-field>
            </v-flex>
            <v-flex lg10 v-model="valid">
                <v-textarea
                        class="input"
                        v-model="discount"
                        :rules="discountRules"
                        :counter="100"
                        label="Discount details..."
                        required
                        outline
                ></v-textarea>
            </v-flex>
            <v-flex lg10 v-model="valid">
                <v-text-field
                        class="input"
                        v-model="link"
                        :rules="linkRules"
                        :counter="100"
                        label="Link(No prefix: 'http://' needed)"
                        required
                        outline
                ></v-text-field>
            </v-flex>
            <v-card-actions class="submit">
                <v-btn v-on:click="submit"
                       class="mx-0"
                       color="primary"
                       large
                >
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-layout>



    <!--<div>-->
        <!--<h1>Post a New Deal</h1>-->
        <!--<v-form v-model="valid">-->
            <!--<v-text-field-->
                    <!--v-model="title"-->
                    <!--:rules="titleRules"-->
                    <!--:counter="10"-->
                    <!--label="Title"-->
                    <!--required-->
            <!--&gt;</v-text-field>-->
            <!--<v-text-field-->
                    <!--v-model="discount"-->
                    <!--:rules="discountRules"-->
                    <!--:counter="10"-->
                    <!--label="Discount details..."-->
                    <!--required-->
            <!--&gt;</v-text-field>-->
            <!--<v-text-field-->
                    <!--v-model="link"-->
                    <!--:rules="linkRules"-->
                    <!--:counter="10"-->
                    <!--label="Link"-->
                    <!--required-->
            <!--&gt;</v-text-field>-->
            <!--<v-btn v-on:click="submit"-->
                    <!--class="mx-0"-->
                    <!--color="primary"-->
                    <!--large-->
            <!--&gt;-->
                <!--Submit-->
            <!--</v-btn>-->


        <!--</v-form>-->
    <!--</div>-->
</template>

<script>
    import deal_api from '../mixins/dealapi'
    import auth from '../mixins/auth'

    export default {
        data () {
            return {
                valid: false,
                title: '',
                titleRules: [
                    v => !!v || 'Title is required',
                    v => v.length <= 100 || 'Title must be less than 10 characters'
                ],
                discount: '',
                discountRules: [
                    v => !!v || 'Discount is required',
                    v => v.length <= 400 || 'Discount must be valid'
                ],
                link: '',
                linkRules: [
                    v => !!v || 'Link is required',
                    v => v.length <= 200 || 'Link must be valid'
                ],
                token: ''
            }
        },
        methods: {
            submit: function (event) {
                let vm = this;
                deal_api.new_deal({
                    'title': this.title,
                    'discount': this.discount,
                    'link': this.link
                }, vm.token, function(err, httpResponse, body) {
                    console.log(body);
                    if(body.success === true) {
                        vm.$router.push({ name: 'HomePage'});
                    }
                });
            }
        },
        created () {
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
</script>

<style scoped>
    .input {
        padding-left: 60px;
    }
    .signin_card {
        width: 500px;
        height: 550px;
    }
    .title {
        padding: 40px 60px 50px;
    }
    .submit {
        padding-left: 60px;
    }
</style>