<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="tasksDownloaded">
        <div class="row q-mb-lg">
          <search></search>
          <sort></sort>
        </div>    
        <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">no search result.</p>
        <q-scroll-area class="q-scroll-area-tasks">
          <no-tasks v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"></no-tasks>
          <tasks-todo v-if="Object.keys(tasksTodo).length" :tasksTodo="tasksTodo" ></tasks-todo>
          <tasks-completed v-if="Object.keys(tasksCompleted).length" :tasksCompleted="tasksCompleted" class="q-mb-xl"></tasks-completed>
        </q-scroll-area>

        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn round color="primary" size="24px" icon="add" @click="showAddTask = true" class="all-pointer-events"/>
        </div>   
      </template>  
      <template v-else>
        <span class="absolute-center">
          <q-spinner
            color="primary"
            size="3em"
          />
        </span>
      </template>    
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask=false"></add-task>
    </q-dialog>

  </q-page>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
export default {
  data(){
    return {
      showAddTask:false,
    }
  },
  computed:{
    /* tasks(){
      return this.$store.getters['tasks/tasks']
    } */
    ...mapGetters('tasks',['tasksTodo','tasksCompleted']),
    ...mapGetters('settings',['settings']),
    ...mapState('tasks',['search', 'tasksDownloaded']),
  },
  components:{    
    'add-task':require('components/Tasks/Modals/AddTask.vue').default,
    'tasks-todo':require('components/Tasks/TasksTodo.vue').default,
    'tasks-completed':require('components/Tasks/TasksCompleted.vue').default,
    'no-tasks':require('components/Tasks/NoTasks.vue').default,
    'search':require('components/Tasks/Tools/Search.vue').default,
    'sort':require('components/Tasks/Tools/Sort.vue').default,
  },
  mounted(){
    this.$root.$on('showAddTask', ()=>{
      this.showAddTask=true;
    })
  },
}
</script>

<style>
 .q-scroll-area-tasks{
   display:flex;flex-grow:1;
 }
</style>