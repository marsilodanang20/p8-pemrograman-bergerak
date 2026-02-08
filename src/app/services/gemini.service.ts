import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GeminiService {
    private apiKey = 'YOUR_API_KEY'; // API Key Gemini
    private apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;

    constructor(private http: HttpClient) { }

    /**
     * Mengirim teks ke Gemini AI untuk dicek grammar-nya.
     * Return: Observable
     */
    checkGrammar(text: string): Observable<any> {
        const prompt = `Check grammar for: "${text}".
    Return ONLY valid JSON format strictly like this:
    {
      "status": "Correct" or "Incorrect",
      "correction": "..."
    }
    DO NOT include markdown code blocks. Just plain JSON string.`;

        const body = {
            contents: [
                {
                    parts: [
                        { text: prompt }
                    ]
                }
            ]
        };

        // Mengembalikan Observable langsung (DILARANG pakai Promise)
        return this.http.post<any>(this.apiURL, body).pipe(
            map(response => {
                if (response.candidates && response.candidates.length > 0) {
                    const rawText = response.candidates[0].content.parts[0].text;
                    // Bersihkan markdown jika ada (misal ```json ... ```)
                    const cleanText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
                    try {
                        return JSON.parse(cleanText);
                    } catch (e) {
                        console.error('JSON Parse Error:', e);
                        return { status: 'Error', correction: 'Failed to parse AI response.' };
                    }
                }
                return { status: 'Error', correction: 'No response from AI.' };
            })
        );
    }
}
