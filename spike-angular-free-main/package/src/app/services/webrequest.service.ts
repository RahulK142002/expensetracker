import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebrequestService {
  private apiUrl = 'http://localhost:3000/api';
  
  constructor(private http : HttpClient) { }

  getIncome(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/income`);
  }

  createIncome(incomeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/income`, incomeData); 
}

deleteIncome(incomeData: any): Observable<any> {
  return this.http.delete(`${this.apiUrl}/income/${incomeData.id}`);
}

updateIncome(id: number, incomeData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/income/${id}`, incomeData);
}

getExpense(): Observable<any>{
  return this.http.get<any[]>(`${this.apiUrl}/expense`);
}

createExpense(expenseData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/expense`, expenseData); 
}

deleteExpense(expenseData: any): Observable<any> {
  return this.http.delete(`${this.apiUrl}/expense/${expenseData.id}`);
}

updateExpense(id: number, expenseData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/expense/${id}`, expenseData);
}


getupcomingIncome(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/upcomingincome`);
}

createupcomingIncome(upcomingincomeData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/upcomingincome`, upcomingincomeData); 
}

deleteupcomingIncome(upcomingincomeData: any): Observable<any> {
  return this.http.delete(`${this.apiUrl}/upcomingincome/${upcomingincomeData.id}`);
}

updateupcomingIncome(id: number, upcomingincomeData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/upcomingincome/${id}`, upcomingincomeData);
}

getupcomingExpense(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/upcomingexpense`);
}

createupcomingExpense(upcomingexpenseData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/upcomingexpense`, upcomingexpenseData); 
}

deleteupcomingExpense(upcomingexpenseData: any): Observable<any> {
  return this.http.delete(`${this.apiUrl}/upcomingexpense/${upcomingexpenseData.id}`);
}

updateupcomingExpense(id: number, upcomingexpenseData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/upcomingexpense/${id}`, upcomingexpenseData);
}

getBudgets(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/budgets`);
}

updateBudgets(id: number,budgetData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/budgets/${id}`, budgetData);
}

createBudgets(budgetData: any): Observable<any>{
  return this.http.post(`${this.apiUrl}/budgets`, budgetData);
}

deleteBudgets(budgetData: any): Observable<any> {
  return this.http.delete(`${this.apiUrl}/budgets/${budgetData.id}`);
}

getGoals(): Observable<any>{
  return this.http.get<any[]>(`${this.apiUrl}/setgoals`);
}

updateGoals(id: number, goalsData: any): Observable<any>{
  return this.http.put(`${this.apiUrl}/setgoals/${id}`, goalsData);
}

createGoals(goalsData: any): Observable<any>{
  return this.http.post(`${this.apiUrl}/setgoals`, goalsData);
}

deleteGoals(goalsData: any): Observable<any> {
  return this.http.delete(`${this.apiUrl}/setgoals/${goalsData.id}`);
}


}

