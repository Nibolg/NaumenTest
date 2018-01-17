import {Backbone, $} from '../../vendor/vendor';
export default Backbone.Model.extend({
    urlRoot: "/Note/",
    validate: function(attrs) {
        if (!attrs.name && !attrs.content) {
            return "One of the fields must be filled!";
        }
        if (attrs.name=="" && attrs.content=="") {
            return "One of the fields must be filled!";
        }
    }
});
