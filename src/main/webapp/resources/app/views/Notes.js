import {Marionette,Radio} from '../../vendor/vendor';
import NoteView from './Note';

export default Marionette.CollectionView.extend({
    childView: NoteView,
    tagName: "tbody"
});

