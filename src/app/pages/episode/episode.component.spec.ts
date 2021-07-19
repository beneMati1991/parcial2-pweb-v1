import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { ToastrModule } from 'ngx-toastr';

import { EpisodeComponent } from './episode.component';

describe('EpisodeComponent', () => {
  let component: EpisodeComponent;
  let fixture: ComponentFixture<EpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AuthModule.forRoot({
          domain: 'dev-f5z9j2wu.us.auth0.com',
          clientId: '82o1FfwPFSxvbaCxVlIuXzcUoogmuzlo',
        }),
        ToastrModule.forRoot({
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'increasing',
          preventDuplicates: true
        })
      ],
      declarations: [EpisodeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
