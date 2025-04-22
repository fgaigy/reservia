<template>
  <div class="container">
    <form>
      <h1>Inscrivez-vous</h1>
      <div class="input-container">
        <div v-for="(input, i) in inputs" :key="i">
          <label :for="input.id"> {{ input.label }} : </label>
          <span
            v-if="input.required"
            style="color: red;">*</span>
          <br />
          <input
            :type="input.type"
            :required="input.required"
            :id="input.id"
            v-model="inputValues[input.id]"/>

        </div>
      </div>
      <div class="error" v-html="error" />
      <button @click.prevent="register" class="create">Créer un compte</button>
      <hr />
      <p>Si vous avez déja un compte, <a src="#">connectez-vous</a></p>
    </form>
  </div>
</template>

<style scoped>
.container {
  background: white;
  padding: 20px;
  font-family: 'Raleway', sans-serif;
}

h1 {
  font-weight: bolder;
  margin: 0 0 30px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-around;
  gap: 15px 50px;
  margin-bottom: 15px;
}

input {
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: 'Raleway', sans-serif;
}

p {
  font-size: small;
  text-align: center;
}

button.create {
  width: 300px;
  height: 40px;
  background-color: #1877f2;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 30px;
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
}

button.create:hover {
  color: var(--gray);
}

a {
  text-decoration: none;
  color: #1877f2;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;
}

a:hover {
  color: green;
}

form > hr {
  margin: 15px 0;
  border: 0.5px solid var(--gray);
  width: 300px;
}

.error {
  color: red;
  font-size: small;
}
</style>

<script setup>
import { ref } from 'vue'
import AuthenticationService from '@/services/AuthenticationService'

const inputs = [
  { id: 'lastname', label: 'Nom', type: 'text', value: '', required: false },
  { id: 'email', label: 'Adresse e-mail', type: 'email', value: '', required: true },
  { id: 'firstname', label: 'Prenom(s)', type: 'text', value: '', required: true },
  { id: 'login', label: 'Login', type: 'text', value: '', required: true },
  { id: 'address', label: 'Adresse', type: 'text', value: '', required: true },
  { id: 'password', label: 'Mot de passe', type: 'password', value: '', required: true },
  { id: 'telephone', label: 'Téléphone', type: 'text', value: '', required: false },
  {
    id: 'passwordBis',
    label: 'Confirmer le mot de passe',
    type: 'password',
    value: '',
    required: true,
  },
]

const inputValues = ref({})
inputs.forEach(input => { inputValues.value[input.id] = '' }) // v-model object for each input

const error = ref(null) // in case of error

const register = async () => {
  try {
    await AuthenticationService.register(inputValues.value) // request
    inputs.forEach(input => { inputValues.value[input.id] = '' })
  } catch (err) {
    error.value = err.response.data.error // error if some appears
  }
}
</script>
