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

  addNeuron(layer: number): INeuron {
    let neuron: INeuron = {
      id: this.neuronsArray.length,
      layer: layer
    };
    this.neuronsArray.push(neuron);
    return neuron;
  }

  addConnection(connection: IConnection) {
    this.connectionsArray.push(connection);
  }



  updateConnectionWeight(inputNeuronId: number, outputNeuronId: number, newWeight: number) {
    let connection = this.connectionsArray.find((x) => x.inputNeuron.id === inputNeuronId && x.outputNeuron.id === outputNeuronId);
    if (connection != undefined) connection.weight = newWeight;
  }
}
