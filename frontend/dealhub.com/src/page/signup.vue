<template>
    <v-layout justify-center>
        <v-card class="signup_card">
            <h2 align="left" class="title">SIGN UP</h2>
            <v-flex lg10 v-model="valid">
                <v-text-field
                        class="input"
                        label="email"
                        v-model="username"
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
            <v-card-actions class="signup">
                <v-btn v-on:click="submit"
                       color="primary"
                >SIGNUP
                </v-btn>
                <v-alert :value="alert_visible" type="success">
                    SignUp Successfully!
                </v-alert>
            </v-card-actions>
        </v-card>
    </v-layout>
</template>

<script>
    import auth from '../mixins/auth';
    export default {
        name: "signup",
        data() {
            return {
                alert_visible: false,
                username: '',
                password: '',
                valid: false
            }
        },
        methods: {
            submit: function(event) {
                let vm = this;
                auth.signup(this.username, this.password, function(err, httpResponse, body) {
                    if(err) {
                        // TODO
                    }
                    console.log(body);
                    if(body.success == true) {
                        console.log("h");
                        vm.alert_visible = true;
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
    .signup_card {
        width: 500px;
        height: 400px;
    }
    .title {
        padding: 40px 60px 50px;
    }
    .signup {
        padding-left: 60px;
    }
</style>