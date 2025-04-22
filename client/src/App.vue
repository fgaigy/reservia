<script setup>
import { RouterLink, RouterView } from 'vue-router'
import activities from '@/activities.json'
import hotels from '@/hotels.json'
</script>

<template>
  <header>
    <div class="top-nav">
      <div id="logo"><img src="@/assets/img/logo/Reservia.png" alt="logo" width="100" /></div>
      <div id="header-nav">
        <RouterLink to="/">Hébergements</RouterLink>
        <RouterLink to="/#act">Activités</RouterLink>
        <RouterLink to="/inscription">S'inscrire</RouterLink>
      </div>
    </div>
  </header>

  <RouterView :activities="activities" :hotels="hotels" />

  <footer>
    <div id="a-propos">
      <div class="en-tete">À propos</div>
      <div><a href="#">Fonctionnement du site</a></div>
      <div><a href="#">Conditions générales de vente</a></div>
      <div><a href="#">Données et confidentialité</a></div>
    </div>
    <div id="nos-hebergement">
      <div class="en-tete">Nos hébergements</div>
      <div><a href="#">Charte qualité</a></div>
      <div><a href="#">Soumêttre votre hôtel</a></div>
    </div>
    <div id="assistance">
      <div class="en-tete">Assistance</div>
      <div><a href="#">Centre d'aide</a></div>
      <div><a href="#">Nous contacter</a></div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      activities,
      hotels,
    }
  },
}
</script>

<style scoped>
header {
  padding: 30px 50px 0px;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#header-nav {
  width: 40%;
  display: flex;
  justify-content: space-evenly;
}

#header-nav a {
  color: black;
  text-decoration: none;
}

#header-nav a:hover {
  color: var(--blue);
}

#header-nav a:active {
  font-weight: bold;
  color: var(--blue);
}

/****************FOOTER******************/
footer {
  display: flex;
  justify-content: space-between;
  background-color: var(--gray);
  padding: 30px 50px;
}

footer > div {
  flex-grow: 1;
}

footer > div a {
  display: block;
  margin-bottom: 8px;
  text-decoration: none;
  color: black;
}

footer > div a:hover {
  color: var(--blue);
}
</style>
