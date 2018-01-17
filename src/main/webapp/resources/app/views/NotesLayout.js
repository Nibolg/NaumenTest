import {Marionette,Backbone, Radio} from '../../vendor/vendor';
import template from '../templates/notes.html';
import Notes from '../views/Notes';


export default Marionette.View.extend({
    template: template,
    ui: {
        "searchBtn": ".search",
        "searchInput": "#search",
        "count": "#count",
        "refresh": ".fa-refresh"
    },
    regions: {
        tbody: {
            el: 'tbody',
            replaceElement: true
        }
    },
    events:{
        "click @ui.searchBtn": "search",
        "change @ui.searchInput": "saveInput",
        "click @ui.refresh": "refresh"
    },
    initialize: function(options) {
        this.collection = options.collection;
        this.model = new Backbone.Model();
        this.model.set({"count":this.collection.length});
        Radio.channel('basic').on('collection:fetch', this.updateLayout, this);
        Radio.channel('basic').on('collection:filter', this.updateLayout, this);
    },
    updateLayout: function() {
        console.log("updateLayout "+ this.notes.children.length);
        this.model.set({"count":this.notes.children.length});
        this.render();
    },
    onRender: function() {
        this.notes = new Notes({collection:this.collection});
        if (localStorage.hasOwnProperty("filter")) {
            this.notes.setFilter(this.filter,{preventRender: true });
        }
        this.showChildView("tbody", this.notes);
        if (localStorage.hasOwnProperty("searchInput")) {
            this.getUI("searchInput").val(localStorage.getItem("searchInput"));
        }
        var count = this.notes.children.length;
        this.getUI('count').html("Note count: "+ count);
    },
    search:function(){
        localStorage.setItem("filter", this.getUI("searchInput").val());
        console.log(this.notes.children.length);
        this.notes.setFilter(this.filter,{preventRender: true });
        this.notes.render();
        this.updateLayout();
        console.log("set filter");
    },
    saveInput:function() {
        var input = this.getUI("searchInput").val();
        localStorage.setItem("searchInput", input);
    },
    filter: function(child) {
        var input = localStorage.getItem("filter");
        var name = child.get("name");
        if (!name) {
            name = "";
        }
        var content = child.get("content");
        if (!content) {
            content = "";
        }
        var flag = name.indexOf(input)!== -1;
        flag = flag || content.indexOf(input)!== -1;
        return flag;
    },
    onBeforeDestroy: function(){
        console.log("destroy");
        Radio.channel('basic').off('collection:fetch');
    },
    refresh: function() {
        console.log("refresh");
        this.collection.trigger('model:push');
    }

});

