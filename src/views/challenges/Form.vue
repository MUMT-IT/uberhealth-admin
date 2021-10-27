<template>
<div>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-two-thirds is-offset-2 box">
          <h1 class="title has-text-centered">New Challenge</h1>
          <b-field label="ชื่อโครงการ" type="is-danger">
            <b-input type="text" v-model="challenge.title"></b-input>
          </b-field>
          <b-field label="ระยะเวลา" type="is-danger">
            <b-datepicker v-model="challenge.dates" range></b-datepicker>
          </b-field>
          <b-field label="กิจกรรม">
            <ul v-for="activity in challenge.activities" :key="activity.type">
              <li>{{ activity.type }}</li>
            </ul>
          </b-field>
          <div class="buttons is-centered">
            <b-button class="is-primary" @click="isComponentWalkingModalActive=true">
              Add Walking Activity
            </b-button>
            <b-button @click="saveData" class="is-success">
              Save
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <b-modal
        v-model="isComponentWalkingModalActive"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Walking Activity Form"
        aria-modal>
      <template #default="props">
        <walking-form v-bind="walkingFormProps"
                      @closing="addWalkingActivity"
                      v-on:update-steps="updateSteps" @close="props.close">
        </walking-form>
      </template>
    </b-modal>
  </section>
</div>
</template>

<script>
import WalkingForm from "../../components/challenges/WalkingForm";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore"

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
        creator: auth.currentUser.email,
        title: null,
        dates: [],
        activities: [],
        userGroups: [],
      }
    }
  },
  methods: {
    updateSteps (value) {
      this.walkingFormProps.steps = value
    },
    addWalkingActivity () {
      this.challenge.activities.push({
        type: 'walking',
        steps: this.walkingFormProps.steps
      })
      this.walkingFormProps.steps = 0
    },
    async saveData() {
      const self = this
      if (self.challenge.title && self.challenge.dates) {
        const docRef = await addDoc(collection(db, "challenges"), self.challenge)
        if (docRef.id) {
          self.$buefy.toast.open({
            message: "Saved successfully",
            type: "is-success",
            position: "is-bottom"
          })
          self.$router.push({ name: "ChallengeMain"})
        }
      } else {
        self.$buefy.toast.open({
          message: "Please fill out all required fields",
          type: "is-danger",
          position: "is-bottom"
        })
      }
    }
  }
}
</script>

<style scoped>

</style>