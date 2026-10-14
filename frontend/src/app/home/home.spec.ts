import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  it('shows the FoxTales title', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('h1').textContent).toBe('FoxTales');
  });
});
