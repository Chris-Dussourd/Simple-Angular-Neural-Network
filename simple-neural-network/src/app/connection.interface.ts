//Defines a connection between two neurons
export interface IConnection {
	inputNeuron: number;
  outputNeuon: number;
  weight: number; //How strong the connection is between the two neurons
}
