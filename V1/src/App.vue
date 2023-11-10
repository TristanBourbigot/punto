
<script scoped>

export default {
  data : function() {
        return {
          cardToPlay: "card_B_8.png",
          playeurToPlay : "Joueur",
          nbTurn : 0,
          nbPlayeurToPlay : 0,
          nbPlayeur : 2,
          playeurName : ["Joueur 1", "Joueur 2"],
          card : [[],[],[],[]]
        }
  },
  methods :{
    createGame(nbPlayer, playeurName){
      this.nbPlayeur = nbPlayer;
      this.playeurName = playeurName;
      this.nbPlayeurToPlay = 1;
      this.playeurToPlay = this.playeurName[this.nbPlayeurToPlay];
      this.nbTurn = 0;
    },
    playCard(idCol){
      document.getElementById(idCol).innerHTML = "<img src='/src/assets/card/"+this.cardToPlay+"' id='cardToPlay' height='123px' width='123px'> ";
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
    <div :class="'row-'+i"  v-for="i in 6" :key="i">
        <div :class="'col col-'+i+j"  :id="'col-'+i+j" v-for="j in 6" :key="j" v-on:click="playCard('col-'+i+j)">
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
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  height: 825px;
  width: 750px;
}

.col{
  border: solid #cfcfcf 1.5px;
  height: 125px;
  width: 125px;
}

.col:hover{
  border: solid #cfcfcf 1.5px;
  height: 125px;
  width: 125px;
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
