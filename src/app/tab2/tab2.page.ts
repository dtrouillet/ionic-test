import { Component } from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {BarcodeScanResult} from '@ionic-native/barcode-scanner';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  data: BarcodeScanResult;
  constructor(private barcodeScanner: BarcodeScanner, private alertController: AlertController) { }

  async presentAlert(title: string, body: string) {
    const alert = await this.alertController.create({
      header: title,
      message: body,
      buttons: ['OK']
    });

    await alert.present();
  }

  scan() {
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData.text);
      this.data = barcodeData;
      if(this.data.format !== 'QR_CODE'){
        this.presentAlert('Erreur', 'Aucun QRCode trouvé');
        return;
      }
      this.presentAlert('Résultat', this.data.text);
    }).catch(err => {
      this.presentAlert('Erreur', err.message);
    });
  }
}
