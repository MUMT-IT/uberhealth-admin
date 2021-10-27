<template>
<div class="modal-card" style="width: auto">
  <header class="modal-card-head">
    <p class="modal-card-title">Walking Activity</p>
  </header>
  <section class="modal-card-body">
    <b-field label="จำนวนก้าว">
      <b-numberinput :value="steps" @input="updateSteps($event)"></b-numberinput>
    </b-field>
  </section>
  <footer class="modal-card-foot">
    <div class="buttons is-centered">
      <b-button @click="close" class="is-primary">Add</b-button>
    </div>
  </footer>
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