<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>        
        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>
        <q-btn v-if="!loggedIn" to="/auth" flat icon-right="account_circle" label="Login" class="absolute-right" />
        <q-btn v-else flat icon-right="account_circle" label="Logout" class="absolute-right" @click="logoutUser" />
      </q-toolbar>
    </q-header>
    <q-footer>
      <q-tabs>
        <q-route-tab v-for="nav in navs" :to="nav.link" :icon="nav.icon" :label="nav.title" :key="nav.title" />
      </q-tabs>
    </q-footer>
    <q-drawer
      :breakpoint="767" :width="250"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label
          header
        >
          Navigation
        </q-item-label>
        <q-item
          exact
          clickable
          v-for="nav in navs"
          :to="nav.link" :key="nav.title" class="text-grey-4"
        >
          <q-item-section
            v-if="nav.icon"
            avatar
          >
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.title }}</q-item-label>          
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'MainLayout',
  computed: {
    ...mapState('auth',['loggedIn'])
  },
  data () {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          title: 'Todo',
          icon: 'list',
          link: '/'
        },
        {
          title: 'Settings',
          icon: 'settings',
          link: '/settings'
        },
      ]
    }
  },
  methods:{
    ...mapActions('auth',['logoutUser'])
  }
}
</script>
<style lang="scss">
  @media screen and (min-width:768px){
    .q-footer{display:none;}
  }
  .q-drawer {
    .q-router-link--exact-active{color:white !important;}
  }
  
</style>
