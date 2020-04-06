<template>
    <q-card>
        <modal-header>Edit Task</modal-header>
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
  props:['task', 'id'],
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
    ...mapActions('tasks',['updateTask']),
    submitTask(){
      //console.log('submit task')
      this.updateTask({
        id:this.id, 
        updates:this.taskToSubmit
      });
      this.$emit('close');
    }
  },
 /*  components:{
    'modal-header':require('components/Tasks/Modals/Shared/ModalHeader.vue').default,
    'modal-task-name':require('components/Tasks/Modals/Shared/ModalTaskName.vue').default,
    'modal-due-date':require('components/Tasks/Modals/Shared/ModalDueDate.vue').default,
    'modal-due-time':require('components/Tasks/Modals/Shared/ModalDueTime.vue').default,
    'modal-buttons':require('components/Tasks/Modals/Shared/ModalButtons.vue').default
  }, */
  mounted(){
    this.taskToSubmit = Object.assign({}, this.task);
  }
}
</script>

<style>

</style>