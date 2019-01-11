<template>
    <div>
        <h1>Register</h1>
        <v-form v-model="valid">
            <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    :counter="10"
                    label="Email"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="passward"
                    :rules="passwordRules"
                    :counter="10"
                    label="Password"
                    required
            ></v-text-field>
            <router-link :to="{name: 'HomePage'}">
                <v-btn v-on:click="submit"
                       class="mx-0"
                       color="primary"
                       large
                >Register
                </v-btn>
            </router-link>
        </v-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                valid: false,
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                password: '',
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => v.length <= 50 || 'Password must be valid'
                ]
            }
        }


    }
</script>

<style scoped>

</style>