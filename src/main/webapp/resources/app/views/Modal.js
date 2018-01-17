import {Marionette,$} from '../../vendor/vendor';

export default Marionette.View.extend({
    initialize: function(options) {
        this.template = options.template;
        this.handler = options.handler;
        this.obj = options.obj;
    },
    className:"modal-medium",
    ui: {
        'close': '.cancel',
        'confirmDelete': '.confirmDelete'
    },
    events: {
        'click @ui.close': 'close',
        'click @ui.confirmDelete': 'confirmDelete'
    },
    close: function() {
        $('#modal').hide();
        $('body').css({'overflow': 'auto'});
        this.destroy();
    },
    confirmDelete: function() {
        console.log('confirm delete');
        this.handler.call(this.obj);
        this.close();
    },
    onRender: function() {
        $('body').css({'overflow': 'hidden'});
        $('#modal').show();
    },
});
