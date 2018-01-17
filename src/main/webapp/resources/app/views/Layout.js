import {Marionette, Radio} from '../../vendor/vendor';
import template from '../templates/layout.html';
import HeadView from './Head';
import AddNote from './AddNote';
import Notification from './Notification';
import NotesView from './NotesLayout';
import Modal from './Modal';

export default Marionette.View.extend({
    template: template,
    el: "body",
    regions: {
        modal: "#modal",
        main:"#main",
        notification: "#notification",
    },
    initialize: function() {
        this.on('show:notes', this.showNotes);
        this.on('add:note', this.addNote);
        Radio.channel('basic').on('modal:show', this.showModal, this);
        Radio.channel('basic').on('notification:close', this.closeNotification, this);
        Radio.channel('basic').on('notification:show', this.showNotification, this);
    },
    showNotes: function() {
        var header = new HeadView({active:"show"});
        header.render();
        var main = this.getChildView("main");
        if (main) {
            main.destroy();
        }
        this.showChildView("main", new NotesView({collection:this.collection}));
        console.log("layout showNotes...");
    },
    addNote: function(){
        var header = new HeadView({active:"add"});
        header.render();
        this.showChildView("main", new AddNote({collection:this.collection}));
        console.log("layout addNote...");
    },
    showModal(options) {
        console.log("showModal");
        this.showChildView("modal", new Modal(options));
    },
    showNotification(options) {
        console.log("show notification");
        this.showChildView("notification", new Notification(options));
        $("#notification").show();
    },
    closeNotification() {
        $("#notification").hide();
    }
});
