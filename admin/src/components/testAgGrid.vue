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
import CompanyLogoRenderer from './CompanyLogoRenderer.vue';


const fetchData = async () => {
    const response = await fetch('https://www.ag-grid.com/example-assets/space-mission-data.json');
    return response.json();
};

const rowData = ref([])

onMounted(async () => {
    rowData.value = await fetchData();
});


const defaultColDef = {
      flex: 1,
      filter: true
    }

const colDefs = ref([
    { field: "mission"},
    { field: "company", cellRenderer: CompanyLogoRenderer },
    { field: "location", editable: true },
    { field: "date" },
    { field: "price", valueFormatter: (param) => '£ ' + param.value },
    { field: "successful", editable: true},
    { field: "rocket" }
])

const onCellValueChanged = (event) => {
  console.log(event.value)
}

/* const rowData = ref([
  {FirstName: "Faly", LastName: "Andria", Address: 'Madagascar', Telephone: '034 36 123 45'},
  {FirstName: "Faly", LastName: "Gaigy", Address: 'Madagascar', Telephone: '034 00 123 45'}
])

const colDefs = ref([
  {field: 'FirstName'},
  {field: 'LastName'},
  {field: 'Address'},
  {field: 'Telephone'},
]) */

</script>

<style scoped>
@import "ag-grid-community/styles/ag-theme-alpine.css";
</style>

