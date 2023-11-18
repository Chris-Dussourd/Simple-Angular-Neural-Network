import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Part1Network } from './part1network.component';

describe('Part1Network', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        Part1Network
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Part1Network);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'simple-neural-network'`, () => {
    const fixture = TestBed.createComponent(Part1Network);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('simple-neural-network');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(Part1Network);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('simple-neural-network app is running!');
  });
});
