import { remove, render, RenderPosition } from '../framework/render.js';
import EditWaypointView from '../view/edit-waypoint-view.js';
import { UserAction, UpdateType } from '../const.js';
import { isEscapeKey } from '../util.js';

export default class NewWaypointPresenter {
  #waypointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #waypointEditComponent = null;
  #allCities = null;
  #waypoint = null;
  #allDestinations = [];
  #allOffers = [];

  constructor({ waypointListContainer, onDataChange, onDestroy }) {
    this.#waypointListContainer = waypointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(waypoint, allDestinations, allOffers, allCities) {
    this.#waypoint = waypoint;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#allCities = allCities;

    if (this.#waypointEditComponent !== null) {
      return;
    }

    this.#waypointEditComponent = new EditWaypointView({
      waypoint: this.#waypoint,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      allCities: this.#allCities,
      onFormSubmit: this.#handleFormSubmit,
      onRollupBtnClick: this.#handleFormCloseClick,
      onDeleteClick: this.#handleDeleteClick,
      isNewWaypoint: true
    });

    render(this.#waypointEditComponent, this.#waypointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#waypointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#waypointEditComponent);
    this.#waypointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#waypointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#waypointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#waypointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (waypoint) => {
    this.#handleDataChange(
      UserAction.ADD_WAYPOINT,
      UpdateType.MINOR,
      waypoint
    );
  };

  #handleFormCloseClick = () => {
    this.#waypointEditComponent.reset(this.#waypoint);
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
