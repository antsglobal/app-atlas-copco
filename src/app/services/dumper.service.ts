import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dumpermodel, DumperStatus } from '../models/dumpermodel';
import { ServiceConstants } from '../constants/ServiceConstants';

import { EnvironmentConfig } from 'src/environments/environment-config.interface';
import { ENV_CONFIG } from '../../environments/environment-config.interface';

@Injectable({
  providedIn: 'root'
  
})

export class DumperService {

  private dumperDetailsUrl = ServiceConstants.baseurlv1 + '/dumperdetailscount';
  private tripDurationUrl = ServiceConstants.baseurlv1 + '/durationofthetrip';
  private dumperIdsUrl = ServiceConstants.baseurlv1 + '/alldumperids';
  private dumperStatusUrl = ServiceConstants.baseurlv1 + '/dumperLiveLocation';
  private tripDetailsUrl = ServiceConstants.baseurlv1 + '';

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };
  apiBaseUrl: string

  constructor(private http: HttpClient,  @Inject(ENV_CONFIG) private config: EnvironmentConfig) {
    this.apiBaseUrl = `${config.environment.apiUrl}`;
    this.dumperDetailsUrl = this.apiBaseUrl + ServiceConstants.baseurlv1 + '/dumperdetailscount';
    this.tripDurationUrl = this.apiBaseUrl + ServiceConstants.baseurlv1 + '/durationofthetrip';
    this.dumperIdsUrl = this.apiBaseUrl + ServiceConstants.baseurlv1 + '/alldumperids';
    this.dumperStatusUrl = this.apiBaseUrl + ServiceConstants.baseurlv1 + '/dumperLiveLocation';
    this.tripDetailsUrl = this.apiBaseUrl + ServiceConstants.baseurlv1 + '';
  }

  public getDumperDetails(dumperModel: dumpermodel): Observable<dumpermodel[]> {
    return this.http.post<dumpermodel[]>(
      this.dumperDetailsUrl,
      dumperModel, this.httpOptions
    );
  }

  public getTripDuration(dumperModel: dumpermodel): Observable<dumpermodel[]> {
    return this.http.post<dumpermodel[]>(
      this.tripDurationUrl,
      dumperModel, this.httpOptions
    );
  }

  getDumperIds(dumper: dumpermodel
  ): Observable<dumpermodel[]> {
    return this.http.get<dumpermodel[]>(
      this.dumperIdsUrl
    );
  }

  getDumperStatus(dumperId): Observable<DumperStatus[]> {
    return this.http.post<DumperStatus[]>(this.dumperStatusUrl, dumperId);
  }

  getTripDetails(): Observable<dumpermodel[]> {
    return this.http.get<dumpermodel[]>(this.tripDetailsUrl);
  }

}