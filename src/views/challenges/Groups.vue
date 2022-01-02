<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="title has-text-centered">{{ challenge.title }}</h1>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <b-tabs>
              <b-tab-item label="Non-Members">
                <b-table
                    :data="fltGroups"
                    :columns="columns"
                    :checked-rows.sync="checkedRows"
                    checkable
                    checkbox-position="left">
                  <template #bottom-left>
                    <b>Total checked</b>: {{ checkedRows.length }}
                  </template>
                </b-table>
                <div class="buttons is-centered">
                  <b-button @click="addMembers" class="is-light is-primary">Add</b-button>
                </div>
              </b-tab-item>
              <b-tab-item label="Members">
                <b-table
                    :data="members"
                    :columns="columns"
                    :checked-rows.sync="removeRows"
                    checkable
                    checkbox-position="left">
                  <template #bottom-left>
                    <b>Total checked</b>: {{ removeRows.length }}
                  </template>
                </b-table>
                <div class="buttons is-centered">
                  <b-button @click="removeMembers" class="is-danger is-light">Remove</b-button>
                </div>
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="buttons is-centered">
              <b-button @click="$router.back()" class="is-light">Back</b-button>
              <b-button @click="saveData" class="is-success">Save</b-button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {db} from '../../firebase'
import { doc, getDoc, collection, getDocs, updateDoc, query } from "firebase/firestore";

export default {
  name: "ChallengeGroups",
  data () {
    return {
      challenge: {},
      groups: [],
      checkedRows: [],
      removeRows: [],
      columns: [
        {
          field: 'name',
          label: 'Group Name',
          numeric: false
        },
        {
          field: 'creator',
          label: 'Creator',
          numeric: false
        },
        {
          field: 'members',
          label: 'Members',
          numeric: true
        },
      ]
    }
  },
  computed: {
    fltGroups () {
      return this.groups.filter((g)=>{ return this.challenge.groups.indexOf(g.id) < 0 })
    },
    members () {
      return this.groups.filter((g)=>{ return this.challenge.groups.indexOf(g.id) > -1 })
    }
  },
  methods: {
    async loadChallenge (challengeId) {
      const ref = doc(db, 'challenges', challengeId)
      const docSnap = await getDoc(ref)
      let data = docSnap.data()
      console.log(data)
      this.challenge = data
      this.challenge.id = docSnap.id
    },
    async loadGroups() {
      const ref = collection(db, "userGroups");
      const snapshot = await getDocs(query(ref));
      for (let g of snapshot.docs) {
        let data = g.data()
        this.groups.push({
          id: g.id,
          name: data.name,
          creator: data.creator,
          members: data.members.length
        })
      }
    },
    addMembers () {
      this.checkedRows.forEach((g)=>{
        this.challenge.groups.push(g.id)
      })
      this.checkedRows = []
    },
    removeMembers () {
      this.removeRows.forEach((gid)=>{
        let idx = self.group.members.indexOf(gid)
        this.challenge.groups.splice(idx, 1)
      })
      this.removeRows = []
    },
    async saveData() {
      const docRef = doc(db, "challenges", this.challenge.id);
      await updateDoc(docRef, {
        groups: this.challenge.groups
      });
      this.$buefy.toast.open({
        message: 'Saved Successcully',
        type: 'is-success',
        position: 'is-top'
      })
    }
  },
  async mounted() {
    await this.loadChallenge(this.$route.params.challengeId)
    await this.loadGroups()
  }
}
</script>

<style scoped>

</style>