<template>
  <v-card color="white">
    <v-subheader>Parameters</v-subheader>
      <v-layout row>
        <v-flex class="pr-3">
          <v-slider
            v-model="capacity"
            :max="200"
            :min="0"
            label="Capacity (in persons)"
            step="1"
            thumb-label
          ></v-slider>
        </v-flex>

        <v-flex shrink style="width: 60px">
          <v-text-field
            v-model="capacity"
            class="mt-0"
            hide-details
            single-line
            type="number"
          ></v-text-field>
        </v-flex>
      </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Date"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="datePicker = false"
            :first-day-of-week="1"
            locale="fr-FR">
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-card>

</template>

<script>
import PostsService from '@/services/PostsService';

export default {
  name: 'Search',
  data() {
    return {
      capacity: 0,
      date: new Date().toISOString().substr(0, 10),
      hour: '',
      equipments: [],
      datePicker: false,
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
  },
};
</script>
<style type="text/css">

</style>
