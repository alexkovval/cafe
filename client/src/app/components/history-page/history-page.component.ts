import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Filter } from 'src/app/models/Filter.model';
import { Order } from 'src/app/models/Order.model';
import { MaterialInstance, MaterialService } from 'src/app/services/material.service';
import { OrdersService } from 'src/app/services/orders.service';
const STEP = 2;
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

    @ViewChild('tooltip') tooltipRef: ElementRef
    tooltip: MaterialInstance
    oSub: Subscription
    isFilterVisible = false
    orders: Order[] = []
    filter: Filter = {}
  
    offset = 0
    limit = STEP
  
    loading = false
    reloading = false
    noMoreOrders = false
  
    constructor(private ordersService: OrdersService) {
    }
  
    ngOnInit() {
      this.reloading = true
      this.fetch()
    }
  
    private fetch() {
      const params = Object.assign({}, this.filter, {
        offset: this.offset,
        limit: this.limit
      })
      this.oSub = this.ordersService.fetch(params).subscribe(orders => {
        this.orders = this.orders.concat(orders)
        this.noMoreOrders = orders.length < STEP
        this.loading = false
        this.reloading = false
      })
    }
  
    loadMore() {
      this.offset += STEP
      this.loading = true
      this.fetch()
    }
  
    ngOnDestroy() {
      this.tooltip.destroy()
      this.oSub.unsubscribe()
    }
  
    applyFilter(filter: Filter) {
      this.orders = []
      this.offset = 0
      this.filter = filter
      this.reloading = true
      this.fetch()
    }
  
    ngAfterViewInit() {
      this.tooltip = MaterialService.initTooltip(this.tooltipRef)
    }
  
    isFiltered(): boolean {
      return Object.keys(this.filter).length !== 0
    }
  
  }