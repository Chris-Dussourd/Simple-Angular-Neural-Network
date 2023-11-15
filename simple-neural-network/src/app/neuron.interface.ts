//Defines a connection between two neurons
export interface INeuron {
	id: number; //Distinct number given to neuron
  layer: number; //What layer the neuron is in
  position: number; //The neuron position within the layer
}
