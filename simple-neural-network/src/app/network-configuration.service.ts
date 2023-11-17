import { Injectable } from "@angular/core";
import { Neuron } from "./neuron";
import { BehaviorSubject } from "rxjs";
import { Connection } from "./connection";

@Injectable({
	providedIn: 'root',
})
/**
 * Constants used in defining how the network operates
 */
export class NetworkConfigurationService {
	impulseDropoff: number; //How quickly neuron discharges potential
  private connectionsArray: Array<Connection> = new Array<Connection>(); //connections in Neural Network
  private neuronsArray: Array<Neuron> = new Array<Neuron>(); //neurons in Neural Network
  //Send out which neurons are being stimulated
	private neuronStimulationSubject$ = new BehaviorSubject<Connection>(new Connection(new Neuron(-1, -1, -1), new Neuron(-1, -1, -1),  0));
	neuronStimulation$ = this.neuronStimulationSubject$.asObservable();
	constructor() {
		this.impulseDropoff = 1;
	}

  addNeuron(layer: number, position: number): Neuron {
    let neuron = new Neuron(this.neuronsArray.length, layer, position);
    this.neuronsArray.push(neuron);
    return neuron;
  }

  addConnection(inputNeuron: Neuron, outputNeuron: Neuron, weight: number): Connection {
    let connection = new Connection(inputNeuron, outputNeuron, weight);
    this.connectionsArray.push(connection);
    return connection;
  }

  updateConnectionWeight(connection: Connection, newWeight: number) {
    if (connection != undefined) connection.weight = +newWeight;
  }

  fireNeuron(neuronId: number) {
    this.connectionsArray
      .filter((connection) => connection.inputNeuron.id === neuronId)
      .forEach((connection) => {
        this.neuronStimulationSubject$.next(connection);
      });
  }
}
