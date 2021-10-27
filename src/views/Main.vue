<template>
<div>
  <section class="section">
    <div class="columns">
      <div class="column is-one-third is-offset-4">
        <h1 class="title has-text-centered">Hello, Admin</h1>
        <nav class="panel">
          <p class="panel-heading">
            Menu
          </p>
          <router-link class="panel-block" :to="{ name: 'UserMain' }">
            <span class="panel-icon">
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </span>
            Users
          </router-link>
          <router-link class="panel-block" :to="{ name: 'ChallengeMain' }">
            <span class="panel-icon">
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </span>
            Challenges
          </router-link>
        </nav>
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