import { OverviewPageItem } from './../models/over-view-page.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OverviewPage } from '../models/over-view-page.model';
import { AnalyticsPage } from '../models/analytics-page.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

getOverview():Observable<OverviewPage>{
return this.http.get<OverviewPage>('http://localhost:5000/api/analytics/overview')
}


  getAnalytics(): Observable<AnalyticsPage> {
    return this.http.get<AnalyticsPage>('/api/analytics/analytics')
  }
}
