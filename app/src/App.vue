
<script scoped>
import axios from 'axios';
import bddManagement from './components/bddManagement.vue';
import BddManagement from './components/bddManagement.vue';

export default {
    components: { BddManagement },
    data: function () {
        return {
            cardToPlay: "",
            playeurToPlay: "Joueur",
            nbTurn: 0,
            nbCard: 18,
            nbPlayeurToPlay: 0,
            nbPlayeur: 2,
            playeurName: ["Joueur 1", "Joueur 2", "Joueur 3", "Joueur 4"],
            card: [[], [], [], []],
            cardPlayed: [],
            usersId: [[], [], []],
            partyId: [],
            dialog: true,
            dialogManagement: false,
            rules: {
                required: value => !!value || 'Champs requis',
                maxNbPlayeur: value => value <= 4 || 'Max 4 joueurs',
                minNbPlayeur: value => value >= 2 || 'Min 2 joueurs',
            },
        };
    },
    methods: {
        async createGame() {
            this.dialog = false;
            this.nbPlayeurToPlay = 0;
            this.playeurToPlay = this.playeurName[this.nbPlayeurToPlay];
            this.nbTurn = 0;
            for (var i = 0; i < 11; i++) {
                this.cardPlayed.push([]);
                var col = i + 1;
                for (var j = 0; j < 11; j++) {
                    var row = j + 1;
                    this.cardPlayed[i].push({ id: "col-" + col + "row-" + row, Number: null, Color: null, isPlayed: false, isPlayable: false, playeur: null });
                    if (col == 6 && row == 6)
                        this.cardPlayed[i][j].isPlayable = true;
                }
            }
            var color = ["B", "G", "R", "Y"];
            var colorOfPlayer = null;
            // generate card
            if (this.nbPlayeur == 2) {
                var colorOfPlayer = [[], []];
                for (var i = 0; i < 4; i++) {
                    var random = Math.floor(Math.random() * color.length);
                    colorOfPlayer[i % 2].push(color[random]);
                    color.splice(random, 1);
                }
                var number = [["1", "2", "3", "4", "5", "6", "7", "8", "9"], ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    ["1", "2", "3", "4", "5", "6", "7", "8", "9"], ["1", "2", "3", "4", "5", "6", "7", "8", "9"]];
                for (var i = 0; i < 18; i++) {
                    var randomColorP1 = 0;
                    if (number[0].length != 0 && number[1].length != 0) {
                        randomColorP1 = Math.floor(Math.random() * colorOfPlayer[0].length);
                    }
                    else if (number[0].length == 0) {
                        randomColorP1 = 1;
                    }
                    var randomColorP2 = 2;
                    if (number[2].length != 0 && number[3].length != 0) {
                        randomColorP2 = Math.floor(Math.random() * colorOfPlayer[1].length) + 2;
                    }
                    else if (number[2].length == 0) {
                        randomColorP2 = 3;
                    }
                    var randomNbP1 = Math.floor(Math.random() * number[randomColorP1].length);
                    var randomNbP2 = Math.floor(Math.random() * number[randomColorP2].length);
                    this.card[0].push("card_" + colorOfPlayer[0][randomColorP1] + "_" + number[randomColorP1][randomNbP1] + ".png");
                    this.card[1].push("card_" + colorOfPlayer[1][randomColorP2 - 2] + "_" + number[randomColorP2][randomNbP2] + ".png");
                    number[randomColorP1].splice(randomNbP1, 1);
                    number[randomColorP2].splice(randomNbP2, 1);
                }
            }
            else if (this.nbPlayeur == 3) {
                this.nbCard = 8;
                var colorOfPlayer = [];
                for (var i = 0; i < 3; i++) {
                    var random = Math.floor(Math.random() * color.length);
                    colorOfPlayer.push(color[random]);
                    color.splice(random, 1);
                }
                var number = [["1", "2", "3", "4", "5", "6", "7", "8", "9"], ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    ["1", "2", "3", "4", "5", "6", "7", "8", "9"]];
                for (var i = 0; i < 9; i++) {
                    var randomNbP1 = Math.floor(Math.random() * number[0].length);
                    var randomNbP2 = Math.floor(Math.random() * number[1].length);
                    var randomNbP3 = Math.floor(Math.random() * number[2].length);
                    this.card[0].push("card_" + colorOfPlayer[0] + "_" + number[0][randomNbP1] + ".png");
                    this.card[1].push("card_" + colorOfPlayer[1] + "_" + number[1][randomNbP2] + ".png");
                    this.card[2].push("card_" + colorOfPlayer[2] + "_" + number[2][randomNbP3] + ".png");
                    number[0].splice(randomNbP1, 1);
                    number[1].splice(randomNbP2, 1);
                    number[2].splice(randomNbP3, 1);
                }
            }
            else {
                this.nbCard = 8;
                var colorOfPlayer = [];
                for (var i = 0; i < 4; i++) {
                    var random = Math.floor(Math.random() * color.length);
                    colorOfPlayer.push(color[random]);
                    color.splice(random, 1);
                }
                var number = [["1", "2", "3", "4", "5", "6", "7", "8", "9"], ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    ["1", "2", "3", "4", "5", "6", "7", "8", "9"], ["1", "2", "3", "4", "5", "6", "7", "8", "9"]];
                for (var i = 0; i < 7; i++) {
                    var randomNbP1 = Math.floor(Math.random() * number[0].length);
                    var randomNbP2 = Math.floor(Math.random() * number[1].length);
                    var randomNbP3 = Math.floor(Math.random() * number[2].length);
                    var randomNbP4 = Math.floor(Math.random() * number[3].length);
                    this.card[0].push("card_" + colorOfPlayer[0] + "_" + number[0][randomNbP1] + ".png");
                    this.card[1].push("card_" + colorOfPlayer[1] + "_" + number[1][randomNbP2] + ".png");
                    this.card[2].push("card_" + colorOfPlayer[2] + "_" + number[2][randomNbP3] + ".png");
                    this.card[3].push("card_" + colorOfPlayer[3] + "_" + number[3][randomNbP4] + ".png");
                    number[0].splice(randomNbP1, 1);
                    number[1].splice(randomNbP2, 1);
                    number[2].splice(randomNbP3, 1);
                    number[3].splice(randomNbP4, 1);
                }
            }
            this.cardToPlay = this.card[this.nbPlayeurToPlay][this.nbTurn];
            for (var i = 0; i < this.nbPlayeur; i++) {
                await axios.post('http://localhost:4000/addUserSqlite', {
                    name: this.playeurName[i]
                }).then((response) => {
                    if (response.data.id != null)
                        this.usersId[0].push(response.data.id);
                    else
                        this.usersId[0].push(response.data.userId);
                }, (error) => {
                    console.log(error);
                });
                await axios.post('http://localhost:4000/addUserMysql', {
                    name: this.playeurName[i]
                }).then((response) => {
                    if (response.data.insertId != null)
                        this.usersId[1].push(response.data.insertId);
                    else
                        this.usersId[1].push(response.data[0].userId);
                }, (error) => {
                    console.log(error);
                });
                await axios.post('http://localhost:4000/addUserMongo', {
                    name: this.playeurName[i]
                }).then((response) => {
                    if (response.data.insertedId != null){
                        this.usersId[2].push(response.data.insertedId);
                    }else this.usersId[2].push(response.data.userId);
                }, (error) => {
                    console.log(error);
                });
            }
            await axios.post('http://localhost:4000/addPartySqlite', {}).then(async (response) => {
                this.partyId.push(response.data.partyId);
                await axios.post('http://localhost:4000/addPartyMysql', {}).then(async (response) => {
                    this.partyId.push(response.data.insertId);
                    await axios.post('http://localhost:4000/addPartyMongo', {}).then((response) => {
                        this.partyId.push(response.data.insertedId);
                    }, (error) => {
                        console.log(error);
                    });
                }, (error) => {
                    console.log(error);
                });
            }, (error) => {
                console.log(error);
            });
            for (var i = 0; i < this.nbPlayeur; i++) {
                await axios.post('http://localhost:4000/addPartyUsersSqlite', {
                    userId: this.usersId[0][i],
                    partyId: this.partyId[0]
                }).then((response) => {
                    // console.log(response);
                }, (error) => {
                    console.log(error);
                });
                await axios.post('http://localhost:4000/addPartyUsersMysql', {
                    userId: this.usersId[1][i],
                    partyId: this.partyId[1]
                }).then((response) => {
                    // console.log(response);
                }, (error) => {
                    console.log(error);
                });
                console.log(this.usersId[2][i], this.partyId[2])
                await axios.post('http://localhost:4000/addPartyUsersMongo', {
                    userId: this.usersId[2][i],
                    partyId: this.partyId[2]
                }).then((response) => {
                    // console.log(response);
                }, (error) => {
                    console.log(error);
                });
            }
            this.chowPlayable();
        },
        playCard(idCol, i, j) {
            if (!this.cardPlayed[i][j].isPlayable)
                return;
            document.getElementById(idCol).innerHTML = "<img src='/src/assets/card/" + this.cardToPlay + "' id='cardToPlay' height='57px' width='57px'> ";
            this.cardPlayed[i][j].Number = this.cardToPlay.split("_")[2].split(".")[0];
            this.cardPlayed[i][j].Color = this.cardToPlay.split("_")[1];
            this.cardPlayed[i][j].isPlayed = true;
            this.cardPlayed[i][j].playeur = this.playeurToPlay;
            this.changePlayeur();
            var colMin = -1;
            var colMax = -1;
            var rowMin = -1;
            var rowMax = -1;
            for (var u = 0; u < 11; u++) {
                for (var v = 0; v < 11; v++) {
                    if (this.cardPlayed[u][v].isPlayed && this.cardPlayed[u][v].Number >= this.cardToPlay.split("_")[2].split(".")[0]) {
                        this.cardPlayed[u][v].isPlayable = false;
                    }
                    else if (this.cardPlayed[u][v].isPlayed && this.cardPlayed[u][v].Number < this.cardToPlay.split("_")[2].split(".")[0])
                        this.cardPlayed[u][v].isPlayable = true;
                    else if (u >= i - 1 && u <= i + 1 && v >= j - 1 && v <= j + 1) {
                        this.cardPlayed[u][v].isPlayable = true;
                    }
                    if (this.cardPlayed[u][v].isPlayed) {
                        if (colMin == -1 || colMin > u)
                            colMin = u;
                        if (colMax == -1 || colMax < u)
                            colMax = u;
                        if (rowMin == -1 || rowMin > v)
                            rowMin = v;
                        if (rowMax == -1 || rowMax < v)
                            rowMax = v;
                    }
                }
            }
            for (var u = 0; u < 11; u++) {
                for (var v = 0; v < 11; v++) {
                    if (!this.cardPlayed[u][v].isPlayed && (colMin != -1 && (colMax - colMin >= 5) && (colMin > u || u > colMax)) || (rowMin != -1 && (rowMax - rowMin >= 5) && (rowMin > v || v > rowMax))) {
                        this.cardPlayed[u][v].isPlayable = false;
                    }
                }
            }
            this.asWinner();
            this.chowPlayable();
        },
        changePlayeur() {
            if (this.nbPlayeurToPlay == this.nbPlayeur - 1) {
                this.nbPlayeurToPlay = 0;
                this.nbTurn++;
            }
            else {
                this.nbPlayeurToPlay++;
            }
            this.playeurToPlay = this.playeurName[this.nbPlayeurToPlay];
            this.cardToPlay = this.card[this.nbPlayeurToPlay][this.nbTurn];
        },
        chowPlayable() {
            for (var i = 0; i < 11; i++) {
                for (var j = 0; j < 11; j++) {
                    if (this.cardPlayed[i][j].isPlayable == true) {
                        document.getElementById(this.cardPlayed[i][j].id).style.border = "solid #cfcfcf 1.5px";
                    }
                    else {
                        document.getElementById(this.cardPlayed[i][j].id).style.border = "";
                    }
                }
            }
        },
        asWinner() {
            // verifier si le joueur a gagné avec les colones et les ligne
            for (var i = 0; i < 11; i++) {
                var nbCardPlayerCol = 0;
                var nbCardPlayerRow = 0;
                var precedentPlayeurCol = null;
                var precedentColorCol = null;
                var precedentPlayeurRow = null;
                var precedentColorRow = null;
                for (var j = 0; j < 11; j++) {
                    if (this.cardPlayed[i][j].isPlayed && (precedentPlayeurCol == null || (precedentPlayeurCol == this.cardPlayed[i][j].playeur && precedentColorCol == this.cardPlayed[i][j].Color))) {
                        nbCardPlayerCol++;
                        precedentPlayeurCol = this.cardPlayed[i][j].playeur;
                        precedentColorCol = this.cardPlayed[i][j].Color;
                    }
                    else {
                        nbCardPlayerCol = 0;
                        precedentPlayeurCol = null;
                    }
                    if ((nbCardPlayerCol >= 5 && this.nbPlayeur == 2) || (nbCardPlayerCol >= 4 && this.nbPlayeur > 2)) {
                        this.updateWinner(precedentPlayeurCol);
                        alert("Le joueur " + precedentPlayeurCol + " a gagné");
                        return;
                    }
                    if (this.cardPlayed[j][i].isPlayed && (precedentPlayeurRow == null || (precedentPlayeurRow == this.cardPlayed[j][i].playeur && precedentColorRow == this.cardPlayed[j][i].Color))) {
                        nbCardPlayerRow++;
                        precedentPlayeurRow = this.cardPlayed[j][i].playeur;
                    }
                    else {
                        nbCardPlayerRow = 0;
                        precedentPlayeurRow = null;
                    }
                    if ((nbCardPlayerRow >= 5 && this.nbPlayeur == 2) || (nbCardPlayerRow >= 4 && this.nbPlayeur > 2)) {
                        this.updateWinner(precedentPlayeurRow);
                        alert("Le joueur " + precedentPlayeurRow + " a gagné");
                        return;
                    }
                    var nbCardDiagonal1 = 0;
                    var nbCardDiagonal2 = 0;
                    var nbCardDiagonal3 = 0;
                    var nbCardDiagonal4 = 0;
                    var precedentPlayeurDiagonal1 = null;
                    var precedentColorDiagonal1 = null;
                    var precedentPlayeurDiagonal2 = null;
                    var precedentColorDiagonal2 = null;
                    var precedentPlayeurDiagonal3 = null;
                    var precedentColorDiagonal3 = null;
                    var precedentPlayeurDiagonal4 = null;
                    var precedentColorDiagonal4 = null;
                    for (var v = 0; v < 11; v++) {
                        if (i - v > 0 && j - v > 0 && this.cardPlayed[i - v][i - v].isPlayed && (precedentPlayeurDiagonal1 == null || (precedentPlayeurDiagonal1 == this.cardPlayed[i - v][j - v].playeur && precedentColorDiagonal1 == this.cardPlayed[i - v][j - v].Color))) {
                            nbCardDiagonal1++;
                            precedentPlayeurDiagonal1 = this.cardPlayed[i - v][j - v].playeur;
                            precedentColorDiagonal1 = this.cardPlayed[i - v][j - v].Color;
                        }
                        else {
                            nbCardDiagonal1 = 0;
                            precedentPlayeurDiagonal1 = null;
                        }
                        if ((nbCardDiagonal1 >= 5 && this.nbPlayeur == 2) || (nbCardDiagonal1 >= 4 && this.nbPlayeur > 2)) {
                            this.updateWinner(precedentPlayeurDiagonal1);
                            alert("Le joueur " + precedentPlayeurDiagonal1 + " a gagné");
                            return;
                        }
                        if (i + v < 11 && j + v < 11 && this.cardPlayed[i + v][j + v].isPlayed && (precedentPlayeurDiagonal2 == null || (precedentPlayeurDiagonal2 == this.cardPlayed[i + v][j + v].playeur && precedentColorDiagonal2 == this.cardPlayed[i + v][j + v].Color))) {
                            nbCardDiagonal2++;
                            precedentPlayeurDiagonal2 = this.cardPlayed[i + v][j + v].playeur;
                            precedentColorDiagonal2 = this.cardPlayed[i + v][j + v].Color;
                        }
                        else {
                            nbCardDiagonal2 = 0;
                            precedentPlayeurDiagonal2 = null;
                        }
                        if ((nbCardDiagonal2 >= 5 && this.nbPlayeur == 2) || (nbCardDiagonal2 >= 4 && this.nbPlayeur > 2)) {
                            this.updateWinner(precedentPlayeurDiagonal2);
                            alert("Le joueur " + precedentPlayeurDiagonal2 + " a gagné");
                            return;
                        }
                        if (i + v < 11 && j - v > 0 && this.cardPlayed[i + v][j - v].isPlayed && (precedentPlayeurDiagonal3 == null || (precedentPlayeurDiagonal3 == this.cardPlayed[i + v][j - v].playeur && precedentColorDiagonal3 == this.cardPlayed[i + v][j - v].Color))) {
                            nbCardDiagonal3++;
                            precedentPlayeurDiagonal3 = this.cardPlayed[i + v][j - v].playeur;
                            precedentColorDiagonal3 = this.cardPlayed[i + v][j - v].Color;
                        }
                        else {
                            nbCardDiagonal3 = 0;
                            precedentPlayeurDiagonal3 = null;
                        }
                        if ((nbCardDiagonal3 >= 5 && this.nbPlayeur == 2) || (nbCardDiagonal3 >= 4 && this.nbPlayeur > 2)) {
                            this.updateWinner(precedentPlayeurDiagonal3);
                            alert("Le joueur " + precedentPlayeurDiagonal3 + " a gagné");
                            return;
                        }
                        if (i - v > 0 && j + v < 11 && this.cardPlayed[i - v][j + v].isPlayed && (precedentPlayeurDiagonal4 == null || (precedentPlayeurDiagonal4 == this.cardPlayed[i - v][j + v].playeur && precedentColorDiagonal4 == this.cardPlayed[i - v][j + v].Color))) {
                            nbCardDiagonal4++;
                            precedentPlayeurDiagonal4 = this.cardPlayed[i - v][j + v].playeur;
                        }
                        else {
                            nbCardDiagonal4 = 0;
                            precedentPlayeurDiagonal4 = null;
                        }
                        if ((nbCardDiagonal4 >= 5 && this.nbPlayeur == 2) || (nbCardDiagonal4 >= 4 && this.nbPlayeur > 2)) {
                            this.updateWinner(precedentPlayeurDiagonal4);
                            alert("Le joueur " + precedentPlayeurDiagonal4 + " a gagné");
                            return;
                        }
                    }
                }
            }
        },
        async updateWinner(winnerName) {
            await axios.put('http://localhost:4000/updatePartySqlite', {
                winnerId: this.usersId[0][this.playeurName.indexOf(winnerName)],
                id: this.partyId[0]
            }).then((response) => {
                console.log(this.usersId[0][this.playeurName.indexOf(winnerName)], this.partyId[0])
                console.log(response);
            }, (error) => {
                console.log(error);
            });
            await axios.put('http://localhost:4000/updatePartyMysql', {
                winnerId: this.usersId[1][this.playeurName.indexOf(winnerName)],
                id: this.partyId[1]
            }).then((response) => {
                // console.log(response);
            }, (error) => {
                console.log(error);
            });
            await axios.put('http://localhost:4000/updatePartyMongo', {
                winnerId: this.usersId[2][this.playeurName.indexOf(winnerName)],
                id: this.partyId[2]
            }).then((response) => {
                // console.log(response);
            }, (error) => {
                console.log(error);
            });
        },
        handleDialogManagementUpdate(value) {
          this.dialogManagement = value;
        },
    }
}
</script>

