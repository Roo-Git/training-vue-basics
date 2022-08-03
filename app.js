function getRandomValue(min, max) {
  return Math.floor(Math.random() * max - min) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealt: 100,
      currentRound: 0,
      winner: null,
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealt <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealt(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealt < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealt + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
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
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
    newGame() {
      this.playerHealth = 100;
      this.monsterHealt = 100;
      this.winner = null;
      this.currentRound = 0;
    },
    surrender() {
      this.winner = "monster";
    },
  },
});

app.mount("#game");
