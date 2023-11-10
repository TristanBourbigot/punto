
<script scoped>

export default {
  data : function() {
        return {
          cardToPlay: "card_B_8.png",
          playeurToPlay : "Joueur",
          nbTurn : 0,
          nbPlayeurToPlay : 0,
          nbPlayeur : 2,
          playeurName : ["Joueur 1", "Joueur 2", "Joueur 3", "Joueur 4"],
          card : [[],[],[],[]],
          dialog : true,
          rules: {
            required: value => !!value || 'Champs requis',
            maxNbPlayeur: value => value <= 4 || 'Max 4 joueurs',
            minNbPlayeur: value => value >= 2 || 'Min 2 joueurs',
          },
        }
  },
  methods :{
    createGame(){
      this.dialog = false;
      this.nbPlayeurToPlay = 1;
      this.playeurToPlay = this.playeurName[this.nbPlayeurToPlay-1];
      this.nbTurn = 0;
    },
    playCard(idCol){
      document.getElementById(idCol).innerHTML = "<img src='/src/assets/card/"+this.cardToPlay+"' id='cardToPlay' height='57px' width='57px'> ";
      changePlayeur();
    },
    changePlayeur(){
      if(this.nbPlayeurToPlay == this.nbPlayeur-1){
        this.nbPlayeurToPlay = 1;
        nbTurn++;
      }
      this.playeurToPlay = this.playeurName[this.nbPlayeurToPlay];
      cardToPlay = this.card[this.nbPlayeurToPlay][nbTurn];
    },
  }
}

</script>

<template>

<div class="plateau">
  <div class="grille">  
    <div :class="'row-'+i"  v-for="i in 11" :key="i">
        <div :class="'col col-'+i+j"  :id="'col-'+i+j" v-for="j in 11" :key="j" v-on:click="playCard('col-'+i+j)">
        </div>
    </div>
  </div>
</div>


<footer>
  <div class="info">
    <h2 id="playeurName">{{this.playeurToPlay }}</h2>
    <p id="nbCardRest">Nombre de cartes restantes : {{ 8- this.nbTurn }}</p>
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
      width="500px"
    >
      <v-card>
        <v-toolbar
          color="#7b7b7b"
          title="Créer une partie"
        ></v-toolbar>
        <v-card-text style="background-color:#cfcfcf;">
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
        <v-card-actions style="background-color:#cfcfcf;">
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
  height: 700px;
  width: 660px;
}

.col{
  border: solid #cfcfcf 1.5px;
  height: 60px;
  width: 60px;
  padding: 0px;
  margin: 0px;
}

.col:hover{
  border: solid #cfcfcf 1.5px;
  background: #7b7b7b;
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
