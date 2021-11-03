import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceConstants } from '../constants/ServiceConstants';
import { UserModel } from '../models/usermodel';

import { EnvironmentConfig } from 'src/environments/environment-config.interface';
import { ENV_CONFIG } from '../../environments/environment-config.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };

  apiBaseUrl: string

  private assetLoginApiUrl =  '/login';

  constructor(private http: HttpClient,
    @Inject(ENV_CONFIG) private config: EnvironmentConfig
    ) {
      this.apiBaseUrl = `${config.environment.apiUrl}`;
     }

  login(credentials: UserModel): Observable<any> {
    return this.http.get(this.apiBaseUrl + 'assets/api/Login?userEmail='+ credentials.userEmail +'&userPassword='+credentials.userPassword);

    return this.http.post<string>(this.apiBaseUrl + ServiceConstants.baseurlv1 + this.assetLoginApiUrl, credentials);
  }
}
