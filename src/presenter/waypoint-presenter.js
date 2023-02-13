import PointView from '../view/waypoint-view.js';
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

export default class PointPresenter {
  #pointsContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #allDestinations = null;
  #allOffers = null;
  #waypoint = null;
  #mode = Mode.DEFAULT;
  #allCities = null;

  constructor({ pointsContainer, allDestinations, allOffers, allCities, onDataChange, onModeChange }) {
    this.#pointsContainer = pointsContainer;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#allCities = allCities;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(waypoint) {
    this.#waypoint = waypoint;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      waypoint: this.#waypoint,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      onRollupBtnClick: this.#handleEditClick
    });

    this.#pointEditComponent = new EditWaypointView({
      waypoint: this.#waypoint,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      allCities: this.#allCities,
      onFormSubmit: this.#handleFormSubmit,
      onRollupBtnClick: this.#handleRollupBtnClick,
      onDeleteClick: this.#handleDeleteClick
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }


    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }


    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#waypoint);
      this.#replaceEditFormToPoint();
    }
  }


  #replacePointToEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#waypoint);
      this.#replaceEditFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToEditForm();
  };

  #handleFormSubmit = (update) => {
    // Проверяем, поменялись ли в задаче данные, которые попадают под фильтрацию,
    // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление.
    //к ним относятстя изменение дат и цены
    const isMinorUpdate =
      !isDatesEqual(this.#waypoint.dateFrom, update.dateFrom) ||
      !isDatesEqual(this.#waypoint.dateTo, update.dateTo) ||
      !isPriceEqual(this.#waypoint.basePrice, update.basePrice);


    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
  };


  #handleRollupBtnClick = () => {
    this.#pointEditComponent.reset(this.#waypoint);
    this.#replaceEditFormToPoint();
  };

  #handleDeleteClick = (waypoint) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      waypoint,
    );
  };
}
