import session from 'express-session';
import parseDuration from 'parse-duration';
import sessionFileStore from 'session-file-store';

const FileStore = sessionFileStore(session);

export const sessionDomain = () => {
  // return process.env.NODE_ENV === 'production'
  //   ? `${process.env.SESSION_DOMAIN}`
  //   : undefined;
  return undefined;
};

const sessionConfig = session({
  store: new FileStore({
    path: 'sessions',
    logFn: () => {},
  }),
  name: process.env.SESSION_NAME || 'connect.sid',
  secret: process.env.SESSION_SECRET || '#@XV5Ex!*m2Mwp',
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: parseDuration(process.env.SESSION_MAX_TIME),
    domain: sessionDomain(),
  },
});

export default sessionConfig;
