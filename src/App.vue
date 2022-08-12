<template>
  <v-app>
    <v-container>

      <splash-screen
        v-if="!playing"
        v-on:start-playing="startPlaying"
      >
      </splash-screen>

      <div v-else>
        <v-row>
          <v-col cols="12" sm="12" md="2" class="d-flex align-center">
              <h5>Players</h5>
          </v-col>
          <v-col v-for="(player, index) in players" :key="`player-${index}`">
            <v-text-field dense label="Player" single-line v-model="players[index]"></v-text-field>
          </v-col>
        </v-row>

        <game-round
          v-for="(item, index) in rounds"
          :key="'round-' + roundNames[index]"
          :ref="'round-' + roundNames[index]"
          :round="item"
          :round-names="roundNames"
          :scoreboard="scoreboard"
          @score-update="scoreUpdate"
        ></game-round>

        <br>

        <span v-if="currentRoundIndex < 7">
          <v-btn color="light-blue darken-4 white--text"
                 :disabled="playersCount < 2"
                 @click="newRound">
            New Round
          </v-btn>
      </span>
        <span v-else>
        You're on the last round.
      </span>
      </div>

    </v-container>
  </v-app>
</template>

<script lang="ts" src="./app.component.ts"></script>
