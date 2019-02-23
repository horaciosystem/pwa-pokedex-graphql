const LAST_UPDATE = "last-update";
const UPDATE_INTERVAL_MINUTES = 1;

export default {
  expired() {
    let lastUpdate = localStorage.getItem(LAST_UPDATE);
    let differenceInMilliseconds = Date.now() - new Date(lastUpdate);
    return differenceInMilliseconds / 1000 / 60 >= UPDATE_INTERVAL_MINUTES;
  },
  save() {
    console.log("saving last update");
    localStorage.setItem(LAST_UPDATE, new Date().toISOString());
  }
};
