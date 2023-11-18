import { Component } from '@angular/core';
import { NetworkConfigurationService } from '../network-configuration.service';
import { INeuron } from '../neuron.interface';
import { IConnection } from '../connection.interface';

@Component({
  selector: 'part1network',
  templateUrl: './part1network.component.html',
  styleUrls: ['./part1network.component.css']
})
export class Part1Network {
  title = 'simple-neural-network';
  buttonNeuron: INeuron;
  baseConnection: IConnection; //connection between button and neuron0
  baseWeight: number; //weight between button and neuron0
  neuron0: INeuron;
  neuron1: INeuron;
  neuron2: INeuron;
  neuron3: INeuron;
  neuron4: INeuron;
  neuron5: INeuron;
  neuron6: INeuron;
  neuron7: INeuron;
  connections: Array<IConnection> = [];
  poop = [1,2,3];
  constructor(private networkConfig: NetworkConfigurationService) {
    this.baseWeight = 1;
    this.buttonNeuron = networkConfig.addNeuron(0, 2);

    //Add 8 neurons in 3 layers
    this.neuron0 = networkConfig.addNeuron(0,2); //Starting neuron
    this.neuron1 = networkConfig.addNeuron(1,1);
    this.neuron2 = networkConfig.addNeuron(1,2);
    this.neuron3 = networkConfig.addNeuron(1,3);
    this.neuron4 = networkConfig.addNeuron(2,1);
    this.neuron5 = networkConfig.addNeuron(2,2);
    this.neuron6 = networkConfig.addNeuron(2,3);
    this.neuron7 = networkConfig.addNeuron(3,2);

    //Add connection to stimlate base neuron
    this.baseConnection = networkConfig.addConnection(this.buttonNeuron, this.neuron0, this.baseWeight);

    //Add connections from 1st layer to 1st layer
    this.connections.push(networkConfig.addConnection(this.neuron0, this.neuron1, 1));
    this.connections.push(networkConfig.addConnection(this.neuron0, this.neuron2, 1));
    this.connections.push(networkConfig.addConnection(this.neuron0, this.neuron3, 1));

    //Add connections from 1st layer to 2nd layer
    this.connections.push(networkConfig.addConnection(this.neuron1, this.neuron4, 1));
    this.connections.push(networkConfig.addConnection(this.neuron1, this.neuron5, 1));
    this.connections.push(networkConfig.addConnection(this.neuron2, this.neuron4, 1));
    this.connections.push(networkConfig.addConnection(this.neuron2, this.neuron5, 1));
    this.connections.push(networkConfig.addConnection(this.neuron2, this.neuron6, 1));
    this.connections.push(networkConfig.addConnection(this.neuron3, this.neuron5, 1));
    this.connections.push(networkConfig.addConnection(this.neuron3, this.neuron6, 1));

    //Add connections from 2nd layer to 3rd layer
    this.connections.push(networkConfig.addConnection(this.neuron4, this.neuron7, 1));
    this.connections.push(networkConfig.addConnection(this.neuron5, this.neuron7, 1));
    this.connections.push(networkConfig.addConnection(this.neuron6, this.neuron7, 1));
  }

  updateBaseWeight(event: any) {
    this.networkConfig.updateConnectionWeight(this.baseConnection, this.baseWeight)
  }

  stimulateBaseNeuron(event: any) {
    this.networkConfig.fireNeuron(0)
  }
}
