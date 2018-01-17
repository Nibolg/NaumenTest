import {Marionette} from '../vendor/vendor';

export default  Marionette.Object.extend({
    initialize: function(options){
        this.layout = options.layout;
    },
    showNotes: function() {
        console.log("MainController showNotes...");
        this.layout.triggerMethod('show:notes');
    },

    addNote: function() {
        console.log("MainController addNote...");
        this.layout.triggerMethod('add:note');
    }

});
