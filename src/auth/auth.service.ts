import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findOne(username);
      if (user && await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.error('Error al comparar contraseñas:', error);
    }
  }

  async login(user: any) {
    const userExist =  await this.validateUser(user.username,user.password);
    if (userExist ) {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException()
  }


  // Generar un salt (sal)
  public casa = () => {
    bcrypt.genSalt(10, (err, salt) => {
      const password = 'myPassword123';
      if (err) {
        // Manejar el error, si lo hay
        console.error('Error al generar el salt:', err);
        return;
      }

      // Usar el salt para hashear la contraseña
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          // Manejar el error, si lo hay
          console.error('Error al hashear la contraseña:', err);
          return;
        }

        // El hash generado
        console.log('Hash de la contraseña:', hash);

        // Guarda 'hash' en tu base de datos, junto con el 'salt'
      });
    });
  }
}