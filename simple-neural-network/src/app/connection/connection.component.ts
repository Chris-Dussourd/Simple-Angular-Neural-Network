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
  @Input() maxNeuronsInLayer: number = 1;
  @Input() neuronSpacing: number = 150;
  weight: number;
  connectionX1: number; //Define positioning of connection line
  connectionX2: number;
  connectionY1: number;
  connectionY2: number;

  constructor(private networkConfig: NetworkConfigurationService) {
    this.weight = 1;
  }

  ngOnInit(): void {
    let layerSpacingInput = this.neuronConnection.inputNeuron.layer.neuronCount === this.maxNeuronsInLayer
      ? 0
      : ((this.maxNeuronsInLayer-1)/(this.neuronConnection.inputNeuron.layer.neuronCount + 1))*this.neuronSpacing;
    let layerSpacingOutput = this.neuronConnection.outputNeuron.layer.neuronCount === this.maxNeuronsInLayer
      ? 0
      : ((this.maxNeuronsInLayer-1)/(this.neuronConnection.outputNeuron.layer.neuronCount + 1))*this.neuronSpacing;
    this.connectionX1 = this.neuronSpacing*this.neuronConnection.inputNeuron.layer.id+this.marginLeft+30;
    this.connectionX2 = this.neuronSpacing*this.neuronConnection.outputNeuron.layer.id+this.marginLeft-30;
    this.connectionY1 = this.neuronSpacing*this.neuronConnection.inputNeuron.position+this.marginTop+layerSpacingInput;
    this.connectionY2 = this.neuronSpacing*this.neuronConnection.outputNeuron.position+this.marginTop+layerSpacingOutput;
  }

  updateWeight(event: any) { // without type info
    this.networkConfig.updateConnectionWeight(this.neuronConnection, this.weight)
  }
}
