import TravelListView from '../view/travel-list-view.js';
import SortingView from '../view/sorting-view.js';
import WaypointView from '../view/waypoint-view.js';
import EditingWaypointView from '../view/editing-waypoint-view.js';
import AddingWaypointView from '../view/adding-waypoint-view.js';
import { render, RenderPosition } from '../render.js';

export default class TripPresenter {
  travelListComponent = new TravelListView();
  sortingComponent = new SortingView();
  addingWaypointComponent = new AddingWaypointView();

  constructor({ tripContainer, waypointsModel }) {
    this.tripContainer = tripContainer;
    this.waypointsModel = waypointsModel;
  }

  init() {
    this.listWaypoints = [...this.waypointsModel.getPoints()];
    render(this.sortingComponent, this.tripContainer);
    render(this.travelListComponent, this.tripContainer);
    render(this.addingWaypointComponent, this.travelListComponent.getElement(), RenderPosition.AFTERBEGIN);
    for (let i = 1; i < this.listWaypoints.length; i++) {
      render(new WaypointView({ waypoint: this.listWaypoints[i] }), this.travelListComponent.getElement());
    }
    render(new EditingWaypointView(this.listWaypoints[0]), this.travelListComponent.getElement(), RenderPosition.AFTERBEGIN);
  }
}
