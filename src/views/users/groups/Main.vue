<template>
<div>
  <section class="section">
    <div class="columns">
      <div class="column is-one-third is-offset-4">
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
      </div>
    </div>
  </section>
</div>
</template>

<script>
import { db, auth } from '../../../firebase'
import { collection, query, where, getDocs } from "firebase/firestore";

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
      const q = query(collection(db, "userGroups"), where("creator", "==", auth.currentUser.email));

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