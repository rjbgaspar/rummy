<template>
  <v-app>
     <splash-screen
        v-if="!playing"
        v-on:start-playing="startPlaying"
      >
      </splash-screen>
      <play-rummy v-else />
  </v-app>
</template>

<script lang="ts" src="./app.component.ts"></script>
