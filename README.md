# Simple-Angular-Neural-Network

## Repository Goal

Generate a simple neural network for display purposes. This should be the first of a series that builds complexity with each iteration.

This first iteration seeks to reproduce the following neural network:
```mermaid
graph LR;
  Button-->Neuron1;
  Button-->Neuron2;
  Button-->Neuron3;
  Neuron1-->Neuron4;
  Neuron1-->Neuron5;
  Neuron2-->Neuron4;
  Neuron2-->Neuron5;
  Neuron2-->Neuron6;
  Neuron3-->Neuron5;
  Neuron3-->Neuron6;
  Neuron4-->Neuron7;
  Neuron5-->Neuron7;
  Neuron6-->Neuron7;
```

The user presses a button to signal stimalating neurons 1, 2, and 3. This processes down the chain and eventually stimulates neuron 7.

On press of the button, the neuron will either be stimulated to fire and thus cause it to stimulate other neurons down the chain or will not reach enough potential to cause a fire event.

Users will be able to edit the weights of each of the connections to other neurons and thus similate how a neural network might interact in real-time.
