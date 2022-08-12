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
          <v-col class="d-flex align-center">
            <h5>Players</h5>
          </v-col>
          <v-col v-for="(player, index) in players" :key="`player-${index}`" >
            <!-- Player is defined -->
            <div v-if="players[index].name != ''">
              <v-badge overlap transition="slide-x-transition"
                       :content="players[index].luckyCount">
                <v-text-field
                  label="playerName" single-line v-model="players[index].name"
                >
                </v-text-field>
              </v-badge>
              <v-btn fab x-small  color="blue-grey darken-1 white--text" elevation="1" class="mr-2"
                     :disabled="players[index].luckyCount === 0"
                     @click="players[index].luckyCount--">
                <v-icon dark>mdi-minus</v-icon>
              </v-btn>
              <v-btn fab dark x-small color="blue-grey darken-1" elevation="1"
                     @click="players[index].luckyCount++">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div v-else>
              <v-text-field
                label="playerName" single-line v-model="players[index].name" />
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-6"></v-divider>

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

        <v-row>
          <v-col class="d-flex justify-end">
             <span v-if="currentRoundIndex < 7">
          <v-btn fab dark color="primary"
                 :disabled="playersCount < 2"
                 @click="newRound">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </span>
            <span v-else>
              <v-btn disabled fab color="primary" >
                <v-icon>mdi-plus</v-icon>
          </v-btn>
        </span>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<script lang="ts" src="./app.component.ts"></script>
