import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('🛡️ JWT Guard activated - checking authentication');
    console.log('📨 Authorization header:', request.headers.authorization);
    
    const result = super.canActivate(context);
    console.log('🔍 Guard canActivate result:', result);
    
    return result;
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    console.log('🎯 JWT Guard handleRequest called');
    console.log('  - Error:', err);
    console.log('  - User:', user ? 'User found' : 'No user');
    console.log('  - Info:', info);
    
    return super.handleRequest(err, user, info, context);
  }
}
