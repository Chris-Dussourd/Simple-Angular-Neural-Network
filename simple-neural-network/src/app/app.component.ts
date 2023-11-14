import { Component } from '@angular/core';
import { NetworkConfigurationService } from './network-configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simple-neural-network';
  constructor(networkConfig: NetworkConfigurationService) {
    //Add 7 neurons in 3 layers
    let neuron1 = networkConfig.addNeuron(1);
    let neuron2 = networkConfig.addNeuron(1);
    let neuron3 = networkConfig.addNeuron(1);
    let neuron4 = networkConfig.addNeuron(2);
    let neuron5 = networkConfig.addNeuron(2);
    let neuron6 = networkConfig.addNeuron(2);
    let neuron7 = networkConfig.addNeuron(3);

    //Add connections from 1st layer to 2nd layer
    networkConfig.addConnection({ inputNeuron: neuron1, outputNeuron: neuron4, weight: 1 });
    networkConfig.addConnection({ inputNeuron: neuron1, outputNeuron: neuron5, weight: 1 });
    networkConfig.addConnection({ inputNeuron: neuron2, outputNeuron: neuron4, weight: 1 });
    networkConfig.addConnection({ inputNeuron: neuron2, outputNeuron: neuron5, weight: 1 });
    networkConfig.addConnection({ inputNeuron: neuron2, outputNeuron: neuron6, weight: 1 });
    networkConfig.addConnection({ inputNeuron: neuron3, outputNeuron: neuron5, weight: 1 });
    networkConfig.addConnection({ inputNeuron: neuron3, outputNeuron: neuron6, weight: 1 });

    //Add connections from 2nd layer to 3rd layer
    networkConfig.addConnection({ inputNeuron: neuron4, outputNeuron: neuron7, weight: 1 });
    networkConfig.addConnection({ inputNeuron: neuron5, outputNeuron: neuron7, weight: 1 });
    networkConfig.addConnection({ inputNeuron: neuron6, outputNeuron: neuron7, weight: 1 });

  }
}
