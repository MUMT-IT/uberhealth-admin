<template>
<div class="modal-card">
  <b-field label="จำนวนก้าว">
    <b-numberinput :value="steps" @input="updateSteps($event)"></b-numberinput>
  </b-field>
  <b-button @click="close">Add</b-button>
</div>
</template>

<script>
export default {
  name: "WalkingForm",
  props: ['steps'],
  methods: {
    updateSteps (value) {
      this.$emit('update-steps', value)
    },
    close () {
      this.$emit('closing')
      this.$parent.close()
    }
  }
}
</script>

<style scoped>

</style>