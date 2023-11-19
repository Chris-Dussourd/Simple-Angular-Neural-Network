# Simple-Angular-Neural-Network

Create a simple neural network for display purposes.
Each part represents an increase in capability of the network.
<br>
## Part 1

This first iteration seeks to reproduce the following neural network (4 layers, 8 neurons):
```mermaid
graph LR;
  Neuron1-->Neuron2;
  Neuron1-->Neuron3;
  Neuron1-->Neuron4;
  Neuron2-->Neuron5;
  Neuron2-->Neuron6;
  Neuron3-->Neuron5;
  Neuron3-->Neuron6;
  Neuron3-->Neuron7;
  Neuron4-->Neuron6;
  Neuron4-->Neuron7;
  Neuron5-->Neuron8;
  Neuron6-->Neuron8;
  Neuron7-->Neuron8;
```

The user presses a button to signal stimalating neuron 1 in layer 1. This processes continues down the chain of layers and eventually stimulates neuron 7.

On press of the button, the neuron will either be stimulated to fire and thus cause it to stimulate other neurons down the chain or will not reach enough potential to cause a fire event.

Users will be able to edit the weights of each of the connections to other neurons and thus similate how a neural network might interact in real-time.

## Part 2

The user can add/remove layers, neurons, and connections.
