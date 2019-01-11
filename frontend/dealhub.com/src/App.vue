<template>
  <div id="app">
    <v-app id="inspire">
      <MyHeader></MyHeader>
      <v-content>
        <v-container fluid fill-height>
          <v-layout
                  justify-center
                  align-center
          >
            <v-flex text-xs-center>
              <router-view name="body"></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <MyFooter></MyFooter>
    </v-app>
  </div>
</template>

<script>
import MyFooter from './components/footer.vue'
import MyHeader from './components/header.vue'

export default {
  name: 'App',
  components: {
      MyFooter,
      MyHeader
  },
  data () {
    return {
    }
  }
}
</script>
