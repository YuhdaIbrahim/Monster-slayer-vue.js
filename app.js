new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        giveUp: function () {
            this.gameIsRunning = false;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.message(true, "Player Hits Monster with ", damage, " Damage");
            if (this.checkWin()) {
                return;
            }
            damage = this.calculateDamage(5, 12)
            this.playerHealth -= damage;
            this.message(false, "Monster Hits Player with ", damage, " Damage");
            this.checkWin();

        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 12);
            this.monsterHealth -= damage;
            this.message(true, "Player Hits Monster with Special attack deal ", damage, " Damage");
            if (this.checkWin()) {
                return;
            }

            damage = this.calculateDamage(9, 12)
            this.playerHealth -= this.calculateDamage(9, 12);
            this.message(false, "Monster Hits Player with ", damage, " Damage");
            this.checkWin();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
                this.message(true, "Player Take Healing ", 10, " Health");
            } else {
                this.playerHealth = 100;
                this.message(true, "Player Health set to ", 100, " Health");
            }
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.message(false, "Monster attack Player deal ", damage, " Damage");

        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You Won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You Lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
        message: function (isPlayer, text, damage, damage2) {
            this.turns.unshift({
                isPlayer: isPlayer,
                text: text + damage + damage2
            });
        }
    },
});