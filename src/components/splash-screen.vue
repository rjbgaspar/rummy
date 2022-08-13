<template>
    <v-container>
      <v-img
        class="white--text align-end"
        src="@/assets/rummy-logo.png"
      >
      </v-img>
      <v-row class="my-2">
        <v-col cols="10" class="d-flex">
          <h3>Now we can play all the time!</h3>
        </v-col>
        <v-col cols="2" class="d-flex justify-end">
          <v-btn fab dark color="black" @click="startPlaying">
            <v-icon>mdi-cards-playing-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>
<script lang="ts" src="./splash-screen.component.ts"></script>
<style scoped>
img {
  width:100%;
  height:100%;
}
</style>
