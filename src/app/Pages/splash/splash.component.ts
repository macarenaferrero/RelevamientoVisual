import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  animations:[
      trigger('fadeInOut', [
        state('void', style({
          opacity: 0
        })),
        transition('void <=> *', animate(3000)),
      ]),
      trigger('rotate360', [
        state('void', style({
          transform: 'rotate(0deg)'
        })),
        state('*', style({
          transform: 'rotate(360deg)'
        })),
        transition('void <=> *', animate(3000)),
      ]),
  ]
})
export class SplashComponent  implements OnInit {

  constructor(public router:Router) {

   }

  ngOnInit() {
    // SplashScreen.hide();
    setTimeout(()=>{
      this.router.navigateByUrl('inicio')
    },3000)
  }
}
