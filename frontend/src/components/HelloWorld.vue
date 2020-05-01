<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/FirstQuestion.gql')"
      :variables="{ question }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">{{ data.question.title }}</div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>


  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    question: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
