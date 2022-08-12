<template>
<v-row v-if="actualScoreboard.length > 0 && actualScoreboardKeys.length > 1" dense>
  <v-col class="text--secondary">
    <p class="text-caption">Total: </p>
  </v-col>
  <v-col dense v-for="(item, index) in actualScoreboard" :key="`actual-score-${round.name}-${index}`"
         class="text-caption text--secondary">
    <p v-if="round.players[index].name !== ''" >
      {{ item }}
    </p>

  </v-col>
</v-row>
</template>
<script lang="ts" src="./round-score.component.ts"></script>
