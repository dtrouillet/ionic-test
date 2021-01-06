import { Component, OnInit, Input } from '@angular/core';
import { Plugins } from '@capacitor/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  data: any;

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {}

  async openBrowser() {
    // On iOS, for example, open the URL in SFSafariViewController (the in-app browser)
    await Plugins.Browser.open({ url: 'https://google.com' });
  }

  scan() {
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData.text);
      this.data = barcodeData;
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
