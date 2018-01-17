import {Backbone,Radio} from '../../vendor/vendor';
import Note from '../models/Note';
export default Backbone.Collection.extend({
    url: '/Note/',
    model: Note,
    initialize: function() {
        this.on('model:push', this.pushModel);
        this.pushModel();
    },
    pushModel: function() {
        console.log("notes fetch");
        this.fetch({
            success: function() {
                console.log("collection:fetch");
                Radio.channel('basic').trigger('collection:fetch');
            }
        });
    }

});

