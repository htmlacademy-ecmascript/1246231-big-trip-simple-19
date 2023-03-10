import WaypointView from '../view/waypoint-view.js';
import EditWaypointView from '../view/edit-waypoint-view.js';
import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../util.js';
import { UserAction, UpdateType } from '../const.js';
import { isDatesEqual } from '../utils/dates.js';
import { isPriceEqual } from '../utils/sort.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class WaypointPresenter {
  #waypointsContainer = null;
  #waypointComponent = null;
  #waypointEditComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #allDestinations = null;
  #allOffers = null;
  #waypoint = null;
  #mode = Mode.DEFAULT;
  #allCities = null;

  constructor({ waypointsContainer, allDestinations, allOffers, allCities, onDataChange, onModeChange }) {
    this.#waypointsContainer = waypointsContainer;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#allCities = allCities;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(waypoint) {
    this.#waypoint = waypoint;
    const prevPointComponent = this.#waypointComponent;
    const prevPointEditComponent = this.#waypointEditComponent;

    this.#waypointComponent = new WaypointView({
      waypoint: this.#waypoint,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      onRollupBtnClick: this.#handleEditClick
    });

    this.#waypointEditComponent = new EditWaypointView({
      waypoint: this.#waypoint,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      allCities: this.#allCities,
      onFormSubmit: this.#handleFormSubmit,
      onRollupBtnClick: this.#handleRollupBtnClick,
      onDeleteClick: this.#handleDeleteClick
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#waypointComponent, this.#waypointsContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#waypointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#waypointComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#waypointEditComponent);
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#waypointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#waypointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#waypointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#waypointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#waypointEditComponent.shake(resetFormState);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#waypointEditComponent.reset(this.#waypoint);
      this.#replaceEditFormToPoint();
    }
  }

  #replacePointToEditForm() {
    replace(this.#waypointEditComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint() {
    replace(this.#waypointComponent, this.#waypointEditComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#waypointEditComponent.reset(this.#waypoint);
      this.#replaceEditFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToEditForm();
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDatesEqual(this.#waypoint.dateFrom, update.dateFrom) ||
      !isDatesEqual(this.#waypoint.dateTo, update.dateTo) ||
      !isPriceEqual(this.#waypoint.basePrice, update.basePrice);

    this.#handleDataChange(
      UserAction.UPDATE_WAYPOINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
  };

  #handleRollupBtnClick = () => {
    this.#waypointEditComponent.reset(this.#waypoint);
    this.#replaceEditFormToPoint();
  };

  #handleDeleteClick = (waypoint) => {
    this.#handleDataChange(
      UserAction.DELETE_WAYPOINT,
      UpdateType.MINOR,
      waypoint,
    );
  };
}
