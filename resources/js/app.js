require('./bootstrap');

require('alpinejs');

import {createApp} from 'vue';

import TextEditor from "./components/TextEditor";

createApp({
    components:{
        TextEditor
    }
}).mount('#app');
