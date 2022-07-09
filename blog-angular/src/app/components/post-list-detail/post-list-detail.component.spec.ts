import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListDetailComponent } from './post-list-detail.component';

describe('PostListDetailComponent', () => {
  let component: PostListDetailComponent;
  let fixture: ComponentFixture<PostListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostListDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
