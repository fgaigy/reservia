<script setup>
//import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="top-container">
    <div id="message">
      <h2>Trouver votre hébergement pour des vacances de rêve</h2>
      <p>En plein centre ville ou en plein nature</p>
    </div>

    <div id="recherche">
      <div>
        <i class="fa-solid fa-heart"></i>
      </div>
      <div><input type="text" value="Marseille, France" /></div>
      <div><input type="submit" value="Rechercher" /></div>
      <div><i class="fas fa-search" style="font-size: 18px"></i></div>
    </div>

    <div id="filtres">
      <div>Filtres</div>
      <div>
        <i class="fa-solid fa-heart"></i>
        <p>Économiques</p>
      </div>
      <div>
        <i class="fa-solid fa-heart"></i>
        <p>Familial</p>
      </div>
      <div>
        <i class="fa-solid fa-heart"></i>
        <p>Romantique</p>
      </div>
      <div>
        <i class="fa-solid fa-heart"></i>
        <p>Animaux autorisés</p>
      </div>
    </div>

    <div id="nb">
      <div>i</div>
      <p>Plus de 500 logements sont disponibles dans cette ville</p>
    </div>
  </div>

  <div id="hebergements">
    <div id="a-la-une">
      <div class="en-tete">Hébergements à Marseille</div>
      <div id="a-la-une-items">
        <div v-for="hotel in hotels.slice(0, 6)" :key="hotel.id">
          <div class="img-container">
            <img :src="'/src/assets/img/hotels/' + hotel.img" alt="" />
          </div>
          <p class="nom-hebergement">{{ hotel.name }}</p>
          <p class="tarif">Nuit à partir de {{ hotel.tarif }}&euro;</p>
          <div class="rates">
            <i
              v-for="i in [1, 2, 3, 4, 5].slice(0, hotel.stars)"
              :style="{ color: '#fffff' }"
              class="far fa-star"
              :key="i"
            ></i>
          </div>
        </div>
      </div>
      <div><button>Afficher plus</button></div>
    </div>

    <div id="les-plus-populaires">
      <div class="en-tete">Les plus populaires <i class="fas fa-chart-line"></i></div>
      <div id="les-plus-populaires-items">
        <div v-for="hotel in getPopularHotels(3)" :key="hotel.id">
          <div class="img-pop-container">
            <img :src="'/src/assets/img/hotels/' + hotel.img" alt="Auberge" />
          </div>
          <div class="heb-props">
            <p class="nom-hebergement">{{ hotel.name }}</p>
            <p class="tarif">Nuit à partir de {{ hotel.tarif }}&euro;</p>
            <div class="rates">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="activites-a-marseille">
    <p>Activité à Marseille</p>
    <div id="activites">
      <div
        v-for="activity in activities"
        :key="activity.id"
        :class="'act' + activity.id"
        class="act"
      >
        <img :src="'/src/assets/img/activities/' + activity.img" :alt="activity.name" />
        <p>{{ activity.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-container {
  margin: 0 50px;
}

#message p {
  font-size: 15px;
  margin: 5px 0 10px;
}

#message h2 {
  font-weight: bold;
  margin-top: 20px;
}

/****************RECHERCHE******************/
#recherche {
  width: max-content;
  display: flex;
  align-items: center;
}

#recherche div:first-child {
  width: 50px;
  height: 50px;
  background-color: var(--gray);
  border-radius: 15px 0 0 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

#recherche div:last-child {
  display: none;
}

#recherche input {
  font-size: medium;
  font-weight: bold;
  height: 50px;
  padding: 0 20px;
  border: 1px solid var(--gray);
}

#recherche input[type='text'] {
  width: 230px;
}

#recherche input:focus {
  outline: none; /* Supprime le contour bleu au focus */
  box-shadow: none;
}

#recherche input[type='submit'] {
  background-color: var(--blue);
  color: #f2f2f2;
  border-radius: 0 15px 15px 0;
}

/****************FILTRES******************/
#filtres {
  width: max-content;
  display: flex;
  gap: 25px;
  align-items: center;
  margin-top: 30px;
}

