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

  addNeuron(layer: number, position: number): INeuron {
    let neuron: INeuron = {
      id: this.neuronsArray.length,
      layer: layer,
      position: position
    };
    this.neuronsArray.push(neuron);
    return neuron;
  }

  addConnection(inputNeuron: INeuron, outputNeuron: INeuron, weight: number): IConnection {
    let connection: IConnection = {
      inputNeuron: inputNeuron,
      outputNeuron: outputNeuron,
      weight: weight
    };
    this.connectionsArray.push(connection);
    return connection;
  }



  updateConnectionWeight(connection: IConnection, newWeight: number) {
    if (connection != undefined) connection.weight = +newWeight;
  }
}
