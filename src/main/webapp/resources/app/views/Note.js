import {Marionette,Backbone, Radio} from '../../vendor/vendor';
import template from '../templates/note.html';
import modalTemplate from '../templates/delete.html';
import NoteModel from '../models/Note';


export default Marionette.View.extend({
    tagName: 'tr',
    template: template,
    model:NoteModel,
    ui: {
        'delete': '.fa-window-close-o'
    },
    events: {
        'click @ui.delete': 'confirmDelete'
    },
    modelEvents: {
        "sync":"updateCollection"
    },
    confirmDelete: function() {
        console.log("confirmDelete");
        var self = this;
        var options = {
            template: modalTemplate,
            handler: this.delete,
            obj:self
        };
        var channel = Radio.channel('basic');
        channel.trigger('modal:show', options);

    },
    updateCollection: function() {
        console.log("updateCollection");
    },
    delete: function(){
        console.log("delete");
        var self = this;
        this.model.destroy({
            success: function (model, response) {
                Radio.channel('basic').trigger('collection:fetch');
                var model = new Backbone.Model();
                model.set({"message":"Note is deleted"});
                model.set({"type":"success"});
                Radio.channel('basic').trigger('notification:show', {model:model});
            }
        });
    }
});

