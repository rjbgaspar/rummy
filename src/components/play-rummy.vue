<template>
<v-container>
  <v-row>
    <v-col class="d-flex align-center">
      <v-icon>mdi-account-multiple-plus</v-icon>
    </v-col>
    <v-col v-for="(player, index) in players" :key="`player-${index}`" >
      <!-- Player is defined -->
      <div>
        <v-row>
          <v-col class="text-right">
            <v-btn fab x-small color="blue-grey darken-1 white--tex text-right" elevation="1"
                   :disabled="players[index].name === '' || players[index].luckyCount === 0"
                   @click="decrementPlayerLuckyCount(index)">
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <v-badge overlap transition="slide-x-transition"
                     color="red"
                     :content="players[index].luckyCount">
              <v-text-field
                label="playerName" single-line v-model="players[index].name"
              >
              </v-text-field>
            </v-badge>
          </v-col>
          <v-col class="text-right">
            <v-btn fab x-small color="blue-grey darken-1 white--tex text-right" elevation="1"
                   :disabled="players[index].name === '' || players[index].luckyCount >= 28"
                   @click="incrementPlayerLuckyCount(index)">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
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
