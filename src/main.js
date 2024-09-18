import Vue from 'vue';
import vSelect from 'vue-select';
import axios from 'axios';
import App from './App.vue';

// const FAIR_SHARING_HOST = 'http://localhost:8000';
const FAIR_SHARING_HOST = 'https://fairsharing.org';
const API_KEY = '61a1d9dac1106cdbec955a91cfc1ffcf58b29ade';

Vue.component('vSelect', vSelect);

new Vue({

    el: '#app',

    components: { vSelect },

    render(createElement) {
        return createElement(App, {
            props: {
                collections: this.collections,
                title: 'FAIRsharing Widget Demo',
                host: FAIR_SHARING_HOST,
                apiKey: API_KEY
            }
        });
    },

    data() {
        return {
            collections: []
        };
    },

    methods: {

        async getCollections() {
            const headers = {
                'Content-Type': 'application/json',
                'Api-Key': API_KEY,
                'X-Requested-With': 'XMLHttpRequest'
            };
            let results = [], url = `${FAIR_SHARING_HOST}/api/collection/summary/`;
            do {
                const response = await axios.get(url, {
                    headers: headers
                });
                results = results.concat(response.data.results);
                url = response.data.next;
            } while (url);
            /*
            const response = await fetch(`${FAIR_SHARING_HOST}/api/collection/summary/`, {
                method: 'GET',
                headers: headers,
                mode: 'cors',
                cache: 'default'
            });
            const json = await response.json();
            */
            const collections = results.map(el => {
                return {
                    label: el.name,
                    value: el.bsg_id
                };
            });
            this.collections = collections;
            // console.log(this.collections);
        }

    },

    mounted() {
        this.getCollections();
    }
});
