function getRandomValue(min, max) {
  return Math.floor(Math.random() * max - min) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealt: 100,
      currentRound: 0,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealt + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    useSpecialAttack() {
      return this.currentRound % 4 !== 0;
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealt -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealt -= attackValue;
      this.attackPlayer();
    },
  },
});

app.mount("#game");
