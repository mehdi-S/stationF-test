<template>
  <div class="posts">
    <h1>Add Room</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
        </div>
        <div>
          <input type="number" name="capacity" placeholder="CAPACITY" v-model.number="capacity" >
        </div>
        <div id='checks'>
          <input type="checkbox" id="switch" value="Nintendo Switch" v-model="equipments">
          <label for="switch">Nintendo Switch</label>
          <input type="checkbox" id="retro" value="Retro Projecteur" v-model="equipments">
          <label for="retro">Retro Projecteur</label>
          <input type="checkbox" id="fridge" value="Réfrigérateur" v-model="equipments">
          <label for="fridge">Réfrigérateur</label>
        </div>
        <div>
          <button class="app_post_btn" @click="addPost">Add</button>
        </div>
      </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService';

export default {
  name: 'NewPost',
  data() {
    return {
      title: '',
      description: '',
      capacity: 0,
      equipments: [],
    };
  },
  methods: {
    async addPost() {
      await PostsService.addPost({
        title: this.title,
        description: this.description,
        capacity: this.capacity,
        equipments: this.createObjectFromArray(this.equipments),
      });
      this.$router.push({ name: 'List' });
    },
    createObjectFromArray(stringArray) {
      const arrayOfEquipments = [];
      let jsonData = {};
      stringArray.forEach((element) => {
        jsonData = { name: element };
        arrayOfEquipments.push(jsonData);
      });
      return arrayOfEquipments;
    },
  },
};
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
#checks {
  width: 500px;
}
</style>