<template>

<BddManagement :dialogManagement="dialogManagement" @update:dialogManagement="handleDialogManagementUpdate"></BddManagement>

<div class="plateau">
  <div class="grille">  
    <div :class="'row-'+i"  v-for="i in 11" :key="i">
        <div :class="'col col-'+i+'row-'+j"  :id="'col-'+i+'row-'+j" v-for="j in 11" :key="j" v-on:click="playCard('col-'+i+'row-'+j,i-1,j-1)">
        </div>
    </div>
  </div>
</div>


<footer>
  <div class="info">
    <h2 id="playeurName">{{this.playeurToPlay }}</h2>
    <p id="nbCardRest">Nombre de cartes restantes : {{  this.nbCard-this.nbTurn }}</p>
    <p id="nbCardPlayed">Nombre de cartes jouées : {{ this.nbTurn }}</p>
    <div class="cardToPlay">
      <img :src="'/src/assets/card/'+this.cardToPlay"  id="cardToPlay">
    </div>
  </div>
</footer>

  <template>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      persistent
      width="500px"
    >
      <v-card>
        <v-toolbar
          color="#7b7b7b"
          title="Créer une partie"
        ></v-toolbar>
        <v-card-text>
          <v-container>
            <v-row class="justify-center">
              <v-col cols="1" sm="10" md="10">
                <v-text-field
                  :rules="[rules.required , rules.maxNbPlayeur, rules.minNbPlayeur]"
                  v-model="nbPlayeur"
                  label="Nb joueurs"
                  type="number"
                  width="50px"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" sm="6" md="6">
                <v-text-field
                  :rules="[rules.required]"
                  v-model="playeurName[0]"
                  label="Nom du joueur 1"
                ></v-text-field>
              </v-col>
              <v-col cols="4" sm="6" md="6">
                <v-text-field
                  :rules="[rules.required]"
                  v-model="playeurName[1]"
                  label="Nom du joueur 1"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="nbPlayeur>=3" cols="4" sm="6" md="6">
                <v-text-field
                  :rules="[rules.required]"
                  v-model="playeurName[2]"
                  label="Nom du joueur 1"
                ></v-text-field>
              </v-col>
              <v-col v-if="nbPlayeur>=4" cols="4" sm="6" md="6">
                <v-text-field
                  :rules="[rules.required]"
                  v-model="playeurName[3]"
                  label="Nom du joueur 1"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="createGame()">Créer la partie</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </template>
</template>

<style scoped>

/* 
Custom plateau size
*/
.plateau{
  width: 100%;
  height: calc(100% - 150px);
  overflow-x: auto;
}

/* 
Custom Scrollbar
*/
::-webkit-scrollbar {
  width: 10px;
}


::-webkit-scrollbar-thumb {
  background-color: #393944;
  border-radius: 10px;
}

/* 
Custom Grid
*/
.grille {
  margin-left: auto;
  margin-right: auto;
  padding-top: 40px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(11, 1fr);
  height: 660px;
  width: 660px;
}

.col{
  height: 60px;
  width: 60px;
  padding: 0px;
  margin: 0px;
}

/* 
Custom Footer
*/
footer {
  position: sticky;
  background: #393944;
  bottom: 0;
  width: 100%;
  left: 0;
  height: 150px;
}

footer .info{
  display: flex;
  flex-direction: column;
  padding: 40px 40px;
  height: 100%;
  color: white;
}

footer .cardToPlay{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

img{
  width: 125px;
  height: 125px;
}

#cardToPlay{
  z-index: 100;
  position: absolute;
  bottom: 12.5px;
}

</style>
