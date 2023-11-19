import { Component } from '@angular/core';
import { NetworkConfigurationService } from '../network-configuration.service';
import { INeuron } from '../neuron.interface';
import { IConnection } from '../connection.interface';

@Component({
  selector: 'part2-network',
  templateUrl: './part2-network.component.html',
  styleUrls: ['./part2-network.component.css']
})
export class Part2Network {
  buttonNeuron: INeuron;
  baseConnection: IConnection; //connection between button and neuron0
  baseWeight: number; //weight between button and neuron0
  neurons: Array<INeuron> = []
  connections: Array<IConnection> = [];
  poop = [1,2,3];
  constructor(private networkConfig: NetworkConfigurationService) {
    this.baseWeight = 1;
    this.buttonNeuron = networkConfig.addNeuron(0, 2);

    //Add 8 neurons in 3 layers
    this.neurons.push(networkConfig.addNeuron(0,2)); //Starting neuron
    this.neurons.push(networkConfig.addNeuron(1,1));
    this.neurons.push(networkConfig.addNeuron(1,2));
    this.neurons.push(networkConfig.addNeuron(1,3));
    this.neurons.push(networkConfig.addNeuron(2,1));
    this.neurons.push(networkConfig.addNeuron(2,2));
    this.neurons.push(networkConfig.addNeuron(2,3));
    this.neurons.push(networkConfig.addNeuron(3,2));

    //Add connection to stimlate base neuron with a button
    this.baseConnection = networkConfig.addConnection(this.buttonNeuron, this.neurons[0], this.baseWeight);

    //Add connections from 1st layer to 1st layer
    this.connections.push(networkConfig.addConnection(this.neurons[0], this.neurons[1], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[0], this.neurons[2], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[0], this.neurons[3], 1));

    //Add connections from 1st layer to 2nd layer
    this.connections.push(networkConfig.addConnection(this.neurons[1], this.neurons[4], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[1], this.neurons[5], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[2], this.neurons[4], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[2], this.neurons[5], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[2], this.neurons[6], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[3], this.neurons[5], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[3], this.neurons[6], 1));

    //Add connections from 2nd layer to 3rd layer
    this.connections.push(networkConfig.addConnection(this.neurons[4], this.neurons[7], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[5], this.neurons[7], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[6], this.neurons[7], 1));
  }

  updateBaseWeight(event: any) {
    this.networkConfig.updateConnectionWeight(this.baseConnection, this.baseWeight)
  }

  stimulateBaseNeuron(event: any) {
    this.networkConfig.fireNeuron(this.buttonNeuron.id)
  }
}
