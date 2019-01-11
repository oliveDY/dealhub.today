<template>
 <div>
     <v-toolbar
             id="core-toolbar"
             app
             color="bg-info"
             prominent
     >
         <v-toolbar-side-icon></v-toolbar-side-icon>
                 <router-link :to="{name: 'HomePage'}" class="link">
                     <v-toolbar-title>Dealhub</v-toolbar-title>
                 </router-link>
         <v-spacer></v-spacer>
         <v-toolbar-items>
             <v-flex align-center layout py-2>
                 <v-btn flat v-on:click="go_signin"><v-icon>perm_identity</v-icon>
                     SignIn</v-btn>
                 <v-btn flat v-on:click="go_signup"><v-icon>person_add</v-icon>
                     SignUp</v-btn>
                 <v-btn flat v-on:click="logout"><v-icon>directions_run</v-icon>
                     Logout</v-btn>
             </v-flex>
         </v-toolbar-items>
     </v-toolbar>
 </div>
</template>

<script>
    import auth from '../mixins/auth';
    export default {
        data () {
            return {

            };
        },
        methods : {
            logout: function(event) {
                let vm = this;
                auth.token_check(function(token) {
                    if(token != null) {
                        auth.token_remove();
                    }
                });
            },
            go_signin: function(event) {
                this.$router.push({ name: 'SigninPage'});
            },
            go_signup: function (event) {
                this.$router.push({ name: 'SignupPage'});
            },
            check_signin : function(event) {
                let vm = this;
                auth.token_check(function(token) {
                    // if haven't signed in, router to singin page
                    if(token == null) {
                        vm.$router.push({name: "SigninPage"});
                    }
                    // if have already signed in, rounter to user account page
                    else {
                        vm.token = token;
                        vm.$router.push({name : "UserAccountPage"});
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