<template>
<div>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h1 class="title has-text-centered">{{ group.name }}</h1>
          <h1 class="subtitle has-text-centered">By {{ group.creator }}</h1>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-tabs>
            <b-tab-item label="Non-Members">
              <b-table
                  :data="fltUsers"
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
import {db} from '../../../firebase'
import { doc, getDoc, collection, getDocs, query, where, updateDoc } from "firebase/firestore";

export default {
  name: "Detail",
  data () {
    return {
      users: [],
      group: {
        name: null,
        creator: null,
        members: [],
      },
      checkedRows: [],
      removeRows: [],
      columns: [
        {
          field: 'displayName',
          label: 'Display Name',
          width: 40,
          numeric: false
        },
        {
          field: 'title',
          label: 'Title',
          width: 20,
          numeric: false
        },
        {
          field: 'firstName',
          label: 'First Name',
          width: 40,
          numeric: false
        },
        {
          field: 'lastName',
          label: 'Last Name',
          width: 40,
          numeric: false
        },
      ]
    }
  },
  computed: {
    fltUsers () {
      const self = this
      return this.users.filter((u)=>{ return self.group.members.indexOf(u.id) < 0 })
    },
    members () {
      const self = this
      return this.users.filter((u)=>{ return self.group.members.indexOf(u.id) > -1 })
    }
  },
  methods: {
    async loadGroup(groupId) {
      const docRef = doc(db, "userGroups", groupId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.group = docSnap.data()
        this.group.id = docSnap.id
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    async loadUsers() {
      const self = this
      const q = query(collection(db, "users"), where("isActive", "==", true));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        data.id = doc.id
        self.users.push(data)
      });
    },
    addMembers () {
      const self = this
      this.checkedRows.forEach((u)=>{
        self.group.members.push(u.id)
      })
      this.checkedRows = []
    },
    removeMembers () {
      const self = this
      this.removeRows.forEach((uid)=>{
        let idx = self.group.members.indexOf(uid)
        self.group.members.splice(idx, 1)
      })
      this.removeRows = []
    },
    async saveData() {
      const self = this
      const docRef = doc(db, "userGroups", this.$route.params.groupId);
      await updateDoc(docRef, {
        members: self.group.members
      });
      this.$buefy.toast.open({
        message: 'Saved Successcully',
        type: 'is-success',
        position: 'is-bottom'
      })
    }
  },
  async mounted() {
    await this.loadGroup(this.$route.params.groupId)
    await this.loadUsers()
  }
}
</script>

<style scoped>

</style>