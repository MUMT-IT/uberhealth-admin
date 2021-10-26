<template>
<div>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column box is-one-third is-offset-4">
          <h1 class="title has-text-centered">Log In</h1>
          <b-field>
            <b-input v-model="email" type="email" icon="email" placeholder="Email"></b-input>
          </b-field>
          <b-field>
            <b-input v-model="password" type="password" icon="lock" placeholder="Password"></b-input>
          </b-field>
          <div class="is-buttons is-centered">
            <b-button type="is-primary" @click="signIn">Log In</b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import router from "../router";
import {ToastProgrammatic} from "buefy";

export default {
  name: "Login",
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    signIn () {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          router.push({ name: 'MainPage' })
        })
        .catch((error) => {
          ToastProgrammatic.open({
            message: error.toString(),
            type: "is-danger"
          })
        });
    }
  }
}
</script>

<style scoped>

</style>