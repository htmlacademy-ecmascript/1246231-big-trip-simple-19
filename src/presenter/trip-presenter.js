import WaypointListView from '../view/waypoints-view.js';
import NoWaypointsView from '../view/no-waypoints-view.js';
import NewWaypointPresenter from './new-waypoint-presenter.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import WaypointPresenter from './waypoint-presenter.js';
import ListSortView from '../view/sort-view.js';
import { getSort } from '../utils/sort.js';
import { SortType, defaultNewWaypoint } from '../const.js';
import { getSortedWaypoints } from '../utils/sort.js';
import { UpdateType, UserAction, FilterType, TimeLimit } from '../const.js';
import { filter } from '../utils/filter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import ErrorLoadView from '../view/error-load-view.js';
import NewWaypointButtonView from '../view/new-waypoint-button-view.js';

export default class TripPresenter {
  #waypointListComponent = new WaypointListView();
  #loadingComponent = new LoadingView();
  #waypointsContainer = null;
  #waypointsModel = null;
  #filterModel = null;
  #newWaypointPresenter = null;
  #sortComponent = null;
  #sortOptions = getSort();
  #currentSortType = SortType.DAY;
  #waypointPresenter = new Map();
  #headerContainer = null;
  #noWaypointComponent = null;
  #newWaypointButtonContainer = null;
  #newWaypointButtonComponent = null;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #errorLoadComponent = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ waypointsContainer, waypointsModel, filterModel, headerFiltersElement, newWaypointButtonContainer }) {
    this.#waypointsContainer = waypointsContainer;
    this.#waypointsModel = waypointsModel;
    this.#filterModel = filterModel;
    this.#headerContainer = headerFiltersElement;
    this.#newWaypointButtonContainer = newWaypointButtonContainer;

    this.#newWaypointPresenter = new NewWaypointPresenter({
      waypointListContainer: this.#waypointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewWaypointFormClose
    });

    this.#waypointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderTripRoute();
  }

  createWaypoint() {
    const waypoint = defaultNewWaypoint;
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newWaypointPresenter.init(waypoint, this.destinations, this.offers, this.cities);
  }

  get waypoints() {
    this.#filterType = this.#filterModel.filter;
    const waypoints = [...this.#waypointsModel.waypoints];
    const filteredWaypoints = filter[this.#filterType](waypoints);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return getSortedWaypoints(filteredWaypoints, SortType.DAY);
      case SortType.PRICE:
        return getSortedWaypoints(filteredWaypoints, SortType.PRICE);
    }

    return filteredWaypoints;
  }

  get offers() {
    return [...this.#waypointsModel.offers];
  }

  get destinations() {
    return [...this.#waypointsModel.destinations];
  }

  get cities() {
    return [...this.#waypointsModel.cities];
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_WAYPOINT:
        this.#waypointPresenter.get(update.id).setSaving();
        try {
          await this.#waypointsModel.updateWaypoint(updateType, update);
        } catch (err) {
          this.#waypointPresenter.get(update.id).setAborting();
        }
        break;

      case UserAction.ADD_WAYPOINT:
        this.#newWaypointPresenter.setSaving();
        try {
          await this.#waypointsModel.addWaypoint(updateType, update);
        } catch (err) {
          this.#newWaypointPresenter.setAborting();
        }
        break;

      case UserAction.DELETE_WAYPOINT:
        this.#waypointPresenter.get(update.id).setDeleting();
        try {
          await this.#waypointsModel.deleteWayoint(updateType, update);
        } catch (err) {
          this.#waypointPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#waypointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripRoute();
        this.#renderTripRoute();
        break;
      case UpdateType.MAJOR:
        this.#clearTripRoute({ resetSortType: true });
        this.#renderTripRoute();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTripRoute();
        break;
    }
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#waypointsContainer);
  }

  #renderNoWaypoints() {
    this.#noWaypointComponent = new NoWaypointsView({
      filterType: this.#filterType
    });
    render(this.#noWaypointComponent, this.#waypointsContainer);
  }

  #renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter({
      waypointsContainer: this.#waypointListComponent.element,
      allDestinations: this.destinations,
      allOffers: this.offers,
      allCities: this.cities,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    waypointPresenter.init(waypoint, this.allDestinations, this.allOffers);
    this.#waypointPresenter.set(waypoint.id, waypointPresenter);
  }

  #renderSort() {
    this.#sortComponent = new ListSortView({
      sortOptions: this.#sortOptions,
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#waypointListComponent.element, RenderPosition.BEFOREBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    if (sortType === SortType.EVENT || sortType === SortType.OFFERS || sortType === SortType.TIME) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripRoute();
    this.#renderTripRoute();
  };

  #handleModeChange = () => {
    this.#newWaypointPresenter.destroy();
    this.#waypointPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearTripRoute({ resetSortType = false } = {}) {
    this.#waypointPresenter.forEach((presenter) => presenter.destroy());
    this.#waypointPresenter.clear();
    this.#newWaypointPresenter.destroy();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noWaypointComponent) {
      remove(this.#noWaypointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleNewWaypointFormClose = () => {
    this.#newWaypointButtonComponent.element.disabled = false;
  };

  #handleNewWaypointButtonClick = () => {
    this.createWaypoint();
    this.#newWaypointButtonComponent.element.disabled = true;
  };

  #renderNewWaypointButton() {
    if (!this.#newWaypointButtonComponent) {
      this.#newWaypointButtonComponent = new NewWaypointButtonView({
        newWaypointButtonContainer: this.#newWaypointButtonContainer,
        onNewWaypointButtonClick: this.#handleNewWaypointButtonClick
      });
      render(this.#newWaypointButtonComponent, this.#newWaypointButtonContainer);
    }
  }

  #renderTripRoute() {
    render(this.#waypointListComponent, this.#waypointsContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const waypointsCount = this.waypoints.length;

    if (waypointsCount === 0 && this.offers.length && this.destinations.length) {
      this.#renderNoWaypoints();
      this.#renderNewWaypointButton();
      return;
    }

    if (this.offers.length === 0 || this.destinations.length === 0) {
      const prevErrComponent = this.#errorLoadComponent;
      this.#errorLoadComponent = new ErrorLoadView();

      if (prevErrComponent === null) {
        render(this.#errorLoadComponent, this.#waypointsContainer);
      }
    }

    this.waypoints.forEach((waypoint) => this.#renderWaypoint(waypoint));
    if (!this.#errorLoadComponent) {
      this.#renderSort();
      this.#renderNewWaypointButton();
    }
  }
}
