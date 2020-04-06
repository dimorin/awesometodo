<template>
    <q-item @click="updateTask({ id:id, updates:{completed:!task.completed}})" :class="!task.completed ? 'bg-orange-1':'bg-green-1'" 
    v-touch-hold:1000.mouse="showEditTaskModal"
    clickable v-ripple>
        <q-item-section side top>
            <q-checkbox :value="task.completed" class="no-pointer-events" />
        </q-item-section>
        <q-item-section>
            <q-item-label :class="{'text-strike':task.completed}" v-html="this.$options.filters.searchHighlight(task.name,search)">     <!--   -->          
                <!-- {{task.name | searchHighlight(search)}} {{id}} -->
            </q-item-label>          
        </q-item-section>
        <q-item-section v-if="task.dueDate" side>
            <div class="row">
            <div class="column justify-center">
                <q-icon name="today" size="18px" class="q-mr-xs" />
            </div>            
            <div class="column">
                <q-item-label class="row justify-end" caption>
                {{task.dueDate | niceDate }}
                </q-item-label>         
                <q-item-label class="row justify-end" caption>
                <small>{{ taskDueTime }}</small>
                </q-item-label>         
            </div>            
            </div>          
        </q-item-section>
        <q-item-section side>
            <div class="row">
                <q-btn flat round dense color="primary" icon="edit" @click.stop="showEditTaskModal" />    
            <q-btn flat round dense color="red" icon="delete" @click.stop="promptToDelete(id)" />    <!-- click에stop을 붙이면 parent에 이벤트를 전달하지 않는다. -->
            </div>            
        </q-item-section>        
        
        <q-dialog v-model="showEditTask">
          <edit-task @close="showEditTask=false" :task="task" :id="id"></edit-task>
        </q-dialog>

    </q-item>   
</template>

<script>
import { date } from 'quasar'
import {mapState, mapActions, mapGetters} from 'vuex'

export default {
    props:['task','id'],
    data(){
        return{
            showEditTask:false,
        }
    },
    computed:{
        ...mapState('tasks',['search']),
        ...mapGetters('settings',['settings']),
        taskDueTime(){
            if(this.settings.show12HourTimeFormat){
                return date.formatDate(this.task.dueDate+' '+this.task.dueTime, 'h:mmA')
            }
            return this.task.dueTime
        }
    },
    methods:{
        ...mapActions('tasks',['updateTask', 'deleteTask']),
        promptToDelete(id){
            this.$q.dialog({
                title: 'Confirm',
                message: 'Really delte?',
                cancel: true,
                persistent: true
            }).onOk(() => {
                this.deleteTask(id);
            })
        },
        showEditTaskModal(){
            this.showEditTask = true
        }
    },
    filters:{
        niceDate(value){
            return date.formatDate(value, 'MMM D')
        },
        searchHighlight(value, search){
            
            if(search){
                let searchRegExp = new RegExp(search, 'ig')
                return value.replace(searchRegExp,(match)=>{
                    return '<span class="bg-yellow-6">'+match+'</span>'
                });
            }
            return value
        }
    },
    components:{
        'edit-task':require('components/Tasks/Modals/EditTask.vue').default,
    }
}
</script>

<style>

</style>