import { Injectable } from "@angular/core";
import { Neuron } from "./neuron";
import { BehaviorSubject } from "rxjs";
import { Connection } from "./connection";
import { Layer } from "./layer";

@Injectable({
	providedIn: 'root',
})
/**
 * Constants used in defining how the network operates
 */
export class NetworkConfigurationService {
  private layersArray: Array<Layer> = new Array<Layer>(); //neurons in Neural Network
  private neuronsArray: Array<Neuron> = new Array<Neuron>(); //neurons in Neural Network
  private connectionsArray: Array<Connection> = new Array<Connection>(); //connections in Neural Network
  //Send out which neurons are being stimulated
	private neuronStimulationSubject$ = new BehaviorSubject<Connection>(new Connection(new Neuron(-1, new Layer(-1), -1), new Neuron(-1, new Layer(-1), -1),  0));
	neuronStimulation$ = this.neuronStimulationSubject$.asObservable();
	constructor() {
	}

  addLayer() {
    let layer = new Layer(this.layersArray.length + 1);
    this.layersArray.push(layer);
    return layer;
  }

  addNeuron(id: number, layer: Layer, position: number): Neuron {
    let neuron = new Neuron(id, layer, position);
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

  clearNetwork() {
    this.layersArray = new Array<Layer>(); //neurons in Neural Network
    this.neuronsArray = new Array<Neuron>(); //neurons in Neural Network
    this.connectionsArray = new Array<Connection>(); //connections in Neural Network
  }
}
