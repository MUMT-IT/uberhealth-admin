<template>
<div>
  <section class="section">
    <div class="columns">
      <div class="column box is-one-third is-offset-4">
        <h1 class="title has-text-centered">New Group</h1>
        <b-field label="Name">
          <b-input v-model="group.name"></b-input>
        </b-field>
        <div class="buttons is-centered">
          <b-button @click="$router.back()" class="is-light">Back</b-button>
          <b-button @click="addGroup" class="is-success">Submit</b-button>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import {auth, db} from '../../../firebase'
import { collection, addDoc } from "firebase/firestore"

export default {
  name: "NewGroup",
  data () {
    return {
      group: {
        name: null,
        creator: auth.currentUser.email,
      }
    }
  },
  methods: {
    async addGroup () {
      const docRef = await addDoc(collection(db, "userGroups"), this.group);
      if (docRef.id) {
        this.$buefy.toast.open({
          message: 'New group added.',
          type: 'is-success',
          position: 'is-bottom',
        })
        this.group.name = null
      } else {
        this.$buefy.toast.open({
          message: 'Failed to add a new group',
          type: 'is-danger',
          position: 'is-bottom',
        })
      }
    }
  }
}
</script>

<style scoped>

</style>