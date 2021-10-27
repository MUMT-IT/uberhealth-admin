<template>
<div>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-two-thirds is-offset-3 box">
          <b-field label="ชื่อโครงการ">
            <b-input type="text" v-model="challenge.title"></b-input>
          </b-field>
          <b-field label="ระยะเวลา">
            <b-datepicker v-model="challenge.dates" range></b-datepicker>
          </b-field>
        </div>
        <b-button class="is-primary" @click="isComponentWalkingModalActive=true">
          Add Walking Activity
        </b-button>
      </div>
      <pre>
        {{ challenge }}
      </pre>
      <pre>
        {{ walkingFormProps }}
      </pre>
    </div>
    <b-modal
        v-model="isComponentWalkingModalActive"
        :has-modal-card="true"
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Example Modal"
        aria-modal>
      <template #default="props">
        <walking-form v-bind="walkingFormProps"
                      @closing="addWalkingActivity"
                      v-on:update-steps="updateSteps" @close="props.close"></walking-form>
      </template>
    </b-modal>
  </section>
</div>
</template>

<script>
import WalkingForm from "../../components/challenges/WalkingForm";
export default {
  name: "Form",
  components: {
    WalkingForm,
  },
  data () {
    return {
      isComponentWalkingModalActive: false,
      walkingFormProps: {
        steps: 0,
      },
      challenge: {
        title: null,
        dates: [],
        activities: [
        ]
      }
    }
  },
  methods: {
    updateSteps (value) {
      this.walkingFormProps.steps = value
    },
    addWalkingActivity () {
      this.challenge.activities.push({
        activity: 'walking',
        steps: this.walkingFormProps.steps
      })
      this.walkingFormProps.steps = 0
    }
  }
}
</script>

<style scoped>

</style>