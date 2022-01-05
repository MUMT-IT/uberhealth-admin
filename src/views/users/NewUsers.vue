<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            {{ selectedGroupId }}
            <b-field label="Go to">
              <b-select placeholder="Select a group" @input="goToDetail" v-model="selectedGroupId">
                <option
                    v-for="option in groups"
                    :value="option.id"
                    :key="option.id">
                  {{ option.name }}
                </option>
              </b-select>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <b-tabs>
              <b-tab-item label="New Users">
                <b-table :data="fltUsers" :columns="columns"></b-table>
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="buttons is-centered">
              <b-button @click="$router.back()" class="is-light">Back</b-button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {db} from '../../firebase'
import { collection, getDocs, where, query } from "firebase/firestore";

export default {
  name: "NewUsers",
  data () {
    return {
      users: [],
      groups: [],
      selectedGroupId: null,
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
        },
        {
          field: 'faculty',
          label: 'Faculty',
          numeric: false,
          searchable: true,
        },
        {
          field: 'currentGroup',
          label: 'Current Group',
          numeric: false,
        }
      ]
    }
  },
  computed: {
    fltUsers () {
      return this.users.filter(u=>{ return u.currentGroup === undefined })
    }
  },
  methods: {
    async loadUsers() {
      const q = query(collection(db, "profiles"), where("userName", "!=", ""));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        data.id = doc.id
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
    async loadGroups() {
      const q = query(collection(db, "userGroups"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        data.id = doc.id
        this.groups.push(data)
      });
    },
    goToDetail () {
      console.log(this.selectedGroupId)
      this.$router.push({ name: "GroupDetail", params: { "groupId": this.selectedGroupId }})
    }
  },
  async mounted() {
    await this.loadUsers()
    await this.loadGroups()
  }
}
</script>

<style scoped>

</style>