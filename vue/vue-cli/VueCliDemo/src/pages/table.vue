<template>
  <div id="demo">
    <form id="search">
      Search <input name="query" v-model="searchQuery">
    </form>
    <demoGrid
      :data="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery">
    </demoGrid>
  </div>
</template>
<script>
  import demoGrid from '../components/demo-grid.vue'
  export default {
    name: 'table',
    components: {
      demoGrid: demoGrid
    },
    data () {
      return {
        searchQuery: '',
        gridColumns: ['name', 'power'],
        gridData: [
          { name: 'Chuck Norris', power: Infinity },
          { name: 'Bruce Lee', power: 9000 },
          { name: 'Jackie Chan', power: 7000 },
          { name: 'Jet Li', power: 8000 }
        ]
      }
    }
  }
</script>
<style scoped>

</style>
