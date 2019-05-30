<template>
  <v-card id="mainCard">
    <v-subheader>Parameters</v-subheader>
    <v-container grid-list-xl fluid>
      <v-layout wrap>
        <v-layout row>
          <v-flex>
            <v-slider
              v-model="capacity"
              :max="200"
              :min="0"
              label="Capacity"
              hint="in person"
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
          <v-flex xs12>
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
          <v-spacer></v-spacer>
          <v-flex xs12>
            <v-menu
              ref="menu"
              v-model="hourMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="time"
                  label="Hour"
                  prepend-icon="access_time"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="hourMenu"
                v-model="time"
                full-width
                @click:minute="$refs.menu.save(time)"
                format="24hr"
              ></v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12>
            <v-checkbox label="Nintendo Switch" value="Nintendo Switch" v-model="equipments"/>
            <v-checkbox
              label="Retro Projecteur" value="Retro Projecteur" v-model="equipments"/>
            <v-checkbox label="Réfrigérateur" value="Réfrigérateur" v-model="equipments"/>
          </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions>
        <v-btn
          :disabled="!formIsValid"
          flat
          color="primary"
          type="submit"
          @click="searchPost">
        Search</v-btn>
      </v-card-actions>
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
      time: null,
      equipments: [],
      datePicker: false,
      hourMenu: false,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.date &&
        this.time &&
        this.capacity
      );
    },
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
#mainCard {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
