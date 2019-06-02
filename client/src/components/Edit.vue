
<template>
<v-card id="mainCard">
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success">
      <span>Registration successful!</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
    <v-form ref="form" @submit.prevent="submit">
      <v-container grid-list-xl fluid>
        <v-layout wrap>
          <v-flex xs12 sm6>
            <v-text-field
              v-model="form.title"
              :rules="rules.title"
              label="Title"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              v-model="form.description">
              <template v-slot:label>
                <div>
                  Bio <small>(optional)</small>
                </div>
              </template>
            </v-textarea>
          </v-flex>
          <v-flex xs12 sm3>
            <v-checkbox label="Nintendo Switch" value="Nintendo Switch" v-model="form.equipments"/>
            <v-checkbox
              label="Retro Projecteur" value="Retro Projecteur" v-model="form.equipments"/>
            <v-checkbox label="Réfrigérateur" value="Réfrigérateur" v-model="form.equipments"/>
          </v-flex>
          <v-flex xs12 sm9>
            <v-slider
              v-model="form.capacity"
              :min="1"
              :max="200"
              label="Capacity"
              hint="in person"
              persistent-hint
              thumb-label
            ></v-slider>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn flat @click="$router.go(-1)">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!formIsValid"
          flat
          color="primary"
          type="submit"
          @click="updatePost">
        Save</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import PostsService from '@/services/PostsService';

export default {
  name: 'Edit',
  data() {
    const defaultForm = Object.freeze({
      title: '',
      description: '',
      capacity: 0,
      equipments: [],
    });
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        title: [val => (val || '').length > 0 || 'This field is required'],
      },
      content: 'hey',
      snackbar: false,
      defaultForm,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.form.title &&
        this.form.description &&
        this.form.capacity
      );
    },
  },
  mounted() {
    this.getPost();
  },
  methods: {
    submit() {
      this.snackbar = true;
    },
    async getPost() {
      const response = await PostsService.getPost({
        id: this.$route.params.id,
      });
      this.form.title = response.data.title;
      this.form.description = response.data.description;
      this.form.capacity = response.data.capacity;
      this.form.equipments = this.createArrayFromObject(response.data.equipments);
    },
    async updatePost() {
      await PostsService.updatePost({
        id: this.$route.params.id,
        title: this.form.title,
        description: this.form.description,
        capacity: this.form.capacity,
        equipments: this.createObjectFromArray(this.form.equipments),
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
    createArrayFromObject(obj) {
      const stringArray = obj.map(item => item.name);
      return stringArray;
    },
  },
};
</script>
<style type="text/css">
#mainCard {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
