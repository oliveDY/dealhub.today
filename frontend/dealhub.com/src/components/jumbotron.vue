<template>
    <v-layout>
        <v-flex lg11 class="jumbo">
            <v-jumbotron src="https://images.unsplash.com/photo-1526635229611-9a2482c8427b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                         lg10 >
                <v-container >
                    <v-layout>
                        <v-flex>
                            <h2 class="display-3">Welcome to Dealhub!</h2>
                            <span class="subheading">This is a community to share and keep up with good deals.</span>
                            <v-divider class="my-3"></v-divider>
                            <div class="title mb-3">Add New Deal!</div>
                            <v-btn class="mx-0" color="primary" large v-on:click="go_newdeal">
                                Add
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-jumbotron>
        </v-flex>
    </v-layout>


</template>

<script>
    export default {
        name: "jumbotron",
        data() {
            return {};
        },
        methods: {
            go_newdeal: function(event) {
                this.$router.push({ name: 'NewDealPage'});
            }
        }

    }
</script>

<style scoped>
    .link {
        text-decoration: none;
    }
    .display-3 {
        margin: 30px;
        padding: 10px;
    }
    .jumbo {
        padding-left: 110px;
        padding-top: 20px;
    }

</style>