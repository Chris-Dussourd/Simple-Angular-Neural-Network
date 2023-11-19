import { Component, Input } from '@angular/core';
import { NetworkConfigurationService } from '../network-configuration.service';
import { Subscription } from 'rxjs';
import { Connection } from '../connection';
import { Neuron } from '../neuron';

@Component({
  selector: 'neuron',
  templateUrl: './neuron.component.html',
  styleUrls: ['./neuron.component.css']
})
export class NeuronComponent {
  @Input() neuron: Neuron;
  @Input() marginLeft: number = 0;
  @Input() marginTop: number = 0;
  @Input() maxNeuronsInLayer: number = 1;
  @Input() neuronSpacing: number = 150;
  potential: number;
  impulseDropoff: number;
	stimulationSubscription: Subscription;
  layerSpacing: number = 0; //Add spacing to make consistent with other layers in network
  constructor(private networkConfig: NetworkConfigurationService) {
    this.potential = 0;
    this.impulseDropoff = networkConfig.impulseDropoff;
  }

	ngOnInit(): void {
    this.layerSpacing = this.neuron.layer.neuronCount === this.maxNeuronsInLayer
      ? 0
      : ((this.maxNeuronsInLayer-1)/(this.neuron.layer.neuronCount + 1))*this.neuronSpacing;
    debugger;
		this.stimulationSubscription = this.networkConfig.neuronStimulation$.subscribe((connection: Connection) => {
				if (connection.outputNeuron.id === this.neuron.id) {
          this.potential = this.potential + connection.weight*100;
          setTimeout(() => {
              if (this.potential >= 100) {
                this.potential = 0;
                this.networkConfig.fireNeuron(this.neuron.id);
            }
          }, 500);
        }
			});
    }
}
