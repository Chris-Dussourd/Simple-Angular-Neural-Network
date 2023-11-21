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
  @Input() neuronSpacing: number = 150;
  @Input() toggle: boolean; //Toggle used to refresh connection component
  weight: number;
  connectionX1: number; //Define positioning of connection line
  connectionX2: number;
  connectionY1: number;
  connectionY2: number;

  constructor(private networkConfig: NetworkConfigurationService) {
    this.weight = 1;
  }

  ngOnInit(): void {
    this.connectionX1 = this.neuronSpacing*this.neuronConnection.inputNeuron.layer.id+this.marginLeft+30;
    this.connectionX2 = this.neuronSpacing*this.neuronConnection.outputNeuron.layer.id+this.marginLeft-30;
    this.connectionY1 = this.neuronSpacing*this.neuronConnection.inputNeuron.position+this.marginTop
      +this.neuronConnection.inputNeuron.layer.spacing;
    this.connectionY2 = this.neuronSpacing*this.neuronConnection.outputNeuron.position+this.marginTop
      +this.neuronConnection.outputNeuron.layer.spacing;
  }

  ngOnChanges(): void {
    //Refresh connection locations
    this.connectionX1 = this.neuronSpacing*this.neuronConnection.inputNeuron.layer.id+this.marginLeft+30;
    this.connectionX2 = this.neuronSpacing*this.neuronConnection.outputNeuron.layer.id+this.marginLeft-30;
    this.connectionY1 = this.neuronSpacing*this.neuronConnection.inputNeuron.position+this.marginTop
      +this.neuronConnection.inputNeuron.layer.spacing;
    this.connectionY2 = this.neuronSpacing*this.neuronConnection.outputNeuron.position+this.marginTop
      +this.neuronConnection.outputNeuron.layer.spacing;
  }

  updateWeight(event: any) { // without type info
    this.networkConfig.updateConnectionWeight(this.neuronConnection, this.weight)
  }
}
