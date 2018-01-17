import {Marionette, Backbone} from '../vendor/vendor';
import Router from './Router';
import Controller from './Controller';
import NotesCollection from './collections/Notes';

import LayoutView from './views/Layout';

export default Marionette.Application.extend({
  onStart() {
    localStorage.clear();

    console.log("on start");
    var collection = new NotesCollection();
    var layout = new LayoutView({collection:collection});
      layout.render();
    var mainController = new Controller({layout:layout});
    var router = new Router({controller:mainController});
    if (Backbone.history){
         console.log("Backbone history start");
         Backbone.history.start({pushState: false, root: "/"});

    }
    if(Backbone.history.fragment === '') {
        Backbone.history.navigate('/service-note', true);
    }
  }
});
