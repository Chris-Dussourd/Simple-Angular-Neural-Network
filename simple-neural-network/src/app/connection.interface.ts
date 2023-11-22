import { INeuron } from "./neuron.interface";

//Defines a connection between two neurons
export interface IConnection {
  id: number;
	inputNeuron: INeuron;
  outputNeuron: INeuron;
  weight: number; //How strong the connection is between the two neurons
  marginLeft: number;
  marginTop: number;
  positionX1: number;
  positionX2: number;
  positionY1: number;
  positionY2: number;
  lineWidth: number;
  lineButtonX: number;
  lineButtonTransform: string;
  updateConnectionLine(neuronSpacing: number): void;
}
