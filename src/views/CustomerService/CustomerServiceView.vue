<template>
  <div>
    CustomerServiceView
    <a-input
      v-model:value="info.inputValue"
      placeholder="Basic usage"
    />
    {{ info.inputValue }}
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'CustomerServiceView',
  setup () {
    return {
      info: ref({
        inputValue: ''
      })
    }
  },
  mounted () {
    console.log('mounted')
    // this.resetData()
  },
  methods: {
    resetData () {
      this.info.inputValue = this.$route.query.value || ''
    }
  }
}
</script>

<style scoped>

</style>
