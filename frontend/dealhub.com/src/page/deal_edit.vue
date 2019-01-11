<template>
    <div>
        <h1>Edit Your Deal</h1>
        <v-form v-model="valid">
            <v-text-field
                    v-model="title"
                    :rules="titleRules"
                    :counter="10"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="discount"
                    :rules="discountRules"
                    :counter="10"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="link"
                    :rules="linkRules"
                    :counter="10"
                    required
            ></v-text-field>
            <v-btn v-on:click="submit"
                   class="mx-0"
                   color="primary"
                   large
            >
                Submit
            </v-btn>


        </v-form>
    </div>
</template>

<script>
    import deal_api from '../mixins/dealapi'
    import auth from '../mixins/auth'

    export default {
        props: [
            'deal_id'
        ],
        data () {
            return {
                valid: false,
                title: '',//在placeholder用value的时候也无法显示想要显示的值，原因在这，初始化为空；我就在找到deal_info的时候就初始化值，就可以显示啦
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
                token: '',
                deal_detail : '',
                image: ''

            }
        },
        created () {
            this.check_signin();
            this.deal_id = this.$route.params.id;
            this.get_deal_info();
        },
        methods: {
            submit: function (event) {
                let vm = this;
                deal_api.edit_deal(vm.deal_id, {
                    'title': this.title,
                    'discount': this.discount,
                    'link': this.link,
                    'image' : vm.image,
                    'token': this.token
                }, vm.token, function(err, httpResponse, body) {
                    console.log(body);
                    if(body.success === false) {
                        console.log("deal_edit failure!")
                    }
                    else {
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
            },
            get_deal_info : function () {
                let vm = this;
                deal_api.deal_detail(this.deal_id, function (err, httpResponse, body) {
                    if(err) {
                        // TODO
                    }
                    if(httpResponse.statusCode === 200) {
                        vm.deal_detail = body;
                        vm.title = body.title;
                        vm.discount = body.discount;
                        vm.link = body.link;
                        vm.image = body.image;
                    }
                });
            }
        }

    }
</script>

<style scoped>

