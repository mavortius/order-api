import * as passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

export class PassportConfiguration {
  constructor() {
    passport.use(
      new Strategy({
          secretOrKey: 'top_secret',
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
          try {
            return done(null, token.user)
          } catch (e) {
            done(e)
          }
        }),
    )
  }
}
