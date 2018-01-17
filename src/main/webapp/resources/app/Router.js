import {Marionette} from '../vendor/vendor';

export default Marionette.AppRouter.extend({
    controller: null,
    appRoutes: {
        'service-note':'showNotes',
        'service-note/add' :'addNote'
    }
});