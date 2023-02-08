import TravelListView from '../view/travel-list-view.js';
import WaypointView from '../view/waypoint-view.js';
import EditingWaypointView from '../view/editing-waypoint-view.js';
import AddingWaypointView from '../view/adding-waypoint-view.js';
import EmptyListView from '../view/empty-list-view';
import { render, replace, RenderPosition} from '../framework/render.js';
import { isEscapeKey } from '../util.js';

export default class TripPresenter {
  #pointListComponent = new TravelListView();

  #pointsContainer = null;
  #pointsModel = null;
  #listPoints = [];

  constructor({pointsContainer, pointsModel}) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points];

    this.#renderPointsList();
  }

  #renderPointsList() {
    if (!this.#listPoints.length) {
      render(new EmptyListView(), this.#pointsContainer);
      return;
    }

    render(this.#pointListComponent, this.#pointsContainer);
    render(new AddingWaypointView(), this.#pointListComponent.element, RenderPosition.AFTERBEGIN);

    this.#listPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {

    function onEscKeyDown(evt) {
      if (isEscapeKey) {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    }

    const pointComponent = new WaypointView({
      point,
      onRollupBtnClick: () => {
        replacePointToEditForm.call(this);
        document.addEventListener('keydown', onEscKeyDown);
      }
    });

    const pointEditComponent = new EditingWaypointView({
      point,
      onFormSubmit: () => {
        replaceEditFormToPoint.call(this);
        document.removeEventListener('keydown', onEscKeyDown);
      },
      onRollupBtnClick: () => {
        replaceEditFormToPoint.call(this);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    });

    function replacePointToEditForm () {
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditFormToPoint () {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointListComponent.element);
  }
}
