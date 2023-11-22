import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IConnection } from '../connection.interface';
import { NetworkConfigurationService } from '../network-configuration.service';

@Component({
  selector: 'connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {
  @Input() neuronConnection: IConnection;
  @Input() neuronSpacing: number = 150;
  //@Input() toggle: boolean; //Toggle used to refresh connection component

  @Output() connectionEvent = new EventEmitter<{action: string, connection: IConnection}>();

  weight: number;
  // connectionX1: number; //Define positioning of connection line
  // connectionX2: number;
  // connectionY1: number;
  // connectionY2: number;
  // lineButtonWidth: number;
  // lineButtonTransform: string;
  // lineButtonX: number;
  selected: boolean = false;

  constructor(private networkConfig: NetworkConfigurationService) {
    this.weight = 1;
  }

  // ngOnInit(): void {
  //   this.connectionX1 = this.neuronSpacing*this.neuronConnection.inputNeuron.layer.position+this.marginLeft+30;
  //   this.connectionX2 = this.neuronSpacing*this.neuronConnection.outputNeuron.layer.position+this.marginLeft-30;
  //   this.connectionY1 = this.neuronSpacing*this.neuronConnection.inputNeuron.position+this.marginTop
  //     +this.neuronConnection.inputNeuron.layer.spacing;
  //   this.connectionY2 = this.neuronSpacing*this.neuronConnection.outputNeuron.position+this.marginTop
  //     +this.neuronConnection.outputNeuron.layer.spacing;
  //   this.lineButtonWidth = Math.sqrt(Math.pow(this.connectionX2-this.connectionX1, 2) + Math.pow(this.connectionY2 - this.connectionY1,2));
  //   this.lineButtonTransform = 'rotate(' + (this.connectionY2 - this.connectionY1)/(this.connectionX2-this.connectionX1) + 'turn)';
  // }

  // ngOnChanges(): void {
  //   //Refresh connection locations
  //   this.connectionX1 = this.neuronSpacing*this.neuronConnection.inputNeuron.layer.position+this.marginLeft+30;
  //   this.connectionX2 = this.neuronSpacing*this.neuronConnection.outputNeuron.layer.position+this.marginLeft-30;
  //   this.connectionY1 = this.neuronSpacing*this.neuronConnection.inputNeuron.position+this.marginTop
  //     +this.neuronConnection.inputNeuron.layer.spacing;
  //   this.connectionY2 = this.neuronSpacing*this.neuronConnection.outputNeuron.position+this.marginTop
  //     +this.neuronConnection.outputNeuron.layer.spacing;
  //   this.lineButtonWidth = Math.sqrt(Math.pow(this.connectionX2-this.connectionX1, 2) + Math.pow(this.connectionY2 - this.connectionY1,2));
  //   this.lineButtonTransform = this.connectionX2 - this.connectionX1 === 0 ? 'rotate(0.5turn)'
  //     : 'rotate(' + Math.atan((this.connectionY2 - this.connectionY1)/(this.connectionX2-this.connectionX1)) + 'rad)';
  //   let tempLength1 = Math.sqrt(Math.pow(this.connectionX2 - this.connectionX1, 2) + Math.pow(this.connectionY2 - this.connectionY1,2))
  //   let tempLength2 = Math.sqrt(Math.pow(this.connectionX2 - this.connectionX1 + Math.abs(this.connectionY2 - this.connectionY1),2) + Math.pow(5,2))
  //   this.lineButtonX = this.connectionX1 - (this.connectionX2 - this.connectionX1)*Math.abs(this.connectionY2 - this.connectionY1)/(tempLength2)
  // }

  updateWeight(event: any) { // without type info
    this.networkConfig.updateConnectionWeight(this.neuronConnection, this.weight)
  }

  selectConnection() {
    this.selected = !this.selected;
  }

  removeConnection(): void {
    this.connectionEvent.emit({ action: 'Remove', connection: this.neuronConnection });
  }
}
