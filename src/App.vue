<template>
  <v-app dark>
    <Header/>
    <v-content>
      <router-view/>
    </v-content>
    <!-- <Footer/> -->
  </v-app>
</template>

<script>
import Header from "./components/Header";
// import Footer from "./components/Footer";
export default {
  components: {
    Header
    // Footer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
