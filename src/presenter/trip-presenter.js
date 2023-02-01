import TravelListView from '../view/travel-list-view.js';
import SortingView from '../view/sorting-view.js';
import WaypointView from '../view/waypoint-view.js';
import EditingWaypointView from '../view/editing-waypoint-view.js';
import AddingWaypointView from '../view/adding-waypoint-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  travelListComponent = new TravelListView();
  sortingComponent = new SortingView();
  editingWaypointComponent = new EditingWaypointView();
  AddingWaypointComponent = new AddingWaypointView();

  constructor(tripContainer) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(this.sortingComponent, this.tripContainer);
    render(this.travelListComponent, this.tripContainer);
    render(this.editingWaypointComponent, this.travelListComponent.getElement());
    render(this.AddingWaypointComponent, this.travelListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.travelListComponent.getElement());
    }
  }
}
