<template>
    <div>
        <Jumbotron></Jumbotron>
        <v-container>
            <v-flex xs12 sm12 md6 class="searchBar">
                <v-form>
                    <v-layout row wrap>
                        <v-flex xs6 lg6>
                            <v-text-field label="Seach deals..." v-model="search_string"></v-text-field>
                        </v-flex>
                        <v-flex xs6 lg6>
                            <v-btn v-on:click="get_id_list" class="mx-0" color="primary" large>
                                Search
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
            <v-layout row wrap
                      justify-start>
                <v-flex v-for="deal_id in id_list" :key="deal_id" lg3 xs12 class="px-2 py-3">
                    <DealCard v-bind:deal_id="deal_id"></DealCard>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import DealCard from '../components/deal_card'
    import Jumbotron from '../components/jumbotron'
    import dealapi from '../mixins/dealapi'

    export default {
        data () {
            return {
                id_list: '',
                search_string: ''
            };
        },
        components : {
            DealCard,
            Jumbotron
        },
        created () {
            this.get_id_list();
        },
        methods : {
            get_id_list : function() {
                let vm = this;
                dealapi.search_deal(vm.search_string, function (err, httpResponse, body) {
                    if(err) {
                        //TODO
                    }
                    if(httpResponse.statusCode == 200) {
                        vm.id_list = body.id_list;
                        console.log("list:" + body.id_list);
                    }
                    else {
                        //TODO
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>