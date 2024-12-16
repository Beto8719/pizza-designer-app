import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PizzasComponent } from './pizzas.component';
import { PizzasService } from './pizzas.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

// Mock Firebase configuration
const firebaseConfig = {
  apiKey: 'fake-api-key',
  authDomain: 'fake.firebaseapp.com',
  projectId: 'fake-project',
  storageBucket: 'fake.appspot.com',
  messagingSenderId: '1234567890',
  appId: 'fake-app-id',
};

// Mock AngularFirestore Service
const mockAngularFirestore = {
  collection: () => ({
    valueChanges: () => of([]),
    doc: () => ({
      set: () => Promise.resolve(),
      delete: () => Promise.resolve(),
      update: () => Promise.resolve(),
    }),
  }),
};

describe('PizzasComponent', () => {
  let component: PizzasComponent;
  let fixture: ComponentFixture<PizzasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzasComponent],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        FormsModule,
      ],
      providers: [
        PizzasService,
        { provide: AngularFirestore, useValue: mockAngularFirestore },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
