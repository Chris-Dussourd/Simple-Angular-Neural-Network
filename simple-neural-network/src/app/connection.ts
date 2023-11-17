import { IConnection } from "./connection.interface";
import { Neuron } from "./neuron";

//Defines a connection between two neurons
export class Connection implements IConnection {
	inputNeuron: Neuron;
  outputNeuron: Neuron;
  weight: number; //How strong the connection is between the two neurons
  constructor(inputNeuron: Neuron, outputNeuron: Neuron, weight: number) {
    this.inputNeuron = inputNeuron;
    this.outputNeuron = outputNeuron;
    this.weight = weight;
  }
}
