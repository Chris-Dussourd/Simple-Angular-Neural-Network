import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Part3Network } from './part3-network.component';

describe('Part3Network', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        Part3Network
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Part3Network);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
