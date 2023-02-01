import WaypointsListView from '../view/waypoints-list-view.js';
import WaypointsSortingView from '../view/waypoints-sorting-view.js';
import WaypointView from '../view/waypoint-view.js';
import WaypointEditingView from '../view/waypoint-editing-view.js';
import WaypointAddingtView from '../view/waypoint-adding-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  waypointsListComponent = new WaypointsListView();

  constructor(tripContainer) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(new WaypointsSortingView(), this.tripContainer);
    render(this.waypointsListComponent, this.tripContainer);
    render(new WaypointEditingView(), this.waypointsListComponent.getElement());
    render(new WaypointAddingtView(), this.waypointsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.waypointsListComponent.getElement());
    }
  }
}
