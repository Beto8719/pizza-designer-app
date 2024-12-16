import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToppingsComponent } from './toppings.component';
import { ToppingsService } from './toppings.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';

//Firebase Mock Configuration
const firebaseConfig = {
  apiKey: 'fake-api-key',
  authDomain: 'fake.firebaseapp.com',
  projectId: 'fake-project',
  storageBucket: 'fake.appspot.com',
  messagingSenderId: '1234567890',
  appId: 'fake-app-id',
};

//Mock Firestore Service
const mockAngularFirestore = {
  collection: () => ({
    valueChanges: () => of([]),
    doc: () => ({
      set: () => Promise.resolve(),
      delete: () => Promise.resolve(),
    }),
  }),
};

describe('ToppingsComponent', () => {
  let component: ToppingsComponent;
  let fixture: ComponentFixture<ToppingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToppingsComponent],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [
        ToppingsService,
        { provide: AngularFirestore, useValue: mockAngularFirestore },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToppingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getToppings on init', () => {
    const service = TestBed.inject(ToppingsService);
    spyOn(service, 'getToppings').and.returnValue(of([]));
    component.ngOnInit();
    expect(service.getToppings).toHaveBeenCalled();
  });
});
