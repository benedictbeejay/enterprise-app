// import { DefaultSession, DefaultUser } from "next-auth";
// import { DefaultJWT } from "next-auth/jwt";
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       role: string;
//     } & DefaultSession["user"];
//   }

//   interface User extends DefaultUser {
//     role: string;
//   }
// }

// declare module "next-auth" {
//   interface JWT extends DefaultJWT {
//     id: string | number;
//     role: string;
//   }
// }

// import { DefaultSession, DefaultUser } from "next-auth";
// import { DefaultJWT } from "next-auth/jwt";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       name?: string | null;
//       role?: string | null;
//       email?: string | null;
//     };
//   }

//   interface User extends DefaultUser {
//     id: string | number;
//     name?: string | null;
//     role?: string | null;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     id?: string | number;
//     name?: string | null;
//     role?: string | null;
//   }
// }

import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name?: string | null;
      role?: string | null;
      email?: string | null;
    };
  }

  interface User {
    id: string | number;
    name?: string | null;
    role?: string | null;
    email?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string | number;
    name?: string | null;
    role?: string | null;
    email?: string | null;
  }
}
