import * as twilio from 'twilio';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  private readonly client: twilio.Twilio;

  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async sendVerificationCode(
    phoneNumber: string,
    verificationCode: number,
  ): Promise<void> {
    try {
      // Enviar el mensaje de texto utilizando la API de Twilio
      await this.client.messages.create({
        body: `Su código de verificación es: ${verificationCode}`,
        to: phoneNumber, // Número de teléfono del usuario
        from: process.env.TWILIO_PHONE_NUMBER, // Número de teléfono de Twilio
      });
    } catch (error) {
      // Manejar errores de envío de mensajes de texto
      console.error('Error al enviar el mensaje de texto:', error);
      throw new Error('Error al enviar el mensaje de texto');
    }
  }
}
