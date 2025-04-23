<template>
  <AgGridVue
      class="ag-theme-alpine"
      style="height: 500px;"
      :rowData="rowData"
      :columnDefs="colDefs"
      :defaultColDef="defaultColDef"
      :pagination="true"
      @cell-value-changed="onCellValueChanged"
  />
  </template>

<script setup>
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

import { onMounted, ref } from 'vue';
import { AgGridVue } from 'ag-grid-vue3'
import GetNewRegistration from '@/services/GetNewRegistrations';

const rowData = ref([])

onMounted(async () => {
  const result = await GetNewRegistration()
  console.log(result)
  rowData.value = result.data
})

const defaultColDef = {
      flex: 1,
      filter: true
    }

const colDefs = ref([
    { field: "firstname"},
    { field: "lastname"},
    { field: "address"},
    { field: "telephone"},
    { field: "Accepted"},
])

const onCellValueChanged = (event) => {
  console.log(event.value)
}

</script>
