import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';

// This must be a singleton, in order to not run into "Cannot have two HTML5 backends" error
let withDragDropContextGuest = null;

const makeWithDragDropContextGuest = guestWindow => {
    if (!withDragDropContextGuest) {
        withDragDropContextGuest = DragDropContext(HTML5Backend, guestWindow);
    }
    return withDragDropContextGuest;
};
export default makeWithDragDropContextGuest;
