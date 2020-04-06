<template>
    <q-card>
        <modal-header>Add Task</modal-header>
        <q-form @submit="submitTask"  class="q-gutter-md"><!-- @reset="onReset" --> <!-- prevent는 default action(reload되는 것과 같은)을 막아주는 기능임 -->
          <q-card-section class="q-pt-none">
            <modal-task-name :name.sync="taskToSubmit.name"></modal-task-name>
            <modal-due-date :dueDate.sync="taskToSubmit.dueDate"></modal-due-date>
            <modal-due-time :dueTime.sync="taskToSubmit.dueTime" v-if="taskToSubmit.dueDate"></modal-due-time>
          </q-card-section>

          <modal-buttons></modal-buttons>

          
        </q-form>        
    </q-card>
</template>

<script>
import {mapActions} from 'vuex'
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'
export default {
  mixins:[mixinAddEditTask],
  data(){
    return{
      taskToSubmit:{
        name:'',
        completed: false,
        dueDate:'',
        dueTime:'',
      }
    }
  },
  methods:{
    ...mapActions('tasks',['addTask']),
    submitTask(){
      //console.log('submit task')
      this.addTask(this.taskToSubmit);
      this.$emit('close');
    }
  },
  
}
</script>

<style>

</style>