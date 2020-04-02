<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        
        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>

       
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


export default {
  name: 'MainLayout',

  components: {

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
