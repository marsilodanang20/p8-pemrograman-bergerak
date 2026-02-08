import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonCard, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonCardContent, IonImg, IonSpinner,
  IonText, IonLabel, IonItem, IonIcon, IonList
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, refreshOutline, locationOutline, callOutline } from 'ionicons/icons';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonCard, IonCardHeader, IonCardSubtitle,
    IonCardTitle, IonCardContent, IonImg, IonSpinner,
    IonText, IonLabel, IonItem, IonIcon, IonList
  ],
})
export class HomePage {
  user: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(private userService: UserService) {
    addIcons({ mailOutline, refreshOutline, locationOutline, callOutline });
  }

  /**
   * Method untuk mengambil data Random User
   * Menggunakan konsep Async/Await (Promise) sesuai instruksi tugas.
   */
  async generateUser() {
    this.loading = true;
    this.error = '';
    this.user = null;

    try {
      // 4. IMPLEMENTASI PROMISE (ASYNC/AWAIT)
      // Kita menggunakan await untuk menunggu hasil dari Promise yang dikembalikan oleh UserService.
      // DILARANG menggunakan subscribe() di sini karena kita ingin alur code yang linear (One-Shot).
      const response = await this.userService.getRandomUser();

      // Data user dari RandomUser API ada di property 'results' array index ke-0
      if (response && response.results && response.results.length > 0) {
        this.user = response.results[0];
      } else {
        this.error = 'Data user tidak ditemukan.';
      }

    } catch (err: any) {
      console.error('Error fetching user:', err);
      this.error = 'Terjadi kesalahan saat mengambil data user. Silakan coba lagi.';
    } finally {
      this.loading = false;
    }
  }

  // ==========================================
  // 8. PENJELASAN KONSEP (WAJIB ADA)
  // ==========================================

  /*
   a. Kenapa studi kasus ini menggunakan Promise?
      - Studi kasus ini bersifat "One-Shot" atau sekali aksi. Kita hanya perlu mengambil data SATU KALI saat tombol ditekan.
      - Promise sangat cocok untuk menangani operasi asynchronous tunggal yang mengembalikan satu nilai (sukses atau gagal) di masa depan.
      - Penggunaan async/await membuat kode terlihat lebih bersih dan mudah dibaca (seperti kode synchronous), 
        dibandingkan dengan callback hell atau rantai .then().

   b. Kenapa tidak menggunakan Observable?
      - Observable (dari RxJS) lebih powerful untuk menangani stream data yang berkelanjutan (banyak nilai dari waktu ke waktu), 
        seperti event listener, websocket, atau value changes pada form.
      - Untuk kasus fetch data HTTP yang sederhana dan hanya sekali ambil (bukan realtime stream), 
        menggunakan Observable lalu di-subscribe bisa terasa berlebihan (overkill) jika tidak membutuhkan fitur operator RxJS yang kompleks.
      - Promise lebih sederhana untuk kasus request-response standar "sekali jalan".

   c. Fungsi lastValueFrom?
      - lastValueFrom adalah fungsi utilitas dari RxJS yang digunakan untuk mengubah sebuah Observable menjadi sebuah Promise.
      - Karena HttpClient Angular secara default mengembalikan Observable, kita menggunakan lastValueFrom untuk 
        mengambil nilai "terakhir" yang dipancarkan oleh Observable tersebut dan mengubahnya menjadi bentuk Promise 
        agar bisa kita handle menggunakan syntax `await` di dalam fungsi `async`.
  */
}
