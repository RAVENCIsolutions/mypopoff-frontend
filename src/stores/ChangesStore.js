import { makeAutoObservable } from "mobx";
import userStore from "@/stores/UserStore";

class ChangesStore {
  // initialise data
  changes = {};

  constructor() {
    makeAutoObservable(this);
  }

  updateChanges(changes) {
    this.changes = changes;
  }

  saveChanges() {
    const newUserData = { ...userStore.userData, ...this.changes };
    userStore.setUserData(newUserData);
    this.changes = {};
  }
}
