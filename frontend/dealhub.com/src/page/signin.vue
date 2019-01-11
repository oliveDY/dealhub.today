<template>
    <v-layout justify-center>
        <v-card class="signin_card">
            <h2 align="left" class="title">SIGN IN</h2>
            <v-flex lg10 v-model="valid">
                <v-text-field
                        class="input"
                        label="email"
                        v-model="username"
                        :rules="emailRules"
                        :counter="10"
                        required
                        outline
                ></v-text-field>
            </v-flex>
            <v-flex lg10 v-model="valid">
                <v-text-field
                        class="input"
                        label="password"
                        v-model="password"
                        :counter="10"
                        required
                        outline
                ></v-text-field>
            </v-flex>
            <v-card-actions class="login">
                <v-btn v-on:click="submit"
                       color="primary"
                >LOGIN
                </v-btn>
                <v-alert
                        :value="warning_alert_visible"
                        type="error"
                >
                    Username or Password not exist!
                </v-alert>
                <v-alert
                        :value="success_alert_visible"
                        type="success"
                >
                    LOGIN Successfully!
                </v-alert>
            </v-card-actions>
        </v-card>
    </v-layout>
</template>

<script>
    import auth from '../mixins/auth';
    import * as Cookies from "js-cookie";

    export default {
        data() {
            return {
                warning_alert_visible: false,
                success_alert_visible: false,
                valid: false,
                username: '',
                password: '',
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ]
            }
        },
        methods: {
            submit: function(event){
                let vm = this;
                auth.signin(this.username, this.password, function(err, httpResponse, body) {
                    if(body.success === false) {
                        vm.warning_alert_visible = true;
                    }
                    else if(body.success === true) {
                        vm.success_alert_visible = true;
                        let token = body.token.split(' ')[1];
                        Cookies.set('dealhub.today', token);
                        let user_id = body.user_id;
                        Cookies.set('dealhub.today.id', user_id);
                        vm.$router.push({name: "HomePage"});
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .input {
        padding-left: 60px;
    }
    .signin_card {
        width: 500px;
        height: 400px;
    }
    .title {
        padding: 40px 60px 50px;
    }
    .login {
        padding-left: 60px;
    }
</style>