#filtres > div {
  font-size: medium;
  font-weight: bold;
  border: 1px solid var(--gray);
  border-radius: 25px;

  display: flex;
  align-items: center;
}

#filtres > div > i {
  display: inline-block;
  color: var(--blue);
  width: 50px;
  aspect-ratio: 1 / 1;
  background-color: var(--gray);
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
}

#filtres > div > p {
  padding: 15px;
  font-weight: bold;
}

#filtres div:first-child {
  padding-left: 5px;
  border: none;
}

/****************NB******************/
#nb {
  width: max-content;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 30px;
}

#nb div:first-child {
  width: 20px;
  height: 20px;
  border: 1px solid var(--gray);
  border-radius: 50%;
  color: var(--blue);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

/* Hebergements */

#hebergements {
  display: grid;
  grid-template-columns: 2.1fr 1fr;
  gap: 40px;
  padding: 30px 50px 0;
}

#a-la-une,
#les-plus-populaires {
  background-color: var(--gray);
  border-radius: 20px;
  padding: 30px 40px;
}

.img-container {
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  padding: 5px;
  overflow: hidden;
}

.img-container > img {
  width: 100%;
  border-radius: 15px 15px 0 0;
}

.nom-hebergement {
  padding: 5px 15px 0;
  font-weight: bold;
}

.tarif {
  padding: 5px 15px 0;
}

.rates {
  padding: 5px 15px;
}

.rates > i {
  color: var(--blue);
  font-size: 12px;
}

/* a la une */

#a-la-une-items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  height: max-content;
}

#a-la-une-items > div {
  min-width: 180px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

#a-la-une button {
  padding: 20px 0 0;
  border: none;
  font-size: medium;
  font-weight: bold;
  background: none;
}

/*les plus populaires*/

#les-plus-populaires-items {
  display: grid;
  gap: 25px;
}

#les-plus-populaires .en-tete > i {
  float: right;
}

#les-plus-populaires-items > div {
  background-color: white;
  border-radius: 20px;
  min-width: max-content;
  width: auto;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: start;
}

.img-pop-container {
  box-sizing: border-box;
  width: 120px;
  height: 125px;
  overflow: hidden;
  padding: 5px;
}

.img-pop-container img {
  height: 100%;
  border-radius: 15px 0 0 15px;
}

.heb-props {
  position: relative;
}

.heb-props > .rates {
  position: absolute;
  bottom: 10px;
}

.heb-props > .nom-hebergement {
  margin-top: 10px;
}

/*
    #les-plus-populaires div:first-child {
        flex-grow: 0;
        width: max-content;
        height: max-content;
        background: none;
        font-size: large;
        font-weight: bold;
    }*/

.gray {
  color: var(--gray);
}

/****************ACTIVITÉS******************/
#activites-a-marseille {
  margin-bottom: 30px;
  padding: 30px 50px 0;
}

#activites-a-marseille > p {
  font-weight: bold;
  font-size: large;
  margin-bottom: 10px;
}

#activites {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 150px;
  gap: 40px;
}

.act {
  position: relative;
  overflow: hidden;
  background-color: var(--gray);
  border-radius: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.act > img {
  width: 100%;
}

.act > p {
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  bottom: 0;
  padding: 15px;
  background-color: white;
  font-weight: bold;
}

.act1 {
  grid-row: 1 / 3;
}

.act2 {
  grid-column-start: 2;
  grid-row-start: 1;
}

.act3 {
  grid-column-start: 2;
  grid-row-start: 2;
}

.act4 {
  grid-column-start: 3;
  grid-row: 1 / 3;
}

.act5 {
  grid-row-start: 1;
  grid-column-start: 4;
}

.act6 {
  grid-row-start: 2;
  grid-column-start: 4;
}
</style>

<script>
export default {
  props: ['activities', 'hotels'],
  methods: {
    getPopularHotels(n) {
      let hotels = this.hotels.slice()
      hotels.sort((hotel1, hotel2) => hotel2.rates - hotel1.rates)
      return hotels.slice(0, n)
    },
  },
}
</script>
