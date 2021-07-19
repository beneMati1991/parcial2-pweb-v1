import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginButtonComponent } from './login-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';

describe('LoginButtonComponent', () => {
  let component: LoginButtonComponent;
  let fixture: ComponentFixture<LoginButtonComponent>;

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
      declarations: [LoginButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('método loginWithRedirect declarado', () => {
    expect(component.loginWithRedirect).toBeDefined();
  });

  it('existe botón login', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.getAttribute('style')).toContain('width');
  });
});
