import { Component } from '@angular/core';
import { NetworkConfigurationService } from './network-configuration.service';
import { INeuron } from './neuron.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simple-neural-network';
  neuron0: INeuron;
  neuron1: INeuron;
  neuron2: INeuron;
  neuron3: INeuron;
  neuron4: INeuron;
  neuron5: INeuron;
  neuron6: INeuron;
  neuron7: INeuron;
  constructor(networkConfig: NetworkConfigurationService) {
    //Add 7 neurons in 3 layers
    this.neuron0 = networkConfig.addNeuron(0,2); //Starting neuron
    this.neuron1 = networkConfig.addNeuron(1,1);
    this.neuron2 = networkConfig.addNeuron(1,2);
    this.neuron3 = networkConfig.addNeuron(1,3);
    this.neuron4 = networkConfig.addNeuron(2,1);
    this.neuron5 = networkConfig.addNeuron(2,2);
    this.neuron6 = networkConfig.addNeuron(2,3);
    this.neuron7 = networkConfig.addNeuron(3,2);

    //Add connections from 1st layer to 1st layer
    networkConfig.addConnection({ inputNeuron: this.neuron0, outputNeuron: this.neuron1, weight: 1 });
    networkConfig.addConnection({ inputNeuron: this.neuron0, outputNeuron: this.neuron2, weight: 1 });
    networkConfig.addConnection({ inputNeuron: this.neuron0, outputNeuron: this.neuron3, weight: 1 });

    //Add connections from 1st layer to 2nd layer
    networkConfig.addConnection({ inputNeuron: this.neuron1, outputNeuron: this.neuron4, weight: 1 });
    networkConfig.addConnection({ inputNeuron: this.neuron1, outputNeuron: this.neuron5, weight: 1 });
    networkConfig.addConnection({ inputNeuron: this.neuron2, outputNeuron: this.neuron4, weight: 1 });
    networkConfig.addConnection({ inputNeuron: this.neuron2, outputNeuron: this.neuron5, weight: 1 });
    networkConfig.addConnection({ inputNeuron: this.neuron2, outputNeuron: this.neuron6, weight: 1 });
    networkConfig.addConnection({ inputNeuron: this.neuron3, outputNeuron: this.neuron5, weight: 1 });
    networkConfig.addConnection({ inputNeuron: this.neuron3, outputNeuron: this.neuron6, weight: 1 });

    //Add connections from 2nd layer to 3rd layer
    networkConfig.addConnection({ inputNeuron: this.neuron4, outputNeuron: this.neuron7, weight: 1 });
    networkConfig.addConnection({ inputNeuron: this.neuron5, outputNeuron: this.neuron7, weight: 1 });
    networkConfig.addConnection({ inputNeuron: this.neuron6, outputNeuron: this.neuron7, weight: 1 });

  }
}
