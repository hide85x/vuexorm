<template>
  <form @submit.prevent="addItem">
    <div>
      <h3 style="padding: 0; margin: 0">
        {{ user.name }}
      </h3>
      <p>{{ user.profile.bio }}//data from User.profile</p>
      <p>all he wants is : {{ profile.life_goal }} //data from Profile </p>
    </div>
    <div id="app">
      <input placeholder="type item bro..." type="text" v-model="form.body" />
      <button type="submit">add item</button>
    </div>
  </form>
  <div class="results">
    <div class="item" v-for="item in items">
      <p>id: {{ item.id }}</p>
      <p>body: {{ item.body }}</p>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onBeforeMount } from "vue";

import Item from "./models/Item";
import Profile from "./models/Profile";
import User from "./models/User";

export default {
  name: "App",
  setup() {
    onBeforeMount(() => {
      User.insert({
        data: {
          id: 666,
          name: "Uki",
          email: "hide@asd.pol",
        },
      }),
        Profile.insert({
          data: {
            id: 555,
            bio: "was born, and then...",
            life_goal: "world domination!",
            user_id: 666,
          },
        });
    });

    const form = reactive({
      body: "",
    });

    const items = computed(() => Item.all());
    const user = computed(() => User.query().with("profile").find(666));
    const profile = computed(() => Profile.query().with("user").find(555));

    const addItem = () => {
      if (form.body == "") {
        alert("boooom, no data provided!");
        return;
      }
      Item.insert({ data: form });
      form.body = "";
    };
    return {
      profile,
      user,
      items,
      form,
      addItem,
    };
  },
};
</script>

<style lang="scss">
.results {
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 350px;
  width: 600px;
  padding: 10px;
  overflow-y: scroll;
  border: 2px solid black;
  .item {
    box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.574);
    margin: 3px;
    width: 100%;
    transition: all 0.3s ease;
    &:hover {
      background: rgba(0, 0, 0, 0.808);
      cursor: pointer;
      color: rgb(255, 255, 255);
      border-radius: 15px;
    }
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
input {
  width: 400px;
  height: 50px;
  border: none;
  border-bottom: 2px solid black;
  box-shadow: 0 25px 25px rgba(17, 10, 10, 0.75);
  outline: none;
  text-align: center;
  font-size: 2rem;
}
button {
  border: none;
  padding: 2px;
  color: white;
  background: black;
  width: 50px;
  height: 50px;
  margin: auto;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 12px 2px white;
    filter: invert(1);
    cursor: pointer;
    border-radius: 100%;
  }
}
</style>
