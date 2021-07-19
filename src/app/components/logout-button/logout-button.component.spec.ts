import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { LogoutButtonComponent } from './logout-button.component';

describe('LogoutButtonComponent', () => {
  let component: LogoutButtonComponent;
  let fixture: ComponentFixture<LogoutButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AuthModule.forRoot({
          domain: 'dev-f5z9j2wu.us.auth0.com',
          clientId: '82o1FfwPFSxvbaCxVlIuXzcUoogmuzlo',
        }),
      ],
      declarations: [LogoutButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('método logout declarado', () => {
    expect(component.logout).toBeDefined();
  });

  it('existe botón logout', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.getAttribute('style')).toContain('width');
  });

  it('nombre botón logout', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Logout');
  });
});
