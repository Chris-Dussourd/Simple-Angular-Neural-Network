import { INeuron } from "./neuron.interface";

//Defines a connection between two neurons
export interface IConnection {
	inputNeuron: INeuron;
  outputNeuron: INeuron;
  weight: number; //How strong the connection is between the two neurons
}
