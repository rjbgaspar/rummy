<template>
<v-container>
  <v-row>
    <v-col class="d-flex align-center">
      <h5>Players</h5>
    </v-col>
    <v-col v-for="(player, index) in players" :key="`player-${index}`" >
      <!-- Player is defined -->
      <div v-if="players[index].name != ''">
        <v-row>
          <v-col>
            <v-btn fab x-small color="blue-grey darken-1 white--text" elevation="1" class="mr-2"
                   :disabled="players[index].luckyCount === 0"
                   @click="players[index].luckyCount--">
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <v-badge overlap transition="slide-x-transition"
                     color="black"
                     :content="players[index].luckyCount">
              <v-text-field
                label="playerName" single-line v-model="players[index].name"
              >
              </v-text-field>
            </v-badge>
          </v-col>
          <v-col>
            <v-btn fab dark x-small color="blue-grey darken-1" elevation="1"
                   @click="players[index].luckyCount++">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
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
      <v-btn fab dark color="black" :disabled="playersCount < 2" @click="click">
        <v-icon>{{ actionIcon }}</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</v-container>
</template>
<script lang="ts" src="./play-rummy.component.ts"></script>
