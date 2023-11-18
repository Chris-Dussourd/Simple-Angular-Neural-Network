import { Component, Input } from '@angular/core';
import { IConnection } from '../connection.interface';
import { NetworkConfigurationService } from '../network-configuration.service';

@Component({
  selector: 'connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {
  @Input() neuronConnection: IConnection;
  @Input() marginLeft: number = 0;
  @Input() marginTop: number = 0;
  weight: number;

  constructor(private networkConfig: NetworkConfigurationService) {
    this.weight = 1;
  }

  updateWeight(event: any) { // without type info
    this.networkConfig.updateConnectionWeight(this.neuronConnection, this.weight)
  }
}
