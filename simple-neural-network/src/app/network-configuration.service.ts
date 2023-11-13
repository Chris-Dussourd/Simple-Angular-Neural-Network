import { Injectable } from "@angular/core";
import { IConnectionInterface } from "./connection-interface";

@Injectable({
	providedIn: 'root',
})
/**
 * Constants used in defining how the network operates
 */
export class NetworkConfigurationService {
	impulseDropoff: number; //How quickly neuron discharges potential
  private connectionsArray: Array<IConnectionInterface> = new Array<IConnectionInterface>(); //connections in Neural Network
	constructor() {
		this.impulseDropoff = 1;
    this.initializeConnections();
	}

  initializeConnections() {
    this.connectionsArray = new Array<IConnectionInterface>();
  }



  addConnection(connection: IConnectionInterface) {
    this.connectionsArray.push(connection);
  }



  updateConnectionWeight(inputNeuron: number, outputNeuron: number, newWeight: number) {
    let connection = this.connectionsArray.find((x) => x.inputNeuron === inputNeuron && x.outputNeuon === outputNeuron);
    if (connection != undefined) connection.weight = newWeight;
  }
}
