import { Injectable } from "@angular/core";
import { IConnection } from "./connection.interface";
import { INeuron } from "./neuron.interface";

@Injectable({
	providedIn: 'root',
})
/**
 * Constants used in defining how the network operates
 */
export class NetworkConfigurationService {
	impulseDropoff: number; //How quickly neuron discharges potential
  private connectionsArray: Array<IConnection> = new Array<IConnection>(); //connections in Neural Network
  private neuronsArray: Array<INeuron> = new Array<INeuron>(); //neurons in Neural Network
	constructor() {
		this.impulseDropoff = 1;
	}

  addNeuron(layer: number) {
    let neuron: INeuron = {
      id: this.neuronsArray.length,
      layer: layer
    };
    this.neuronsArray.push(neuron);
  }

  addConnection(connection: IConnection) {
    this.connectionsArray.push(connection);
  }



  updateConnectionWeight(inputNeuron: number, outputNeuron: number, newWeight: number) {
    let connection = this.connectionsArray.find((x) => x.inputNeuron === inputNeuron && x.outputNeuon === outputNeuron);
    if (connection != undefined) connection.weight = newWeight;
  }
}
