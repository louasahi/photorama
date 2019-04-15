import { Component, OnDestroy, OnInit } from '@angular/core';
import { NatureView } from '../../models/natureview.models';
import { Subscription } from 'rxjs/Subscription';
import { NatureViewService } from '../../services/natureview.services';
import { NewViewPage } from '../new-view/new-view';
import { NavController } from 'ionic-angular';
import { SingleViewPage } from '../single-view/single-view';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

  natureViewList: NatureView[];
  natureViewListSubscription: Subscription;

  constructor(private natureViewService: NatureViewService, private navCtrl: NavController) {

  }

  ngOnInit() {
    this.natureViewListSubscription = this.natureViewService.natureviewList$.subscribe(
      (natureViews: NatureView[]) => {
        this.natureViewList = natureViews;
      }
    );
    this.natureViewService.fetchList();
  }

  onLoadNatureView(view: NatureView) {
    this.navCtrl.push(SingleViewPage, {natureView: view});
  }

  onNewViewPage() {
    this.navCtrl.push(NewViewPage);
  }

  ngOnDestroy() {
    this.natureViewListSubscription.unsubscribe();
  }


}
