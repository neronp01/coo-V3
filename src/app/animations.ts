
import { query, animate, state, style, transition, trigger, group } from '@angular/animations';
import { AnimationEntryMetadata } from '@angular/core';
// Component transition animations
export const slideInDownAnimation: AnimationEntryMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateY(100%)'
      }))
    ])
  ]
);
export const slideComponent: AnimationEntryMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-25%)'
      }),
      animate('.5s ease-in')
    ]),
  ]
);
export const slideComponent2 =
trigger('routeAnimation', [
  transition(':enter', [
    query('.container' , style({ opacity: 0, transform: 'rotateX(-90deg) translateY(150px) translateZ(50px)' })),
    query('.transformPhoto, .h2_name', style({ transform: 'scale(0)' })),
    query('.sec_d_info wrapper, .d_tel wrapper', style({ opacity: 0, transform: 'translateX(50px)' })),
    query('.c_f_info wrapper', style({ transform: 'translateY(100%)' }))
  ])
]);
