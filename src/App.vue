<template>
  <div class="row p-5">

    <splash-screen
      v-if="!playing"
      v-on:start-playing="startPlaying"
    >
    </splash-screen>

    <div v-else>

      <div class="w-100 pt-4"></div>

      <div class="row">
        <div class="col-2">
          Players
        </div>
        <div class="col-2" v-for="(player, index) in players" :key="`player-2-${index}`">
          <input v-model="players[index]" style="border: 2px solid black;">
        </div>
      </div>

      <div class="w-100 pt-4"></div>

      <div class="row">
        <div class="col-2">
          Round
        </div>

        <div class="col-2" v-for="(item, index) in players" :key="`player-2-${index}`">
          {{ item }}
        </div>
      </div>

      <game-round
        v-for="(item, index) in rounds"
        :key="'round-' + roundNames[index]"
        :ref="'round-' + roundNames[index]"
        :round="item"
        :round-names="roundNames"
        :scoreboard="scoreboard"
        @score-update="scoreUpdate"
      ></game-round>

      <div class="w-100 pt-5"></div>

      <span v-if="currentRoundIndex < 7">
        <button class="btn btn-primary"
                :disabled="playersCount < 2"
                @click="newRound">
          New Round
        </button>
      </span>
      <span v-else>
        You're on the last round.
      </span>
    </div>
  </div>
</template>

<script lang="ts" src="./app.component.ts"></script>
<style>
</style>
