<template>
  <v-toolbar app fixed flat dark>
    <a href="/" class="mt-2">
      <img src="../../public/icon.svg" height="40px" style="max-height: 90%">
    </a>
    <v-toolbar-title class="headline">
      <span class="font-weight-bold">割り勘計算ツール</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-xs-only">
      <v-btn flat to="/">Home</v-btn>
      <v-btn flat to="about">About</v-btn>
    </v-toolbar-items>

    <v-menu :nudge-width="80" class="hidden-sm-and-up">
      <v-btn icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>
        <v-list-tile to="about">
          <v-list-tile-title>About</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
