<template>
<div>
  <section class="section">
    <div class="columns">
      <div class="column is-two-thirds is-offset-2">
        <h1 class="title has-text-centered">Groups</h1>
        <nav class="panel">
          <p class="panel-heading">
            Menu
          </p>
          <router-link class="panel-block" v-for="group in groups" :key="group.id"
          :to="{ name: 'GroupDetail', params: { groupId: group.id }}">
            <span class="panel-icon">
              <i class="fas fa-chevron-right"></i>
            </span>
            {{ group.name }}
          </router-link>
          <router-link class="panel-block" :to="{ name: 'NewGroupForm' }">
            <span class="panel-icon">
              <i class="fas fa-plus-circle" aria-hidden="true"></i>
            </span>
            Create
          </router-link>
        </nav>
        <div class="buttons is-centered">
          <b-button class="is-light" @click="$router.push({ name: 'UserMain' })">
            Back
          </b-button>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import { db } from '../../../firebase'
import { collection, query, getDocs } from "firebase/firestore";

export default {
  name: "Main",
  data () {
    return {
      groups: []
    }
  },
  mounted() {
    this.loadGroups()
  },
  methods: {
    async loadGroups() {
      const self = this
      const q = query(collection(db, "userGroups"));

      const querySnapshot = await getDocs(q);
      // fat arrow function
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        data.id = doc.id
        self.groups.push(data)
      });
    }
  }
}
</script>

<style scoped>

</style>