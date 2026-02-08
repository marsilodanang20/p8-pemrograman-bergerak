import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    async getRandomUser(): Promise<any> {
        // Menggunakan lastValueFrom untuk mengubah Observable menjadi Promise
        // sesuai dengan instruksi tugas (Studi Kasus 1: Wajib Promise)
        const data = await lastValueFrom(this.http.get('https://randomuser.me/api/'));
        return data;
    }
}
