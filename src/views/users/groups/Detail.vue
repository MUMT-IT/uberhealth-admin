<template>
<div>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h1 class="title has-text-centered">{{ group.name }}</h1>
          <h1 class="subtitle has-text-centered">By {{ group.creator }}</h1>
          <h2 class="title is-size-4">
            จำนวนสมาชิก {{ group.members.length }}
          </h2>
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
            <b-button :loading="isSaving" @click="saveData" class="is-success">Save</b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import {db} from '../../../firebase'
import { doc, getDoc, collection, getDocs, where, query, updateDoc } from "firebase/firestore";

export default {
  name: "Detail",
  data () {
    return {
      isSaving: false,
      users: [],
      group: {
        id: null,
        name: null,
        creator: null,
        members: [],
      },
      currentGroups: {},
      memberProfiles: [],
      checkedRows: [],
      removeRows: [],
      columns: [
        {
          field: 'userId',
          label: 'User ID',
          numeric: false
        },
        {
          field: 'titleName',
          label: 'Title',
          numeric: false
        },
        {
          field: 'firstName',
          label: 'First Name',
          numeric: false
        },
        {
          field: 'lastName',
          label: 'Last Name',
          numeric: false
        },
        {
          field: 'gender',
          label: 'Gender',
          numeric: false,
          searchable: true,
        },
        {
          field: 'faculty',
          label: 'Faculty',
          numeric: false,
          searchable: true,
        },
      ]
    }
  },
  computed: {
    fltUsers () {
      return this.users.filter((u)=>{ return this.group.members.indexOf(u.userId) < 0 })
          .filter(u=>{ return u.currentGroup === undefined })
    },
    members () {
      return this.users.filter((u)=>{ return this.group.members.indexOf(u.userId) > -1 })
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
      const q = query(collection(db, "profiles"), where("userName", "!=", ""));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        data.id = doc.id
        if (this.group.members.indexOf(data.userId) > -1) {
          this.memberProfiles.push(doc.id)
        }
        this.currentGroups[doc.id] = data.currentGroup
        this.users.push({
          profileId: doc.id,
          firstName: data.firstNameTh || data.firstNameEn,
          lastName: data.lastNameTh || data.lastNameEn,
          titleName: data.titleNameTh || data.titleNameEn,
          faculty: data.facultyNameTh || data.facultyNameEn,
          gender: data.gender,
          currentGroup: data.currentGroup,
          userId: data.userId
        })
      });
    },
    addMembers () {
      this.checkedRows.forEach((u)=>{
        this.group.members.push(u.userId)
        this.memberProfiles.push(u.profileId)
      })
      this.checkedRows = []
    },
    removeMembers () {
      this.removeRows.forEach((uid)=>{
        let idx = this.group.members.indexOf(uid)
        this.group.members.splice(idx, 1)
        this.memberProfiles.splice(idx, 1)
      })
      this.removeRows = []
    },
    async saveData() {
      this.isSaving = true
      const docRef = doc(db, "userGroups", this.$route.params.groupId);
      await updateDoc(docRef, {
        members: this.group.members
      });
      for (const pid of this.memberProfiles.filter(p=>{ return p !== this.group.id })) {
        let pRef = doc(db, "profiles", pid);
        await updateDoc(pRef, {
          currentGroup: this.group.id
        })
      }
      this.isSaving = false
      this.$buefy.toast.open({
        message: 'Saved Successcully',
        type: 'is-success',
        position: 'is-top'
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