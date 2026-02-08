import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonTextarea, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent,
    IonSpinner, IonText, IonChip, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle, informationCircleOutline, thumbsUpOutline, logoWhatsapp, send, warning } from 'ionicons/icons';
import { GeminiService } from '../services/gemini.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-grammar',
    templateUrl: './grammar.page.html',
    styleUrls: ['./grammar.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonContent, IonHeader, IonTitle, IonToolbar,
        IonItem, IonLabel, IonTextarea, IonCard,
        IonCardHeader, IonCardTitle, IonCardContent,
        IonSpinner, IonText, IonChip, IonIcon
    ]
})
export class GrammarPage implements OnInit {

    // 1. INPUT OBSERVABLE (FormControl)
    grammarInput = new FormControl('');

    // State untuk UI
    loading = false;
    result: any = null;
    errorMessage = '';

    constructor(private geminiService: GeminiService) {
        addIcons({ checkmarkCircle, closeCircle, informationCircleOutline, thumbsUpOutline, logoWhatsapp, send, warning });
    }

    ngOnInit() {
        this.setupGrammarChecker();
    }

    setupGrammarChecker() {
        // 2. LOGIKA OBSERVABLE (WAJIB SESUAI TEORI)
        this.grammarInput.valueChanges.pipe(
            // a. debounceTime(1000): Menunggu user berhenti mengetik selama 1 detik
            //    Ini menghemat API call.
            debounceTime(1000),

            // b. distinctUntilChanged: Hanya memproses jika teks berbeda dari sebelumnya
            distinctUntilChanged(),

            // c. switchMap: Membatalkan request sebelumnya jika ada request baru
            //    Jika user mulai mengetik lagi saat request lama belum selesai,
            //    request lama dicancel, request baru dijalankan.
            switchMap(text => {
                if (!text || text.trim().length === 0) {
                    this.loading = false;
                    this.result = null;
                    return of(null); // Emit null jika kosong
                }

                // Mulai loading saat request dikirim
                this.loading = true;
                this.errorMessage = '';
                this.result = null;

                // Panggil service Gemini yang mengembalikan Observable
                return this.geminiService.checkGrammar(text).pipe(
                    catchError(err => {
                        this.errorMessage = 'Gagal menghubungi AI. Coba lagi.';
                        this.loading = false;
                        return of(null);
                    })
                );
            })
        ).subscribe(response => {
            // PROSES RESPONSE
            this.loading = false;
            if (response) {
                this.result = response;
            }
        });
    }
}
