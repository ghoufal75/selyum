import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn : "root"})
export class SideBarService{
    isSideBarShown = true;
    sideBarStateSubject : Subject<boolean> = new Subject<boolean>();

    // ToggleSideBar
    toggleSideBar(){
        this.isSideBarShown = !this.isSideBarShown;
        this.emitSideBarState();
    }

    emitSideBarState(){
        this.sideBarStateSubject.next(this.isSideBarShown);
    }
}
