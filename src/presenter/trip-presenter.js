import TravelListView from '../view/travel-list-view.js';
import SortingView from '../view/sorting-view.js';
import WaypointView from '../view/waypoint-view.js';
import EditingWaypointView from '../view/editing-waypoint-view.js';
import AddingWaypointView from '../view/adding-waypoint-view.js';
import EmptyListView from '../view/empty-list-view';
import { render, RenderPosition } from '../render.js';
import { isEscapeKey } from '../util.js';

export default class TripPresenter {
  #pointListComponent = new TravelListView();

  #pointsContainer = null;
  #pointsModel = null;
  #listPoints = [];

  constructor({ pointsContainer, pointsModel }) {
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

    render(new SortingView(), this.#pointsContainer);
    render(this.#pointListComponent, this.#pointsContainer);
    render(new AddingWaypointView(), this.#pointListComponent.element, RenderPosition.AFTERBEGIN);

    this.#listPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointComponent = new WaypointView({ point });
    const pointEditComponent = new EditingWaypointView({ point });

    const pointRollupBtn = pointComponent.element.querySelector('.event__rollup-btn');
    const editPointForm = pointEditComponent.element.querySelector('form');
    const editRollupBtn = editPointForm.querySelector('.event__rollup-btn');

    const replacePointToEditForm = () => {
      this.#pointListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
      editRollupBtn.addEventListener('click', onCloseEditPointForm);
      editPointForm.addEventListener('submit', onCloseEditPointForm);
      document.addEventListener('keydown', onEscKeyDown);
    };

    const replaceEditFormToPoint = () => {
      this.#pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
      editRollupBtn.removeEventListener('click', onCloseEditPointForm);
      editPointForm.removeEventListener('submit', onCloseEditPointForm);
      document.removeEventListener('keydown', onEscKeyDown);
    };

    function onEscKeyDown(evt) {
      if (isEscapeKey) {
        onCloseEditPointForm(evt);
      }
    }

    function onCloseEditPointForm(evt) {
      evt.preventDefault();
      replaceEditFormToPoint();
    }

    pointRollupBtn.addEventListener('click', () => {
      replacePointToEditForm();
    });

    render(pointComponent, this.#pointListComponent.element);
  }
}
