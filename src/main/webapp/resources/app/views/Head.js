import {Marionette} from '../../vendor/vendor';
import tpl from '../templates/header.html';
import {Backbone} from '../../vendor/vendor';

export default Marionette.View.extend({
        template: tpl,
        el: "#header",
        initialize: function(options) {
            this.model =  new Backbone.Model();
            this.model.set({"active": options.active});
        }
});

