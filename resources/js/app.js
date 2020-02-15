/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify';
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(Vuetify);
Vue.config.productionTip = false;

// CHECKOUT MODULE 
const tierList = {
    namespaced : true,
    state: {
        servers: [],
        eta : undefined,
        price : 1.9,
        exchangeRate : 1.1003,
        specificChampions : false,
        priorityOrder : false,
        streaming : false,
        // TIERS 
        allTiers : [], // List of all tiers
        selectedTier : { wins: [] }, // Currently selected tier, wins is an empty array because it's used in template
        selectedTierID : 1, // SELECTED TIER ID
        // DIVISIONS 
        allDivisions : [], // LIST OF DIVISIONS
        selectedDivision : {}, // Currently selected division
        selectedDivisionID : 1, // SELECTED DIVISION ID
        hasDivisions : true,

        //WINS 
        maxNumberOfWins : undefined, //FROM THE API
        selectedNumberOfWins : 4, // SELECTED NUMBER OF WINS BY THE USER 
        defaultNumberOfWins : 4, // SELF EXPLANATORY

    },
    mutations: {
        consoleIt(state){
            console.log('consoled from module')
        },
        // UPDATE OF TIERS
        updateAllTiers(state, payload){
            state.allTiers = payload
        },
        updateSelectedTier(state, payload) {
            state.selectedTier = payload;
        },
        updateSelectedTierID(state, payload){
            state.selectedTierID = payload
        },

        // UPDATES OF DIVISIONS
        updateAllDivisions(state, payload){
            state.allDivisions = payload
        },
        updateSelectedDivision(state, payload) {
            state.selectedDivision = payload;
        },
        updateSelectedDivisionID(state, payload){
            state.selectedDivisionID = payload
        },
        updateHasDivisions(state, payload){
            state.hasDivisions = payload
        },
        // UPDATE MAX NUMBER OF WINS
        updateMaxNumberOfWins(state, payload){
            state.maxNumberOfWins = payload;
        },
        // UPDATE OF WINS
        updateDefaultNumberOfWins(state, payload) {
            state.defaultNumberOfWins = payload;
        },
        updateSelectedNumberOfWins(state, payload){
            state.selectedNumberOfWins = payload;
        },
        // ETA
        updateETA(state, payload) {
            state.eta = payload;
        },
        // UPDATE PRICE
        updatePrice(state, payload){
            state.price = payload;
        },
        updatePricePlusPercent(state, percent) {
            console.log(state.price = state.selectedDivision.price * (percent / 100) * state.selectedNumberOfWins)
        },
        updatePriceMinusPercent(state, percent) {
            state.price - state.selectedDivision.price * (percent / 100) * state.selectedNumberOfWins
        },
        updateExhangeRate(state, payload){
            state.exchangeRate = payload;
        },
        updatespecificChampions(state, payload){
            state.exchangeRate = payload;
        },
        updatePriorityOrder(state, payload){
            state.priorityOrder = payload;
        },
        updateStreaming(state, payload){
            state.exchangeRate = payload;
        },
    },
    getters: {
        // Tiers Mutations
        gethako(state){
            return state.hako
        },
        getAllTiers(state){
            return state.allTiers //console.log('from all tiers store')
        },
        getSelectedTier(state){
            return state.selectedTier
        },
        getSelectedTierID(state){
            return state.selectedTierID
        },
        // Divions Mutations
        getAllDivisions(state){
            return state.allDivisions
        },
        getSelectedDivision(state){
            return state.selectedDivision
        },
        getSelectedDivisionId(state){
            return state.selectedDivisionID
        },

        // OTHER MUTATIONS

        getMaxNumberOfWins(state){
            return state.maxNumberOfWins
        },

        getDefaultNumberOfWins(state) {
            return state.defaultNumberOfWins;
        },
        getSelectedNumberOfWins(state){
            return state.selectedNumberOfWins;
        },
        getETA(state){
            return state.eta
        },
        getDefaultETA(state){
            return state.selectedTier.wins[3].eta
        },
        getPrice(state){
            return state.price
        },
    },
    actions: {},
}

const store = new Vuex.Store({
    state: {
        price: 60000,
        //PROPS OF TIER 
        Tiers : [],
        currentlySelectedTier: {
            wins: []
        },
        currentlySelectedDivision: {
           
        },
        currentlySelectedNumberOfWins: 1,
        maximumNumberOfWins: undefined,
        //
        eta: '',
    },
    getters: {
        getMaxNumberOfwins(state){
            return _.maxBy(state.currentlySelectedTier.wins, "wins")
        }
    },
    mutations: {
        // FUNCTIONS OF TIER 
        updateCurrentlySelectedTier(state, payload) {
            state.currentlySelectedTier = payload;
        },
        updateCurrentlySelectedDivision(state, payload) {
            state.currentlySelectedDivision = payload;
        },
        updateMaximumNumberOfWins(state, payload) {
            state.maximumNumberOfWins = payload;
        },
        //
        updateETA(payload) {
            state.eta = payload;
        },
        updatePrice(state, newPrice) {
            state.price = newPrice;
        },
    },
    actions: {
        increment(context) {
            context.commit('increment')
        }
    },
    modules: {
        tierList
    }
})
window.store = store;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const app = new Vue({
    el: '#root',
    // provide the store using the "store" option.
    // this will inject the store instance to all child components.
    store,
    vuetify: new Vuetify({
        theme: {
            themes: {
                dark: {
                    primary: '#673ab7',
                    secondary: '#9c27b0',
                    accent: '#673ab7',
                    error: '#f44336',
                    warning: '#ffeb3b',
                    info: '#3f51b5',
                    success: '#4caf50'
                },
            },
        },
    }),

    created() {
        this.$vuetify.theme.dark = true
    }
});

window.app = app;
