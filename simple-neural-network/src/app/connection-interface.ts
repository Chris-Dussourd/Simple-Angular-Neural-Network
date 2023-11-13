//Defines a connection between two neurons
export interface IConnectionInterface {
	inputNeuron: number;
  outputNeuon: number;
  weight: number; //How strong the connection is between the two neurons
}
