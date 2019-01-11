<template>

    <v-layout row>
        <v-flex lg10>
            <v-card>
                <v-toolbar color="teal" dark>
                    <v-toolbar-title class="text-xs-center">
                        <v-icon>favorite</v-icon> Top Liked Deals</v-toolbar-title>
                    <v-spacer></v-spacer>
                        <v-icon>trending_up</v-icon>
                </v-toolbar>

                <v-list subheader three-line>
                    <v-list-tile
                            v-for="deal in this.deal_list"
                            :key="deal.title"
                            avatar
                            @click="go_detail(deal._id)"
                    >
                        <v-list-tile-avatar>
                            <img :src="deal.image">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title v-html="deal.title"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="deal.discount"></v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>

                <v-divider></v-divider>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import dealapi from "../mixins/dealapi";

    export default {
        props: ['rank_id_list'],
        data() {
            return {
                id_list : [],
                deal_list: {}
            }
        },
        created() {
            this.id_list = this.rank_id_list;
            console.log("lalallala ===" + this.id_list);
            this.get_deal_detail();
            console.log("deal details ===" + this.deal_list);
        },
        watch: {

        },
        methods: {
            get_deal_detail: function () {
                let vm = this;
                let dealinfo_list = [];
                console.log("wowowoowwo" );
                console.log("id_list = " + vm.id_list);
                vm.id_list.forEach(function (deal_id) {
                    dealapi.deal_detail(deal_id, function (err, httpResponse, body) {
                        if(err) {
                            // TODO
                        }
                        if(httpResponse.statusCode == 200) {
                            console.log("lalallalalalala");
                            dealinfo_list.push(body);
                        }
                    });
                });
                vm.deal_list = dealinfo_list;
                console.log("hahahha" + vm.deal_list);
            },
            go_detail: function(deal_id) {
                // this.$router.push({name: 'DealDetailPage', params: {id : deal_id}});
                this.$router.push({
                    name: 'DealDetailPage',
                    params: {id : deal_id}
                });
            }


        }
    }
</script>

<style scoped>
    #minicard {
        width: 300px;
        height: 100px;
        position: relative;
        display: inline-block;
        border-radius: 8px;
    }
    #deal_image {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        width: 100px;
        height: 100px;
        border-radius: 8px;
    }
    #text {
        text-align: left;
        display:inline;
    }
    #content {
        display: inline-block;
    }
</style>