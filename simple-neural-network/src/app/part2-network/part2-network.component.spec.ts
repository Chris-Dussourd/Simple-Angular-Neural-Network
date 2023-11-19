import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Part2Network } from './part2-network.component';

describe('Part2Network', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        Part2Network
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Part2Network);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
