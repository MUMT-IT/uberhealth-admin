<template>
  <div>
    <section class="section">
      <div class="columns">
        <div class="column is-one-third is-offset-4">
          <h1 class="title has-text-centered">Users</h1>
          <nav class="panel">
            <p class="panel-heading">
              Menu
            </p>
            <router-link class="panel-block" :to="{ name: 'UserGroupMain' }">
              <span class="panel-icon">
                <i class="fas fa-users-cog"></i>
              </span>
              Groups
            </router-link>
            <router-link class="panel-block" :to="{ name: 'NewUsers' }">
              <span class="panel-icon">
                <i class="fas fa-users-cog"></i>
              </span>
              Users
            </router-link>
          </nav>
          <div class="buttons is-centered">
            <b-button class="is-light" @click="$router.push({ name: 'MainPage' })">
              Back
            </b-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Main"
}
</script>

<style scoped>

</style>
