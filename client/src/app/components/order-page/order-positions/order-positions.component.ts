import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Position } from 'src/app/models/Position.model';
import { MaterialService } from 'src/app/services/material.service';
import { OrderService } from 'src/app/services/order.service';
import { PositionsService } from 'src/app/services/positions.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

    positions$: Observable<Position[]>

    constructor(private route: ActivatedRoute,
                private positionsService: PositionsService,
                private order: OrderService) {
    }
  
    ngOnInit() {
      this.positions$ = this.route.params
        .pipe(
          switchMap(
            (params: Params) => {
              return this.positionsService.fetch(params['id'])
            }
          ),
          map(
            (positions: Position[]) => {
              return positions.map(position => {
                position.quantity = 1
                return position
              })
            }
          )
        )

    }
  
    addToOrder(position: Position) {
      MaterialService.toast(`Added x${position.quantity}`)
      this.order.add(position)
    }
  
  }
  