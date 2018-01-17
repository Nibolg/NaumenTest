import {Marionette, Radio} from '../../vendor/vendor';
import template from '../templates/notification.html';

export default Marionette.View.extend({
    template: template,
    ui: {
        "close": ".dismiss"
    },
    events: {
        'click @ui.close': function(e) {
            e.preventDefault();
            Radio.channel('basic').trigger('notification:close');
        }
    }
});

