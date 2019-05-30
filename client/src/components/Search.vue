<template>
  <v-card id="mainCard">
    <v-subheader>Parameters</v-subheader>
    <v-container grid-list-xl fluid>
      <v-layout wrap>
        <v-layout row>
          <v-flex>
            <v-slider
              v-model="form.capacity"
              :max="200"
              :min="0"
              label="Capacity"
              hint="in person"
              persistent-hint
              step="1"
              thumb-label
            ></v-slider>
          </v-flex>
          <v-flex shrink style="width: 60px">
            <v-text-field
              v-model="form.capacity"
              class="mt-0"
              hide-details
              single-line
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>
          <v-flex xs12>
            <v-menu
              v-model="datePicker"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="form.date"
                  label="Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="form.date" @input="datePicker = false"
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
              :return-value.sync="form.time"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="form.time"
                  label="Hour"
                  prepend-icon="access_time"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="hourMenu"
                v-model="form.time"
                full-width
                @click:minute="$refs.menu.save(form.time)"
                format="24hr"
              ></v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12>
            <v-checkbox label="Nintendo Switch" value="Nintendo Switch" v-model="form.equipments"/>
            <v-checkbox
              label="Retro Projecteur" value="Retro Projecteur" v-model="form.equipments"/>
            <v-checkbox label="Réfrigérateur" value="Réfrigérateur" v-model="form.equipments"/>
          </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-btn flat @click="resetForm">Reset</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!formIsValid"
        flat
        color="primary"
        type="submit"
        @click="searchPost">
      Search</v-btn>
    </v-card-actions>
    <div>{{ this.availableList }}</div>
  </v-card>
</template>

<script>
import PostsService from '@/services/PostsService';

export default {
  name: 'Search',
  data() {
    const defaultForm = Object.freeze({
      capacity: 0,
      date: new Date().toISOString().substr(0, 10),
      time: null,
      equipments: [],
    });
    return {
      form: Object.assign({}, defaultForm),
      datePicker: false,
      hourMenu: false,
      availableList: [],
      defaultForm,
    };
  },
  watch: {
    form: {
      handler(val) {
        console.log(val);
      },
      deep: true,
    },
  },
  computed: {
    formIsValid() {
      return (
        this.form.date &&
        this.form.time &&
        this.form.capacity
      );
    },
  },
  methods: {
    async searchPost() {
      const response = await PostsService.searchPosts({
        capacity: this.form.capacity,
        equipments: this.createObjectFromArray(this.form.equipments),
        date: this.form.date,
        time: this.form.time,
      });
      console.log(response.data);
      this.availableList = response.data;
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
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
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
