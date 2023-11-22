import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() neuronSpacing: number = 150;

  @Output() neuronEvent = new EventEmitter<{action: string, neuron: Neuron}>();

  selected: boolean = false; //Whether user selected the neuron
  potential: number;
	stimulationSubscription: Subscription;
  layerSpacing: number = 0; //Add spacing to make consistent with other layers in network

  constructor(public networkConfig: NetworkConfigurationService) {
    this.potential = 0;
  }

	ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.stimulationSubscription.unsubscribe();
  }

  selectNeuron(): void {
    this.selected = !this.selected;
    this.neuronEvent.emit({ action: 'Selected', neuron: this.neuron })
  }

  removeNeuron(): void {
    this.neuronEvent.emit({ action: 'Remove', neuron: this.neuron });
  }
}
