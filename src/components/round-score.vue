<template>
    <div class="row" v-show="round.index >= 0">
        <div class="col-2">
            Current
        </div>
        <div class="col-2" v-for="(item, index) in actualScoreboard" :key="`actual-score-${round.name}-${index}`">
            {{ item }}
        </div>
    </div>
</template>
<script lang="ts" src="./round-score.component.ts"></script>
<style scoped>
</style>
