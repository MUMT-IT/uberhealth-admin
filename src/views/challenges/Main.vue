<template>
<div>
  <section class="section">
    <div class="columns">
      <div class="column is-one-third is-offset-4">
        <h1 class="title has-text-centered">Challenges</h1>
        <nav class="panel">
          <p class="panel-heading">
            Menu
          </p>
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
export default {
  name: "Main"
}
</script>

<style scoped>

</style>