import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Overhaul ! n\ Le serveur est en cours d'exécution. Vous pouvez maintenant accéder à l'API via le navigateur ou un outil comme Postman.";
  }
}
