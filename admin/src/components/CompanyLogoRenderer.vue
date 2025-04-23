<template>
  <span style="display: flex; height: 100%; width: 100%; align-items: center;">
    <img
      :src="'https://www.ag-grid.com/example-assets/space-company-logos/' + cellValueLowerCase + '.png'"
      style="display: block; width: 25px; height: auto; max-height: 50%; margin-right: 12px; filter: brightness(1.1);"
    />
    <p style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
      {{ cellValue }}
    </p>
  </span>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({})

const cellValue = props.params.value
// console.log(props)
const cellValueLowerCase = cellValue.toLowerCase()
</script>
