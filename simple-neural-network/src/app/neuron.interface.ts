import { ILayer } from "./layer.interface";

//Defines a connection between two neurons
export interface INeuron {
	id: number; //Distinct number given to neuron
  layer: ILayer; //What layer the neuron is in
  position: number; //The neuron position within the layer
  selected: boolean; //Whether the neuron is selected
  positionX: number; //Coordinates in the UI
  positionY: number;
  marginLeft: number;
  marginTop: number;
  updateNeuronSVG(neuronSpacing: number): void
}
