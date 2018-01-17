import {Marionette, $, Backbone, Radio} from '../../vendor/vendor';
import template from '../templates/noteAdd.html';
import Note from '../models/Note';


export default Marionette.View.extend({
    template: template,
    ui: {
        'input': '.note',
        'submit': '#submit'
    },
    events: {
        'change @ui.input': 'cache',
        'click @ui.submit': 'save'
    },
    modelEvents: {
        "sync":"updateCollection",
        "invalid": "invalid"
    },
    initialize: function() {
        this.model = new Note();
        this.model.set({"name":localStorage.getItem("name")});
        this.model.set({"content":localStorage.getItem("content")});
    },
    cache: function(event) {
        var input = $(event.currentTarget);
        var type  = input.attr('id');
        localStorage.setItem(type, input.val());
        var obj = {};
        obj[type] =  input.val();
        this.model.set(obj);
    },
    save: function(event) {
        event.preventDefault();
        this.model.save();
    },
    updateCollection: function() {
        console.log("updateCollection");
        var model = new Note();
        model.set({"message":"Note is created"});
        model.set({"type":"success"});
        Radio.channel('basic').trigger('notification:show', {model:model});
        localStorage.removeItem("name");
        localStorage.removeItem("content");
        this.collection.trigger('model:push');
        Backbone.history.navigate("/service-note", true);
        this.destroy();
    },
    invalid(options) {
        var model = new Backbone.Model();
        model.set({"message":this.model.validationError });
        model.set({"type":"error"});
        Radio.channel('basic').trigger('notification:show', {model:model});
    }
});
