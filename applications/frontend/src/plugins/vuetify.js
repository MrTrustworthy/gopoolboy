import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.teal.lighten2,
                secondary: colors.teal.lighten5,
                accent: colors.amber.accent4,
                error: '#f44336',
                warning: '#ffc107',
                info: '#00bcd4',
                success: '#4caf50'
            }

        }
    },
});
