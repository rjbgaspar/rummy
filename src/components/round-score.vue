<template>
<v-row v-if="actualScoreboard.length > 0 && actualScoreboardKeys.length > 1" dense>
  <v-col cols="12" sm="12" md="2" class="text-right text--secondary">
    <p class="text-caption">Total: </p>
  </v-col>
  <v-col dense v-for="(item, index) in actualScoreboard" :key="`actual-score-${round.name}-${index}`"
         class="text-right">
    <h5 v-if="round.players[index] !== ''" >
      {{ item }}
    </h5>

  </v-col>
</v-row>
</template>
<script lang="ts" src="./round-score.component.ts"></script>
