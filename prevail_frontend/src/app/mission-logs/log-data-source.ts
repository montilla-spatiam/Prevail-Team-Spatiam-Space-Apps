import { CollectionViewer, DataSource } from "@angular/cdk/collections"
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { Log } from '../log';
import { DataService } from "../services/data.service";

export class LogDataSource implements DataSource<Log> {
  private logSubject = new BehaviorSubject<Log[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor (
    private data: DataService
  ) {}

  connect (collectionViewer: CollectionViewer): Observable<Log[]> {
    return this.logSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.logSubject.complete();
    this.loadingSubject.complete();
  }

  getLogs() {
    this.loadingSubject.next(true);
    this.data.getLog().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe((logs:any) => {this.logSubject.next(logs['logs']); console.log(logs)})
  }
}
