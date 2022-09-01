<template>
<div>
  <v-row >
    <v-col class="d-flex align-center">
      <h5>{{ round.name }}</h5>
    </v-col>
    <v-col
        v-for="(player, index) in round.players" :key="`player-score-${index}-${player.name}`"
    >
      <v-text-field dense
        v-if="round.players[index].name !== ''"
        :key="`player-score-${player.name}`"
        v-model.number="scores[index]"
        input type="text"
        inputmode="decimal"
      />
    </v-col>
  </v-row>

  <round-score
    :round="round"
    :scoreboard="scoreboard"
    ref="scoreboard"
  ></round-score>
</div>
</template>
<script lang="ts" src="./game-round.component.ts"></script>

<style scoped></style>
