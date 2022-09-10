<template>
  <div style="position: relative">
    <v-app-bar dark app :min-height="isLuckyPanelVisible ? biggerHeight : smallerHeight">
      <v-container class="mt-2">
        <v-row>
          <v-col class="d-flex align-center" @click="isLuckyPanelVisible = !isLuckyPanelVisible">
            <v-icon>mdi-account-cog</v-icon>
          </v-col>
          <v-col v-for="(player, index) in players" :key="`player-${index}`">
            <!-- Player is defined -->
            <div>
              <v-row>
                <v-col class="text-right" v-show="isLuckyPanelVisible">
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
                <v-col class="text-right" v-show="isLuckyPanelVisible">
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
      </v-container>
    </v-app-bar>
    <v-main :style="`padding: 0; position: absolute; top: ${ isLuckyPanelVisible ? biggerHeight : smallerHeight}px;`">
      <v-container>
        <game-round
          v-for="(item, index) in rounds"
          :key="'round-' + roundNames[index]"
          :ref="'round-' + roundNames[index]"
          :round="item"
          :round-names="roundNames"
          :scoreboard="scoreboard"
          @score-update="scoreUpdate"
        ></game-round>
      </v-container>
    </v-main>
    <div style="position: fixed; bottom: 30px; right: 20px;">
      <v-btn fab dark :disabled="playersCount < 2" @click="click">
        <v-icon>{{ actionIcon }}</v-icon>
      </v-btn>
    </div>
    <v-dialog
      dark
      v-model="dialog"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Restart game</span>
        </v-card-title>
        <v-card-text>Are you sure you want to do this?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="
              restart()
              dialog = false
            "
          >
            Restart
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts" src="./play-rummy.component.ts"></script>
<style>
.v-toolbar__content {
  height: auto !important;
  padding: 0;
}
</style>
