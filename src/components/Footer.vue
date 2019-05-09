<template>
  <v-footer
    dark
    color="transparent"
    class="px-2"
    style="text-align:right;justify-content:flex-end;"
  >
    <span>ver {{packageJson.version}}</span>
    <v-spacer/>
    <span>
      © 2019
      <a href="https://icchi.me" target="_blank">icchi / Haruyuki Ichino</a>
    </span>
  </v-footer>
</template>

<script>
import packageJson from "../../package.json";

export default {
  data() {
    return {
      packageJson
    };
  }
};
</script>
