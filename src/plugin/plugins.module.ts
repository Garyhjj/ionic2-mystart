import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { PowerManagement } from '@ionic-native/power-management';
import { Vibration } from '@ionic-native/vibration';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Keyboard } from '@ionic-native/keyboard';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { Badge } from '@ionic-native/badge';
import { PluginsService } from './plugins.service'
@NgModule({
  imports:      [ CommonModule, IonicModule ],
  declarations: [

  ],
  entryComponents:[

  ],
  providers:    [ PowerManagement, Vibration, LocalNotifications, Keyboard, BackgroundMode, Network, Camera, PluginsService, Badge ]
})
export class PluginsModule {}
