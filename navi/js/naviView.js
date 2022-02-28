import View from "../../main/js/View.js";
import closeIcon from "url:../../main/img/close-outline.svg";
import "core-js/stable";
import "regenerator-runtime/runtime";
class NaviView extends View {
  parentElement = document.querySelector(".section-app");

  map;
  mapEv;
  formBox;
  naviInput;
  date;
  entryCoords;
  marker;
  markerArray = [];
  dataArray = [];

  generateMarkup(data) {
    return `
    <div class="invisible-border" id="app-box"></div>
    <div class="navi-section">           
    <div class="navi-container grid--navi">
      <button class="navi-close-btn" aria-label="Close navi app">
        <img src="${closeIcon}" alt="close button" />
      </button>
      <div class="navi-sidebar">
        <div class="navi-logo">
          <span class="material-icons material-icons--navi navi-icon">
            place
          </span>
          <span class="navi-heading">Navi</span>
        </div>
        <div class="navi-sidebar--entry hidden">
            <form class="navi-form">
            <label class="navi-label">Enter marker tag:</label>
            <input class="navi-input" type="text" maxlength="14" >
            </form>
        </div>
        <span class="no-entry-text">To start, click on the map</span>
        <div class="navi-form-box"></div>        
      </div>
      <div id="map" class="navi-map"></div>        
    </div>
    </div>`;
  }

  loadMap(coords, date) {
    const map = L.map("map").setView(coords, 13);
    this.map = map;
    this.date = date;

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.getLocalStorage();
  }

  addHandlerClickMap() {
    const formBox = document.querySelector(".navi-sidebar--entry");
    this.formBox = formBox;
    const naviInput = document.querySelector(".navi-input");
    this.naviInput = naviInput;

    const onClick = function (mapEvent) {
      this.naviInput.value = "";
      this.formBox.classList.remove("hidden");
      naviInput.focus();
      this.mapEv = mapEvent;
      this.checkHiddenForm();
    };

    this.map.on("click", onClick.bind(this));
  }

  checkHiddenForm() {
    const noEntryText = document.querySelector(".no-entry-text");

    if (this.formBox.classList.contains("hidden")) {
      noEntryText.classList.remove("hidden");
    }
    if (!this.formBox.classList.contains("hidden")) {
      noEntryText.classList.add("hidden");
    }
  }

  addHandlerSubmit() {
    const form = document.querySelector(".navi-form");

    const onSubmit = function (e) {
      e.preventDefault();

      if (this.naviInput.value === "") return;
      this.formBox.classList.add("hidden");
      const lat = this.mapEv.latlng.lat;
      const lng = this.mapEv.latlng.lng;
      const marker = L.marker([lat, lng]);
      const entryCoords = `Lat: ${lat} <br> Lng: ${lng}`;
      this.marker = marker;
      this.entryCoords = entryCoords;

      const dataObject = {
        lat: lat,
        lng: lng,
        coords: entryCoords,
        name: this.naviInput.value,
        date: this.date,
      };

      this.map.addLayer(marker);
      marker
        .bindPopup(
          L.popup({
            autoClose: false,
            closeOnClick: false,
          })
        )
        .setPopupContent(`${this.naviInput.value}`)
        .openPopup();

      this.markerArray.push(marker);
      this.dataArray.push(dataObject);
      this.renderFormEntry();
      this.checkHiddenForm();
      this.setLocalStorage();
    };

    form.addEventListener("submit", onSubmit.bind(this));
  }

  renderFormEntry() {
    const entryBox = document.querySelector(".navi-form-box");
    const markup = ` <div data-coords="${this.mapEv.latlng.lat}, ${this.mapEv.latlng.lng}" class="navi-sidebar--entry entry-submited ">
        <div class="navi-form-submited">
          <button class="delete-entry-btn" aria-label="Delete entry">
            <img class="delete-entry-icon" src="${closeIcon}" alt="delete entry button" />
          </button>
          <label class="navi-label navi-date">${this.date}</label>
          <span class="input-text">${this.naviInput.value}</span>
          <span class="entry-coords">${this.entryCoords}</span>
        </div>
      </div> `;

    entryBox.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRemoveEntry() {
    const btnRemoveEntry = document.querySelector(".navi-sidebar");

    const removeEntry = function (e) {
      const target = e.target;
      const entry = target.closest(".entry-submited");
      const remove = target.closest(".delete-entry-icon");
      if (!remove) return;

      const filteredEntry = this.dataArray.find(el => {
        return (
          `${el.lat}, ${el.lng}` ===
          target.closest(".entry-submited").dataset.coords
        );
      });
      const filteredMarker = this.markerArray.find(el => {
        return (
          `${el._latlng.lat}, ${el._latlng.lng}` ===
          target.closest(".entry-submited").dataset.coords
        );
      });

      const indexOfEntry = this.dataArray.indexOf(filteredEntry);
      const indexOfMarker = this.markerArray.indexOf(filteredMarker);

      entry.remove();
      this.map.removeLayer(filteredMarker);
      this.markerArray.splice(indexOfMarker, 1);
      this.dataArray.splice(indexOfEntry, 1);
      this.setLocalStorage();
    };

    btnRemoveEntry.addEventListener("click", removeEntry.bind(this));
  }

  addHandlerClickEntry() {
    const entry = document.querySelector(".navi-sidebar");

    const moveToMarker = function (e) {
      const target = e.target;
      const clickTarget = target.closest(".entry-submited");
      const removeBtn = target.closest(".delete-entry-btn");
      if (!clickTarget || removeBtn) {
        return;
      }

      const targetCoords = clickTarget.dataset.coords.split(", ");
      this.map.setView(targetCoords, 13, {
        animate: true,
        pan: { duration: 1 },
      });
    };

    entry.addEventListener("click", moveToMarker.bind(this));
  }

  addHandlerCloseNavi(handler) {
    const resetArrays = function () {
      this.dataArray = [];
      this.markerArray = [];
      handler();
    };

    const btnClose = document.querySelector(".navi-close-btn");

    btnClose.addEventListener("click", resetArrays.bind(this));
  }

  renderFormStorage(data) {
    const entryBox = document.querySelector(".navi-form-box");
    const markup = ` <div data-coords="${data.lat}, ${data.lng}" class="navi-sidebar--entry entry-submited ">
    <div class="navi-form-submited">
      <button class="delete-entry-btn" aria-label="Delete entry">
      <img class="delete-entry-icon" src="${closeIcon}" alt="delete entry button" />
      </button>
      <label class="navi-label navi-date">${data.date}</label>
      <span class="input-text">${data.name}</span>
      <span class="entry-coords">${data.coords}</span>
    </div>
  </div> `;

    entryBox.insertAdjacentHTML("afterbegin", markup);
  }

  setLocalStorage() {
    localStorage.setItem("entries", JSON.stringify(this.dataArray));
  }

  getLocalStorage() {
    const entries = JSON.parse(localStorage.getItem("entries"));
    if (!entries) return;
    this.markerArray = [];
    this.dataArray = [];
    this.dataArray = entries;

    entries.forEach(el => {
      const marker = L.marker([el.lat, el.lng]);

      this.map.addLayer(marker);
      marker
        .bindPopup(
          L.popup({
            autoClose: false,
            closeOnClick: false,
          })
        )
        .setPopupContent(`${el.name}`)
        .openPopup();

      this.markerArray.push(marker);
      this.renderFormStorage(el);
    });
  }
}

export default new NaviView();
