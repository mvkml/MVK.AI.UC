import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../config/api-config';

const API_BASE = API_ENDPOINTS.users;

export interface RoleItem {
  roleId: number;
  roleName: string;
  orderId: number;
}

export interface RolesModel {
  roleItems: RoleItem[];
  isNotValid: boolean;
  message: string;
}

export interface SignUpRequest {
  fullName: string;
  email: string;
  company: string;
  password: string;
  roleId: number;
}

export interface UserResponse {
  userId: number;
  fullName: string;
  email: string;
  company: string;
  createdAt: string;
  isActive: boolean;
  isNotValid: boolean;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  fullName: string;
  email: string;
  company: string;
  roleId: number;
  token: string;
  isNotValid: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<RolesModel> {
    return this.http.get<RolesModel>(`${API_BASE}/roles`);
  }

  signUp(request: SignUpRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${API_BASE}/signup`, request);
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_BASE}/login`, request);
  }
}
