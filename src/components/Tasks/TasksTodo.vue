<template>
    <transition
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top"
        >
        <div>
            <list-header v-if="!settings.showTasksInOneList" bgColor="bg-blue">Todo</list-header>
            <q-list bordered separator>      
                <task v-for="(task,key) in tasksTodo" :key="key" :task="task" :id="key"></task>       
            </q-list>
        </div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props:['tasksTodo'],
    computed:{
        ...mapGetters('settings',['settings'])
    },
    components:{
        'task':require('components/Tasks/Tasks.vue').default,
        'list-header':require('components/Shared/ListHeader.vue').default,
    }
}
</script>

<style>

</style>