import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
    selector: 'app-site-layout',
    templateUrl: './site-layout.component.html',
    styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

    @ViewChild('floating') floatingRef: ElementRef

    links = [
        { url: '/history', name: 'History' },
        { url: '/order', name: 'Order' },
        { url: '/categories', name: 'Categories' },

    ]

    constructor(private auth: AuthService,
        private router: Router) {
    }
    ngOnInit() {
    }

    ngAfterViewInit() {
        MaterialService.initializeFloatingButton(this.floatingRef)
    }

    logout(event: Event) {
        event.preventDefault()
        this.auth.logout()
        this.router.navigate(['/login'])
    }


}
