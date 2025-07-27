import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    const secret =
      process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
    console.log(
      '🔐 JWT Strategy initialized with secret:',
      secret ? 'Secret is set' : 'No secret set',
    );
  }

  async validate(payload: any) {
    console.log(
      '🔍 JWT Strategy validate called with payload:',
      JSON.stringify(payload, null, 2),
    );
    try {
      const userId = payload?.sub as string;
      if (!userId) {
        console.log('❌ No user ID in JWT payload');
        throw new UnauthorizedException('Invalid token payload');
      }
      const user = await this.authService.validateToken(userId);
      if (!user) {
        console.log('❌ User not found in JWT validation');
        throw new UnauthorizedException('User not found');
      }
      console.log('✅ JWT validation successful for user:', user.username);
      return user;
    } catch (error) {
      console.log('💥 JWT validation error:', (error as Error).message);
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
