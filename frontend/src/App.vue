<template>
  <div id="app">
    <Header msg="Poolboy" />
    <QuestionOverview msg="Most recent questions:"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import QuestionOverview from './components/QuestionOverview.vue'

export default {
  name: 'App',
  components: {
    QuestionOverview,
    Header

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
