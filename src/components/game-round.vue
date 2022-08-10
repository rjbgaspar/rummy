<template>
    <div>
        <div class="row pt-5">
            <div class="col-2">
                {{ round.name }}
            </div>
            <div class="col-2" v-for="(item, index) in round.players" :key="'player' + index">
                <input type="number"
                       v-model.number="scores[index]"
                       :disabled="round.players[index] === ''"
                >
            </div>
        </div>

        <round-score
              :round="round"
              :scoreboard="scoreboard"
              ref="scoreboard"
        ></round-score>
    </div>
</template>
<script lang="ts" src="./game-round.component.ts"></script>

<style scoped></style>
