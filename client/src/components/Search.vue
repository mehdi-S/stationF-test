<template>
  <v-container grid-list-xl fluid justify-center>
    <v-card class="card" id="mainCard">
      <v-subheader>Parameters</v-subheader>
      <v-container grid-list-xl fluid>
        <v-layout wrap>
          <v-layout row>
            <v-flex>
              <v-slider
                v-model="form.capacity"
                :max="200"
                :min="1"
                label="Capacity"
                hint="in person"
                persistent-hint
                step="1"
                thumb-label
              ></v-slider>
            </v-flex>
            <v-flex shrink style="width: 80px">
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
            <v-flex xs6>
              <v-menu
                ref="fromMenu"
                v-model="fromMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="form.timeFrom"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.timeFrom"
                    label="From"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="fromMenu"
                  v-model="form.timeFrom"
                  full-width
                  @click:minute="$refs.fromMenu.save(form.timeFrom)"
                  format="24hr"
                ></v-time-picker>
              </v-menu>
            </v-flex>
            <v-flex xs6>
              <v-menu
                ref="toMenu"
                v-model="toMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="form.timeTo"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.timeTo"
                    label="To"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="toMenu"
                  v-model="form.timeTo"
                  full-width
                  @click:minute="$refs.toMenu.save(form.timeTo)"
                  format="24hr"
                ></v-time-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-checkbox
                label="Nintendo Switch" value="Nintendo Switch" v-model="form.equipments"/>
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
    </v-card>
    <v-card class="card resultCard" v-for="result in availableList" :key="result.id"
    hover>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ result.title }}</h3>
          <div> Maximum capacity of {{ result.capacity }} people</div>
        </div>
      </v-card-title>
       <v-card-actions>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
          <small>Desription</small>
          <v-spacer></v-spacer>
          <v-btn flat @click="reserveRoom(result._id)">Reserve</v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
            {{ result.description }}
            reserved at: {{ result.resa }}
          </v-card-text>
        </v-slide-y-transition>
    </v-card>
    <v-card-text>start: {{isoStart}},End:{{isoEnd}}</v-card-text>
    <v-card-text>newresa:{{newResa}}</v-card-text>
  </v-container>
</template>

<script>
import PostsService from '@/services/PostsService';
import moment from 'moment';

export default {
  name: 'Search',
  data() {
    const defaultForm = Object.freeze({
      capacity: 0,
      date: moment().format('YYYY-MM-DD'),
      timeFrom: moment().format('HH:mm'),
      timeTo: moment().add(1, 'hours').format('HH:mm'),
      equipments: [],
    });
    return {
      form: Object.assign({}, defaultForm),
      show: false,
      datePicker: false,
      fromMenu: false,
      toMenu: false,
      availableList: [],
      defaultForm,
      isoStart: null,
      isoEnd: null,
      newResa: {},
    };
  },
  watch: {
    form: {
      handler(val) {
        this.createIsoDate(val.date, val.timeFrom, val.timeTo);
      },
      deep: true,
    },
  },
  computed: {
    formIsValid() {
      return (
        this.form.date &&
        this.form.timeFrom &&
        this.form.capacity
      );
    },
  },
  methods: {
    async searchPost() {
      const response = await PostsService.searchPosts({
        capacity: this.form.capacity,
        equipments: this.createObjectFromArray(this.form.equipments),
        start: this.form.isoStart,
        end: this.form.isoEnd,
      });
      this.availableList = response.data;
    },
    async reserveRoom(roomId) {
      await PostsService.updateRoomResa({
        id: roomId,
        resa: this.newResa,
      });
      this.searchPost();
    },
    createIsoDate(date, from, to) {
      this.isoStart = moment(`${date}T${from}`).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      this.isoEnd = moment(`${date}T${to}`).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      this.newResa = { start: this.isoStart, end: this.isoEnd };
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
.card {
  margin-top: 15px;
}
.resultCard {
}
</style>
