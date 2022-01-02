<template>
<div>
  <section class="section">
    <div class="columns">
      <div class="column is-two-thirds is-offset-2">
        <h1 class="title has-text-centered">Challenges</h1>
        <nav class="panel">
          <p class="panel-heading">
            Menu
          </p>
          <router-link class="panel-block" v-for="challenge in challenges" :key="challenge.id"
                       :to="{name : 'ChallengeGroups', params: { challengeId: challenge.id}}">
            <span class="panel-icon">
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </span>
            {{ challenge.title }}
          </router-link>
          <router-link class="panel-block" :to="{ name: 'ChallengeForm' }">
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
import { db, auth } from "../../firebase"
import {collection, query, where, getDocs} from "firebase/firestore";

export default {
  name: "Main",
  data () {
    return {
      challenges: []
    }
  },
  methods: {
    async loadData() {
      const self = this
      const q = query(collection(db, "challenges"),
          where("creator", "==", auth.currentUser.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        let data = doc.data()
        data.id = doc.id
        self.challenges.push(data)
      });
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>